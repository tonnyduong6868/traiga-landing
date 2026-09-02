import type { NextConfig } from 'next'

/**
 * GitHub Pages phục vụ site ở /<tên-repo>/ nên cần basePath.
 * Khi gắn tên miền riêng, hoặc khi chạy `next dev`, để trống:
 *   $env:NEXT_PUBLIC_BASE_PATH=""; npm run build
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const nextConfig: NextConfig = {
  // Xuất HTML tĩnh vào out/ — không cần server, deploy thẳng lên GitHub Pages.
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,

  // GitHub Pages không chạy được image optimizer của Next.
  images: { unoptimized: true },

  // Sinh out/index.html thay vì out.html — hợp với host tĩnh.
  trailingSlash: true,
}

export default nextConfig
