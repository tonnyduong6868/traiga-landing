import type { NextConfig } from 'next'

/**
 * GitHub Pages phục vụ site ở /<tên-repo>/ nên bản build cần basePath.
 *
 * Trước đây giá trị này chỉ đến từ biến môi trường và mặc định là chuỗi rỗng —
 * quên set một lần là cả trang mất CSS trên production mà build vẫn báo xanh.
 * Giờ bản production tự mặc định đúng đường dẫn Pages; `next dev` vẫn chạy ở
 * gốc localhost. Gắn tên miền riêng thì ghi đè:
 *   $env:NEXT_PUBLIC_BASE_PATH=""; npm run build
 */
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === 'production' ? '/traiga-landing' : '')

const nextConfig: NextConfig = {
  // Xuất HTML tĩnh vào out/ — không cần server, deploy thẳng lên GitHub Pages.
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,

  // Đẩy cùng giá trị vào bundle để asset() trong lib/site.ts không lệch với
  // basePath ở trên — nếu không, ảnh và favicon sẽ trỏ sai.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

  // GitHub Pages không chạy được image optimizer của Next.
  images: { unoptimized: true },

  // Sinh out/index.html thay vì out.html — hợp với host tĩnh.
  trailingSlash: true,
}

export default nextConfig
