/**
 * Bảng dấu vết kỹ thuật với công tắc "bật/tắt lớp ngụy trang".
 *
 * Công tắc chạy hoàn toàn bằng CSS (`#mOff:checked ~ ...` trong globals.css)
 * nên component này vẫn là Server Component — không cần JS, hoạt động cả khi
 * script chưa tải xong. Mỗi ô có sẵn hai giá trị trong DOM: `.u` (ngụy trang
 * bật) và `.s` (tắt), CSS chỉ ẩn/hiện.
 */

import { SectionHead } from "./SectionHead";

type Pair = { u: string; s: string; uOk?: true; sWarn?: true };

type Row = {
  acc: string;
  screen: Pair;
  tz: Pair;
  ja3: Pair;
  sess: Pair;
  quota: Pair;
};

const SAME = { u: "1920×1080", s: "1920×1080" };

const ROWS: Row[] = [
  {
    acc: "gaconlonton",
    screen: SAME,
    tz: { u: "Asia/Ho_Chi_Minh", s: "Asia/Ho_Chi_Minh" },
    ja3: { u: "cd08e31494f9", s: "cd08e31494f9" },
    sess: { u: "4h12m", s: "không giữ", sWarn: true },
    quota: { u: "34/60", s: "60/60 · vẫn chạy", sWarn: true },
  },
  {
    acc: "mikevu_92",
    screen: { u: "1536×864", s: "1920×1080" },
    tz: { u: "Asia/Bangkok", s: "Asia/Ho_Chi_Minh" },
    ja3: { u: "7a1f2b60d3", s: "cd08e31494f9" },
    sess: { u: "51m", s: "không giữ", sWarn: true },
    quota: { u: "12/60", s: "60/60 · vẫn chạy", sWarn: true },
  },
  {
    acc: "bap_ngo",
    screen: { u: "2560×1440", s: "1920×1080" },
    tz: { u: "Asia/Singapore", s: "Asia/Ho_Chi_Minh" },
    ja3: { u: "e4c99a07f5b2", s: "cd08e31494f9" },
    sess: { u: "2h03m", s: "không giữ", sWarn: true },
    quota: { u: "58/60", s: "60/60 · vẫn chạy", sWarn: true },
  },
  {
    acc: "tho_con_04",
    screen: { u: "1366×768", s: "1920×1080" },
    tz: { u: "Asia/Ho_Chi_Minh", s: "Asia/Ho_Chi_Minh" },
    ja3: { u: "19bd7e4a8c", s: "cd08e31494f9" },
    sess: { u: "18m", s: "không giữ", sWarn: true },
    quota: { u: "5/60", s: "60/60 · vẫn chạy", sWarn: true },
  },
  {
    acc: "linhpham_vn",
    screen: { u: "1440×900", s: "1920×1080" },
    tz: { u: "Asia/Manila", s: "Asia/Ho_Chi_Minh" },
    ja3: { u: "b06f3d2e91a7", s: "cd08e31494f9" },
    sess: { u: "6h40m", s: "không giữ", sWarn: true },
    quota: { u: "41/60", s: "60/60 · vẫn chạy", sWarn: true },
  },
  {
    acc: "haiyen_2k",
    screen: { u: "1680×1050", s: "1920×1080" },
    tz: { u: "Asia/Jakarta", s: "Asia/Ho_Chi_Minh" },
    ja3: { u: "5fa2c8b41d", s: "cd08e31494f9" },
    sess: { u: "1h27m", s: "không giữ", sWarn: true },
    quota: { u: "60/60 · dừng", uOk: true, s: "60/60 · vẫn chạy", sWarn: true },
  },
];

const COLS = [
  { key: "screen", label: "Màn hình", tone: "t-a" },
  { key: "tz", label: "Múi giờ", tone: "t-a" },
  { key: "ja3", label: "Chữ ký TLS", tone: "t-p" },
  { key: "sess", label: "Phiên gateway", tone: "t-i" },
  { key: "quota", label: "Hạn mức/giờ", tone: "t-o" },
] as const;

