const PAINS = [
  "Sáng nào cũng ngồi đăng nhập tay lại 40 con.",
  "Kịch bản seed copy-paste giống nhau từng chữ — hôm sau bay cả cụm.",
  "Không biết con nào còn sống, tới lúc khách hỏi mới biết.",
];

export function Pain() {
  return (
    <section className="pain">
      <div className="wrap">
        <ul className="pain-list">
          {PAINS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p className="pain-out">
          Trại Gà nhận phần lặp đi lặp lại. <b>Anh giữ phần phải nghĩ.</b>
        </p>
      </div>
    </section>
  );
}
