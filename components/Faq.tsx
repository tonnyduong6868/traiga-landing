import { SectionHead } from "./SectionHead";

const QA: { q: string; a: React.ReactNode }[] = [
  {
    q: "Chạy được trên máy nào?",
    a: "Windows 10 hoặc 11, bản 64-bit. Chưa có bản macOS và Linux.",
  },
  {
    q: "Chạy được bao nhiêu account cùng lúc?",
    a: "Không giới hạn về phần mềm. Giới hạn thật nằm ở RAM, đường truyền và số proxy anh có. Máy 16GB RAM chạy vài chục phiên song song thoải mái; muốn hơn thì thêm RAM hoặc dựng trên VPS.",
  },
  {
    q: "Dùng có bị ban không?",
    a: "Có thể, và không ai nói khác được. App giảm rủi ro bằng vân tay riêng, proxy riêng, hạn mức hành động và nhịp gõ tự nhiên — nhưng nếu spam quá tay thì vẫn bay. Nên nuôi acc đủ ngày trước khi cho chạy.",
  },
  {
    q: "Phải mua proxy loại nào?",
    a: "HTTP hoặc SOCKS5 đều được, có xác thực user/pass cũng được. Proxy dân cư ổn định hơn datacenter. Trong app có sẵn phần test tốc độ và giám sát rớt để anh loại proxy rác.",
  },
  {
    q: "Tính năng AI có bắt buộc không?",
    a: "Không. AI chỉ dùng cho hai việc: viết kịch bản seeding và tự trả lời DM. Tắt đi thì app vẫn chạy đủ. Nếu bật, anh cắm API key riêng — hỗ trợ Claude, GPT, Gemini hoặc bất kỳ dịch vụ nào tương thích OpenAI.",
  },
  {
    q: "Cập nhật thế nào?",
    a: "App tự kiểm tra bản mới sau khi mở. Có bản mới thì hiện hộp hỏi tải, tải xong bấm cài, không phải gỡ ra cài lại.",
  },
  {
    q: "Tải free rồi có dùng luôn được không?",
    a: "Không. Bản tải về cài được và mở được, nhưng dừng ở màn hình kích hoạt: chưa nhập key thì không thêm account, không seeding, không chạy hẹn giờ. Key gắn theo mã máy nên chuyền cho người khác cũng không dùng được.",
  },
  {
    q: "Mã máy là gì, có lộ thông tin gì không?",
    a: (
      <>
        Là một chuỗi 16 ký tự app tính từ định danh Windows của máy, kiểu{" "}
        <code>A1B2-C3D4-E5F6-7890</code>. Nó chỉ dùng để buộc key vào đúng máy đó —
        không kèm tên, ổ đĩa hay dữ liệu nào khác.
      </>
    ),
  },
  {
    q: "Đổi máy thì sao?",
    a: "Trong app có Sao lưu và Phục hồi: xuất toàn bộ profile, proxy và cấu hình ra một file, mang sang máy mới nạp vào. Máy mới có mã máy mới — nhắn Zalo gửi mã đó, tôi đổi key miễn phí.",
  },
  {
    q: "Có xem thử trước khi mua được không?",
    a: "Được. Nhắn Zalo, tôi mở màn hình chia sẻ cho xem app chạy thật, hỏi gì trả lời nấy.",
  },
];

export function Faq() {
  return (
    <section id="hoidap" className="sec">
      <div className="wrap wrap-narrow">
        <SectionHead no="07" tag="Hỏi đáp" meta={`${QA.length} câu`} />
        <h2>Câu hay được hỏi nhất.</h2>

        <div className="faq" style={{ marginTop: "var(--s-6)" }}>
          {QA.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
