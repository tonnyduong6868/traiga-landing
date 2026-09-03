import { contact, proof } from "@/lib/site";
import { getShots } from "@/lib/shots";
import { SectionHead } from "./SectionHead";

/**
 * Khối tin cậy, đặt ngay sau khối Giá.
 *
 * Đúng lúc người đọc vừa thấy con số 2.500.000₫ là lúc họ hỏi "mua của ai".
 * Trang cũ không có một mẩu bằng chứng nào để trả lời câu đó.
 *
 * Ba phần đầu (số liệu, nhận xét, ảnh app) TỰ ẨN khi chưa có dữ liệu — bịa ra
 * thì còn hại hơn không có. Số liệu và nhận xét lấy từ `proof` trong site.ts;
 * ảnh thì quét thẳng thư mục public/assets/shots/ lúc build, bỏ file vào là hiện.
 * Phần `assurances` luôn hiện: nó không cần dữ liệu khách hàng, chỉ cần nói thật
 * về cách bán và về giới hạn của sản phẩm.
 */
export function Proof() {
  const shots = getShots();
  const hasStats = proof.stats.length > 0;
  const hasQuotes = proof.quotes.length > 0;
  const hasShots = shots.length > 0;

  return (
    <section id="tincay" className="sec sec-alt">
      <div className="wrap">
        <SectionHead no="06" tag="Mua của ai" meta="bán trực tiếp" />

        {hasStats && (
          <ul className="pf-stats">
            {proof.stats.map((s) => (
              <li key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        )}

        {hasShots && (
          <div className="pf-shots">
            {shots.map((s) => (
              <figure key={s.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt={s.alt}
                  width={s.width ?? undefined}
                  height={s.height ?? undefined}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}

        {hasQuotes && (
          <div className="pf-quotes">
            {proof.quotes.map((q) => (
              <figure key={q.text}>
                <blockquote>{q.text}</blockquote>
                <figcaption>{q.who}</figcaption>
              </figure>
            ))}
          </div>
        )}

        <h2 className="pf-h">Chưa quen thì đây là những gì anh nắm chắc được.</h2>

        <div className="pf-grid">
          {proof.assurances.map((a, i) => {
            const icons = [
              <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
              <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
              <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 14 10" /></svg>,
              <svg key="4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
            ];
            return (
              <div className="pf-card" key={a.title}>
                <div className="pf-icon">{icons[i % icons.length]}</div>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            );
          })}
        </div>

        <p className="pf-line">
          Tôi bán trực tiếp, không qua đại lý. Có gì hỏi thẳng{" "}
          <a className="pf-link" href={contact.zalo} target="_blank" rel="noopener">
            Zalo
          </a>{" "}
          hoặc{" "}
          <a className="pf-link" href={contact.messenger} target="_blank" rel="noopener">
            Messenger
          </a>
          , kể cả khi anh chưa định mua.
        </p>
      </div>
    </section>
  );
}
