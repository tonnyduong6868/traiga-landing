# Landing page Trại Gà

Trang tĩnh, không cần build, không cần server. Chỉ 3 file + thư mục `assets`.

```
index.html    nội dung + bố cục
style.css     toàn bộ giao diện
app.js        khay ấp (lưới account động) + đồng hồ
assets/       logo, favicon
```

## Cần sửa trước khi chạy quảng cáo

Mở `index.html`, tìm các khối được đánh dấu bằng comment:

| Chỗ | Đang là | Sửa thành |
|---|---|---|
| `<!-- ▼▼ SỬA GIÁ Ở ĐÂY ▼▼ -->` | `2.500.000₫` | giá thật |
| `<!-- ▼▼ SỬA LINK LIÊN HỆ Ở ĐÂY ▼▼ -->` (3 chỗ) | `https://zalo.me/0000000000` | `https://zalo.me/<số điện thoại>` |
| | `https://m.me/traiga` | `https://m.me/<tên page>` |

Tìm nhanh bằng `Ctrl+F` chữ `SỬA`.

Ngoài ra nên xem lại:

- **Mục "Gồm những gì" / "Không gồm"** trong phần Giá — đang viết theo mặc định, chỉnh cho khớp chính sách thật.
- **Phần Hỏi đáp** — câu về bảo hành, đổi máy, xem thử.
- **Ảnh màn hình.** Phần "Giao diện" hiện là bản dựng lại bằng HTML/CSS theo đúng bố cục app.
  Nếu có ảnh chụp thật, thay cả khối `<div class="win">…</div>` bằng:
  ```html
  <div class="win"><img src="assets/screenshot.png" alt="Giao diện Trại Gà"></div>
  ```

## Sửa xong thì đẩy lên lại

Không cần cài git. Dùng GitHub CLI đã có sẵn:

```powershell
$gh = "C:\Program Files\GitHub CLI\gh.exe"
$repo = "tonnyduong6868/traiga-landing"

function Push-File($path, $remote) {
  $b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($path))
  $sha = (& $gh api "repos/$repo/contents/$remote" --jq .sha 2>$null)
  $args = @("repos/$repo/contents/$remote", "-X","PUT",
            "-f","message=cập nhật $remote", "-f","content=$b64")
  if ($sha) { $args += @("-f","sha=$sha") }
  & $gh api @args | Out-Null
  Write-Host "đã đẩy $remote"
}

Push-File "D:\vide code\landing\index.html" "index.html"
Push-File "D:\vide code\landing\style.css"  "style.css"
Push-File "D:\vide code\landing\app.js"     "app.js"
```

GitHub Pages tự build lại sau ~30–60 giây.

## Xem thử ở máy

Mở thẳng `index.html` bằng trình duyệt là chạy được — không cần server.
