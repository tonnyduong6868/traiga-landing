/**
 * Nội dung 16 màn hình của cửa sổ mô phỏng.
 *
 * Giữ nguyên dạng tuple gọn của app.js bản gốc để dễ đối chiếu từng dòng,
 * chỉ bọc thêm kiểu TypeScript. Bản gốc ghép chuỗi rồi gán innerHTML;
 * bản này render bằng JSX nên không còn đường nào để HTML lọt vào DOM.
 */

export type Tone = "run" | "warm" | "idle" | "dead";

/** Ô trong bảng: chữ thường, chữ mono, chấm trạng thái, hoặc thanh phần trăm. */
export type Cell =
  | string
  | ["m", string]
  | ["d", Tone, string]
  | ["b", number, string];

export type ScriptLine = [who: string, cls: string, msg: string, time: string, dim?: 1];
export type StreamLine = [time: string, kind: "ok" | "in" | "wr" | "dg", msg: string];
export type GridItem = [title: string, sub: string, tone: "p" | "i" | "o", note?: string];
export type Thread = [
  from: string,
  to: string,
  snippet: string,
  time: string,
  unread?: number,
  active?: 1,
];
export type Msg = [out: 0 | 1, who: string, text: string, time: string, tag?: string];
export type Tile = [label: string, value: string, tone: "ok" | "in" | "wr"];
export type Bar = [label: string, pct: number, value: string];

export type Body =
  | { k: "rows"; c: string[]; w: number[]; r: Cell[][] }
  | { k: "script"; r: ScriptLine[] }
  | { k: "grid"; g: GridItem[] }
  | { k: "stream"; r: StreamLine[] }
  | { k: "inbox"; th: Thread[]; ms: Msg[] }
  | {
      k: "meters";
      ti?: Tile[];
      lb?: string;
      ba?: Bar[];
      ch?: { lb: string; d: number[]; f: number[] };
    };

export type View = {
  t: string;
  s: string;
  b: [cls: "gh" | "pr", label: string][];
  body: Body;
  st: [label: string, value: string][];
};

