"use client";

import { useEffect, useState } from "react";
import { contact, pricing } from "@/lib/site";

/**
 * Thanh CTA dính đáy, chỉ hiện trên điện thoại.
 *
 * Trang dài 11 section; trên màn hình hẹp phải vuốt rất lâu mới tới nút mua.
 * Thanh này giữ đường mua luôn trong tầm tay.
 *
 * Hai điều kiện để hiện:
 *   1. đã cuộn qua khỏi hero (còn ở hero thì nút thật đang nằm ngay trên màn hình)
 *   2. chưa cuộn tới khối Giá hoặc khối chốt (tới rồi thì bày hai CTA chồng nhau)
 *
 * Dùng IntersectionObserver thay vì nghe sự kiện scroll để khỏi chạy hàm mỗi
 * khung hình.
 */
export function StickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [atOffer, setAtOffer] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    const offers = document.querySelectorAll("#mua, .end");
    if (!hero) return;

    const heroObs = new IntersectionObserver(
      ([e]) => setPastHero(!e.isIntersecting),
      // Hero còn ló 1 chút thì vẫn coi như đang ở hero.
      { rootMargin: "-40% 0px 0px 0px" },
    );
    heroObs.observe(hero);

    // Nhiều đích cùng theo dõi nên phải tự đếm, một Set là đủ.
    const visible = new Set<Element>();
    const offerObs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setAtOffer(visible.size > 0);
    });
    offers.forEach((el) => offerObs.observe(el));

    return () => {
      heroObs.disconnect();
      offerObs.disconnect();
    };
  }, []);

  const shown = pastHero && !atOffer;

  return (
    <div
      className={shown ? "sticky-cta on" : "sticky-cta"}
      // Khi ẩn thì rút hẳn khỏi thứ tự tab và khỏi trình đọc màn hình,
      // nếu không bàn phím vẫn nhảy vào được một thanh vô hình.
      aria-hidden={!shown}
      inert={!shown}
    >
      <div className="sc-in">
        <p className="sc-price">
          <span className="sc-num">{pricing.amount}<em>{pricing.currency}</em></span>
          <span className="sc-tag">vĩnh viễn</span>
        </p>
        <a className="btn btn-sm btn-primary btn-glow" href={contact.zalo} target="_blank" rel="noopener">
          <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.43 3.86 7.08l-.86 3.19c-.1.38.27.71.63.58l3.77-1.37c.83.24 1.7.37 2.6.37 5.52 0 10-4.03 10-9s-4.48-9-10-9zm1.09 13.09h-2.18V8.91h2.18v6.18z" />
          </svg>
          Nhắn Zalo mua
        </a>
      </div>
    </div>
  );
}
