"use client";

import { useRef } from "react";
import { PATH } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";
import { Css } from "../ui/Css";
import { SectionHeading } from "../ui/SectionHeading";

const css = `
.tl{position:relative;margin:56px 0 0;--x:168px}
.tl ol{list-style:none;margin:0;padding:0}
.tl-spine,.tl-track{position:absolute;left:var(--x);top:8px;bottom:8px;width:2px;margin-left:-1px;border-radius:2px}
.tl-track{background:var(--line)}
.tl-spine{background:var(--ink);transform-origin:50% 0;transform:scaleY(var(--p,0))}
.tl-stop{position:relative;display:grid;grid-template-columns:calc(var(--x) - 36px) 72px minmax(0,1fr);align-items:start;padding:22px 0}
.tl-year{font-family:var(--font-mono);font-size:13px;color:var(--mute);padding-top:6px;text-align:right;transition:color .6s var(--ease)}
.tl-dot{justify-self:center;margin-top:8px;width:14px;height:14px;border-radius:50%;background:var(--paper);box-shadow:inset 0 0 0 2px var(--faint);transition:box-shadow .5s var(--ease),transform .6s var(--ease),background-color .5s}
.tl-card{padding:4px 0 6px;transform:translateX(-6px);transition:transform .8s var(--ease)}
.tl-title{color:var(--mute);transition:color .6s var(--ease)}
.tl-stop.is-lit .tl-title{color:var(--ink)}
.tl-kind{display:inline-block;font-family:var(--font-mono);font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute);margin-bottom:6px}
.tl-title{font-weight:700;letter-spacing:-.035em;font-size:clamp(22px,2.4vw,34px);line-height:1.08}
.tl-place{margin-top:4px;font-size:15px;font-weight:500;color:var(--ink-2)}
.tl-detail{margin-top:8px;font-size:15px;color:var(--mute);max-width:62ch}
.tl-stop.is-lit .tl-year{color:var(--ink)}
.tl-stop.is-lit .tl-dot{background:var(--ink);box-shadow:inset 0 0 0 2px var(--ink),0 0 0 6px rgba(13,13,13,.07);transform:scale(1.1)}
.tl-stop.is-lit .tl-card{transform:none}
.tl-next{margin:34px 0 0 calc(var(--x) + 36px);padding:28px 30px;border-radius:26px;border:1.5px dashed rgba(13,13,13,.28);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px}
.tl-next p{font-weight:700;letter-spacing:-.04em;font-size:clamp(26px,3vw,40px);line-height:1}
.tl-next small{display:block;font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute);font-weight:500;margin-bottom:8px}
@media (max-width: 720px){
  .tl{--x:10px}
  .tl-stop{grid-template-columns:20px minmax(0,1fr);gap:10px}
  .tl-dot{grid-column:1;grid-row:1 / span 2;margin-top:4px}
  .tl-year{grid-column:2;text-align:left;padding-top:0}
  .tl-card{grid-column:2}
  .tl-next{margin-left:30px;padding:22px}
}
@media (prefers-reduced-motion: reduce){.tl-card{transform:none}}
`;

export default function Experience() {
  const listRef = useRef<HTMLDivElement>(null);

  useScrollProgress(
    listRef,
    (p, el) => {
      el.style.setProperty("--p", p.toFixed(4));
      const reach = p * el.offsetHeight;
      el.querySelectorAll<HTMLElement>(".tl-stop").forEach((stop) => {
        stop.classList.toggle("is-lit", stop.offsetTop + 18 <= reach || p >= 0.999);
      });
    },
    { start: 0.68, end: 0.68 },
  );

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <Css id="exp">{css}</Css>
      <div className="wrap">
        <SectionHeading id="experience-title" tag="05 — Path" title="The path" accent="so far." />
        <div ref={listRef} className="tl">
          <span className="tl-track" aria-hidden="true" />
          <span className="tl-spine" aria-hidden="true" />
          <ol>
          {PATH.map((s) => (
            <li key={`${s.title}-${s.start}`} className="tl-stop">
              <span className="tl-year">{s.year}</span>
              <span className="tl-dot" aria-hidden="true" />
              <div className="tl-card">
                <span className="tl-kind">{s.kind === "work" ? "Experience" : "Education"}</span>
                <h3 className="tl-title">{s.title}</h3>
                <p className="tl-place">{s.place}</p>
                <p className="tl-detail">{s.detail}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>
        <div className="tl-next rv">
          <p>
            <small>Next</small>
            Your team<span className="serif">?</span>
          </p>
          <a href="#contact" className="btn btn-primary">
            Let&apos;s talk →
          </a>
        </div>
      </div>
    </section>
  );
}
