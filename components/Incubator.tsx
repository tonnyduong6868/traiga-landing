"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Khay ấp — mô phỏng bảng điều khiển.
 *
 * Bản gốc dựng lưới bằng Math.random() ngay lúc script chạy. Ở đây HTML được
 * render sẵn lúc build, nên lần render đầu phải giống hệt nhau giữa server và
 * client, nếu không React sẽ báo hydration mismatch. Cách xử lý: lần đầu dùng
 * PRNG có hạt giống cố định, sau khi mount mới chuyển sang ngẫu nhiên thật.
 */

const STATES = ["run", "warm", "idle", "dead"] as const;
type State = (typeof STATES)[number];

const WEIGHT = [0.4, 0.13, 0.43, 0.04];
const ROWS = 6;
const SSR_COLS = 30; // bề rộng desktop — client tự đo lại sau khi mount
const SEED = 20260902;
const TICK_MS = 900;

/** Đồng hồ khởi điểm 04:12:37 cho ra vẻ đã chạy từ sáng. */
const BASE_SECONDS = 4 * 3600 + 12 * 60 + 37;

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickState(r: number): State {
  let acc = 0;
  for (let i = 0; i < WEIGHT.length; i++) {
    acc += WEIGHT[i];
    if (r < acc) return STATES[i];
  }
  return "idle";
}

type Egg = { s: State; delay: string };

function buildEggs(count: number, rand: () => number): Egg[] {
  return Array.from({ length: count }, () => ({
    s: pickState(rand()),
    // Lệch pha nhịp thở để cả khay không phập phồng cùng lúc.
    delay: `${(rand() * -5).toFixed(2)}s`,
  }));
}

function colsForWidth(w: number) {
  if (w >= 900) return 30;
  if (w >= 640) return 20;
  if (w >= 420) return 14;
  return 10;
}

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

function formatUptime(sec: number) {
  return `Uptime ${pad(Math.floor(sec / 3600))}:${pad(
    Math.floor(sec / 60) % 60,
  )}:${pad(sec % 60)}`;
}

export function Incubator() {
  const trayRef = useRef<HTMLDivElement>(null);

  const [cols, setCols] = useState(SSR_COLS);
  const [eggs, setEggs] = useState<Egg[]>(() =>
    buildEggs(SSR_COLS * ROWS, mulberry32(SEED)),
  );
  const [seconds, setSeconds] = useState(BASE_SECONDS);

  const counts = useMemo(() => {
    const n = { run: 0, warm: 0, idle: 0, dead: 0 };
    for (const e of eggs) n[e.s]++;
    return n;
  }, [eggs]);

  // Đo bề rộng thật rồi dựng lại lưới cho khớp. Chỉ dựng lại khi số cột đổi.
  useEffect(() => {
    const measure = () => {
      const w = trayRef.current?.clientWidth || window.innerWidth;
      const next = colsForWidth(w);
      setCols((prev) => {
        if (prev === next) return prev;
        setEggs(buildEggs(next * ROWS, Math.random));
        return next;
      });
    };

    measure();

    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(measure, 180);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Mỗi nhịp đổi 1–3 ô. Đủ để thấy đàn còn sống, không đủ để chói mắt.
  // Tab ẩn thì ngừng, đỡ tốn pin.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let id: ReturnType<typeof setInterval> | null = null;

    const tick = () =>
      setEggs((prev) => {
        const next = [...prev];
        const moves = 1 + Math.floor(Math.random() * 3);
        for (let m = 0; m < moves; m++) {
          const i = Math.floor(Math.random() * next.length);
          const s = pickState(Math.random());
          if (s !== next[i].s) next[i] = { ...next[i], s };
        }
        return next;
      });

    const start = () => {
      if (!id) id = setInterval(tick, TICK_MS);
    };
    const stop = () => {
      if (id) clearInterval(id);
      id = null;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Đồng hồ uptime.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let started: number | null = null;
    const loop = (ts: number) => {
      if (started === null) started = ts;
      setSeconds(BASE_SECONDS + Math.floor((ts - started) / 1000));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <figure className="tray-wrap">
      <div className="tray-head">
        <span className="tray-title">KHAY ẤP</span>
        <span className="tray-sub">{formatUptime(seconds)}</span>
      </div>

      <div
        className="tray"
        ref={trayRef}
        role="img"
        aria-label="Mô phỏng bảng điều khiển: lưới ô, mỗi ô là một account với trạng thái đang chạy, đang nuôi, nghỉ hoặc đã chết."
        style={{ "--cols": cols } as React.CSSProperties}
      >
        {eggs.map((egg, i) => (
          <span
            key={i}
            className="egg"
            data-s={egg.s}
            style={{ animationDelay: egg.delay }}
          />
        ))}
      </div>

      <div className="tray-read" aria-hidden="true">
        <span className="rd">
          <i className="dot d-run" />
          <b>{counts.run}</b> đang chạy
        </span>
        <span className="rd">
          <i className="dot d-warm" />
          <b>{counts.warm}</b> đang nuôi
        </span>
        <span className="rd">
          <i className="dot d-idle" />
          <b>{counts.idle}</b> nghỉ
        </span>
        <span className="rd">
          <i className="dot d-dead" />
          <b>{counts.dead}</b> đã chết
        </span>
      </div>
      <figcaption>
        Mô phỏng bảng điều khiển. Số thật phụ thuộc máy, proxy và số account của anh.
      </figcaption>
    </figure>
  );
}
