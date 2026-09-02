import { pricing, release } from "@/lib/site";
import { Incubator } from "./Incubator";

export function Hero() {
  return (
    <section className="hero">
      <div className="lamp" aria-hidden="true" />
      <div className="wrap hero-in">
        {/* Eyebrow gánh phần rõ nghĩa để H1 được giữ nguyên chất ẩn dụ.
            Người lạ đọc ba dòng đầu là biết đang xem cái gì, chạy trên đâu. */}
        <p className="eyebrow">
          Quản lý account Discord hàng loạt · Windows 10/11 64-bit
        </p>

        <h1>
          Cả trại gà,
          <br />
          gọn trong
          <br />
          <span className="lit">một màn hình.</span>
        </h1>

        <p className="lead">
          Hàng trăm account Discord chạy song song: seed hội thoại, trực hộp thư, nuôi
          acc mới, mỗi con một proxy và một vân tay riêng. Anh mở một cửa sổ, cả đàn tự
          làm việc.
        </p>

        <div className="cta-row">
          <a className="btn" href="#tai">
            Tải bản cài Windows
          </a>
          <a className="btn btn-ghost" href="#gia">
            Xem giá bản quyền
          </a>
        </div>

        {/* Neo giá ngay hero. Trước đây con số nằm mãi section thứ 7 — trên
            điện thoại là rất nhiều cú vuốt trước khi biết món này bao nhiêu. */}
        <p className="hero-price">
          <span className="hp-num">
            {pricing.amount}
            <em>{pricing.currency}</em>
          </span>
          <span className="hp-note">
            trả một lần, dùng mãi · không phí duy trì · không giới hạn số account
          </span>
        </p>

        <p className="fineprint">
          Tải miễn phí, cài xong xem được toàn bộ giao diện · Cần key để chạy việc ·
          Bản v{release.version}
        </p>

        <Incubator />
      </div>
    </section>
  );
}
