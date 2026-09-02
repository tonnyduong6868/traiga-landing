import { contact } from "@/lib/site";

export function EndCta() {
  return (
    <section className="end">
      <div className="lamp lamp-sm" aria-hidden="true" />
      <div className="wrap">
        <h2>
          Đàn gà không tự nuôi nó.
          <br />
          <span className="lit">Nhưng cũng không cần anh ngồi canh.</span>
        </h2>
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
      </div>
    </section>
  );
}
