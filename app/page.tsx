import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Proof } from "@/components/Proof";
import { Pain } from "@/components/Pain";
import { AppWindow } from "@/components/AppWindow";
import { Features } from "@/components/Features";
import { AntiBan } from "@/components/AntiBan";
import { Lifecycle } from "@/components/Lifecycle";
import { Pricing } from "@/components/Pricing";
import { Download } from "@/components/Download";
import { Faq } from "@/components/Faq";
import { EndCta } from "@/components/EndCta";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCta } from "@/components/StickyCta";

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
        <Proof />
        <Pain />

        <section id="giaodien" className="sec">
          <div className="wrap">
            <p className="eyebrow">Giao diện</p>
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

        <Features />
        <AntiBan />
        <Lifecycle />
        <Pricing />
        <Download />
        <Faq />
        <EndCta />
      </main>

      <SiteFooter />
      <StickyCta />
    </>
  );
}
