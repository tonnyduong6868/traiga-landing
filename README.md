# Trại Gà — landing (Next.js)

Bản port của landing tĩnh `traiga-landing` sang Next.js 16 (App Router, TypeScript).
Giao diện giữ nguyên 100%: `app/globals.css` chính là `style.css` cũ, chỉ đổi ba dòng
khai báo font để dùng `next/font` thay vì gọi Google Fonts qua CDN.

## Chạy tại máy

```powershell
npm install
npm run dev            # http://localhost:3000
```

`next dev` không cần `basePath`, cứ để trống là chạy đúng.

## Build bản tĩnh

```powershell
$env:NEXT_PUBLIC_BASE_PATH="/traiga-landing"
npm run build
```

Kết quả nằm trong `out/` — HTML thuần, không cần server Node. Mở thử:

```powershell
npx serve out          # hoặc bất kỳ static server nào
```

> `npm start` (`next start`) **không dùng được** với dự án này vì `output: 'export'`
> không sinh ra server. Dùng static server như trên.

### `NEXT_PUBLIC_BASE_PATH` là gì

GitHub Pages phục vụ site ở `https://<user>.github.io/<tên-repo>/`, nên mọi đường dẫn
phải có tiền tố `/tên-repo`. Biến này set cả `basePath`, `assetPrefix` lẫn helper
`asset()` trong `lib/site.ts` (dùng cho `<img src>` — Next **không** tự thêm tiền tố
cho thẻ `img` thường).

Khi gắn tên miền riêng: để trống biến này rồi build lại.

## Deploy

Đang dùng cách **build tại máy, đẩy `out/` lên nhánh `gh-pages`**. Nhánh `main` giữ
source, nhánh `gh-pages` giữ HTML đã build, Pages phục vụ từ `gh-pages`.

Mỗi lần sửa nội dung:

```powershell
# 1. Build
cd D:\ZynAlgo\traiga-landing-next
$env:NEXT_PUBLIC_BASE_PATH="/traiga-landing"
npm run build

# 2. Đẩy source
cd D:\ZynAlgo\.deploy\traiga-landing
git add -A; git commit -m "..."; git push

# 3. Đẩy bản build
cd D:\ZynAlgo\.deploy\pages
Get-ChildItem -Force | Where-Object Name -ne '.git' | Remove-Item -Recurse -Force
Copy-Item D:\ZynAlgo\traiga-landing-next\out\* . -Recurse -Force
Copy-Item D:\ZynAlgo\traiga-landing-next\out\.nojekyll .
git add -A; git commit -m "..."; git push
```

`.nojekyll` bắt buộc phải có ở gốc `gh-pages`, nếu không GitHub Pages sẽ bỏ qua thư
mục `_next` (Jekyll mặc định lờ mọi thư mục bắt đầu bằng dấu gạch dưới).

### Chuyển sang build tự động (khuyến nghị khi rảnh)

Bước 3 ở trên là thủ công và dễ quên. Có sẵn file `deploy.yml` trong
`D:\ZynAlgo\traiga-landing-next\.github\workflows\` để GitHub tự build mỗi lần push.
Chưa bật được vì token `gh` thiếu scope `workflow`. Cách bật:

```powershell
gh auth refresh -h github.com -s workflow      # cần bấm Authorize trên trình duyệt
# copy .github/ vào repo rồi commit, push
gh api -X PUT repos/tonnyduong6868/traiga-landing/pages -f build_type=workflow
```

Sau đó nhánh `gh-pages` xoá được, chỉ cần push `main`.

## Cấu trúc

```
app/
  layout.tsx          metadata, OG, theme-color, nạp font
  fonts.ts            Bricolage Grotesque + Be Vietnam Pro + JetBrains Mono
  globals.css         nguyên văn style.css cũ
  page.tsx            ráp các section theo đúng thứ tự bản gốc
components/
  SiteHeader Hero Pain AppWindow Features AntiBan
  Lifecycle Pricing Download Faq EndCta SiteFooter
  Incubator.tsx       khay ấp + đồng hồ uptime  (client)
  AppWindow.tsx       cửa sổ app, 16 màn hình    (client)
  app-window-data.ts  dữ liệu 16 màn hình
lib/site.ts           giá, liên hệ, thông tin bản phát hành, helper asset()
```

Chỉ hai component cần JavaScript. Phần còn lại, kể cả công tắc *bật/tắt lớp ngụy trang*
ở mục Chống ban, là Server Component — công tắc đó chạy bằng CSS radio sibling nên
hoạt động cả khi script chưa tải xong.

## Sửa nội dung ở đâu

| Cần đổi | File |
|---|---|
| Giá, những gì có/không có trong gói | `lib/site.ts` → `pricing` |
| Link Zalo, Messenger | `lib/site.ts` → `contact` |
| Phiên bản, dung lượng, link tải | `lib/site.ts` → `release` |
| Menu đầu trang | `lib/site.ts` → `nav` |
| Nội dung 16 màn hình trong ảnh app | `components/app-window-data.ts` |

### ⚠️ Link Zalo vẫn là placeholder

`lib/site.ts` đang để `https://zalo.me/0000000000` — bê nguyên từ bản gốc. Khách bấm
vào sẽ rơi vào trang rỗng. **Phải thay số thật trước khi chạy quảng cáo.**
Link `https://m.me/traiga` cũng nên mở thử xem còn đúng trang không.

## Khác biệt so với bản gốc

Về mặt hiển thị: không có. Về mặt kỹ thuật:

- **Font tự host.** `next/font` tải sẵn `.woff2` vào `_next/static/media/`, bỏ được hai
  `preconnect` và một request chặn render tới Google Fonts.
- **Nội dung động có sẵn trong HTML.** Bản gốc render khay ấp và cửa sổ app bằng
  JavaScript, tắt JS là trang trống một mảng. Bản này render sẵn lúc build.
- **Khay ấp dùng PRNG có hạt giống.** Lần render đầu phải giống hệt nhau giữa build và
  trình duyệt, nếu không React báo hydration mismatch. Sau khi mount mới chuyển sang
  ngẫu nhiên thật.
- **Đổi màn hình app dùng `key` thay vì ép reflow.** Bản gốc gọi `void offsetWidth` để
  animation `.swap` chạy lại; ở đây đổi `key` cho React remount, hiệu quả như nhau.
- **Nội dung được escape.** Bản gốc ghép chuỗi rồi gán `innerHTML`.
- Hai hiệu ứng nền vẫn tôn trọng `prefers-reduced-motion` và tự dừng khi tab bị ẩn.
