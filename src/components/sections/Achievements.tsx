"use client";

import { useEffect, useRef } from "react";
import { ACHIEVEMENTS } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";
import { Css } from "../ui/Css";
import { SectionHeading } from "../ui/SectionHeading";
import { TechLogo } from "../ui/TechLogo";

const css = `
.ach{position:relative}
.ach-pin{position:sticky;top:0;height:100svh;overflow:hidden;display:flex;flex-direction:column;justify-content:center;gap:clamp(24px,5vh,56px)}
.ach-head{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:20px}
.ach-head .h-section{font-size:clamp(40px,5.6vw,80px)}
.ach-prog{display:flex;align-items:center;gap:12px;font-family:var(--font-mono);font-size:11.5px;color:var(--mute);letter-spacing:.04em}
.ach-bar{width:clamp(120px,16vw,220px);height:2px;background:var(--line);overflow:hidden;border-radius:2px}
.ach-bar i{display:block;height:100%;background:var(--ink);transform-origin:0 50%;transform:scaleX(var(--p,0))}
.ach-track{display:flex;gap:clamp(14px,1.6vw,22px);padding:16px var(--gutter) 30px;width:max-content;will-change:transform;list-style:none;margin:0}
.ach-card{position:relative;flex:none;width:clamp(300px,40vw,540px);height:clamp(260px,36vh,310px);border-radius:28px;background:var(--card);box-shadow:var(--hair),0 14px 40px -30px rgba(13,13,13,.25);padding:clamp(20px,2vw,28px);isolation:isolate;display:flex;flex-direction:column;justify-content:space-between;transition:transform .8s var(--ease),box-shadow .8s var(--ease)}
.ach-card.is-near{transform:translateY(-12px);box-shadow:var(--hair),0 40px 80px -36px rgba(13,13,13,.38),0 14px 30px -22px rgba(13,13,13,.25)}
.ach-top{display:flex;justify-content:space-between;align-items:flex-start}
.ach-logo{position:relative;width:72px;height:72px;border-radius:20px;background:var(--paper);display:grid;place-items:center;color:var(--ink);box-shadow:var(--hair)}
.ach-logo::before{content:"";position:absolute;inset:-18px;border-radius:50%;background:radial-gradient(closest-side,rgba(13,13,13,.12),transparent);opacity:.5;transition:opacity .8s var(--ease),transform .8s var(--ease);z-index:-1}
.ach-card.is-near .ach-logo::before{opacity:1;transform:scale(1.15)}
.ach-idx{font-family:var(--font-mono);font-size:12px;color:var(--mute)}
.ach-bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:16px}
.ach-label{font-weight:700;letter-spacing:-.03em;font-size:20px;line-height:1.1}
.ach-cap{font-size:14px;color:var(--ink-2);margin-top:4px}
.ach-detail{font-size:12.5px;color:var(--mute);margin-top:8px;max-width:24ch}
.ach-num{font-weight:700;letter-spacing:-.065em;line-height:.8;font-size:clamp(72px,8.4vw,128px);white-space:nowrap;font-variant-numeric:tabular-nums}
.ach-num small{font-size:.42em;letter-spacing:-.03em;margin-left:2px;vertical-align:top;position:relative;top:.12em}
.ach-num .pre{margin:0 2px 0 0}
.ach-end{flex:none;width:clamp(220px,22vw,300px);display:grid;place-items:center;border-radius:28px;border:1.5px dashed rgba(13,13,13,.25);font-family:var(--font-serif);font-style:italic;font-size:clamp(28px,2.8vw,40px);color:var(--mute)}
@media (max-width: 640px){
  .ach-card{width:min(340px,calc(100vw - 2 * var(--gutter)))}
}
`;

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  // Pinned horizontal travel.
  useEffect(() => {
    const section = sectionRef.current!;
    const pin = pinRef.current!;
    const track = trackRef.current!;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".ach-card"));
    const reduce = prefersReducedMotion();
    const counted = new Set<HTMLElement>();
    // Server HTML carries the real values; reset to 0 so they can count up.
    if (!reduce) cards.forEach((c) => c.querySelector<HTMLElement>("[data-count]")!.textContent = "0");
    const countUp = (card: HTMLElement) => {
      counted.add(card);
      const el = card.querySelector<HTMLElement>("[data-count]")!;
      const to = Number(el.dataset.count);
      if (reduce) return;
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / 1400);
        el.textContent = String(Math.round(easeOutQuart(t) * to));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    let travel = 0;
    let raf = 0;
    let near: HTMLElement | null = null;

    const layout = () => {
      travel = Math.max(0, track.scrollWidth - pin.clientWidth);
      section.style.height = `${pin.offsetHeight + travel}px`;
      update();
    };
    const update = () => {
      raf = 0;
      const top = section.getBoundingClientRect().top;
      const p = travel > 0 ? Math.min(1, Math.max(0, -top / travel)) : 0;
      track.style.transform = `translate3d(${(-p * travel).toFixed(1)}px,0,0)`;
      barRef.current?.style.setProperty("--p", p.toFixed(4));
      if (pctRef.current) pctRef.current.textContent = `${String(Math.round(p * 100)).padStart(2, "0")}%`;
      const mid = window.innerWidth / 2;
      const pinIn = section.getBoundingClientRect().bottom > window.innerHeight * 0.5 && top < window.innerHeight * 0.5;
      let best: HTMLElement | null = null;
      let bestD = Infinity;
      for (const c of cards) {
        const r = c.getBoundingClientRect();
        // First time a card is at least 60% on screen: count its number up.
        if (pinIn && !counted.has(c) && Math.min(r.right, window.innerWidth) - Math.max(r.left, 0) >= r.width * 0.6) countUp(c);
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = c;
        }
      }
      if (best !== near) {
        near?.classList.remove("is-near");
        best?.classList.add("is-near");
        near = best;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(pin);
    ro.observe(track);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const total = String(ACHIEVEMENTS.length).padStart(2, "0");

  return (
    <section ref={sectionRef} id="achievements" className="ach" aria-labelledby="achievements-title">
      <Css id="ach">{css}</Css>
      <div ref={pinRef} className="ach-pin">
        <div className="wrap ach-head">
          <SectionHeading id="achievements-title" tag="06 — By the numbers" title="Numbers that" accent="shipped." />
          <div className="ach-prog" aria-hidden="true">
            <span ref={pctRef}>00%</span>
            <div className="ach-bar" ref={barRef}>
              <i />
            </div>
            <span>scroll</span>
          </div>
        </div>
        <ol ref={trackRef} className="ach-track">
          {ACHIEVEMENTS.map((a, i) => (
            <li key={a.label} className="ach-card" aria-label={`${a.prefix ?? ""}${a.value}${a.suffix ?? ""} ${a.label} — ${a.caption}. ${a.detail}.`}>
              <div className="ach-top" aria-hidden="true">
                <div className="ach-logo">
                  <TechLogo name={a.icon} label="" size={30} />
                </div>
                <span className="ach-idx">
                  {String(i + 1).padStart(2, "0")} / {total}
                </span>
              </div>
              <div className="ach-bottom" aria-hidden="true">
                <div>
                  <p className="ach-label">{a.label}</p>
                  <p className="ach-cap">{a.caption}</p>
                  <p className="ach-detail">{a.detail}</p>
                </div>
                <p className="ach-num">
                  {a.prefix && <small className="pre">{a.prefix}</small>}
                  <span data-count={a.value}>{a.value}</span>
                  {a.suffix && <small>{a.suffix}</small>}
                </p>
              </div>
            </li>
          ))}
          <li className="ach-end" aria-hidden="true">
            and counting →
          </li>
        </ol>
      </div>
    </section>
  );
}
