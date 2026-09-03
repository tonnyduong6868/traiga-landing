import { asset, nav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="bar">
      <div className="wrap bar-in">
        <a className="brand" href="#">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="brand-logo-wrap">
            <img src={asset("/assets/logo-96.png")} alt="" width={32} height={32} />
            <span className="brand-pulse" aria-hidden="true" />
          </div>
          <div className="brand-text">
            <span>{site.name}</span>
            <em className="tag">HUB</em>
          </div>
        </a>
        <nav className="bar-nav" aria-label="Điều hướng trang">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="bar-actions">
          <a className="btn btn-sm btn-glow" href="#mua">
            Mua bản quyền
          </a>
        </div>
      </div>
    </header>
  );
}
