import { release } from "@/lib/site";
import { Incubator } from "./Incubator";

export function Hero() {
  return (
    <section className="hero">
      <div className="lamp" aria-hidden="true" />
      <div className="wrap hero-in">
        <p className="eyebrow">
          Trại Gà v{release.version} · Windows 10/11 64-bit
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

        <p className="fineprint">
          Tải miễn phí · Cần key để chạy · Trả một lần, dùng mãi
        </p>

        <Incubator />
      </div>
    </section>
  );
}
