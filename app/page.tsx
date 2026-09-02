import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Pain } from "@/components/Pain";
import { SectionHead } from "@/components/SectionHead";
import { AppWindow } from "@/components/AppWindow";
import { AntiBan } from "@/components/AntiBan";
import { Features } from "@/components/Features";
import { Lifecycle } from "@/components/Lifecycle";
import { Buy } from "@/components/Buy";
import { Proof } from "@/components/Proof";
import { Faq } from "@/components/Faq";
import { EndCta } from "@/components/EndCta";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCta } from "@/components/StickyCta";

/**
 * Thứ tự khối bám theo đường ra quyết định của người mua, không theo thứ tự
 * tôi tiện viết:
 *
 *   01 Giao diện  — chứng minh app có thật, trước mọi lời hứa. Trước đây nằm
 *                   sau ba khối chữ, người đọc phải tin trước khi được thấy.
 *   02 Chống ban  — phản đối lớn nhất của nghề này, trả lời ngay chứ không
 *                   để tới gần cuối trang.
 *   03 Tính năng  — lúc này người đọc đã tin app chạy được thì mới đáng liệt kê.
 *   04 Vòng đời   — chi tiết vận hành, dành cho người đã quan tâm.
 *   05 Giá & tải  — gộp hai khối cũ, tiền và file nằm cùng một chỗ.
 *   06 Mua của ai — đúng lúc vừa thấy giá là lúc hỏi câu này.
 *   07 Hỏi đáp    — dọn nốt phản đối còn lại rồi mới chốt.
 */
export default function Home() {
  return (
    <>
      {/* Link nhảy nội dung — CSS chỉ hiện nó khi được focus bằng bàn phím. */}
      <a className="skip" href="#noidung">
        Bỏ qua tới nội dung chính
      </a>

      <SiteHeader />

      <main id="noidung">
        <Hero />
        <Pain />

        <section id="giaodien" className="sec">
          <div className="wrap">
            <SectionHead no="01" tag="Giao diện" meta="16 màn hình" />
            <h2>Một cửa sổ, mọi thứ ở đúng chỗ của nó.</h2>
            <p className="sec-lead">
              Cột trái là toàn bộ công cụ, gom theo việc. Giữa là vùng làm việc. Script
              nào đang chạy hiện ngay dưới thanh điều hướng kèm tiến độ và nút dừng.
            </p>

            <p className="win-hint">
              Bấm vào từng mục để mở màn hình đó. Khung cửa sổ đứng yên — chỉ vùng làm
              việc đổi.
            </p>

            <AppWindow />
          </div>
        </section>

        <AntiBan />
        <Features />
        <Lifecycle />
        <Buy />
        <Proof />
        <Faq />
        <EndCta />
      </main>

      <SiteFooter />
      <StickyCta />
    </>
  );
}
