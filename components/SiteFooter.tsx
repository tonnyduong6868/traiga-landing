import { asset, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <div className="foot-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/assets/logo-96.png")} alt="" width={24} height={24} />
          <span>{site.name}</span>
        </div>
        <p className="foot-note">
          Công cụ dành cho tài khoản anh sở hữu hoặc được uỷ quyền quản lý. Người dùng
          chịu trách nhiệm tuân thủ điều khoản của nền tảng.
        </p>
        <p className="foot-cp">© 2026 {site.name}</p>
      </div>
    </footer>
  );
}
