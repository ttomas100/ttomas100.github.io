"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";
import { Css } from "../ui/Css";

/** Bump after re-running scripts/build-hero-assets.py: /hero/* is cached as immutable. */
const HERO_VERSION = "3";

const css = `
.hero{position:relative;min-height:100svh;background:var(--paper);overflow:clip}
.hero-ghost{position:absolute;left:50%;top:clamp(84px,14vh,150px);transform:translateX(-50%);font-weight:800;letter-spacing:-.06em;line-height:.8;font-size:clamp(110px,25vw,420px);color:transparent;-webkit-text-stroke:1.5px rgba(13,13,13,.13);white-space:nowrap;user-select:none;pointer-events:none;animation:hero-ghost 1.6s var(--ease) both}
@keyframes hero-ghost{from{opacity:0;transform:translate(-50%,40px)}}
.hero-stage{position:absolute;left:0;right:0;bottom:0;margin-inline:auto;height:min(96svh,1040px);aspect-ratio:768/960}
/* No transform/opacity on the stage: it would isolate the video and break the multiply blend. */
.hero-video{width:100%;height:100%;object-fit:cover;mix-blend-mode:multiply;background:transparent;animation:hero-in 1.4s .1s var(--ease) both}
@keyframes hero-in{from{opacity:0;transform:translateY(30px)}}
.hero-grid{position:relative;display:grid;grid-template-columns:minmax(0,1fr) min(70svh,760px) minmax(0,1fr);gap:24px;align-items:end;min-height:100svh;padding-bottom:clamp(40px,9vh,96px);padding-top:120px}
.hero-title{font-weight:700;letter-spacing:-.045em;line-height:.98;font-size:clamp(40px,4.3vw,74px);margin-top:16px}
.hero-title .serif{display:inline}
.hero-side{display:flex;flex-direction:column;gap:22px;justify-self:end;max-width:340px}
.hero-side p{color:var(--ink-2);font-size:16px;line-height:1.55}
.hero-ctas{display:flex;flex-wrap:wrap;gap:10px}
.hero-sound{position:relative;width:46px;height:46px;flex:none;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;transition:transform .5s var(--ease),background-color .4s}
.hero-sound:hover{transform:scale(1.06);background:#262626}
.hero-sound svg{width:16px;height:16px}
.hero-sound.is-blocked::before,.hero-sound.is-blocked::after{content:"";position:absolute;inset:0;border-radius:50%;box-shadow:0 0 0 1.5px var(--ink);animation:hero-ping 2.2s var(--ease) infinite;pointer-events:none}
.hero-sound.is-blocked::after{animation-delay:1.1s}
@keyframes hero-ping{from{transform:scale(1);opacity:.55}to{transform:scale(1.9);opacity:0}}
.hero-soundrow{display:flex;align-items:center;gap:14px}
.hero-soundrow span{font-family:var(--font-mono);font-size:11.5px;color:var(--mute);letter-spacing:.04em;text-transform:uppercase}
.hero-scroll{position:absolute;left:50%;bottom:18px;translate:-50% 0;font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
@media (max-width: 900px){
  .hero-stage{position:relative;margin:76px auto 0;height:62svh;max-width:100%}
  .hero-ghost{top:110px;font-size:clamp(80px,23vw,200px)}
  .hero-soundrow{position:absolute;right:var(--gutter);top:calc(76px + 62svh - 62px);z-index:2}
  .hero-soundrow span{display:none}
  .hero-grid{position:static;grid-template-columns:1fr;min-height:0;padding-top:20px;gap:22px;padding-bottom:56px}
  .hero-spacer,.hero-scroll{display:none}
  .hero-side{justify-self:start;max-width:none}
}
`;

