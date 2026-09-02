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
 *   2. chưa cuộn tới khối Giá hoặc Tải (tới rồi thì bày hai CTA chồng nhau, thừa)
 *
 * Dùng IntersectionObserver thay vì nghe sự kiện scroll để khỏi chạy hàm mỗi
 * khung hình.
 */
export function StickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [atOffer, setAtOffer] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    const offers = document.querySelectorAll("#gia, #tai, .end");
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
          {pricing.amount}
          <em>{pricing.currency}</em>
          <span>trả một lần</span>
        </p>
        <a className="btn btn-sm" href={contact.zalo} target="_blank" rel="noopener">
          Nhắn Zalo để mua
        </a>
      </div>
    </div>
  );
}
