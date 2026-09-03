import { SectionHead } from "./SectionHead";

const STEPS = [
  {
    title: "Nhập acc, lấy token",
    body: "Thêm từng con hoặc import cả file. App lấy token và lưu lại phiên.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
  {
    title: "Gắn proxy và vân tay",
    body: "Mỗi con một IP, một bộ vân tay cố định. Test proxy trước khi cho chạy.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: "Làm giàu hồ sơ",
    body: "Avatar, bio, tên hiển thị — hàng loạt, từ thư mục ảnh và mẫu chữ của anh.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Nuôi 3–7 ngày",
    body: "Warm-up nhiều vòng: đọc, thả tim, đổi trạng thái. Acc quá non bị giữ lại.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: "Vào ca seeding",
    body: "Chạy kịch bản theo lịch, nhịp gõ tự nhiên, nội dung không trùng nhau.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Trực hộp thư",
    body: "DM về là thấy. Trả tay hoặc bật auto-reply / AI trả theo tính cách anh đặt.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    title: "Theo dõi sức khoẻ",
    body: "Token chết, acc khoá, IP lệch vùng — báo về webhook. Tự đăng nhập lại khi rớt phiên.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

export function Lifecycle() {
  return (
    <section className="sec sec-alt">
      <div className="wrap wrap-narrow">
        <SectionHead no="04" tag="Vòng đời" meta={`${STEPS.length} bước`} />
        <h2>Vòng đời một con gà.</h2>
        <p className="sec-lead">
          Bảy bước, chạy trong app từ đầu tới cuối. Thứ tự này có lý do — bỏ bước nào
          cũng trả giá ở bước sau.
        </p>

        <ol className="life" style={{ marginTop: "var(--s-6)" }}>
          {STEPS.map((s, i) => (
            <li className="life-step" key={s.title}>
              <div className="life-left">
                <span className="no" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="life-connector" aria-hidden="true" />
              </div>
              <div className="life-card">
                <div className="life-head">
                  <span className="life-icon" aria-hidden="true">{s.icon}</span>
                  <h3>{s.title}</h3>
                </div>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
