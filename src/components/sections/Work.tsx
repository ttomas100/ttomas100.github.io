"use client";

import { useState } from "react";
import { PROJECTS } from "@/lib/data";
import { Css } from "../ui/Css";
import { MiniUI } from "../ui/MiniUI";
import { SectionHeading } from "../ui/SectionHeading";
import { TechLogo } from "../ui/TechLogo";

const css = `
.wk-head{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:44px}
.wk-head p{max-width:360px;color:var(--mute);font-size:15px}
.wk-row{--spine:clamp(68px,6vw,92px);display:flex;gap:10px;height:min(78svh,600px)}
.wk-panel{position:relative;flex:0 0 var(--spine);min-width:0;border-radius:28px;background:var(--card);box-shadow:var(--hair);overflow:hidden;transition:flex 1s var(--ease),box-shadow .6s var(--ease)}
.wk-panel.is-open{flex:8 1 0;box-shadow:var(--hair),var(--shadow-soft)}
.wk-panel:has(.wk-spine:focus-visible){outline:2px solid var(--ink);outline-offset:3px}
.wk-spine{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:22px 0;text-align:center;transition:opacity .4s var(--ease)}
.wk-spine:focus-visible{outline:none}
.wk-panel.is-open .wk-spine{opacity:0;pointer-events:none}
.wk-spine-num{font-family:var(--font-mono);font-size:12px;color:var(--mute)}
.wk-spine-title{writing-mode:vertical-rl;transform:rotate(180deg);font-weight:700;letter-spacing:-.03em;font-size:20px;white-space:nowrap}
.wk-plus{width:38px;height:38px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(13,13,13,.2);display:grid;place-items:center;font-size:20px;line-height:1;transition:transform .6s var(--ease),background-color .4s,color .4s}
.wk-spine:hover .wk-plus{transform:rotate(90deg);background:var(--ink);color:#fff}
.wk-body{position:absolute;inset:0;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.95fr);gap:clamp(20px,2.4vw,36px);padding:clamp(22px,2.6vw,36px);min-width:calc(min(var(--maxw),100vw - 2 * var(--gutter)) - var(--closed) * (var(--spine) + 10px));opacity:0;transition:opacity .5s var(--ease)}
.wk-panel.is-open .wk-body{opacity:1;transition:opacity .8s .25s var(--ease)}
.wk-text{display:flex;flex-direction:column;min-width:0;overflow:auto;scrollbar-width:none}
.wk-kick{display:flex;gap:12px;align-items:baseline;font-family:var(--font-mono);font-size:12px;color:var(--mute);letter-spacing:.03em}
.wk-kick b{color:var(--ink);font-weight:600}
.wk-title{font-weight:700;letter-spacing:-.045em;line-height:1;font-size:clamp(30px,3.2vw,48px);margin-top:14px}
.wk-apps{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px}
.wk-desc{margin-top:16px;color:var(--ink-2);font-size:15px;line-height:1.55}
.wk-feats{display:grid;grid-template-columns:1fr 1fr;gap:10px 18px;list-style:none;padding:0;margin:20px 0 0;font-size:13.5px}
.wk-feats li{position:relative;padding-left:16px;color:var(--ink-2);line-height:1.4}
.wk-feats li::before{content:"";position:absolute;left:0;top:.55em;width:7px;height:1.5px;background:var(--ink)}
.wk-tech{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto;padding-top:20px}
.wk-tech .chip img,.wk-tech .chip svg,.wk-tech .chip [role=img]{flex:none}
.wk-ui{min-width:0;clip-path:inset(0 100% 0 0 round 22px);transition:clip-path .6s var(--ease)}
.wk-panel.is-open .wk-ui{clip-path:inset(0 0 0 0 round 22px);transition:clip-path 1.2s .35s var(--ease)}
@media (max-width: 900px){
  .wk-row{flex-direction:column;height:auto}
  .wk-panel,.wk-panel.is-open{flex:none;min-width:0;transition:box-shadow .6s var(--ease)}
  .wk-spine{position:relative;inset:auto;flex-direction:row;justify-content:flex-start;gap:16px;padding:20px 20px;height:76px}
  .wk-spine-title{writing-mode:horizontal-tb;transform:none;font-size:18px;flex:1;text-align:left;overflow:hidden;text-overflow:ellipsis}
  .wk-panel.is-open .wk-spine{opacity:1;pointer-events:auto}
  .wk-panel.is-open .wk-plus{transform:rotate(45deg)}
  .wk-body{position:relative;display:none;grid-template-columns:minmax(0,1fr);min-width:0;padding:0 20px 22px}
  .wk-panel.is-open .wk-body{display:grid}
  .wk-ui{height:320px}
  .wk-feats{grid-template-columns:1fr}
}
`;

export default function Work() {
  const [open, setOpen] = useState(0);

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <Css id="work">{css}</Css>
      <div className="wrap">
        <div className="wk-head">
          <SectionHeading id="work-title" tag="03 — Selected work" title="Things I've" accent="built." />
          <p className="rv">Launch programs at Apple, Warner Media and beIN — and two 0-to-1 builds. Hover, focus or tap a panel to open it.</p>
        </div>
        <div className="wk-row rv" style={{ ["--closed" as string]: PROJECTS.length - 1 }}>
          {PROJECTS.map((p, i) => {
            const isOpen = open === i;
            return (
              <article
                key={p.id}
                className={`wk-panel${isOpen ? " is-open" : ""}`}
                aria-labelledby={`wk-t-${p.id}`}
                onMouseEnter={(e) => {
                  if (window.matchMedia("(hover: hover) and (min-width: 901px)").matches && e.buttons === 0) setOpen(i);
                }}
              >
                <button
                  type="button"
                  className="wk-spine"
                  aria-expanded={isOpen}
                  aria-controls={`wk-b-${p.id}`}
                  onFocus={() => setOpen(i)}
                  onClick={() => setOpen(i)}
                >
                  <span className="wk-spine-num">{p.index}</span>
                  <span className="wk-spine-title" id={`wk-t-${p.id}`}>
                    {p.title}
                  </span>
                  <span className="wk-plus" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="wk-body" id={`wk-b-${p.id}`} inert={!isOpen}>
                  <div className="wk-text">
                    <p className="wk-kick">
                      <b>{p.index}</b>
                      {p.kicker}
                    </p>
                    <h3 className="wk-title">{p.title}</h3>
                    <ul className="wk-apps" aria-label="Apps and surfaces">
                      {p.apps.map((a) => (
                        <li key={a} className="chip">
                          {a}
                        </li>
                      ))}
                    </ul>
                    <p className="wk-desc">{p.description}</p>
                    <ul className="wk-feats">
                      {p.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    <ul className="wk-tech" aria-label="Tools and platforms">
                      {p.tech.map((t) => (
                        <li key={t.name} className="chip">
                          <TechLogo name={t.logo} label={t.name} size={16} />
                          {t.name}
                        </li>
                      ))}
                    </ul>
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ marginTop: 18, alignSelf: "flex-start" }}>
                        View on GitHub ↗
                      </a>
                    )}
                  </div>
                  <div className="wk-ui">{isOpen && <MiniUI kind={p.ui} apps={p.apps} />}</div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
