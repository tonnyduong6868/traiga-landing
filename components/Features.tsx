import { SectionHead } from "./SectionHead";

/**
 * Danh mục tính năng — soạn từ chính mã nguồn app (omnilogin-app v1.1.0),
 * không phải viết lại theo trí nhớ.
 *
 * Nhóm và nhãn lấy đúng `NAV_GROUPS` trong renderer/src/navigation.js; mô tả
 * một câu lấy từ `FEATURE_INTRO` trong guide-data.js — cùng thứ người mua thấy
 * ở trang "Giới thiệu & Cập nhật" bên trong app. Các gạch đầu dòng là nhãn nút
 * và dòng chú thích có thật trong từng panel.
 *
 * Sửa app thì sửa cả đây. Trang bán hàng mô tả sai tính năng còn tệ hơn mô tả thiếu.
 */

type Feature = {
  title: string;
  role: string;
  points: React.ReactNode[];
};

type Group = {
  name: string;
  /** Bám theo `tone` của nhóm trong navigation.js để trang và app cùng một mã màu. */
  tone: string;
  items: Feature[];
};

const GROUPS: Group[] = [
  {
    name: "Trại",
    tone: "var(--go)",
    items: [
      {
        title: "Tất cả Profile",
        role: "Trung tâm quản lý mọi profile",
        points: [
          "Thêm, sửa, xoá từng con. Nhấp đôi ngay trên bảng để đổi tên, sửa proxy hoặc email/mật khẩu.",
          "Gán proxy và token cho từng profile, mở hoặc dừng trình duyệt hàng loạt.",
          "Cột cảnh báo và điểm độ ấm 0–100 tích luỹ từ warm-up, thấy ngay con nào chưa nên cho ra trận.",
          "Một nút kiểm tất cả: token sống hay bị cờ, proxy sống hay chết, có lệch vùng không.",
          "Reset dữ liệu duyệt web của một profile — mở lại là mới tinh.",
        ],
      },
      {
        title: "Discord Hub",
        role: "Lọc riêng account Discord",
        points: [
          "Lọc nhanh chỉ còn account Discord để thao tác tập trung một chỗ.",
          "Cột sức khoẻ token: sống, chết, hay đang bị cờ.",
          "Dò lệch vùng proxy so với vùng account vẫn hay dùng.",
          "Tìm theo tên hoặc nền tảng, có phân trang khi đàn đông.",
        ],
      },
    ],
  },
  {
    name: "Seeding",
    tone: "var(--go)",
    items: [
      {
        title: "Soạn kịch bản",
        role: "Ai nói câu gì, theo thứ tự nào",
        points: [
          <>
            Viết theo dòng <code>tên_profile: tin nhắn</code>, chèn ảnh bằng{" "}
            <code>[img:đường-dẫn]</code>, nhắc người khác bằng <code>@tên</code>.
          </>,
          "Tạo kịch bản bằng AI — Claude, GPT hoặc Gemini. Nhập chủ đề, thêm yêu cầu riêng nếu muốn.",
          "Import từ file .txt, .json hoặc .csv. Lưu vào History để lần sau dùng lại.",
          "Bật Reply để trả thẳng vào tin của người thật: app tải sẵn tin trong kênh cho anh chọn.",
          "Auto-Run: kịch bản Claude gửi sang là chạy luôn, không phải ngồi bấm.",
          "Đính kèm được ảnh và video.",
        ],
      },
      {
        title: "Auto Chat",
        role: "Nhiều account nói qua lại với nhau",
        points: [
          "Dựng hội thoại nhiều vai — các account đối đáp nhau theo kịch bản thay vì mỗi con nói một mình.",
          "Theo dõi tiến trình realtime, biết đang tới lượt ai.",
          "Chọn account tham gia và số vòng lặp cho từng lần chạy.",
        ],
      },
    ],
  },
  {
    name: "Discord",
    tone: "var(--vio)",
    items: [
      {
        title: "Bộ công cụ",
        role: "9 công cụ chạy hàng loạt",
        points: [
          "Token Checker, User Lookup, Member Scraper, Join Server, Send Message.",
          "Change Status, Add Reaction, Accept Friends, Mass DM.",
          "Member Scraper có ba đường quét: Gateway (khuyên dùng), REST API, hoặc search từng ký tự khi Gateway không chạy.",
          "Quét người gửi và người được nhắc trong kênh — không cần quyền đặc biệt.",
          "Chọn nhóm profile rồi chạy một lượt cho cả nhóm.",
        ],
      },
      {
        title: "Lấy Token",
        role: "Tự đăng nhập rồi trích Auth Token",
        points: [
          "App tự đăng nhập bằng email/mật khẩu rồi lấy Auth Token về.",
          "Chạy từng con, hoặc trích toàn bộ danh sách một lượt.",
          "Token lấy được gắn thẳng vào profile, khỏi chép tay.",
          "Con nào không lấy được thì báo rõ nguyên nhân thật, không nuốt lỗi.",
        ],
      },
      {
        title: "Hộp thư",
        role: "DM của mọi account về một khung",
        points: [
          "Đọc và trả DM của tất cả account trong một nơi, cập nhật realtime.",
          "Chọn account nào giữ Live để nghe tin, con nào để yên.",
          "Bật tự động trả lời — phần trả lời mẫu chạy local, không bắt buộc gọi API bên ngoài.",
          "Đặt tính cách cho AI trả lời, ví dụ “game thủ vui tính, hay dùng emoji”.",
        ],
      },
      {
        title: "Listener",
        role: "Cầu nối Claude → Discord → app",
        points: [
          "Giữ kết nối Discord Gateway, nghe đúng Channel ID anh chỉ định.",
          "Nhận kịch bản gửi từ Claude qua Discord rồi đẩy thẳng sang Soạn kịch bản.",
          "Trạng thái hiện rõ: ngoại tuyến, đang kết nối, đã kết nối, mất kết nối.",
          "Lưu cấu hình token và channel để lần sau tự nối lại.",
        ],
      },
    ],
  },
  {
    name: "Proxy",
    tone: "var(--info)",
    items: [
      {
        title: "Multi Browser",
        role: "Mỗi phiên một IP, một vân tay",
        points: [
          "Mở nhiều trình duyệt song song, mỗi profile một fingerprint và một proxy riêng — 1 browser = 1 IP.",
          "Lưu bộ cookie theo tên rồi nạp vào mọi browser lúc mở: đăng nhập một lần, những lần sau vào thẳng.",
          "Nạp cả kho proxy đã lưu vào danh sách bằng một nút.",
          "Nút mở thẳng creepjs / browserleaks / pixelscan để anh tự soi anti-detect trước khi chạy thật.",
          "Có delay chống ban giữa các lượt mở, và nút dừng cả lượt đang mở dở.",
        ],
      },
      {
        title: "Kiểm tra Proxy",
        role: "Đo trước khi giao proxy cho account",
        points: [
          "Kiểm sống/chết, đo độ trễ, xem IP thật đi ra và vùng địa lý.",
          <>
            Nhận cả <code>socks5://user:pass@host:port</code> và <code>http://host:port</code>.
          </>,
          "Gán thẳng proxy đạt vào profile, hoặc thay thế toàn bộ một lượt.",
          "Cảnh báo trước nếu profile đã chọn chưa có proxy nào.",
        ],
      },
      {
        title: "Giám sát Proxy",
        role: "Canh liên tục, rớt là báo",
        points: [
          "Theo dõi realtime sức khoẻ proxy của những account đang chạy.",
          "Tự kiểm tra theo chu kỳ — mặc định 5 phút, bật tắt được.",
          "Proxy rớt thì cảnh báo ngay thay vì để acc chạy vào chỗ chết.",
        ],
      },
    ],
  },
  {
    name: "Hàng loạt",
    tone: "var(--warn)",
    items: [
      {
        title: "Làm giàu hồ sơ",
        role: "Avatar, tên hiển thị, bio — theo lô",
        points: [
          "Đổi avatar, display name và bio cho cả lô. Account trắng trơn là thứ dễ bị soi nhất.",
          "Lấy ảnh lần lượt hoặc ngẫu nhiên từ thư mục ảnh của anh.",
          "Đặt được cả pronouns, mỗi dòng một mẫu.",
          "Chạy cho nhóm đã chọn hoặc cho tất cả.",
        ],
      },
      {
        title: "Warm-up account",
        role: "Nuôi acc mới bằng hành vi thật",
        points: [
          "Đọc DM — mở và đọc hộp thư riêng của chính acc đó.",
          "Đánh dấu đã đọc (ack) tin mới nhất: dấu hiệu đọc thật, không phải chỉ online cho có.",
          "React nhẹ — thả cảm xúc, xác suất tăng dần theo tuổi acc.",
          "Mô phỏng đang gõ — thi thoảng bật “đang gõ” như kẻ hóng rồi thôi.",
          "Chấp nhận kết bạn — nhận một lời mời đang chờ mỗi phiên, không ôm hết một lúc.",
          "Đặt cách quãng tối thiểu/tối đa và khung giờ chạy cho từng phiên.",
        ],
      },
    ],
  },
  {
    name: "Giám sát",
    tone: "var(--go)",
    items: [
      {
        title: "Phân tích",
        role: "Hoạt động · tỉ lệ chết · tương quan proxy",
        points: [
          "Hoạt động 7 ngày và log 14 ngày gom về một bảng.",
          "Tỉ lệ chết và sức khoẻ tổng thể của cả đàn.",
          "Chỉ đúng proxy nào đang có account chết dồn — thứ khó thấy nhất khi nhìn từng con.",
          "Phát hiện account nhảy vùng so với lần trước.",
        ],
      },
      {
        title: "Lên lịch",
        role: "Đặt giờ, có jitter",
        points: [
          "Lập lịch chạy kịch bản và tác vụ Discord theo thời gian.",
          "Có jitter để lịch không lặp đúng một mẫu ngày này qua ngày khác.",
          "Đặt sẵn nội dung DM gửi tới user ngay trong tác vụ.",
          "Bật, tắt, sửa từng tác vụ đã lưu.",
        ],
      },
      {
        title: "Nhật ký",
        role: "Ai làm gì, lúc nào",
        points: [
          "Ghi lại mọi hành động của profile: join, DM, gửi tin, thả reaction, đổi trạng thái.",
          "Xem lại và tải mới khi cần đối chiếu.",
        ],
      },
    ],
  },
  {
    name: "Hệ thống",
    tone: "var(--info)",
    items: [
      {
        title: "Sao lưu & Phục hồi",
        role: "Chuyển cả trại sang máy khác",
        points: [
          "Xuất toàn bộ profile ra một file.",
          "Nạp lại từ file đã xuất, trên máy mới cũng được.",
        ],
      },
      {
        title: "Cài đặt",
        role: "Chống ban · thông báo · tích hợp · tự động",
        points: [
          "Bật tắt các tuỳ chọn chống ban và thông báo webhook, chọn Channel ID riêng để nhận báo.",
          "Cắm API key AI của anh, chọn tên model, đặt tính cách trả lời.",
          "Nhập 2captcha API key nếu muốn app tự giải captcha.",
          "Xem mã máy và tình trạng kích hoạt, có nút Chép mã máy.",
          "Kiểm tra tất cả token ngay lập tức, không phải chờ lịch.",
        ],
      },
      {
        title: "Giới thiệu & Cập nhật",
        role: "Mô tả tính năng + nhật ký thay đổi",
        points: [
          "Mô tả từng tính năng ngay trong app, không phải đi tìm tài liệu ngoài.",
          "Nhật ký thay đổi theo từng phiên bản, chia rõ Mới / Cải tiến / Sửa lỗi.",
          "Tự dò bản mới mỗi lần mở app; tải và cài ngay trong Cài đặt.",
        ],
      },
    ],
  },
];

const TOTAL = GROUPS.reduce((n, g) => n + g.items.length, 0);

export function Features() {
  return (
    <section id="tinhnang" className="sec">
      <div className="wrap">
        <SectionHead
          no="03"
          tag="Tính năng"
          meta={`${TOTAL} mục · ${GROUPS.length} nhóm`}
        />
        <h2>Từng mục trong app, không giấu mục nào.</h2>
        <p className="sec-lead">
          Xếp đúng theo bảy nhóm ở cột trái của app, để anh đọc xong trang này là
          biết mình sắp mở ra cái gì. Không có mục nào khoá theo gói — mua là mở hết.
        </p>

        {GROUPS.map((g) => (
          <div className="fgroup" key={g.name}>
            <h3 className="fgroup-h">
              <span
                className="fgroup-dot"
                style={{ background: g.tone }}
                aria-hidden="true"
              />
              {g.name}
              <span className="sh-rule" aria-hidden="true" />
              <span className="fgroup-n">{g.items.length} mục</span>
            </h3>

            <div className="fgrid">
              {g.items.map((f) => (
                <article className="fcard" key={f.title}>
                  <h4>{f.title}</h4>
                  <p className="fcard-role">{f.role}</p>
                  <ul className="fcard-list">
                    {f.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
