/**
 * Ảnh chụp màn hình app — đọc thẳng từ thư mục lúc build.
 *
 * Trước đây muốn thêm một tấm ảnh phải sửa mảng `proof.shots` trong site.ts:
 * chép đường dẫn, viết alt, viết caption, dễ gõ sai tên file mà không ai biết
 * cho tới khi trang live hiện ô ảnh vỡ. Giờ chỉ cần bỏ file vào
 * `public/assets/shots/` rồi build lại.
 *
 * Quy ước tên file: `NN-mo-ta-ngan.png` — số đầu quyết định thứ tự, phần sau
 * thành caption nếu không khai báo gì thêm. Muốn caption có dấu tiếng Việt thì
 * thêm `captions.json` cùng thư mục:
 *
 *   { "01-hop-thu-gop.png": "Hộp thư gộp — DM của cả trại về một chỗ" }
 *
 * Hàm này chỉ chạy ở phía server lúc `next build`, không lọt vào bundle trình duyệt.
 */

import fs from 'node:fs'
import path from 'node:path'
import { asset } from './site'

const DIR = path.join(process.cwd(), 'public', 'assets', 'shots')
const EXT = new Set(['.png', '.jpg', '.jpeg', '.webp'])

export type Shot = {
  src: string
  alt: string
  caption: string
  /** null khi không đọc được kích thước — CSS sẽ tự lo, chỉ mất phần chống nhảy layout. */
  width: number | null
  height: number | null
}

export function getShots(): Shot[] {
  let names: string[]
  try {
    names = fs.readdirSync(DIR)
  } catch {
    return [] // chưa có thư mục thì khối ảnh tự ẩn, đúng như khi mảng rỗng
  }

  const captions = readCaptions()

  return names
    .filter((n) => EXT.has(path.extname(n).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'vi'))
    .map((name) => {
      const caption = captions[name] ?? captionFromName(name)
      const size = readSize(path.join(DIR, name))
      return {
        src: asset(`/assets/shots/${name}`),
        alt: `Ảnh chụp màn hình Trại Gà: ${caption}`,
        caption,
        width: size?.width ?? null,
        height: size?.height ?? null,
      }
    })
}

function readCaptions(): Record<string, string> {
  const file = path.join(DIR, 'captions.json')
  let raw: string
  try {
    raw = fs.readFileSync(file, 'utf8')
  } catch {
    return {} // không có file là chuyện bình thường
  }

  // Notepad và PowerShell trên Windows ghi UTF-8 kèm BOM; JSON.parse nghẹn ngay
  // ký tự đầu. Cắt BOM trước khi phân tích, nếu không chú thích tiếng Việt sẽ
  // âm thầm biến mất mà build vẫn báo xanh.
  raw = raw.replace(/^﻿/, '')

  try {
    const parsed: unknown = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, string>
    }
    console.warn(`[shots] ${file} phải là một object, đang bỏ qua.`)
  } catch (err) {
    // Kêu to lên: im lặng ở đây nghĩa là chú thích mất mà không ai biết.
    console.warn(`[shots] ${file} không phải JSON hợp lệ, đang bỏ qua. ${String(err)}`)
  }
  return {}
}

/** `01-hop-thu-gop.png` → `Hop thu gop` */
function captionFromName(name: string): string {
  const slug = path
    .basename(name, path.extname(name))
    .replace(/^\d+[-_. ]*/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
  if (!slug) return 'Giao diện app'
  return slug.charAt(0).toUpperCase() + slug.slice(1)
}

/**
 * Đọc kích thước ảnh từ vài byte đầu file.
 *
 * Mục đích duy nhất là đặt width/height lên thẻ <img> để trình duyệt chừa sẵn
 * chỗ — không có thì ảnh tải xong sẽ đẩy nội dung bên dưới nhảy xuống.
 * Không dùng thư viện ngoài cho một việc đọc header.
 */
function readSize(file: string): { width: number; height: number } | null {
  let buf: Buffer
  try {
    const fd = fs.openSync(file, 'r')
    buf = Buffer.alloc(65536)
    const read = fs.readSync(fd, buf, 0, 65536, 0)
    fs.closeSync(fd)
    buf = buf.subarray(0, read)
  } catch {
    return null
  }

  // PNG: chữ ký 8 byte, rồi chunk IHDR mang width/height ở offset 16 và 20.
  if (buf.length >= 24 && buf.toString('ascii', 12, 16) === 'IHDR') {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
  }

  // WEBP: 'RIFF' .... 'WEBP' rồi một trong ba loại chunk.
  if (buf.length >= 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const kind = buf.toString('ascii', 12, 16)
    if (kind === 'VP8X') {
      // Kích thước lưu dạng "trừ 1", 3 byte little-endian mỗi chiều.
      const w = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16))
      const h = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16))
      return { width: w, height: h }
    }
    if (kind === 'VP8 ') {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff }
    }
    if (kind === 'VP8L') {
      const bits = buf.readUInt32LE(21)
      return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) }
    }
  }

  // JPEG: duyệt các marker tới khi gặp SOF, bỏ qua SOF4/8/12 vì không mang kích thước.
  if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) {
        i++
        continue
      }
      const marker = buf[i + 1]
      const len = buf.readUInt16BE(i + 2)
      const isSof = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)
      if (isSof) {
        return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) }
      }
      i += 2 + len
    }
  }

  return null
}
