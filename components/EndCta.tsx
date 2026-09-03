import { contact, pricing, release } from "@/lib/site";

export function EndCta() {
  return (
    <section className="end">
      <div className="grid-bg" aria-hidden="true" />
      <div className="end-glow" aria-hidden="true" />
      <div className="wrap end-in">
        <div className="end-badge-wrap">
          <span className="end-badge">
            <span className="end-dot" aria-hidden="true" />
            {pricing.amount}{pricing.currency} · TRẢ MỘT LẦN · DÙNG TRỌN ĐỜI
          </span>
        </div>

        <h2>
          Đàn gà không tự nuôi nó.
          <br />
          <span className="lit">Nhưng cũng không cần anh ngồi canh.</span>
        </h2>

        <div className="cta-row">
          <a className="btn btn-primary btn-lg btn-glow" href={contact.zalo} target="_blank" rel="noopener">
            <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.43 3.86 7.08l-.86 3.19c-.1.38.27.71.63.58l3.77-1.37c.83.24 1.7.37 2.6.37 5.52 0 10-4.03 10-9s-4.48-9-10-9zm1.09 13.09h-2.18V8.91h2.18v6.18z" />
            </svg>
            Nhắn Zalo để mua ngay
          </a>
          <a
            className="btn btn-ghost btn-lg"
            href={contact.messenger}
            target="_blank"
            rel="noopener"
          >
            <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.43 3.14 7.15V22l3.01-1.65c1.19.33 2.48.51 3.85.51 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm1.08 13.08-2.73-2.91-5.32 2.91 5.86-6.22 2.8 2.91 5.25-2.91-5.86 6.22z" />
            </svg>
            Nhắn Messenger
          </a>
        </div>

        <p className="fineprint">
          Hoặc tải bản cài trước, xem toàn bộ giao diện rồi tính · v{release.version} · {release.requires}
        </p>
      </div>
    </section>
  );
}
