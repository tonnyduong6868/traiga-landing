import { contact, pricing, release, steps } from "@/lib/site";
import { SectionHead } from "./SectionHead";

/**
 * Giá và tải về, gộp làm một khối.
 *
 * Bản trước tách đôi: khối "Giá" rồi ngay sau là khối "Tải về", mỗi khối một
 * bộ CTA và một danh sách bước gần trùng nhau. Người đọc phải ghép hai nửa
 * lại mới hiểu trình tự thật. Ở đây tiền và file nằm cạnh nhau, bên dưới là
 * một mạch bốn bước duy nhất, rồi mới tới phần gồm/không gồm.
 */
export function Buy() {
  return (
    <section id="mua" className="sec">
      <div className="wrap">
        <SectionHead no="05" tag="Giá và cách mua" meta="4 bước" />
        <h2>Một lần. Dùng mãi.</h2>
        <p className="sec-lead">
          Tải về không mất gì và không cần nhắn ai. Cài xong app mở được, xem được
          toàn bộ giao diện — chỉ khi chạy việc mới cần key.
        </p>

        <div className="buy">
          <div className="buy-card lead-card">
            <div className="lead-card-glow" aria-hidden="true" />
            <div className="bc-badge-wrap">
              <span className="bc-badge">{pricing.planName}</span>
              <span className="bc-subbadge">TRỌN ĐỜI</span>
            </div>
            
            <div className="p-num-wrap">
              <span className="p-num">{pricing.amount}</span>
              <span className="p-curr">{pricing.currency}</span>
            </div>
            <p className="p-sub">{pricing.note}</p>

            <div className="cta-row">
              <a className="btn btn-primary btn-glow" href={contact.zalo} target="_blank" rel="noopener">
                <svg className="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.43 3.86 7.08l-.86 3.19c-.1.38.27.71.63.58l3.77-1.37c.83.24 1.7.37 2.6.37 5.52 0 10-4.03 10-9s-4.48-9-10-9zm1.09 13.09h-2.18V8.91h2.18v6.18z" />
                </svg>
                Nhắn Zalo để mua
              </a>
              <a
                className="btn btn-ghost"
                href={contact.messenger}
                target="_blank"
                rel="noopener"
              >
                <svg className="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.43 3.14 7.15V22l3.01-1.65c1.19.33 2.48.51 3.85.51 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm1.08 13.08-2.73-2.91-5.32 2.91 5.86-6.22 2.8 2.91 5.25-2.91-5.86 6.22z" />
                </svg>
                Nhắn Messenger
              </a>
            </div>

            <p className="fineprint">
              Chưa định mua cũng cứ nhắn — xem app chạy thật qua màn hình không mất gì.
            </p>
          </div>

          <div className="buy-card dl-card">
            <div className="bc-badge-wrap">
              <span className="bc-badge">BẢN CÀI WINDOWS</span>
              <span className="bc-subbadge-blue">64-BIT</span>
            </div>

            <a className="btn btn-dl btn-glow" href={release.downloadUrl}>
              <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 12V6.75l7-1v6.25H3zm0 5.25V13.5h7v6.25l-7-2.5zm8.5 2.85V13.5H21v7.65l-9.5-1.05zM21 12h-9.5V4.65l9.5 1.35V12z" />
              </svg>
              <span>Tải Trại Gà v{release.version}</span>
            </a>

            <dl className="manifest">
              <div>
                <dt>Phiên bản</dt>
                <dd>v{release.version}</dd>
              </div>
              <div>
                <dt>Dung lượng</dt>
                <dd>{release.size}</dd>
              </div>
              <div>
                <dt>Yêu cầu</dt>
                <dd>{release.requires}</dd>
              </div>
              <div>
                <dt>Phát hành</dt>
                <dd>{release.date}</dd>
              </div>
            </dl>

            <div className="smartscreen-tip">
              <svg className="tip-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="fineprint">
                Tải thẳng từ GitHub —{" "}
                <a href={release.allReleasesUrl} target="_blank" rel="noopener">
                  xem mọi phiên bản
                </a>
                . Bản cài chưa mua chứng chỉ ký số nên Windows có thể hiện cảnh báo
                SmartScreen: bấm <strong>More info</strong> rồi <strong>Run anyway</strong>.
              </p>
            </div>
          </div>
        </div>

        <ol className="steps">
          {steps.map((s, i) => (
            <li className="step" key={s.title}>
              <span className="no" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="step-content">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="incl">
          <div className="incl-col">
            <p className="p-h">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--go)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Gồm những gì
            </p>
            <ul className="yes">
              {pricing.includes.map((item) => (
                <li key={item}>
                  <svg className="inc-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="incl-col">
            <p className="p-h">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Không gồm
            </p>
            <ul className="no">
              {pricing.excludes.map((item) => (
                <li key={item}>
                  <svg className="exc-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