export const VIEWS = {
  all: {
    t: "Tất cả Profile",
    s: "312 profile · mỗi con một proxy và một bộ vân tay riêng",
    b: [
      ["gh", "Import token"],
      ["gh", "Thêm profile"],
      ["pr", "Mở đã chọn"],
    ],
    body: {
      k: "rows",
      c: ["Tên", "Nền tảng", "Proxy", "Trạng thái"],
      w: [27, 15, 32, 26],
      r: [
        ["gaconlonton", "Discord", ["m", "sgn-104.res"], ["d", "run", "đang chạy"]],
        ["mikevu_92", "Discord", ["m", "bkk-77.res"], ["d", "run", "đang chạy"]],
        ["bap_ngo", "Discord", ["m", "sgp-12.res"], ["d", "run", "đang chạy"]],
        ["tho_con_04", "Discord", ["m", "mnl-38.res"], ["d", "idle", "nghỉ"]],
        ["linhpham_vn", "Discord", ["m", "sgn-05.res"], ["d", "run", "đang chạy"]],
        ["haiyen_2k", "Discord", ["m", "jkt-21.res"], ["d", "dead", "token chết"]],
        ["bong_lau", "Discord", ["m", "sgn-88.res"], ["d", "run", "đang chạy"]],
        ["ngan.tt", "Discord", ["m", "hcm-41.res"], ["d", "idle", "nghỉ"]],
        ["quang_hd", "Discord", ["m", "dad-19.res"], ["d", "run", "đang chạy"]],
      ],
    },
    st: [
      ["Đã chọn", "6 profile"],
      ["Proxy sống", "298/312"],
      ["Token hết hạn", "4"],
    ],
  },

  discord: {
    t: "Discord Hub",
    s: "Lọc riêng account Discord · xem sức khoẻ từng con",
    b: [
      ["gh", "Kiểm tra token"],
      ["gh", "Gộp thao tác"],
      ["pr", "Đăng nhập lại"],
    ],
    body: {
      k: "rows",
      c: ["Tên", "Token", "Tuổi acc", "Sức khoẻ"],
      w: [27, 20, 18, 35],
      r: [
        ["gaconlonton", ["d", "run", "sống"], ["m", "94 ngày"], ["b", 92, "92"]],
        ["mikevu_92", ["d", "run", "sống"], ["m", "61 ngày"], ["b", 78, "78"]],
        ["bap_ngo", ["d", "run", "sống"], ["m", "38 ngày"], ["b", 64, "64"]],
        ["tho_con_04", ["d", "run", "sống"], ["m", "9 ngày"], ["b", 31, "31"]],
        ["linhpham_vn", ["d", "run", "sống"], ["m", "120 ngày"], ["b", 96, "96"]],
        ["haiyen_2k", ["d", "dead", "chết"], ["m", "4 ngày"], ["b", 8, "8"]],
        ["bong_lau", ["d", "run", "sống"], ["m", "77 ngày"], ["b", 85, "85"]],
        ["ngan.tt", ["d", "run", "sống"], ["m", "52 ngày"], ["b", 71, "71"]],
        ["quang_hd", ["d", "run", "sống"], ["m", "23 ngày"], ["b", 49, "49"]],
      ],
    },
    st: [
      ["Cờ tài khoản", "không có con nào"],
      ["Acc quá non", "2 con bị giữ lại"],
      ["Nhảy vùng IP", "1 con · VN → TH"],
    ],
  },

  script: {
    t: "Soạn thảo kịch bản",
    s: "Thứ tự & nội dung tin nhắn cho từng tài khoản",
    b: [
      ["gh", "AI viết hộ"],
      ["gh", "Mẫu"],
      ["pr", "Chạy"],
    ],
    body: {
      k: "script",
      r: [
        ["gaconlonton", "", "ai còn slot kèo hôm nay k mn", "+0s"],
        ["mikevu_92", "w2", "mình vừa vào xong, còn 2 slot", "+7s"],
        ["bap_ngo", "w3", "link đâu ib mình với", "+19s"],
        ["gaconlonton", "", "check pin trên kênh nhé, mình để rồi", "+31s"],
        ["mikevu_92", "w2", "ok thanks b", "+44s"],
        ["linhpham_vn", "", "mình cũng đang cần, để mình xem đã", "+58s"],
        ["bap_ngo", "w3", "thấy rồi, cảm ơn nha", "+1p12s"],
        ["gaconlonton", "", "tối nay 8h họp voice, ai rảnh thì vào", "+1p29s"],
        ["mikevu_92", "w2", "ok mình vào", "+1p47s", 1],
      ],
    },
    st: [
      ["Nhịp gõ", "tự nhiên · 38–72 WPM"],
      ["Chống trùng", "đang bật"],
      ["Proxy", "riêng từng acc"],
    ],
  },

  conversation: {
    t: "Auto Chat (Auto Seeding)",
    s: "Kịch bản tương tác đa tài khoản qua lại",
    b: [
      ["gh", "Chọn account"],
      ["gh", "Số vòng: 4"],
      ["pr", "Chạy vòng lặp"],
    ],
    body: {
      k: "script",
      r: [
        ["bap_ngo", "w3", "server này còn ai active không mn", "+0s"],
        ["linhpham_vn", "", "còn chứ, tối nào cũng có kèo", "+12s"],
        ["haiyen_2k", "w2", "mình mới join, chỉ mình với", "+26s"],
        ["bap_ngo", "w3", "vào #huong-dan đọc trước nha, có hết", "+41s"],
        ["haiyen_2k", "w2", "ok để mình đọc", "+58s"],
        ["linhpham_vn", "", "ai cần thì ib mình gửi mẫu", "+1p14s"],
        ["bap_ngo", "w3", "mẫu hôm trước vẫn dùng được chứ b", "+1p33s"],
        ["linhpham_vn", "", "được, mình mới cập nhật hôm qua", "+1p51s"],
        ["haiyen_2k", "w2", "tối 8h họp kênh voice nhé mn", "+2p09s", 1],
      ],
    },
    st: [
      ["Vòng lặp", "4 vòng"],
      ["Cách quãng", "3–11 phút"],
      ["Đảo vai", "ngẫu nhiên mỗi vòng"],
    ],
  },

  tools: {
    t: "Bộ công cụ Discord",
    s: "9 công cụ tự động hoá & tương tác",
    b: [
      ["gh", "Chọn account"],
      ["pr", "Chạy công cụ"],
    ],
    body: {
      k: "grid",
      g: [
        ["Token Checker", "lọc token còn sống", "p", "chạy gần nhất 02:00"],
        ["User Lookup", "tra hồ sơ theo ID", "p", "1.204 lượt tra"],
        ["Member Scraper", "quét thành viên kênh", "p", "8.4k thành viên đã lưu"],
        ["Join Server", "vào server theo invite", "p", "17 server · 312 acc"],
        ["Send Message", "gửi tin hàng loạt", "p", "9.1k tin · trần 60/giờ"],
        ["Change Status", "đổi trạng thái hiển thị", "p", "rải theo 6 khung giờ"],
        ["Add Reaction", "thả cảm xúc vào tin", "p", "2.3k lượt thả"],
        ["Accept Friends", "nhận lời mời đang chờ", "p", "146 lời mời đang chờ"],
        ["Mass DM", "nhắn riêng theo danh sách", "p", "trần 40 tin/acc/ngày"],
      ],
    },
    st: [
      ["Chạy song song", "20 luồng"],
      ["Hạn mức", "áp cho mọi công cụ"],
      ["Nhật ký", "ghi lại từng lệnh"],
    ],
  },

  token: {
    t: "Trích xuất Discord Token",
    s: "Tự động đăng nhập & lấy Auth Token",
    b: [
      ["gh", "Dán danh sách"],
      ["pr", "Bắt đầu lấy"],
    ],
    body: {
      k: "rows",
      c: ["Email", "Proxy đi kèm", "Kết quả"],
      w: [36, 32, 32],
      r: [
        ["gaconlonton@mail.com", ["m", "socks5://sgn-104"], ["d", "run", "lấy được"]],
        ["mikevu92@mail.com", ["m", "socks5://bkk-77"], ["d", "run", "lấy được"]],
        ["bapngo@mail.com", ["m", "socks5://sgp-12"], ["d", "warm", "đang đăng nhập"]],
        ["thocon04@mail.com", ["m", "socks5://mnl-38"], ["d", "warm", "chờ mã 2FA"]],
        ["haiyen2k@mail.com", ["m", "socks5://jkt-21"], ["d", "dead", "sai mật khẩu"]],
        ["bonglau.tg@mail.com", ["m", "socks5://sgn-88"], ["d", "run", "lấy được"]],
        ["ngantt.work@mail.com", ["m", "socks5://hcm-41"], ["d", "idle", "chờ trong hàng"]],
        ["quanghd97@mail.com", ["m", "socks5://dad-19"], ["d", "idle", "chờ trong hàng"]],
        ["tuankh.dev@mail.com", ["m", "socks5://sgn-62"], ["d", "idle", "chờ trong hàng"]],
      ],
    },
    st: [
      ["Đã lấy", "3/9"],
      ["Lưu vào profile", "tự động"],
      ["Proxy", "đi theo từng acc"],
    ],
  },

  inbox: {
    t: "Hộp thư Discord",
    s: "Đọc tin của tất cả account · real-time · tự động trả lời",
    b: [
      ["gh", "Bộ lọc"],
      ["gh", "Auto-reply: bật"],
      ["pr", "Gửi"],
    ],
    body: {
      k: "inbox",
      th: [
        ["tuan_kh", "gaconlonton", "bro còn slot không", "2p", 3, 1],
        ["mai.ngoc", "linhpham_vn", "giá sao b ơi", "14p", 1],
        ["hoang99", "bap_ngo", "ok mình chuyển rồi nhé", "1h"],
        ["datle", "mikevu_92", "cảm ơn b nhiều", "3h"],
        ["phuong.ng", "bong_lau", "còn nhận thêm người không", "5h"],
        ["minhtri_hd", "ngan.tt", "cho mình xin cái link", "7h"],
        ["kienvu", "quang_hd", "mai mình vào nhé", "11h"],
      ],
      ms: [
        [0, "tuan_kh", "chào b, kênh này còn hoạt động không", "13:47"],
        [1, "gaconlonton", "còn b, tối nào cũng có", "13:49"],
        [0, "tuan_kh", "bro còn slot không", "14:02"],
        [1, "gaconlonton", "còn 2 slot nhé, b lấy không", "14:03"],
        [0, "tuan_kh", "lấy 1", "14:05"],
        [1, "gaconlonton", "ok mình ib link ngay đây", "14:05", "AI trả"],
      ],
    },
    st: [
      ["Chưa đọc", "9 tin"],
      ["Trả tự động", "6 tin hôm nay"],
      ["Đang trực", "312 account"],
    ],
  },

  listener: {
    t: "Discord Gateway Listener",
    s: "Nhận kịch bản gửi từ Claude qua Discord",
    b: [
      ["gh", "Kênh #traiga-hub"],
      ["pr", "Ngắt kết nối"],
    ],
    body: {
      k: "stream",
      r: [
        ["14:02:11", "ok", "READY — gateway đã kết nối, giữ 312 phiên"],
        ["14:02:11", "in", "Đang nghe kênh #traiga-hub"],
        ["14:07:48", "ok", 'Nhận kịch bản "kèo tối thứ 5" — 25 tin, 4 vai'],
        ["14:07:49", "in", "Auto-Run đang bật → đẩy thẳng sang Soạn kịch bản"],
        ["14:07:52", "ok", "Bắt đầu chạy — gaconlonton 1/25"],
        ["14:11:30", "wr", "bap_ngo dính rate-limit 5s, đã lùi nhịp"],
        ["14:16:02", "ok", "gaconlonton 12/25 — nhịp gõ 54 WPM"],
        ["14:22:41", "in", "Heartbeat 128ms — 312/312 phiên còn sống"],
        ["14:31:18", "ok", 'Nhận kịch bản "chào đàn mới" — 9 tin, 3 vai'],
      ],
    },
    st: [
      ["Kết nối", "4h12m không rớt"],
      ["Kịch bản nhận", "3 hôm nay"],
      ["Auto-Run", "đang bật"],
    ],
  },

  browser: {
    t: "Multi-Browser Matrix",
    s: "Mở nhiều phiên trình duyệt với proxy & fingerprint độc lập",
    b: [
      ["gh", "Nạp proxy đã lưu"],
      ["gh", "Soi anti-detect"],
      ["pr", "Mở 8 phiên"],
    ],
    body: {
      k: "grid",
      g: [
        ["gaconlonton", "sgn-104 · 1920×1080", "i", "đang mở · Chrome 131"],
        ["mikevu_92", "bkk-77 · 1536×864", "i", "đang mở · Chrome 130"],
        ["bap_ngo", "sgp-12 · 2560×1440", "i", "đang mở · Chrome 131"],
        ["tho_con_04", "mnl-38 · 1366×768", "i", "đang mở · Chrome 129"],
        ["linhpham_vn", "sgn-05 · 1440×900", "i", "đang mở · Chrome 131"],
        ["haiyen_2k", "jkt-21 · 1680×1050", "i", "đang mở · Chrome 130"],
        ["bong_lau", "sgn-88 · 1920×1200", "o", "chờ slot"],
        ["ngan.tt", "hcm-41 · 1600×900", "o", "chờ slot"],
        ["quang_hd", "dad-19 · 1280×800", "o", "chờ slot"],
      ],
    },
    st: [
      ["Đang mở", "6/8 phiên"],
      ["Cookie", "nạp sẵn, đăng nhập một lần"],
      ["Vân tay", "khoá theo profile"],
    ],
  },

  ptest: {
    t: "Kiểm tra Proxy",
    s: "Đo latency & kiểm tra IP / vị trí địa lý",
    b: [
      ["gh", "Dán danh sách"],
      ["pr", "Kiểm tra 312 proxy"],
    ],
    body: {
      k: "rows",
      c: ["Proxy", "IP ra", "Vị trí", "Độ trễ"],
      w: [28, 26, 24, 22],
      r: [
        [["m", "sgn-104.res"], ["m", "113.161.•.•"], "Việt Nam", ["d", "run", "84ms"]],
        [["m", "bkk-77.res"], ["m", "171.100.•.•"], "Thái Lan", ["d", "run", "132ms"]],
        [["m", "sgp-12.res"], ["m", "118.189.•.•"], "Singapore", ["d", "run", "61ms"]],
        [["m", "mnl-38.res"], ["m", "112.198.•.•"], "Philippines", ["d", "warm", "210ms"]],
        [["m", "jkt-21.res"], ["m", "—"], "—", ["d", "dead", "quá hạn"]],
        [["m", "sgn-88.res"], ["m", "14.161.•.•"], "Việt Nam", ["d", "run", "79ms"]],
        [["m", "hcm-41.res"], ["m", "27.72.•.•"], "Việt Nam", ["d", "run", "92ms"]],
        [["m", "dad-19.res"], ["m", "123.16.•.•"], "Việt Nam", ["d", "run", "105ms"]],
        [["m", "kul-09.res"], ["m", "175.139.•.•"], "Malaysia", ["d", "warm", "188ms"]],
      ],
    },
    st: [
      ["Sống", "298 proxy"],
      ["Chết", "14 proxy"],
      ["Trễ trung bình", "118ms"],
    ],
  },

  pmon: {
    t: "Giám sát Proxy",
    s: "Theo dõi realtime — cảnh báo khi proxy chết",
    b: [
      ["gh", "Tự kiểm tra: 5 phút"],
      ["pr", "Kiểm tra ngay"],
    ],
    body: {
      k: "rows",
      c: ["Proxy", "Uptime 24 giờ", "Số lần rớt", "Trạng thái"],
      w: [24, 34, 18, 24],
      r: [
        [["m", "sgn-104.res"], ["b", 100, "100%"], ["m", "0"], ["d", "run", "ổn định"]],
        [["m", "sgp-12.res"], ["b", 99, "99%"], ["m", "1"], ["d", "run", "ổn định"]],
        [["m", "bkk-77.res"], ["b", 87, "87%"], ["m", "6"], ["d", "warm", "chập chờn"]],
        [["m", "mnl-38.res"], ["b", 74, "74%"], ["m", "11"], ["d", "warm", "nên thay"]],
        [["m", "jkt-21.res"], ["b", 12, "12%"], ["m", "38"], ["d", "dead", "đã chết"]],
        [["m", "sgn-88.res"], ["b", 100, "100%"], ["m", "0"], ["d", "run", "ổn định"]],
        [["m", "hcm-41.res"], ["b", 96, "96%"], ["m", "2"], ["d", "run", "ổn định"]],
        [["m", "dad-19.res"], ["b", 91, "91%"], ["m", "4"], ["d", "run", "ổn định"]],
        [["m", "kul-09.res"], ["b", 68, "68%"], ["m", "14"], ["d", "warm", "nên thay"]],
      ],
    },
    st: [
      ["Tự kiểm tra", "mỗi 5 phút"],
      ["Cảnh báo", "đẩy về webhook"],
      ["Cần thay", "3 proxy"],
    ],
  },

  enrich: {
    t: "Làm giàu hồ sơ",
    s: "Avatar · display name · bio — account trắng dễ bị soi",
    b: [
      ["gh", "Chọn thư mục ảnh"],
      ["gh", "Mẫu chữ"],
      ["pr", "Chạy hàng loạt"],
    ],
    body: {
      k: "meters",
      ti: [
        ["Đã đổi avatar", "128", "ok"],
        ["Đã đổi bio", "96", "ok"],
        ["Còn trong hàng đợi", "88", "wr"],
      ],
      ba: [
        ["gaconlonton", 100, "xong"],
        ["mikevu_92", 100, "xong"],
        ["bap_ngo", 60, "đang đổi bio"],
        ["linhpham_vn", 25, "đang tải avatar"],
        ["bong_lau", 0, "chờ tới lượt"],
        ["ngan.tt", 0, "chờ tới lượt"],
        ["tho_con_04", 0, "chờ tới lượt"],
      ],
    },
    st: [
      ["Hạn mức", "12 acc mỗi giờ"],
      ["Ảnh", "lấy ngẫu nhiên, không lặp"],
      ["Bio", "sinh từ mẫu chữ của anh"],
    ],
  },

  warmup: {
    t: "Warm-up account",
    s: "Đọc · ack · react · đổi trạng thái · DM — rải theo thời gian",
    b: [
      ["gh", "Chọn account"],
      ["gh", "Số vòng: 6"],
      ["pr", "Bắt đầu warm-up"],
    ],
    body: {
      k: "meters",
      ti: [
        ["Đang nuôi", "46", "ok"],
        ["Đủ tuổi ra trận", "271", "ok"],
        ["Quá non, bị giữ", "2", "wr"],
      ],
      lb: "Độ ấm",
      ba: [
        ["linhpham_vn", 96, "96/100"],
        ["gaconlonton", 92, "92/100"],
        ["bong_lau", 85, "85/100"],
        ["mikevu_92", 78, "78/100"],
        ["ngan.tt", 71, "71/100"],
        ["bap_ngo", 64, "64/100"],
        ["tho_con_04", 31, "31/100 · chưa cho seed"],
      ],
    },
    st: [
      ["Tiến độ", "vòng 4/6"],
      ["Cách quãng", "8–22 phút mỗi acc"],
      ["Chặn", "acc dưới 2 ngày tuổi"],
    ],
  },

  analytics: {
    t: "Phân tích & Sức khoẻ trại",
    s: "Hoạt động · tỉ lệ chết · proxy tương quan · nhảy vùng",
    b: [
      ["gh", "14 ngày"],
      ["pr", "Làm mới"],
    ],
    body: {
      k: "meters",
      ti: [
        ["Hoạt động 7 ngày", "1.284", "ok"],
        ["Log 14 ngày", "8.902", "in"],
        ["Proxy có acc chết", "3", "wr"],
      ],
      lb: "Sức khoẻ token theo vùng proxy",
      ba: [
        ["Việt Nam · 184 acc", 94, "94%"],
        ["Singapore · 46 acc", 88, "88%"],
        ["Philippines · 38 acc", 73, "73%"],
        ["Thái Lan · 29 acc", 51, "51%"],
      ],
      ch: {
        lb: "Hoạt động theo ngày",
        d: [42, 58, 51, 73, 66, 80, 47, 62, 88, 71, 94, 60, 77, 85],
        f: [2, 4, 1, 6, 3, 2, 9, 3, 2, 5, 1, 4, 2, 3],
      },
    },
    st: [
      ["Acc chết dồn ở", "bkk-77.res"],
      ["Nhảy quốc gia", "1 acc · VN → TH"],
      ["Ngân sách hôm nay", "còn 41%"],
    ],
  },

  scheduler: {
    t: "Hẹn giờ tác vụ",
    s: "Lập lịch tự động chạy các tác vụ Discord",
    b: [
      ["gh", "Nhân bản"],
      ["pr", "Thêm lịch"],
    ],
    body: {
      k: "rows",
      c: ["Tác vụ", "Khung giờ", "Lệch ngẫu nhiên", "Trạng thái"],
      w: [34, 24, 20, 22],
      r: [
        ["Seed kênh #kèo-tối", ["m", "20:00 hằng ngày"], ["m", "±15'"], ["d", "run", "bật"]],
        ["Warm-up đàn mới", ["m", "09:30 hằng ngày"], ["m", "±15'"], ["d", "run", "bật"]],
        ["Làm giàu hồ sơ", ["m", "thứ 2 · 14:00"], ["m", "±30'"], ["d", "idle", "tắt"]],
        ["Kiểm tra proxy", ["m", "mỗi 4 giờ"], ["m", "±5'"], ["d", "run", "bật"]],
        ["Sao lưu cấu hình", ["m", "23:50 hằng ngày"], ["m", "—"], ["d", "run", "bật"]],
        ["Quét thành viên kênh", ["m", "thứ 4 · 21:00"], ["m", "±20'"], ["d", "idle", "tắt"]],
        ["Đọc & trả hộp thư", ["m", "mỗi 30 phút"], ["m", "±7'"], ["d", "run", "bật"]],
        ["Đổi trạng thái đàn", ["m", "07:40 hằng ngày"], ["m", "±25'"], ["d", "run", "bật"]],
        ["Kiểm tra token hàng loạt", ["m", "02:00 hằng ngày"], ["m", "±10'"], ["d", "run", "bật"]],
      ],
    },
    st: [
      ["Đang bật", "7 lịch"],
      ["Lần chạy kế", "20:07 · đã lệch"],
      ["Vì sao lệch giờ", "để nhịp không đều tăm tắp"],
    ],
  },

  log: {
    t: "Lịch sử hoạt động",
    s: "Theo dõi mọi hành động của profiles",
    b: [
      ["gh", "Lọc theo acc"],
      ["gh", "Xuất CSV"],
      ["pr", "Làm mới"],
    ],
    body: {
      k: "stream",
      r: [
        ["14:11:30", "wr", "bap_ngo · rate-limit 5s khi gửi tin — đã lùi nhịp"],
        ["14:07:52", "ok", "gaconlonton · gửi tin 1/25 qua sgn-104.res"],
        ["13:58:04", "in", 'linhpham_vn · đổi trạng thái sang "đang nghe nhạc"'],
        ["13:40:19", "ok", "warm-up vòng 3 xong — 46 account, 0 lỗi"],
        ["13:12:47", "dg", "haiyen_2k · token chết, đã tạm dừng mọi tác vụ"],
        ["12:55:02", "in", "mikevu_92 · đăng nhập lại thành công sau khi rớt phiên"],
        ["12:30:55", "ok", "bong_lau · đổi avatar & bio từ mẫu chữ #4"],
        ["11:58:12", "wr", "kul-09.res · trễ 188ms, đánh dấu cần thay"],
        ["11:20:37", "ok", "ngan.tt · nhận 3 lời mời kết bạn đang chờ"],
      ],
    },
    st: [
      ["Đã ghi", "8.902 dòng · 14 ngày"],
      ["Kèm theo", "proxy dùng lúc đó"],
      ["Xuất", "CSV cho từng acc"],
    ],
  },
} satisfies Record<string, View>;

