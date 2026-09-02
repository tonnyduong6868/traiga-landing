import { release } from "@/lib/site";

const STEPS = [
  {
    title: "Tải và cài",
    body: "Chạy file .exe, cài một lần, tự tạo lối tắt ngoài desktop.",
  },
  {
    title: "Mở app, chép mã máy",
    body: "Màn hình đầu tiên hiện mã máy của anh kèm nút Chép.",
  },
  {
    title: "Gửi mã, thanh toán",
    body: "Nhắn Zalo kèm mã máy. Chuyển khoản xong tôi gửi key trong ngày.",
  },
  {
    title: "Dán key, chạy",
    body: "Dán vào ô kích hoạt. Từ lần sau app mở thẳng, không hỏi lại.",
  },
];

export function Download() {
  return (
    <section id="tai" className="sec sec-alt">
      <div className="wrap">
        <p className="eyebrow">Tải về</p>
        <h2>Tải trước, trả tiền sau.</h2>
        <p className="sec-lead">
          Bản cài đầy đủ, không cắt tính năng nào. Mở app lần đầu sẽ thấy mã máy — gửi
          mã đó cho tôi để lấy key. Chưa có key thì app mở được nhưng chưa chạy việc gì.
        </p>

        <div className="get">
          <div className="get-main">
            <a className="btn btn-dl" href={release.downloadUrl}>
              Tải Trại Gà cho Windows
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

          <ol className="get-steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="no">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
