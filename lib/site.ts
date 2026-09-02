/**
 * Nguồn sự thật duy nhất cho mọi thứ hay phải sửa:
 * giá, link liên hệ, phiên bản, link tải.
 *
 * Trước đây những giá trị này nằm rải rác trong index.html và phải tìm bằng
 * Ctrl+F chữ "SỬA". Giờ sửa một chỗ, cả trang đổi theo.
 */

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** Đường dẫn tới file trong public/ — tự thêm basePath của GitHub Pages. */
export const asset = (path: string) => `${BASE_PATH}${path}`

export const site = {
  name: 'Trại Gà',
  tagline: 'Nuôi cả trại account Discord bằng một màn hình',
  description:
    'Phần mềm quản lý hàng trăm account Discord trên Windows: seeding hội thoại, ' +
    'hộp thư gộp, warm-up, proxy riêng từng acc, chống ban và lên lịch tự động. ' +
    'Bản quyền vĩnh viễn.',
  url: 'https://tonnyduong6868.github.io/traiga-landing/',
  locale: 'vi_VN',
} as const

export const pricing = {
  planName: 'Bản quyền vĩnh viễn',
  amount: '2.500.000',
  currency: '₫',
  note: 'Trả một lần, không phí duy trì, không giới hạn số account.',
  includes: [
    'Toàn bộ tính năng, không khoá phần nào',
    'Cài trên 1 máy Windows 10/11 64-bit',
    'Cập nhật tự động, bản mới hiện ngay trong app',
    'Hướng dẫn cài đặt và cấu hình lần đầu',
    'Hỗ trợ qua Zalo khi gặp lỗi',
  ],
  excludes: [
    'Proxy — anh tự mua nhà cung cấp quen',
    'Account Discord',
    'API key AI (chỉ cần nếu bật tính năng AI)',
  ],
} as const

/**
 * CẦN SỬA TRƯỚC KHI CHẠY QUẢNG CÁO.
 * `zalo` đang là số placeholder từ bản gốc — khách bấm vào sẽ rơi vào trang rỗng.
 */
export const contact = {
  zalo: 'https://zalo.me/0000000000',
  messenger: 'https://m.me/traiga',
} as const

export const release = {
  version: '1.1.0',
  size: '78 MB',
  requires: 'Windows 10/11 · 64-bit',
  date: '02.09.2026',
  downloadUrl:
    'https://github.com/tonnyduong6868/traigaapp/releases/download/v1.1.0/omnilogin-app-setup-1.1.0.exe',
  allReleasesUrl: 'https://github.com/tonnyduong6868/traigaapp/releases',
} as const

export const nav = [
  { href: '#giaodien', label: 'Giao diện' },
  { href: '#tinhnang', label: 'Tính năng' },
  { href: '#antoan', label: 'Chống ban' },
  { href: '#gia', label: 'Giá' },
  { href: '#tai', label: 'Tải về' },
  { href: '#hoidap', label: 'Hỏi đáp' },
] as const
