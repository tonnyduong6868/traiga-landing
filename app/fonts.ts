import { IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google'

/**
 * Hai font, đúng hai vai.
 *
 * Bản trước dùng Bricolage Grotesque cho tiêu đề — một font hiển thị mềm, hợp
 * quán cà phê hơn là phần mềm. Sản phẩm này là công cụ kỹ thuật nên chữ phải
 * nói đúng điều đó: Plex Sans cho phần đọc, JetBrains Mono cho mọi thứ máy đo
 * được (số liệu, nhãn, mã, bảng).
 *
 * Cả hai đều có bộ ký tự tiếng Việt nên bỏ được font đệm thứ ba.
 */

// Chữ chạy và tiêu đề phụ.
export const plex = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex',
})

// Tiêu đề lớn, nhãn, số liệu, bảng — variable font nên chỉnh weight thoải mái.
export const mono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
  variable: '--font-mono',
})

export const fontClassNames = [plex.variable, mono.variable].join(' ')
