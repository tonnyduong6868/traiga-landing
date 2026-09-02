"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { asset } from "@/lib/site";
import {
  DEFAULT_VIEW,
  NAV_GROUPS,
  VIEWS,
  type Body,
  type Cell,
  type ViewKey,
} from "./app-window-data";

/**
 * Cửa sổ mô phỏng giao diện app.
 *
 * Bản gốc ghép chuỗi HTML rồi gán vào innerHTML mỗi lần đổi màn. Ở đây từng
 * loại ruột là một component JSX, nên nội dung được escape sẵn và TypeScript
 * bắt lỗi nếu dữ liệu sai hình dạng.
 *
 * Hiệu ứng đổi màn vẫn dùng `.swap` như cũ: đặt `key` theo màn đang mở để ba
 * tầng nội dung remount, CSS animation nhờ đó chạy lại. Khi người dùng bật
 * reduced-motion thì chính CSS đã tắt animation, không cần kiểm tra bằng JS.
 */

/* ── Ô trong bảng ─────────────────────────────────────────────── */

function CellView({ c }: { c: Cell }) {
  if (typeof c === "string") return <span>{c}</span>;
  if (c[0] === "m") return <span className="c-m">{c[1]}</span>;
  if (c[0] === "d")
    return (
      <span className={`c-d cd-${c[1]}`}>
        <i className={`dot d-${c[1]}`} />
        {c[2]}
      </span>
    );
  return (
    <span className="c-b">
      <i>
        <u style={{ width: `${c[1]}%` }} />
      </i>
      {c[2]}
    </span>
  );
}

/* ── Sáu loại ruột ────────────────────────────────────────────── */

type ChartData = NonNullable<Extract<Body, { k: "meters" }>["ch"]>;

/** Cột chồng: `b` là phần lỗi nằm dưới, `u` là phần thành công. */
function Chart({ ch }: { ch: ChartData }) {
  return (
    <div className="mt-ch">
      <p className="mt-lb">{ch.lb}</p>
      <div className="ch-p">
        {ch.d.map((d, i) => (
          <span className="ch-c" key={i}>
            <b style={{ height: `${ch.f[i]}%` }} />
            <u style={{ height: `${d}%` }} />
          </span>
        ))}
      </div>
      <p className="ch-lg">
        <span className="cl-a" />
        thành công
        <span className="cl-b" />
        lỗi
      </p>
    </div>
  );
}

