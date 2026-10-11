"use client";

import { useRef, useState } from "react";
import { FAMILIES, SKILLS, type Family } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import { Css } from "../ui/Css";
import { SectionHeading } from "../ui/SectionHeading";
import { TechLogo, brandTint, isBrand } from "../ui/TechLogo";

const SHORT: Record<Family, string> = {
  Languages: "Lang",
  "Frontend & Mobile": "Front",
  Backend: "Back",
  "Cloud & Infra": "Cloud",
  Release: "Release",
  "AI / GenAI": "AI",
  "Ship & Stores": "Ship",
  Program: "Program",
};

const css = `
.sk-head{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:28px;margin-bottom:44px}
.sk-chips{display:flex;flex-wrap:wrap;gap:8px;max-width:640px}
.sk-chip{height:34px;padding:0 14px;border-radius:999px;font-size:13px;font-weight:500;color:var(--ink-2);background:var(--card);box-shadow:var(--hair);transition:background-color .4s var(--ease),color .4s var(--ease),transform .4s var(--ease)}
.sk-chip:hover{transform:translateY(-1px)}
.sk-chip[aria-pressed="true"]{background:var(--ink);color:#fff}
.sk-layout{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:clamp(20px,3vw,40px);align-items:start}
.sk-table{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:8px;list-style:none;margin:0;padding:0}
.sk-tile{position:relative;width:100%;aspect-ratio:1/1.08;display:flex;flex-direction:column;justify-content:space-between;text-align:left;padding:9px 10px 8px;border-radius:14px;background:var(--card);box-shadow:var(--hair);opacity:0;transform:translateY(14px) scale(.96);transition:opacity .7s var(--ease),transform .8s var(--ease),background-color .35s var(--ease),color .35s var(--ease),box-shadow .35s var(--ease);transition-delay:calc(var(--d8) * 1ms),calc(var(--d8) * 1ms),0s,0s,0s}
.sk-on .sk-tile{opacity:1;transform:none}
.sk-tile:hover,.sk-tile:focus-visible{transform:translateY(-3px);box-shadow:var(--hair),0 16px 30px -18px rgba(13,13,13,.35)}
.sk-tile.is-active{background:var(--ink);color:#fff}
.sk-tile.is-active .sk-num,.sk-tile.is-active .sk-fam{color:rgba(255,255,255,.6)}
.sk-on .sk-tile.is-dim{opacity:.18;transform:scale(.97)}
.sk-num{font-family:var(--font-mono);font-size:10px;color:var(--mute)}
.sk-sym{font-weight:700;letter-spacing:-.04em;font-size:clamp(18px,2vw,28px);line-height:1}
.sk-name{font-size:11px;font-weight:500;line-height:1.15;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sk-fam{font-family:var(--font-mono);font-size:9px;letter-spacing:.04em;text-transform:uppercase;color:var(--mute)}
.sk-inspect{position:sticky;top:96px;padding:26px;border-radius:28px}
.sk-logo{position:relative;height:190px;display:grid;place-items:center;border-radius:20px;background:var(--paper);overflow:hidden}
.sk-logo::before{content:"";position:absolute;inset:-20%;background:radial-gradient(closest-side,var(--tint),transparent 70%);opacity:.22;transition:background .5s}
.sk-logo > *{position:relative;animation:sk-pop .7s var(--ease) both;color:var(--ink)}
@keyframes sk-pop{from{opacity:0;transform:scale(.6) rotate(-8deg)}}
.sk-meta{display:flex;justify-content:space-between;margin-top:20px;font-family:var(--font-mono);font-size:11px;color:var(--mute);letter-spacing:.04em;text-transform:uppercase}
.sk-title{font-weight:700;letter-spacing:-.04em;font-size:30px;line-height:1.05;margin-top:8px}
.sk-used{margin-top:18px;padding-top:16px;border-top:1px solid var(--line)}
.sk-used h4{font-family:var(--font-mono);font-size:11px;color:var(--mute);letter-spacing:.04em;text-transform:uppercase;font-weight:500}
.sk-used ul{display:flex;flex-wrap:wrap;gap:6px;list-style:none;padding:0;margin:10px 0 0}
.sk-used p{margin-top:10px;font-size:14px;color:var(--ink-2)}
@media (max-width: 980px){
  .sk-layout{grid-template-columns:minmax(0,1fr)}
  .sk-inspect{position:relative;top:0}
}
@media (max-width: 640px){
  .sk-table{grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}
  .sk-tile{transition-delay:calc(var(--d4) * 1ms),calc(var(--d4) * 1ms),0s,0s,0s;padding:7px 7px 6px;border-radius:12px}
  .sk-name{font-size:10px}
}
`;

export default function Skills() {
  const tableRef = useRef<HTMLUListElement>(null);
  const on = useInView(tableRef, { once: true, rootMargin: "0px 0px -10% 0px" });
  const [filter, setFilter] = useState<Family | "All">("All");
  const [active, setActive] = useState(0);
  const skill = SKILLS[active];

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <Css id="skills">{css}</Css>
      <div className="wrap">
        <div className="sk-head">
          <SectionHeading id="skills-title" tag="02 — Stack" title="The periodic table of my" accent="stack." />
          <div className="sk-chips rv" role="group" aria-label="Filter skills by family">
            {(["All", ...FAMILIES] as const).map((f) => (
              <button key={f} type="button" className="sk-chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="sk-layout">
          <ul ref={tableRef} className={`sk-table${on ? " sk-on" : ""}`} aria-label="Skills">
            {SKILLS.map((s, i) => {
              const dim = filter !== "All" && s.family !== filter;
              const d8 = (Math.floor(i / 8) + (i % 8)) * 40;
              const d4 = (Math.floor(i / 4) + (i % 4)) * 40;
              return (
                <li key={s.name}>
                  <button
                    type="button"
                    className={`sk-tile${i === active ? " is-active" : ""}${dim ? " is-dim" : ""}`}
                    style={{ ["--d8" as string]: d8, ["--d4" as string]: d4 }}
                    aria-label={`${s.name}, ${s.family}`}
                    aria-describedby="sk-inspect"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                  >
                    <span className="sk-num">{i + 1}</span>
                    <span className="sk-sym">{s.symbol}</span>
                    <span>
                      <span className="sk-name" style={{ display: "block" }}>
                        {s.name}
                      </span>
                      <span className="sk-fam">{SHORT[s.family]}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <aside id="sk-inspect" className="card sk-inspect" aria-label="Skill details">
            <div className="sk-logo" style={{ ["--tint" as string]: isBrand(skill.logo) ? brandTint(skill.logo) : "#77756f" }}>
              <TechLogo key={skill.name} name={skill.logo} label={skill.name} size={isBrand(skill.logo) ? 150 : 120} />
            </div>
            <div className="sk-meta">
              <span>No. {String(active + 1).padStart(2, "0")}</span>
              <span>{skill.symbol}</span>
            </div>
            <h3 className="sk-title">{skill.name}</h3>
            <p className="sk-fam" style={{ marginTop: 6 }}>
              {skill.family}
            </p>
            <div className="sk-used">
              <h4>Used in</h4>
              {skill.usedIn.length ? (
                <ul>
                  {skill.usedIn.map((u) => (
                    <li key={u} className="chip">
                      {u}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Part of my core stack (résumé).</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
