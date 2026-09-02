import { pricing, release } from "@/lib/site";
import { Incubator } from "./Incubator";

export function Hero() {
  return (
    <section className="hero">
      {/* Lưới kỹ thuật mờ phía sau, thay cho chùm sáng đèn úm của bản trước. */}
      <div className="grid-bg" aria-hidden="true" />

      <div className="wrap hero-in">
        {/* Chip trạng thái: người lạ đọc một dòng là biết đang xem phần mềm gì,
            chạy trên hệ điều hành nào, bản mấy. */}
        <p className="hero-chip">
          <i className="pulse" aria-hidden="true" />
          <b>Phần mềm Windows</b>
          <span className="sep" aria-hidden="true">
            /
          </span>
          quản lý account Discord hàng loạt
          <span className="sep" aria-hidden="true">
            /
          </span>
          v{release.version}
        </p>

        <h1>
          Cả trại gà,
          <br />
          gọn trong <span className="lit">một màn hình.</span>
        </h1>

        <p className="lead">
          Hàng trăm account Discord chạy song song: seed hội thoại, trực hộp thư, nuôi
          acc mới, mỗi con một proxy và một vân tay riêng. Anh mở một cửa sổ, cả đàn tự
          làm việc.
        </p>

        <p className="hero-price">
          <span className="hp-num">
            {pricing.amount}
            <em>{pricing.currency}</em>
          </span>
          <span className="hp-note">
            trả một lần, dùng mãi
            <br />
            không phí duy trì · không giới hạn số account
          </span>
        </p>

        <div className="cta-row">
          <a className="btn" href="#mua">
            Tải bản cài Windows
          </a>
          <a className="btn btn-ghost" href="#giaodien">
            Xem app chạy thế nào
          </a>
        </div>

        <p className="fineprint">
          Tải miễn phí, cài xong xem được toàn bộ giao diện · Cần key để chạy việc ·{" "}
          {release.requires}
        </p>

        <Incubator />
      </div>
    </section>
  );
}
