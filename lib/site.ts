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

/**
 * Bằng chứng cho khối Proof.
 *
 * Ba mảng đầu đang RỖNG và cố ý để rỗng — không bịa số khách, không bịa review.
 * Khối Proof tự ẩn phần nào không có dữ liệu, nên trang vẫn chạy đúng khi chưa
 * điền gì. Có số thật tới đâu thì thêm tới đó.
 *
 * `assurances` thì luôn hiện: đó là những điều tin cậy không cần dữ liệu khách
 * hàng, chỉ cần nói thật.
 */
export const proof = {
  /** Ví dụ: { value: '312', label: 'account đang chạy trên máy tôi' } */
  stats: [] as { value: string; label: string }[],

  /** Ví dụ: { text: 'Chạy 2 tháng chưa dính con nào.', who: 'Khách mua tháng 6' } */
  quotes: [] as { text: string; who: string }[],

  // Ảnh chụp app KHÔNG khai báo ở đây nữa — bỏ file vào public/assets/shots/
  // là xong, lib/shots.ts quét thư mục đó lúc build.

  assurances: [
    {
      title: 'Xem app chạy thật trước khi trả tiền',
      body:
        'Nhắn trước, tôi chia sẻ màn hình cho anh xem app chạy trên máy tôi — ' +
        'kịch bản thật, account thật, không phải video dựng sẵn.',
    },
    {
      title: 'Tải về trước, không cần trả gì',
      body:
        'Bản cài đầy đủ, không cắt tính năng. Cài xong app mở được, xem được ' +
        'toàn bộ giao diện. Chỉ khi chạy việc mới cần key.',
    },
    {
      title: 'Trả một lần, không có khoản nào phát sinh',
      body:
        'Không phí duy trì, không phí theo account, không bán thêm gói. ' +
        'Cập nhật về sau miễn phí.',
    },
    {
      title: 'Nói rõ cái không làm được',
      body:
        'Không công cụ nào cam kết 0% ban, kể cả cái này. Proxy và account anh ' +
        'tự lo. Tôi nói trước để anh khỏi mua nhầm kỳ vọng.',
    },
  ],
} as const

/**
 * Đường đi từ lúc tò mò tới lúc app chạy được.
 *
 * Bản trước tách làm hai danh sách — "3 bước sau khi bấm nút" ở khối Giá và
 * "4 bước cài đặt" ở khối Tải — nói gần như cùng một chuyện ở hai chỗ cách
 * nhau một màn hình. Gộp lại còn một mạch duy nhất.
 */
export const steps = [
  {
    title: 'Tải và cài',
    body: 'Chạy file .exe, cài một lần. Chưa phải trả gì, chưa cần nhắn ai.',
  },
  {
    title: 'Mở app, chép mã máy',
    body: 'Màn hình đầu tiên hiện mã máy của anh kèm nút Chép. Giao diện xem được hết.',
  },
  {
    title: 'Nhắn Zalo, chuyển khoản',
    body: 'Gửi mã máy cho tôi. Muốn xem app chạy thật trước thì nói, tôi chia sẻ màn hình.',
  },
  {
    title: 'Dán key, chạy',
    body: 'Tôi gửi key trong ngày. Dán vào ô kích hoạt, từ lần sau app mở thẳng.',
  },
] as const

export const release = {
  version: '1.1.0',
  size: '78 MB',
  requires: 'Windows 10/11 · 64-bit',
  date: '02.09.2026',
  downloadUrl:
    'https://github.com/tonnyduong6868/traigaapp/releases/download/v1.1.0/omnilogin-app-setup-1.1.0.exe',
  allReleasesUrl: 'https://github.com/tonnyduong6868/traigaapp/releases',
} as const

/** Thứ tự khớp đúng thứ tự khối trên trang, kèm số hiệu hiện ở đầu mỗi khối. */
export const nav = [
  { href: '#giaodien', label: 'Giao diện' },
  { href: '#antoan', label: 'Chống ban' },
  { href: '#tinhnang', label: 'Tính năng' },
  { href: '#mua', label: 'Giá & tải' },
  { href: '#hoidap', label: 'Hỏi đáp' },
] as const
