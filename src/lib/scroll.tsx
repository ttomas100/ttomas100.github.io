"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { prefersReducedMotion } from "./hooks";

let lenis: Lenis | null = null;

const NAV_OFFSET = -12;

/** Smooth-scroll to `#id` (or "top"). Falls back to native scrolling. */
export function scrollToTarget(target: string) {
  const id = target.replace(/^#/, "");
  const el = id === "top" ? null : document.getElementById(id);
  if (id !== "top" && !el) return;
  if (lenis) {
    lenis.scrollTo(el ?? 0, { offset: NAV_OFFSET, duration: 1.4 });
  } else {
    const y = el ? el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET : 0;
    window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
  if (el) {
    // Move focus for keyboard and screen-reader users without a second jump.
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

/** Mounts Lenis (unless reduced motion) and routes in-page anchor clicks through it. */
export function SmoothScroll() {
  useEffect(() => {
    if (!prefersReducedMotion()) {
      lenis = new Lenis({ autoRaf: true, lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    }
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href^='#']");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      scrollToTarget(href);
      history.replaceState(null, "", href === "#top" ? location.pathname : href);
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}
