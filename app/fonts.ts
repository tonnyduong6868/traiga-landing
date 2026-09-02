import { Bricolage_Grotesque, Be_Vietnam_Pro, JetBrains_Mono } from 'next/font/google'

/**
 * Bản gốc nạp 3 font qua <link> tới fonts.googleapis.com.
 * next/font tải sẵn lúc build và tự host, nên bỏ được request bên thứ ba
 * và tránh nhảy chữ khi font về muộn.
 */

// Font hiển thị — biến thiên theo opsz/wdth đúng như bản gốc.
export const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  axes: ['opsz', 'wdth'],
  display: 'swap',
  variable: '--font-bricolage',
})

// Font chữ chạy — không phải variable font nên phải liệt kê weight.
export const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-bevietnam',
})

// Font mono cho eyebrow, số liệu và bảng.
export const jetbrains = JetBrains_Mono({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-jetbrains',
})

export const fontClassNames = [
  bricolage.variable,
  beVietnam.variable,
  jetbrains.variable,
].join(' ')
