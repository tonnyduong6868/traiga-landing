import { asset, contact, proof } from "@/lib/site";
import { SectionHead } from "./SectionHead";

/**
 * Khối tin cậy, đặt ngay sau khối Giá.
 *
 * Đúng lúc người đọc vừa thấy con số 2.500.000₫ là lúc họ hỏi "mua của ai".
 * Trang cũ không có một mẩu bằng chứng nào để trả lời câu đó.
 *
 * Ba phần đầu (số liệu, nhận xét, ảnh app) đọc từ `proof` trong lib/site.ts và
 * TỰ ẨN khi mảng rỗng — hiện đang rỗng vì chưa có dữ liệu thật, và bịa ra thì
 * còn hại hơn không có. Phần `assurances` luôn hiện: nó không cần dữ liệu khách
 * hàng, chỉ cần nói thật về cách bán và về giới hạn của sản phẩm.
 */
export function Proof() {
  const hasStats = proof.stats.length > 0;
  const hasQuotes = proof.quotes.length > 0;
  const hasShots = proof.shots.length > 0;

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
            {proof.shots.map((s) => (
              <figure key={s.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(s.src)} alt={s.alt} loading="lazy" />
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
          {proof.assurances.map((a) => (
            <div className="pf-card" key={a.title}>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
            </div>
          ))}
        </div>

        <p className="pf-line">
          Tôi bán trực tiếp, không qua đại lý. Có gì hỏi thẳng{" "}
          <a href={contact.zalo} target="_blank" rel="noopener">
            Zalo
          </a>{" "}
          hoặc{" "}
          <a href={contact.messenger} target="_blank" rel="noopener">
            Messenger
          </a>
          , kể cả khi anh chưa định mua.
        </p>
      </div>
    </section>
  );
}