function BodyView({ body }: { body: Body }) {
  switch (body.k) {
    case "rows":
      return (
        <table className="ui-tb">
          <thead>
            <tr>
              {body.c.map((label, i) => (
                <th key={label} style={{ width: `${body.w[i]}%` }}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.r.map((row, i) => (
              <tr key={i}>
                {row.map((c, j) => (
                  <td key={j}>
                    <CellView c={c} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );

    case "script":
      return (
        <div className="ui-script">
          {body.r.map(([who, cls, msg, tm, dim], i) => (
            <div key={i} className={dim ? "ln dim" : "ln"}>
              <span className={cls ? `who ${cls}` : "who"}>{who}</span>
              <span className="msg">{msg}</span>
              <span className="tm">{tm}</span>
            </div>
          ))}
        </div>
      );

    case "grid":
      return (
        <div className="ui-grid">
          {body.g.map(([title, sub, tone, note]) => (
            <div className="gt" key={title}>
              <i className={`sq t-${tone}`} />
              <b>{title}</b>
              <span>{sub}</span>
              {note && <em>{note}</em>}
            </div>
          ))}
        </div>
      );

    case "stream":
      return (
        <div className="ui-stream">
          {body.r.map(([time, kind, msg], i) => (
            <div className="sl" key={i}>
              <span className="st-t">{time}</span>
              <span className={`st-k k-${kind}`} />
              <span className="st-m">{msg}</span>
            </div>
          ))}
        </div>
      );

    case "inbox":
      return (
        <div className="ui-inbox">
          <div className="ib-list">
            {body.th.map(([from, to, snippet, time, unread, active], i) => (
              <div className={active ? "ib-th on" : "ib-th"} key={i}>
                <span className="ib-w">
                  {from}
                  {unread ? <u>{unread}</u> : null}
                </span>
                <span className="ib-a">→ {to}</span>
                <span className="ib-s">{snippet}</span>
                <span className="ib-t">{time}</span>
              </div>
            ))}
          </div>
          <div className="ib-conv">
            {body.ms.map(([out, who, text, time, tag], i) => (
              <div className={out ? "ib-m out" : "ib-m"} key={i}>
                <span className="ib-mh">
                  {who} · {time}
                  {tag ? (
                    <>
                      {" · "}
                      <em>{tag}</em>
                    </>
                  ) : null}
                </span>
                <span className="ib-mb">{text}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "meters":
      return (
        <div className="ui-met">
          {body.ti && (
            <div className="mt-tiles">
              {body.ti.map(([label, value, tone]) => (
                <div className="mt-t" key={label}>
                  <b className={`v-${tone}`}>{value}</b>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          )}

          {body.ba && (
            <div className="mt-bars">
              {body.lb && <p className="mt-lb">{body.lb}</p>}
              {body.ba.map(([label, pct, value]) => (
                <div className="mt-b" key={label}>
                  <span>{label}</span>
                  <i>
                    <u style={{ width: `${pct}%` }} />
                  </i>
                  <em>{value}</em>
                </div>
              ))}
            </div>
          )}

          {body.ch && <Chart ch={body.ch} />}
        </div>
      );
  }
}

/* ── Hai script đang chạy ở cột trái ──────────────────────────── */

const RUN_NAMES = [
  "gaconlonton",
  "mikevu_92",
  "bap_ngo",
  "linhpham_vn",
  "tho_con_04",
  "haiyen_2k",
];

type Job = { name: string; cur: number; tot: number };

const INITIAL_JOBS: Job[] = [
  { name: "gaconlonton", cur: 16, tot: 25 },
  { name: "mikevu_92", cur: 7, tot: 25 },
];

function RunningScripts() {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);

  // Tiến độ vẫn nhích dù đang xem màn nào — đúng ý mà section này đang nói.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let id: ReturnType<typeof setInterval> | null = null;

    const step = () =>
      setJobs((prev) =>
        prev.map((j) => {
          if (Math.random() < 0.55) return j;
          const cur = j.cur + 1;
          if (cur > j.tot) {
            return {
              name: RUN_NAMES[Math.floor(Math.random() * RUN_NAMES.length)],
              cur: 1,
              tot: 18 + Math.floor(Math.random() * 14),
            };
          }
          return { ...j, cur };
        }),
      );

    const start = () => {
      if (!id) id = setInterval(step, 1700);
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

  return (
    <div className="ui-runs" aria-hidden="true">
      <p>
        Script đang chạy <b>{jobs.length}</b>
      </p>
      {jobs.map((j, i) => (
        <div className="run" key={i}>
          <span>{j.name}</span>
          <div className="bar">
            <div style={{ width: `${Math.round((j.cur / j.tot) * 100)}%` }} />
          </div>
          <u>
            {j.cur}/{j.tot}
          </u>
        </div>
      ))}
    </div>
  );
}

/* ── Cửa sổ ───────────────────────────────────────────────────── */

const TAB_KEYS = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.key));

export function AppWindow() {
  const [active, setActive] = useState<ViewKey>(DEFAULT_VIEW);
  const tabRefs = useRef(new Map<ViewKey, HTMLButtonElement>());
  const view = VIEWS[active];

  const move = (to: ViewKey) => {
    setActive(to);
    tabRefs.current.get(to)?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const at = TAB_KEYS.indexOf(active);
    if (at < 0) return;
    let to = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") to = (at + 1) % TAB_KEYS.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
      to = (at - 1 + TAB_KEYS.length) % TAB_KEYS.length;
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = TAB_KEYS.length - 1;
    if (to < 0) return;
    e.preventDefault();
    move(TAB_KEYS[to]);
  };

  return (
    <div className="win">
      <div className="win-bar">
        <span className="win-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="win-name">Trại Gà</span>
      </div>
      <div className="win-body">
        <aside className="ui-side">
          <div className="ui-brand" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/assets/logo-96.png")} alt="" width={26} height={26} />
            <div>
              <strong>
                Trại Gà <em>HUB</em>
              </strong>
              <span>
                <b>247</b>/312 đang chạy
              </span>
            </div>
          </div>

          <div
            className="ui-nav"
            role="tablist"
            aria-orientation="vertical"
            aria-label="Màn hình trong app"
            onKeyDown={onKeyDown}
          >
            {NAV_GROUPS.map((group, gi) => (
              // Fragment chứ không phải div: chèn thêm thẻ vào giữa tablist và
              // tab sẽ làm trình đọc màn hình mất quan hệ cha–con.
              <Fragment key={group.heading ?? `g${gi}`}>
                {group.heading && <p>{group.heading}</p>}
                {group.items.map((item) => {
                  const on = item.key === active;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      id={`uitab-${item.key}`}
                      role="tab"
                      aria-selected={on}
                      aria-controls="uiMain"
                      tabIndex={on ? 0 : -1}
                      className={on ? "on" : undefined}
                      onClick={() => setActive(item.key)}
                      ref={(el) => {
                        if (el) tabRefs.current.set(item.key, el);
                        else tabRefs.current.delete(item.key);
                      }}
                    >
                      <i className={`sq ${item.tone}`} />
                      {item.label}
                      {item.badge && <u>{item.badge}</u>}
                      {item.live && <span className="live" />}
                    </button>
                  );
                })}
              </Fragment>
            ))}
          </div>

          <RunningScripts />

          <div className="ui-foot" aria-hidden="true">
            <span>ENGINE</span>
            <i className="live" />
          </div>
        </aside>

        <div
          className="ui-main swap"
          id="uiMain"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`uitab-${active}`}
        >
          {/* key → remount ba tầng nội dung để animation .swap chạy lại */}
          <div className="ui-head" key={`h-${active}`}>
            <div className="ui-ttl">
              <h3>{view.t}</h3>
              <p>{view.s}</p>
            </div>
            <div className="ui-btns">
              {view.b.map(([cls, label]) => (
                <span className={cls} key={label}>
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="ui-fill" key={`f-${active}`}>
            <BodyView body={view.body} />
          </div>

          <div className="ui-stat" key={`s-${active}`}>
            {view.st.map(([label, value]) => (
              <div key={label}>
                <b>{label}</b>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
