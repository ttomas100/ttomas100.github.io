"use client";

import { useState } from "react";
import { PROFILE } from "@/lib/data";
import { Css } from "../ui/Css";

const css = `
.ct{padding-bottom:40px}
.ct-h{font-weight:700;letter-spacing:-.055em;line-height:.95;font-size:clamp(46px,9.6vw,156px);margin-top:22px}
.ct-line{display:block}
.ct-w{display:inline-block;white-space:nowrap}
.ct-l{display:inline-block;will-change:transform}
.ct-l.hop{animation:ct-hop .6s var(--ease)}
@keyframes ct-hop{0%{transform:none}35%{transform:translateY(-.16em)}65%{transform:translateY(.03em)}100%{transform:none}}
.ct-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:40px;align-items:end;margin-top:clamp(40px,7vh,80px)}
.ct-mailrow{display:flex;flex-wrap:wrap;align-items:center;gap:14px 18px}
.ct-mail{font-weight:600;letter-spacing:-.035em;font-size:clamp(22px,3.4vw,46px);line-height:1.1;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:.16em;text-decoration-color:rgba(13,13,13,.3);transition:text-decoration-color .4s var(--ease);overflow-wrap:anywhere}
.ct-mail:hover{text-decoration-color:var(--ink)}
.ct-copy{height:36px;padding:0 14px;border-radius:999px;font-family:var(--font-mono);font-size:12px;box-shadow:inset 0 0 0 1px rgba(13,13,13,.22);transition:background-color .4s var(--ease),color .4s var(--ease)}
.ct-copy:hover,.ct-copy.is-done{background:var(--ink);color:#fff}
.ct-links{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:36px;border-top:1px solid var(--line)}
.ct-links a{display:flex;flex-direction:column;gap:4px;padding:18px 18px 18px 0;border-bottom:1px solid var(--line);transition:padding .5s var(--ease)}
.ct-links a:hover{padding-left:8px}
.ct-links small{font-family:var(--font-mono);font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:var(--mute)}
.ct-links span{font-weight:600;font-size:15px;overflow-wrap:anywhere}
.ct-badge{position:relative;width:150px;height:150px;flex:none;display:grid;place-items:center;border-radius:50%}
.ct-badge svg{position:absolute;inset:0;width:100%;height:100%;animation:ct-spin 22s linear infinite}
.ct-badge text{font-family:var(--font-mono);font-size:10.4px;letter-spacing:.32em;text-transform:uppercase;fill:var(--ink)}
.ct-badge b{width:64px;height:64px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;font-size:22px;transition:transform .6s var(--ease)}
.ct-badge:hover b{transform:rotate(45deg) scale(1.06)}
@keyframes ct-spin{to{transform:rotate(360deg)}}
.ft{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px 24px;margin-top:clamp(64px,10vh,120px);padding-top:22px;border-top:1px solid var(--line);font-family:var(--font-mono);font-size:12px;color:var(--mute)}
.ft a:hover{color:var(--ink)}
@media (max-width: 820px){
  .ct-grid{grid-template-columns:minmax(0,1fr)}
  .ct-links{grid-template-columns:repeat(2,minmax(0,1fr))}
  .ct-badge{width:120px;height:120px}
}
`;

function Hop({ text, serif }: { text: string; serif?: boolean }) {
  return (
    <>
      {text.split(" ").map((word, wi, arr) => (
        <span key={wi}>
          <span className={`ct-w${serif && wi === arr.length - 1 ? " serif" : ""}`}>
            {Array.from(word).map((ch, ci) => (
              <span key={ci} className="ct-l">
                {ch}
              </span>
            ))}
          </span>
          {wi < arr.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const year = new Date().getFullYear();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const onHop = (e: React.PointerEvent) => {
    const t = e.target as HTMLElement;
    if (t.classList?.contains("ct-l") && !t.classList.contains("hop")) t.classList.add("hop");
  };

  return (
    <section id="contact" className="section ct" aria-labelledby="contact-title">
      <Css id="contact">{css}</Css>
      <div className="wrap">
        <p className="tag rv">07 — Contact</p>
        <h2 id="contact-title" className="ct-h" aria-label="Let's build something together." onPointerOver={onHop} onAnimationEnd={(e) => (e.target as HTMLElement).classList.remove("hop")}>
          <span aria-hidden="true">
            <span className="rv-mask ct-line">
              <span>
                <Hop text="Let's build" />
              </span>
            </span>
            <span className="rv-mask ct-line" style={{ ["--i" as string]: 1 }}>
              <span>
                <Hop text="something together." serif />
              </span>
            </span>
          </span>
        </h2>

        <div className="ct-grid">
          <div>
            <div className="ct-mailrow rv">
              <a href={`mailto:${PROFILE.email}`} className="ct-mail">
                {PROFILE.email}
              </a>
              <button type="button" className={`ct-copy${copied ? " is-done" : ""}`} onClick={copy} aria-label={`Copy email address ${PROFILE.email}`}>
                {copied ? "Copied ✓" : "Copy"}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </div>
            <nav className="ct-links rv" aria-label="Contact links">
              <a href={PROFILE.phoneHref}>
                <small>Phone</small>
                <span>{PROFILE.phone}</span>
              </a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer">
                <small>GitHub ↗</small>
                <span>{PROFILE.githubHandle}</span>
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                <small>LinkedIn ↗</small>
                <span>{PROFILE.linkedinHandle}</span>
              </a>
            </nav>
          </div>
          <a href={`mailto:${PROFILE.email}`} className="ct-badge rv" aria-label={`Say hello — email ${PROFILE.email}`}>
            <svg viewBox="0 0 150 150" aria-hidden="true">
              <defs>
                <path id="ct-circle" d="M75 75 m-60 0 a60 60 0 1 1 120 0 a60 60 0 1 1 -120 0" />
              </defs>
              <text>
                <textPath href="#ct-circle" textLength="374" lengthAdjust="spacing">
                  say hello · say hello · say hello ·
                </textPath>
              </text>
            </svg>
            <b aria-hidden="true">↗</b>
          </a>
        </div>

        <footer className="ft">
          <span>
            © {year} {PROFILE.name}
          </span>
          <a href="#top">Back to top ↑</a>
          <span>Built with Next.js</span>
        </footer>
      </div>
    </section>
  );
}
