import { SectionHead } from "./SectionHead";

type Feature = {
  title: string;
  body: React.ReactNode;
  big?: true;
  chips?: string[];
};

const FEATURES: Feature[] = [
  {
    big: true,
    title: "Seeding hội thoại nhiều nhân vật",
    body: (
      <>
        Soạn kịch bản dạng <em>ai nói gì</em>, chọn account cho từng vai, bấm chạy. App
        gõ theo nhịp người thật, có nghỉ giữa câu, có lúc gõ rồi xoá. Bí ý tưởng thì để
        AI viết nguyên kịch bản theo chủ đề anh nhập.
      </>
    ),
    chips: ["Nhịp gõ thật", "AI viết kịch bản", "Chống trùng nội dung", "Chạy song song"],
  },
  {
    title: "Hộp thư gộp",
    body: (
      <>
        Đọc và trả DM của <strong>mọi account</strong> trong một khung, tin về real-time.
        Bật auto-reply theo mẫu hoặc để AI trả lời thay.
      </>
    ),
  },
  {
    title: "Warm-up account",
    body: "Acc mới không seed ngay. App cho nó đọc kênh, thả tim, đổi trạng thái, join có chừng mực qua nhiều vòng — và chặn acc quá non chưa được ra trận.",
  },
  {
    title: "Làm giàu hồ sơ hàng loạt",
    body: "Đổi avatar, bio, tên hiển thị cho cả đàn từ một thư mục ảnh và một mẫu chữ. Có hạn mức riêng để không đổi dồn dập.",
  },
  {
    title: "Proxy riêng từng con",
    body: "Gán proxy HTTP/SOCKS5 cho từng profile, đo tốc độ, theo dõi rớt mạng và báo khi vùng IP lệch so với lần trước.",
  },
  {
    title: "Lên lịch",
    body: "Đặt khung giờ chạy hàng ngày hoặc theo chu kỳ. Mỗi lần chạy tự lệch đi vài phút để nhịp không đều tăm tắp như máy.",
  },
  {
    title: "Phân tích & nhật ký",
    body: "Ai làm gì, lúc nào, bằng proxy nào. Xem acc chết dồn theo proxy nào, ngày nào tụt, con nào sắp chạm hạn mức hôm nay.",
  },
  {
    title: "Cảnh báo về Discord",
    body: "Acc bị khoá, token chết, seed xong, warm-up xong — đẩy thẳng vào webhook kênh riêng của anh. Không phải ngồi canh màn hình.",
  },
  {
    title: "Lấy token & đăng nhập lại",
    body: "Lấy token từ tài khoản anh có, tự đăng nhập lại khi phiên rớt, sao lưu và phục hồi toàn bộ cấu hình sang máy khác.",
  },
];

export function Features() {
  return (
    <section id="tinhnang" className="sec">
      <div className="wrap">
        <SectionHead no="03" tag="Tính năng" meta={`${FEATURES.length} mục`} />
        <h2>Chín việc anh đang làm tay.</h2>
        <p className="sec-lead">
          Không có mục nào khoá theo gói. Mua là mở hết.
        </p>

        <div className="bento" style={{ marginTop: "var(--s-6)" }}>
          {FEATURES.map((f) => (
            <article key={f.title} className={f.big ? "cell big" : "cell"}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
              {f.chips && (
                <ul className="chips">
                  {f.chips.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
