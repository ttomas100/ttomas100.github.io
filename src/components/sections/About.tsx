"use client";

import { useEffect, useRef, useState } from "react";
import { CERTIFICATIONS, PROFILE } from "@/lib/data";
import { prefersReducedMotion, useInView } from "@/lib/hooks";
import { Css } from "../ui/Css";
import { SectionHeading } from "../ui/SectionHeading";

const css = `
.about-grid{display:grid;grid-template-columns:minmax(0,1fr) 320px minmax(0,1fr);gap:clamp(24px,3.4vw,56px);align-items:stretch}
.about-col{display:flex;flex-direction:column;gap:26px;min-width:0}
.about-actions{display:flex;flex-wrap:wrap;gap:10px}
.about-extra{font-size:15px;color:var(--mute)}
.about-center{position:relative;min-height:560px}
.lan{position:absolute;top:calc(-1 * var(--section-y));left:50%;width:300px;margin-left:-150px;transform-origin:50% 0;will-change:transform}
.lan-strap{position:relative;margin:0 auto;width:30px;height:calc(var(--section-y) + 56px);background:var(--ink);overflow:hidden;border-radius:0 0 3px 3px;box-shadow:inset 3px 0 0 rgba(255,255,255,.06),inset -3px 0 0 rgba(0,0,0,.4)}
.lan-text{position:absolute;left:0;top:0;width:100%;writing-mode:vertical-rl;font-family:var(--font-mono);font-size:10px;letter-spacing:.18em;color:rgba(255,255,255,.78);text-transform:uppercase;line-height:30px;white-space:nowrap;animation:lan-run 18s linear infinite}
@keyframes lan-run{to{transform:translateY(-50%)}}
.lan-clip{position:relative;margin:-2px auto 0;width:40px;height:30px}
.lan-clip::before{content:"";position:absolute;left:8px;top:0;width:24px;height:14px;border-radius:4px 4px 2px 2px;background:linear-gradient(180deg,#e6e4df,#9c9a95 55%,#d6d4cf);box-shadow:inset 0 0 0 1px rgba(0,0,0,.18)}
.lan-clip::after{content:"";position:absolute;left:14px;top:11px;width:12px;height:19px;border-radius:0 0 7px 7px;border:2.5px solid #a8a6a1;border-top:0}
.idc{position:relative;width:300px;height:404px;margin-top:-6px;perspective:1400px;cursor:pointer;border-radius:22px}
.idc-inner{position:absolute;inset:0;transform-style:preserve-3d;transition:transform 1s var(--ease)}
.idc.is-flipped .idc-inner{transform:rotateY(180deg)}
@media (hover:hover) and (pointer:fine){.idc:hover .idc-inner{transform:rotateY(180deg)}}
.idc-face{position:absolute;inset:0;border-radius:22px;background:var(--card);box-shadow:var(--hair),var(--shadow-soft);overflow:hidden;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;flex-direction:column}
.idc-back{transform:rotateY(180deg);padding:26px 24px 22px}
.idc-band{height:42px;background:var(--ink);color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 18px;font-family:var(--font-mono);font-size:11px;letter-spacing:.2em;flex:none;position:relative}
.idc-band::after{content:"";position:absolute;left:50%;top:9px;width:40px;height:7px;margin-left:-20px;border-radius:9px;background:var(--paper);box-shadow:inset 0 1px 2px rgba(0,0,0,.35)}
.idc-body{display:flex;flex-direction:column;align-items:center;padding:14px 20px 12px;flex:1;min-height:0}
.idc-photo{position:relative;width:128px;height:156px;padding:3px;border-radius:18px;background:linear-gradient(150deg,#ecebe7,#8f8c86 45%,#d7d4ce 70%,#6f6c66);box-shadow:0 0 0 8px rgba(13,13,13,.025),0 18px 36px -16px rgba(13,13,13,.45)}
.idc-photo::before{content:"";position:absolute;inset:-26px;border-radius:50%;background:radial-gradient(closest-side,rgba(13,13,13,.08),transparent);z-index:-1}
.idc-photo div{width:100%;height:100%;border-radius:15px;overflow:hidden;background:#fff}
.idc-photo img{width:100%;height:100%;object-fit:cover;transition:transform .9s var(--ease)}
.idc:hover .idc-photo img{transform:scale(1.07)}
.idc-name{margin-top:10px;font-weight:700;letter-spacing:-.03em;font-size:20px;line-height:1.1}
.idc-role{font-size:12px;color:var(--mute);margin-top:3px;text-align:center}
.idc-rows{width:100%;margin-top:8px;font-size:11.5px}
.idc-rows div{display:flex;justify-content:space-between;gap:10px;padding:3px 0;border-top:1px solid var(--line)}
.idc-rows dt{font-family:var(--font-mono);color:var(--mute);font-size:10.5px;letter-spacing:.04em;text-transform:uppercase}
.idc-rows dd{margin:0;font-weight:600;text-align:right}
.idc-foot{display:flex;align-items:flex-end;justify-content:space-between;width:100%;margin-top:auto;padding-top:6px}
.idc-bar{display:flex;flex-direction:column;gap:3px}
.idc-bar i{display:block;width:150px;height:20px;background:var(--bars)}
.idc-bar span{font-family:var(--font-mono);font-size:9px;letter-spacing:.24em;color:var(--mute)}
.idc-holo{width:40px;height:40px;border-radius:50%;background:conic-gradient(from var(--a,0deg),#f4f4f2,#bdbbb6,#fafafa,#8e8c87,#e2e0db,#a9a7a2,#f4f4f2);box-shadow:inset 0 0 0 1px rgba(0,0,0,.08);display:grid;place-items:center;font-family:var(--font-mono);font-size:9px;font-weight:700;color:rgba(13,13,13,.55);animation:holo 6s linear infinite}
@property --a{syntax:"<angle>";inherits:false;initial-value:0deg}
@keyframes holo{to{--a:360deg}}
.idc-back h3{font-family:var(--font-mono);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--mute)}
.idc-back ol{list-style:none;padding:0;margin:14px 0 0;display:flex;flex-direction:column;gap:9px;font-size:13px;line-height:1.35}
.idc-back li{display:grid;grid-template-columns:22px 1fr;gap:4px}
.idc-back li span{font-family:var(--font-mono);font-size:10.5px;color:var(--mute);padding-top:2px}
.idc-sig{margin-top:auto;font-family:var(--font-serif);font-style:italic;font-size:30px;letter-spacing:-.02em;border-bottom:1px solid var(--line);padding-bottom:4px}
.idc-found{margin-top:8px;font-size:11px;color:var(--mute);word-break:break-word}
.idc-hint{position:absolute;left:0;right:0;bottom:-34px;text-align:center;font-family:var(--font-mono);font-size:11px;color:var(--mute);letter-spacing:.04em}
.facts{display:flex;flex-direction:column}
.facts h3{font-family:var(--font-mono);font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:var(--mute);margin-bottom:8px}
.facts dl{margin:0}
.facts div{display:grid;grid-template-columns:110px minmax(0,1fr);gap:12px;padding:15px 0;border-top:1px solid var(--line);font-size:15px}
.facts div:last-child{border-bottom:1px solid var(--line)}
.facts dt{color:var(--mute);font-size:13.5px}
.facts dd{margin:0;font-weight:600;letter-spacing:-.01em;overflow-wrap:anywhere}
.about-quote{margin-top:auto;font-family:var(--font-serif);font-style:italic;font-size:clamp(24px,2.2vw,32px);line-height:1.15;letter-spacing:-.015em;color:var(--ink)}
.about-quote::before{content:"“";display:block;font-size:56px;line-height:.6;color:var(--faint)}
.about-quote footer{margin-top:12px;font-family:var(--font-mono);font-style:normal;font-size:11px;color:var(--mute);letter-spacing:.04em;text-transform:uppercase}
@media (max-width: 1080px){
  .about-grid{grid-template-columns:minmax(0,1fr) 320px}
  .about-right{grid-column:1 / -1}
}
@media (max-width: 760px){
  .about-grid{grid-template-columns:minmax(0,1fr)}
  .about-center{order:-1;min-height:520px}
  .lan{top:0}
  .lan-strap{height:56px}
  .about-right{grid-column:auto}
}
`;

