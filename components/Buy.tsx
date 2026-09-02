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
            <p className="bc-h">{pricing.planName}</p>
            <p className="p-num">
              <span>{pricing.amount}</span>
              <em>{pricing.currency}</em>
            </p>
            <p className="p-sub">{pricing.note}</p>

            <div className="cta-row">
              <a className="btn" href={contact.zalo} target="_blank" rel="noopener">
                Nhắn Zalo để mua
              </a>
              <a
                className="btn btn-ghost"
                href={contact.messenger}
                target="_blank"
                rel="noopener"
              >
                Nhắn Messenger
              </a>
            </div>

            <p className="fineprint">
              Chưa định mua cũng cứ nhắn — xem app chạy không mất gì.
            </p>
          </div>

          <div className="buy-card">
            <p className="bc-h">Bản cài Windows</p>
            <a className="btn btn-dl" href={release.downloadUrl}>
              Tải Trại Gà v{release.version}
            </a>

            <dl className="manifest">
              <div>
                <dt>Phiên bản</dt>
                <dd>{release.version}</dd>
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

        <ol className="steps">
          {steps.map((s, i) => (
            <li className="step" key={s.title}>
              <span className="no" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="incl">
          <div>
            <p className="p-h">Gồm những gì</p>
            <ul className="yes">
              {pricing.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="p-h">Không gồm</p>
            <ul className="no">
              {pricing.excludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