export type ViewKey = keyof typeof VIEWS;

/** Cột trái, giữ đúng thứ tự và nhóm của bản gốc. */
export const NAV_GROUPS: {
  heading?: string;
  items: { key: ViewKey; label: string; tone: string; badge?: string; live?: true }[];
}[] = [
  {
    items: [
      { key: "all", label: "Tất cả Profile", tone: "t-a", badge: "312" },
      { key: "discord", label: "Discord Hub", tone: "t-a", badge: "312" },
    ],
  },
  {
    heading: "Seeding",
    items: [
      { key: "script", label: "Soạn kịch bản", tone: "t-a" },
      { key: "conversation", label: "Auto Chat", tone: "t-a" },
    ],
  },
  {
    heading: "Discord",
    items: [
      { key: "tools", label: "Bộ công cụ", tone: "t-p" },
      { key: "token", label: "Lấy Token", tone: "t-p" },
      { key: "inbox", label: "Hộp thư", tone: "t-p", badge: "9" },
      { key: "listener", label: "Listener", tone: "t-p", live: true },
    ],
  },
  {
    heading: "Proxy",
    items: [
      { key: "browser", label: "Multi Browser", tone: "t-i" },
      { key: "ptest", label: "Kiểm tra Proxy", tone: "t-i" },
      { key: "pmon", label: "Giám sát Proxy", tone: "t-i" },
    ],
  },
  {
    heading: "Hàng loạt",
    items: [
      { key: "enrich", label: "Làm giàu hồ sơ", tone: "t-w" },
      { key: "warmup", label: "Warm-up account", tone: "t-w" },
    ],
  },
  {
    heading: "Giám sát",
    items: [
      { key: "analytics", label: "Phân tích", tone: "t-o" },
      { key: "scheduler", label: "Lên lịch", tone: "t-o" },
      { key: "log", label: "Nhật ký", tone: "t-o" },
    ],
  },
];

export const DEFAULT_VIEW: ViewKey = "script";