function Cell({ col, pair }: { col: string; pair: Pair }) {
  return (
    <td data-c={col}>
      <span className={pair.uOk ? "u ok" : "u"}>{pair.u}</span>
      <span className={pair.sWarn ? "s warn" : "s"}>{pair.s}</span>
    </td>
  );
}

const MECHS = [
  {
    tone: "t-a",
    chip: "Màn hình · Múi giờ",
    title: "Vân tay riêng",
    body: "Mỗi profile một bộ vân tay trình duyệt cố định — màn hình, phần cứng, múi giờ, ngôn ngữ — không đổi giữa các phiên.",
  },
  {
    tone: "t-p",
    chip: "Chữ ký TLS",
    title: "Ngụy trang tầng TLS",
    body: "Không chỉ đổi User-Agent. Chữ ký bắt tay TLS và thứ tự header đi theo đúng bản Chrome mà acc khai báo.",
  },
  {
    tone: "t-i",
    chip: "Phiên gateway",
    title: "Giữ kết nối sống",
    body: "Khi seed, account vẫn duy trì kết nối thời gian thực và đọc dữ liệu như người đang mở app — không phải chỉ bắn API rồi cút.",
  },
  {
    tone: "t-o",
    chip: "Hạn mức/giờ",
    title: "Hạn mức hành động",
    body: "Nhắn tin, đổi hồ sơ, join server đều có trần theo giờ và theo ngày. Chạm trần thì dừng, không cố.",
  },
];

export function AntiBan() {
  return (
    <section id="antoan" className="sec sec-alt">
      <div className="wrap">
        <SectionHead no="02" tag="Chống ban" meta="6 account · 5 dấu vết" />
        <h2>Cả đàn nhưng không con nào giống con nào.</h2>
        <p className="sec-lead">
          Máy chủ không đọc tên account, nó đọc dấu vết kỹ thuật. Đây là những gì nó
          thấy khi sáu con trong trại cùng hoạt động — tắt lớp ngụy trang để xem cả cụm
          lộ ra thế nào.
        </p>

        <div className="lg">
          <input type="radio" name="mask" id="mOn" className="sr" defaultChecked />
          <input type="radio" name="mask" id="mOff" className="sr" />

          <div className="lg-top">
            <div className="seg">
              <label htmlFor="mOn">Bật lớp ngụy trang</label>
              <label htmlFor="mOff">Tắt lớp ngụy trang</label>
            </div>
            <p className="lg-count">
              <b className="u">0</b>
              <b className="s">5</b>/5 dấu vết dùng chung
            </p>
          </div>

          <div className="lg-body">
            <table className="lg-t">
              <caption className="sr">
                Dấu vết kỹ thuật máy chủ Discord đọc được từ sáu account trong trại
              </caption>
              <thead>
                <tr>
                  <th scope="col" data-c="acc">
                    Account
                  </th>
                  {COLS.map((c) => (
                    <th key={c.key} scope="col" data-c={c.key}>
                      <i className={`sq ${c.tone}`} />
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.acc}>
                    <th scope="row" data-c="acc">
                      {row.acc}
                    </th>
                    {COLS.map((c) => (
                      <Cell key={c.key} col={c.key} pair={row[c.key]} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="lg-say">
            <span className="u">
              Sáu con, sáu bộ dấu vết. Máy chủ không có gì để nối chúng lại với nhau.
            </span>
            <span className="s">
              Sáu con, một bộ dấu vết. Khoá một con là lộ nốt năm con còn lại.
            </span>
          </p>
        </div>

        <div className="mechs">
          {MECHS.map((m) => (
            <div className="mech" key={m.title}>
              <p className="mech-c">
                <i className={`sq ${m.tone}`} />
                {m.chip}
              </p>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
            </div>
          ))}
        </div>

        <p className="note">
          Nói thẳng: không công cụ nào cam kết được 0% ban, kể cả cái này. Trại Gà làm
          giảm rủi ro và cho anh thấy sớm khi có con gặp vấn đề — chứ không bán bùa hộ
          mệnh.
        </p>
      </div>
    </section>
  );
}
