import type { Metadata, Viewport } from "next";
import { fontClassNames } from "./fonts";
import { asset, site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: site.url },
  // icons đi thẳng ra thẻ <link> nên phải tự thêm basePath.
  icons: {
    icon: [{ url: asset("/assets/favicon.ico"), sizes: "any" }],
    apple: asset("/assets/logo-256.png"),
  },
  openGraph: {
    type: "website",
    title: `${site.name} — ${site.tagline}`,
    description:
      "Seeding hội thoại, hộp thư gộp, warm-up, proxy riêng từng acc, chống ban, lên lịch. " +
      "Bản quyền vĩnh viễn, cập nhật tự động.",
    // Không dùng asset() ở đây: metadataBase đã chứa basePath, thêm nữa là lặp.
    images: ["/assets/logo-512.png"],
    locale: site.locale,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#17120C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={fontClassNames}>
      <body>{children}</body>
    </html>
  );
}
