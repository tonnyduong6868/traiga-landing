import { buySteps, contact, pricing } from "@/lib/site";

export function Pricing() {
  return (
    <section id="gia" className="sec">
      <div className="wrap">
        <p className="eyebrow">Giá</p>
        <h2>Một lần. Dùng mãi.</h2>

        <div className="price">
          <div className="price-main">
            <p className="p-name">{pricing.planName}</p>
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
            {/* Cả hai nút đều đổ vào chat. Trước đây khách bấm mà không biết
                sẽ phải làm gì tiếp — ba bước dưới đây trả lời đúng câu đó. */}
            <ol className="buy-steps">
              {buySteps.map((s, i) => (
                <li key={s.title}>
                  <span className="bs-no" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <b>{s.title}</b>
                    <span>{s.body}</span>
                  </div>
                </li>
              ))}
            </ol>

            <p className="fineprint">
              Chưa định mua cũng cứ nhắn — xem app chạy không mất gì.
            </p>
          </div>

          <div className="price-side">
            <p className="p-h">Gồm những gì</p>
            <ul className="yes">
              {pricing.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
