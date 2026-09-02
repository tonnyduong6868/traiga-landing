import { asset, nav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="bar">
      <div className="wrap bar-in">
        <a className="brand" href="#">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/assets/logo-96.png")} alt="" width={28} height={28} />
          <span>{site.name}</span>
          <em className="tag">HUB</em>
        </a>
        <nav className="bar-nav" aria-label="Điều hướng trang">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-sm" href="#gia">
          Mua bản quyền
        </a>
      </div>
    </header>
  );
}
