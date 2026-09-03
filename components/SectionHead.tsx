/**
 * Đầu khối đánh số.
 *
 * Trang cũ dài 11 khối và không có mốc nào — cuộn tới giữa là mất phương
 * hướng, không biết còn bao nhiêu nữa. Đánh số từng khối, kèm một dòng phụ
 * chú đếm nội dung bên trong, cho người đọc biết mình đang ở đâu.
 *
 * Đây cũng là chữ ký thị giác của bản thiết kế này: mỗi khối trông như một
 * mục trong bảng điều khiển, không phải một section marketing.
 */
export function SectionHead({
  no,
  tag,
  meta,
}: {
  no: string;
  tag: string;
  meta?: string;
}) {
  return (
    <header className="sh">
      <div className="sh-pill">
        <span className="sh-no">{no}</span>
        <span className="sh-dot" aria-hidden="true" />
        <span className="sh-tag">{tag}</span>
      </div>
      <div className="sh-rule" aria-hidden="true" />
      {meta && <span className="sh-meta">{meta}</span>}
    </header>
  );
}