/** Deterministic barcode stripes from a string (decorative). */
function barcode(text: string) {
  const stops: string[] = [];
  let x = 0;
  for (let i = 0; i < text.length && x < 150; i++) {
    const c = text.charCodeAt(i);
    const w = 1 + (c % 3);
    const gap = 1 + ((c >> 2) % 3);
    stops.push(`#0d0d0d ${x}px ${x + w}px`, `transparent ${x + w}px ${x + w + gap}px`);
    x += w + gap;
  }
  return `linear-gradient(90deg, ${stops.join(", ")}, transparent ${x}px)`;
}

const STRAP = `${PROFILE.name} · ${PROFILE.role} · `;

function useLanyard(sectionRef: React.RefObject<HTMLElement | null>, lanRef: React.RefObject<HTMLDivElement | null>) {
  const inView = useInView(sectionRef, { rootMargin: "100px" });
  useEffect(() => {
    const lan = lanRef.current;
    const section = sectionRef.current;
    if (!inView || !lan || !section || prefersReducedMotion()) return;
    let angle = 0;
    let vel = 0;
    let last = performance.now();
    let lastMove = 0;
    let px = 0;
    let pt = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (pt) {
        const dt = Math.max(8, now - pt);
        const vx = (e.clientX - px) / dt; // px per ms
        const r = lan.getBoundingClientRect();
        const dist = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height * 0.7));
        const near = Math.max(0, 1 - dist / 700);
        vel += Math.max(-60, Math.min(60, vx * 38 * near));
      }
      px = e.clientX;
      pt = now;
      lastMove = now;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const idle = now - lastMove > 1600;
      const target = idle ? Math.sin(now / 1100) * 1.8 : 0;
      const acc = -26 * (angle - target) - 3.4 * vel;
      vel += acc * dt;
      angle = Math.max(-22, Math.min(22, angle + vel * dt));
      lan.style.transform = `rotate(${angle.toFixed(3)}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    section.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove);
    };
  }, [inView, lanRef, sectionRef]);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const lanRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const pointerType = useRef<string>("mouse");
  useLanyard(sectionRef, lanRef);

  const cornell = CERTIFICATIONS[0];

  return (
    <section ref={sectionRef} id="about" className="section" aria-labelledby="about-title">
      <Css id="about">{css}</Css>
      <div className="wrap about-grid">
        <div className="about-col">
          <SectionHeading id="about-title" tag="01 — About" title="Hi, I'm" accent={`${PROFILE.firstName}.`} />
          <p className="lede rv">{PROFILE.resumeSummary}</p>
          <p className="about-extra rv">
            {PROFILE.languages}. Two-time Ironman finisher, training for Ironman 70.3.
          </p>
          <div className="about-actions rv">
            <a href={PROFILE.resume} download className="btn btn-primary">
              Résumé ↓
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
              GitHub ↗
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="about-center">
          <div className="lan" ref={lanRef}>
            <div className="lan-strap" aria-hidden="true">
              <span className="lan-text">{STRAP.repeat(6)}</span>
            </div>
            <div className="lan-clip" aria-hidden="true" />
            <div
              className={`idc${flipped ? " is-flipped" : ""}`}
              role="button"
              tabIndex={0}
              aria-pressed={flipped}
              aria-labelledby="idc-label"
              onPointerDown={(e) => (pointerType.current = e.pointerType)}
              onClick={() => {
                if (pointerType.current !== "mouse") setFlipped((f) => !f);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setFlipped((f) => !f);
                }
              }}
            >
              <span id="idc-label" className="sr-only">
                ID card for {PROFILE.name}. Press to flip and read the back.
              </span>
              <div className="idc-inner">
                <div className="idc-face" aria-hidden={flipped}>
                  <div className="idc-band">
                    <span>PROGRAM ID</span>
                    <span>{PROFILE.initials}</span>
                  </div>
                  <div className="idc-body">
                    <div className="idc-photo">
                      <div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/portrait-bust.webp" alt={`Portrait of ${PROFILE.name} (3D character)`} width={122} height={150} loading="lazy" />
                      </div>
                    </div>
                    <p className="idc-name">{PROFILE.name}</p>
                    <p className="idc-role">{PROFILE.role}</p>
                    <dl className="idc-rows">
                      <div>
                        <dt>Dept.</dt>
                        <dd>Launches &amp; Programs</dd>
                      </div>
                      <div>
                        <dt>Focus</dt>
                        <dd>AI / GenAI</dd>
                      </div>
                      <div>
                        <dt>Based</dt>
                        <dd>{PROFILE.location}</dd>
                      </div>
                    </dl>
                    <div className="idc-foot">
                      <div className="idc-bar">
                        <i style={{ ["--bars" as string]: barcode(PROFILE.email + PROFILE.githubHandle) }} />
                        <span>{PROFILE.githubHandle.toUpperCase()}</span>
                      </div>
                      <div className="idc-holo">{PROFILE.initials}</div>
                    </div>
                  </div>
                </div>
                <div className="idc-face idc-back" aria-hidden={!flipped}>
                  <h3>What I am</h3>
                  <ol>
                    <li>
                      <span>01</span>
                      {PROFILE.role} — 10+ years of launches
                    </li>
                    <li>
                      <span>02</span>HBO Max, Max &amp; Discovery+ to 100M+ users
                    </li>
                    <li>
                      <span>03</span>Apple News &amp; Stocks launch trains
                    </li>
                    <li>
                      <span>04</span>Founder / Lead Engineer of Aila
                    </li>
                    <li>
                      <span>05</span>
                      {cornell.issuer} AI Program, {cornell.year} · two-time Ironman
                    </li>
                  </ol>
                  <p className="idc-sig">{PROFILE.name}</p>
                  <p className="idc-found">If found, say hello · {PROFILE.email}</p>
                </div>
              </div>
            </div>
            <p className="idc-hint" aria-hidden="true">
              Hover or tap to flip
            </p>
          </div>
        </div>

        <div className="about-col about-right">
          <div className="facts rv">
            <h3>Quick facts</h3>
            <dl>
            <div>
              <dt>Location</dt>
              <dd>{PROFILE.location}</dd>
            </div>
            <div>
              <dt>Education</dt>
              <dd>
                {cornell.issuer} AI Program ({cornell.year}) · M.S., Marketing
              </dd>
            </div>
            <div>
              <dt>Current role</dt>
              <dd>{PROFILE.currentRole}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>English, Spanish</dd>
            </div>
            </dl>
          </div>
          <blockquote className="about-quote rv">
            <p>{PROFILE.quote}</p>
            <footer>— paraphrased from my résumé</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
