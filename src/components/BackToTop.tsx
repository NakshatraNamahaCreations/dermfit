"use client";

import { useEffect, useState } from "react";

/**
 * Back-to-top control, bottom right. Appears once there is enough page behind
 * you for it to be worth having.
 */
export default function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setShown(window.scrollY > window.innerHeight * 0.8);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const toTop = () => {
    // The global reduced-motion rule turns off smooth scrolling, so honour it
    // here too rather than forcing an animated jump.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      // Hidden from assistive tech and the tab order until it is actually usable.
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      className={`group fixed bottom-[5.25rem] right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-brand-950 shadow-lg shadow-brand-950/25 transition-all duration-300 hover:brightness-110 sm:bottom-[6.25rem] sm:right-8 ${
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden="true"
        className="transition-transform group-hover:-translate-y-0.5"
      >
        <path
          d="M9 14.5v-11M4 8.5 9 3.5l5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