function SoundIcon({ on }: { on: boolean }) {
  return on ? (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <rect x="3" y="2.5" width="3.4" height="11" rx="1" fill="currentColor" />
      <rect x="9.6" y="2.5" width="3.4" height="11" rx="1" fill="currentColor" />
    </svg>
  ) : (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4.5 2.8v10.4a.8.8 0 0 0 1.2.7l8.2-5.2a.8.8 0 0 0 0-1.4L5.7 2.1a.8.8 0 0 0-1.2.7z" fill="currentColor" />
    </svg>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [sound, setSound] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const visible = useRef(true);
  const started = useRef(false);
  const userChose = useRef(false);

  // Try to start with sound; fall back to muted autoplay. Reduced motion: wait for the visitor.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || prefersReducedMotion()) return;
    started.current = true;
    v.muted = false;
    v.play()
      .then(() => setSound(true))
      .catch(() => {
        v.muted = true;
        setBlocked(true);
        v.play().catch(() => {});
      });
  }, []);

  // Unlock sound on the first real interaction anywhere on the page.
  useEffect(() => {
    if (!blocked) return;
    const events = ["pointerdown", "keydown", "touchend"] as const;
    const unlock = (e: Event) => {
      if (btnRef.current?.contains(e.target as Node)) return; // the button handles itself
      cleanup();
      if (userChose.current) return;
      const v = videoRef.current;
      if (!v) return;
      v.muted = false;
      if (visible.current) v.play().catch(() => {});
      setSound(true);
      setBlocked(false);
    };
    const cleanup = () => events.forEach((ev) => window.removeEventListener(ev, unlock, true));
    events.forEach((ev) => window.addEventListener(ev, unlock, true));
    return cleanup;
  }, [blocked]);

  // Pause (and so silence) the intro once less than 35% of the hero is visible.
  useEffect(() => {
    const el = sectionRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.intersectionRatio >= 0.35;
        if (visible.current) {
          if (started.current) v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: [0, 0.35, 0.6, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    userChose.current = true;
    setBlocked(false);
    if (sound) {
      v.muted = true;
      setSound(false);
    } else {
      started.current = true;
      v.muted = false;
      v.play().catch(() => {});
      setSound(true);
    }
  };

  return (
    <section ref={sectionRef} id="top" className="hero" aria-labelledby="hero-title">
      <Css id="hero">{css}</Css>
      <div className="hero-ghost" aria-hidden="true">
        {PROFILE.firstName.toUpperCase()}
      </div>
      <div className="hero-stage">
        <video
          ref={videoRef}
          className="hero-video"
          muted
          loop
          playsInline
          preload="auto"
          poster={`/hero/poster.webp?v=${HERO_VERSION}`}
          aria-label={`Intro video: ${PROFILE.name}, shown as a 3D animated character, introduces himself.`}
        >
          <source src={`/hero/hero.webm?v=${HERO_VERSION}`} type="video/webm" />
          <source src={`/hero/hero.mp4?v=${HERO_VERSION}`} type="video/mp4" />
        </video>
      </div>
      <div className="wrap hero-grid">
        <div>
          <p className="tag rv">{PROFILE.name} · {PROFILE.location}</p>
          <h1 id="hero-title" className="hero-title">
            {["Senior", "Engineering", "Program"].map((w, i) => (
              <span key={w} className="rv-mask" style={{ ["--i" as string]: i }}>
                <span>{w}</span>
              </span>
            ))}
            <span className="rv-mask" style={{ ["--i" as string]: 3 }}>
              <span className="serif">Manager.</span>
            </span>
          </h1>
        </div>
        <div className="hero-spacer" aria-hidden="true" />
        <div className="hero-side">
          <div className="hero-soundrow rv" style={{ ["--i" as string]: 2 }}>
            <button
              ref={btnRef}
              type="button"
              className={`hero-sound${blocked ? " is-blocked" : ""}`}
              onClick={toggle}
              aria-pressed={sound}
              aria-label={sound ? "Mute the intro" : "Play the intro with sound"}
            >
              <SoundIcon on={sound} />
            </button>
            <span aria-hidden="true">Intro · 0:09</span>
          </div>
          <p className="rv" style={{ ["--i" as string]: 3 }}>
            {PROFILE.headline}. Currently at Apple, coordinating launch trains for News and Stocks.
          </p>
          <div className="hero-ctas rv" style={{ ["--i" as string]: 4 }}>
            <a href="#work" className="btn btn-primary">
              Explore work
            </a>
            <a href="#contact" className="btn btn-ghost">
              Let&apos;s talk
            </a>
            <a href={PROFILE.resume} download className="btn btn-ghost">
              Résumé ↓
            </a>
          </div>
        </div>
      </div>
      <span className="hero-scroll" aria-hidden="true">
        Scroll
      </span>
    </section>
  );
}
