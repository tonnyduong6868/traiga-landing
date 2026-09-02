import { asset, contact, proof } from "@/lib/site";

/**
 * Khối tin cậy, đặt ngay sau Hero.
 *
 * Trang cũ không có một mẩu bằng chứng nào — người lạ được mời chi 2.5 triệu
 * cho một người họ chưa biết là ai. Khối này lấp chỗ đó.
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
    <section id="tincay" className="sec sec-tight">
      <div className="wrap">
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

        <p className="eyebrow">Mua của ai</p>
        <h2 className="h-mid pf-h">
          Chưa quen thì đây là những gì anh nắm chắc được.
        </h2>

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
