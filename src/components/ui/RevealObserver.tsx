"use client";

import { useEffect } from "react";

/** Adds `.is-in` to every `.rv` / `.rv-mask` the first time it enters the viewport. */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    document.querySelectorAll(".rv:not(.is-in), .rv-mask:not(.is-in)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
