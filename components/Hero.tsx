import { pricing, release } from "@/lib/site";
import { Incubator } from "./Incubator";

export function Hero() {
  return (
    <section className="hero">
      {/* Lưới kỹ thuật và ánh sáng ambient glow sang trọng */}
      <div className="grid-bg" aria-hidden="true" />
      <div className="hero-glow hero-glow-1" aria-hidden="true" />
      <div className="hero-glow hero-glow-2" aria-hidden="true" />

      <div className="wrap hero-in">
        {/* Chip trạng thái công nghệ cao */}
        <div className="hero-chip-wrap">
          <p className="hero-chip">
            <span className="live-dot" aria-hidden="true">
              <span className="live-dot-ping" />
              <span className="live-dot-core" />
            </span>
            <span className="chip-strong">Windows App</span>
            <span className="sep" aria-hidden="true">/</span>
            <span>Discord Multi-Account Suite</span>
            <span className="sep" aria-hidden="true">/</span>
            <span className="chip-ver">v{release.version}</span>
          </p>
        </div>

        <h1 className="hero-title">
          Cả trại gà,
          <br />
          gọn trong <span className="lit">một màn hình.</span>
        </h1>

        <p className="lead">
          Hàng trăm account Discord chạy song song: seed hội thoại, trực hộp thư, nuôi
          acc mới, mỗi con một proxy và một vân tay riêng. Anh mở một cửa sổ, cả đàn tự
          làm việc.
        </p>

        <div className="hero-price-card">
          <div className="hp-inner">
            <div className="hp-left">
              <span className="hp-badge">BẢN QUYỀN VĨNH VIỄN</span>
              <div className="hp-num-wrap">
                <span className="hp-num">{pricing.amount}</span>
                <span className="hp-curr">{pricing.currency}</span>
              </div>
            </div>
            <div className="hp-divider" aria-hidden="true" />
            <div className="hp-right">
              <p className="hp-desc">
                <strong>Trả một lần, sở hữu trọn đời</strong>
                <span>Không phí duy trì · Không giới hạn số lượng account</span>
              </p>
            </div>
          </div>
        </div>

        <div className="cta-row">
          <a className="btn btn-primary btn-lg btn-glow" href="#mua">
            <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 12V6.75l7-1v6.25H3zm0 5.25V13.5h7v6.25l-7-2.5zm8.5 2.85V13.5H21v7.65l-9.5-1.05zM21 12h-9.5V4.65l9.5 1.35V12z" />
            </svg>
            Tải bản cài Windows
          </a>
          <a className="btn btn-ghost btn-lg" href="#giaodien">
            <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            Xem 16 màn hình app
          </a>
        </div>

        <p className="fineprint">
          <span className="check-mark" aria-hidden="true">✓</span> Tải miễn phí, cài xong xem trọn bộ giao diện
          <span className="sep-dot">·</span>
          <span className="check-mark" aria-hidden="true">✓</span> Chỉ cần key khi chạy việc
          <span className="sep-dot">·</span>
          <span>{release.requires}</span>
        </p>

        <Incubator />
      </div>
    </section>
  );
}
