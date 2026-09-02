const STEPS = [
  {
    title: "Nhập acc, lấy token",
    body: "Thêm từng con hoặc import cả file. App lấy token và lưu lại phiên.",
  },
  {
    title: "Gắn proxy và vân tay",
    body: "Mỗi con một IP, một bộ vân tay cố định. Test proxy trước khi cho chạy.",
  },
  {
    title: "Làm giàu hồ sơ",
    body: "Avatar, bio, tên hiển thị — hàng loạt, từ thư mục ảnh và mẫu chữ của anh.",
  },
  {
    title: "Nuôi 3–7 ngày",
    body: "Warm-up nhiều vòng: đọc, thả tim, đổi trạng thái. Acc quá non bị giữ lại.",
  },
  {
    title: "Vào ca seeding",
    body: "Chạy kịch bản theo lịch, nhịp gõ tự nhiên, nội dung không trùng nhau.",
  },
  {
    title: "Trực hộp thư",
    body: "DM về là thấy. Trả tay hoặc bật auto-reply / AI trả theo tính cách anh đặt.",
  },
  {
    title: "Theo dõi sức khoẻ",
    body: "Token chết, acc khoá, IP lệch vùng — báo về webhook. Tự đăng nhập lại khi rớt phiên.",
  },
];

export function Lifecycle() {
  return (
    <section className="sec">
      <div className="wrap">
        <p className="eyebrow">Quy trình</p>
        <h2>Vòng đời một con gà.</h2>
        <p className="sec-lead">
          Bảy bước, chạy trong app từ đầu tới cuối. Thứ tự này có lý do — bỏ bước nào
          cũng trả giá ở bước sau.
        </p>

        <ol className="life">
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
    </section>
  );
}
