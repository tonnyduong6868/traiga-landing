# Ảnh chụp màn hình app

Bỏ file ảnh vào đúng thư mục này rồi chạy `npm run build` — khối "Mua của ai"
trên trang sẽ tự hiện gallery. Không phải sửa dòng code nào.

Thư mục rỗng thì khối ảnh tự ẩn, trang vẫn chạy bình thường.

## Đặt tên file

```
01-hop-thu-gop.png
02-seeding-dang-chay.png
03-quan-ly-proxy.png
```

- Số ở đầu quyết định thứ tự hiện trên trang.
- Phần sau dấu gạch trở thành chú thích dưới ảnh nếu không khai báo gì thêm.
- Nhận `.png`, `.jpg`, `.jpeg`, `.webp`. PNG cho ảnh chụp app là hợp nhất — chữ
  trong ảnh không bị nhoè như JPG.

## Chú thích có dấu tiếng Việt

Tên file nên không dấu để URL sạch. Muốn chú thích đầy đủ dấu thì tạo thêm file
`captions.json` ngay trong thư mục này:

```json
{
  "01-hop-thu-gop.png": "Hộp thư gộp — DM của cả trại về một chỗ",
  "02-seeding-dang-chay.png": "Một ca seeding đang chạy, 40 phiên song song",
  "03-quan-ly-proxy.png": "Bảng proxy: độ trễ, vùng, phiên đang dùng"
}
```

File nào không có trong `captions.json` thì vẫn lấy chú thích suy từ tên file.

## Chụp thế nào cho được việc

- Chụp cả cửa sổ app, đừng cắt sát nội dung — người xem cần nhận ra đây là phần
  mềm Windows thật.
- Bề ngang tầm 1400–1900px là đủ; to hơn chỉ nặng trang.
- **Che dữ liệu thật trước khi chụp**: token, username thật, IP proxy, key.
  Trang này ai cũng xem được.
- Nền tối hợp với trang hơn — nếu app có chế độ sáng/tối thì chụp bản tối.
