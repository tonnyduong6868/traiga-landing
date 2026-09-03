const PAINS = [
  {
    tag: "Tốn thời gian",
    title: "Đăng nhập thủ công",
    desc: "Sáng nào cũng ngồi đăng nhập tay lại 40 con. Mất hàng tiếng đồng hồ vô ích chỉ để mở phiên và giữ kết nối.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    tag: "Rủi ro ban cao",
    title: "Kịch bản dập khuôn",
    desc: "Kịch bản seed copy-paste giống nhau từng chữ, nhịp gửi cơ học — máy chủ Discord quét là bay màu cả cụm tài khoản.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    tag: "Mù thông tin",
    title: "Mất kiểm soát đàn acc",
    desc: "Không biết con nào còn sống, con nào chết token hay lệch IP. Tới lúc khách hỏi hoặc đối tác check mới tá hỏa.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
  },
];

export function Pain() {
  return (
    <section className="pain">
      <div className="wrap">
        <div className="pain-grid">
          {PAINS.map((p) => (
            <div className="pain-card" key={p.title}>
              <div className="pain-head">
                <span className="pain-icon">{p.icon}</span>
                <span className="pain-tag">{p.tag}</span>
              </div>
              <h3 className="pain-title">{p.title}</h3>
              <p className="pain-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="pain-banner">
          <div className="pain-banner-glow" aria-hidden="true" />
          <div className="pain-banner-content">
            <span className="pain-sub">GIẢI PHÁP TỰ ĐỘNG HÓA</span>
            <p className="pain-out">
              Trại Gà nhận phần lặp đi lặp lại. <span className="lit-bold">Anh giữ phần phải nghĩ.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
