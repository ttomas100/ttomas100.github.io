"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { lockScroll, scrollToTarget } from "@/lib/scroll";
import { Css } from "./ui/Css";

const css = `
.nav{position:fixed;inset:0 0 auto 0;z-index:50;pointer-events:none}
.nav::before{content:"";position:absolute;inset:0 0 auto 0;height:96px;background:linear-gradient(var(--paper) 35%,rgba(244,242,238,0));opacity:0;transition:opacity .5s var(--ease);pointer-events:none}
.nav.is-scrolled::before{opacity:1}
.nav-progress{position:absolute;left:0;top:0;height:2px;width:100%;background:var(--ink);transform-origin:0 50%;transform:scaleX(var(--p,0))}
.nav-row{position:relative;display:flex;align-items:center;justify-content:space-between;gap:16px;padding-top:18px}
.nav-brand{pointer-events:auto;display:flex;align-items:center;gap:12px;border-radius:999px}
.nav-mark{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-family:var(--font-mono);font-size:13px;font-weight:600;letter-spacing:.02em;box-shadow:inset 0 0 0 1.5px var(--ink);color:var(--ink);background:transparent;transition:background-color .5s var(--ease),color .5s var(--ease),transform .9s var(--ease)}
.nav-brand:hover .nav-mark{transform:rotate(360deg)}
.nav.is-scrolled .nav-mark{background:var(--ink);color:#fff}
.nav-name{font-weight:600;letter-spacing:-.02em;font-size:15px;transition:opacity .5s var(--ease),transform .5s var(--ease)}
.nav.is-scrolled .nav-name{opacity:0;transform:translateX(-8px);pointer-events:none}
.nav-pill{pointer-events:auto;position:relative;display:flex;align-items:center;gap:2px;padding:5px;border-radius:999px;transition:background-color .5s var(--ease),box-shadow .5s var(--ease),backdrop-filter .5s}
.nav.is-scrolled .nav-pill{background:rgba(255,255,255,.62);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px var(--line),0 10px 30px -18px rgba(13,13,13,.3)}
.nav-ind{position:absolute;top:5px;left:0;height:calc(100% - 10px);border-radius:999px;background:var(--ink);transition:transform .6s var(--ease),width .6s var(--ease),opacity .4s;opacity:0}
.nav-link{position:relative;z-index:1;padding:9px 15px;border-radius:999px;font-size:14px;font-weight:500;color:var(--ink-2);transition:color .4s var(--ease)}
.nav-link:hover{color:var(--ink)}
.nav-link[aria-current="true"]{color:#fff}
.nav-menu-btn{display:none}
.nav-overlay{position:fixed;inset:0;z-index:60;background:var(--paper);clip-path:circle(0% at calc(100% - 52px) 40px);transition:clip-path .8s var(--ease);pointer-events:none;display:flex;flex-direction:column}
.nav-overlay.is-open{clip-path:circle(150% at calc(100% - 52px) 40px);pointer-events:auto}
.nav-overlay ol{list-style:none;margin:auto 0;padding:0 var(--gutter)}
.nav-overlay li{overflow:hidden}
.nav-big{display:flex;align-items:baseline;gap:14px;padding:6px 0;font-weight:700;letter-spacing:-.045em;line-height:1.05;font-size:clamp(40px,11vw,72px);transform:translateY(110%);transition:transform .8s var(--ease);transition-delay:calc(var(--i)*60ms + 120ms)}
.nav-big small{font-family:var(--font-mono);font-size:12px;letter-spacing:0;color:var(--mute);font-weight:500}
.nav-overlay.is-open .nav-big{transform:none}
.nav-overlay-top{display:flex;justify-content:space-between;align-items:center;padding:18px var(--gutter)}
.nav-overlay-foot{padding:24px var(--gutter);font-family:var(--font-mono);font-size:12px;color:var(--mute)}
@media (max-width: 860px){
  .nav-pill{display:none}
  .nav-menu-btn{pointer-events:auto;display:inline-flex;height:44px;padding:0 20px;border-radius:999px;align-items:center;font-weight:600;font-size:14px;background:rgba(255,255,255,.7);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px var(--line)}
}
`;

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const indRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  // Scrolled state + progress bar, written straight to the DOM (no re-render per frame).
  useEffect(() => {
    const nav = navRef.current!;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      nav.style.setProperty("--p", String(max > 0 ? Math.min(1, y / max) : 0));
      nav.classList.toggle("is-scrolled", y > 40);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Active section.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const ids = ["top", ...NAV.map((n) => n.id)];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const placeIndicator = useCallback(() => {
    const ind = indRef.current;
    const pill = pillRef.current;
    if (!ind || !pill) return;
    const link = active ? pill.querySelector<HTMLAnchorElement>(`a[data-id="${active}"]`) : null;
    if (!link) {
      ind.style.opacity = "0";
      return;
    }
    ind.style.opacity = "1";
    ind.style.width = `${link.offsetWidth}px`;
    ind.style.transform = `translateX(${link.offsetLeft}px)`;
  }, [active]);

  useLayoutEffect(placeIndicator, [placeIndicator]);
  useEffect(() => {
    window.addEventListener("resize", placeIndicator);
    document.fonts?.ready.then(placeIndicator);
    return () => window.removeEventListener("resize", placeIndicator);
  }, [placeIndicator]);

  // Mobile overlay: lock scroll, Esc to close, focus management.
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const btn = menuBtn.current;
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
      btn?.focus({ preventScroll: true });
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // Wait a frame so the scroll lock is released before Lenis scrolls.
    requestAnimationFrame(() => scrollToTarget(id));
  };

  return (
    <>
      <Css id="nav">{css}</Css>
      <header ref={navRef} className="nav">
        <div className="nav-progress" aria-hidden="true" />
        <div className="wrap nav-row">
          <a href="#top" className="nav-brand">
            <span className="nav-mark" aria-hidden="true">
              {PROFILE.initials}
            </span>
            <span className="nav-name">{PROFILE.name}</span>
            <span className="sr-only">, back to top</span>
          </a>
          <nav aria-label="Primary">
            <div className="nav-pill" ref={pillRef}>
              <span className="nav-ind" ref={indRef} aria-hidden="true" />
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} data-id={n.id} className="nav-link" aria-current={active === n.id ? "true" : undefined}>
                  {n.label}
                </a>
              ))}
            </div>
            <button ref={menuBtn} type="button" className="nav-menu-btn" aria-expanded={open} aria-controls="nav-overlay" onClick={() => setOpen(true)}>
              Menu
            </button>
          </nav>
        </div>
      </header>
      <div id="nav-overlay" className={`nav-overlay${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Site menu" inert={!open}>
        <div className="nav-overlay-top">
          <span className="nav-mark" style={{ background: "var(--ink)", color: "#fff" }} aria-hidden="true">
            {PROFILE.initials}
          </span>
          <button ref={closeBtn} type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <ol>
          {NAV.map((n, i) => (
            <li key={n.id}>
              <a href={`#${n.id}`} className="nav-big" style={{ ["--i" as string]: i }} onClick={go(n.id)}>
                <small>{String(i + 1).padStart(2, "0")}</small>
                {n.label}
              </a>
            </li>
          ))}
        </ol>
        <p className="nav-overlay-foot">
          {PROFILE.email} · {PROFILE.location}
        </p>
      </div>
    </>
  );
}
