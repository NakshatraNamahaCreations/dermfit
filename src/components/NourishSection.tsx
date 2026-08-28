"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Scroll-driven statement section.
 *
 * A large pale word sits on a plain ground; objects pass in front of it as you
 * scroll. The section is deliberately tall and its inner frame is sticky, so
 * scrolling scrubs a timeline rather than simply moving past it:
 *
 *   1. the aloe rises from below and holds in front of the word
 *   2. it drops back down out of frame
 *   3. the treatment photograph rises from below to take its place
 *
 * Objects are contained, not full-bleed - the word stays readable behind them.
 */

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
/** Normalised progress through one slice of the timeline. */
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1);
/** Ease so arrivals settle rather than stop dead. */
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export default function NourishSection({
  word = "RESTORE",
  caption = ["Skin, treated", "at the root"],
}: {
  word?: string;
  caption?: [string, string];
} = {}) {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Hold at the point where the aloe is composed with the word.
      const id = requestAnimationFrame(() => {
        setP(0.35);
        setReady(true);
      });
      return () => cancelAnimationFrame(id);
    }

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        const travel = r.height - window.innerHeight;
        setP(travel > 0 ? clamp(-r.top / travel, 0, 1) : 0);
        setReady(true);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Percentages are of each object's own height, and the frame clips, so 125
  // parks it fully out of sight below.
  const aloeY = (1 - ease(seg(p, 0, 0.3))) * 125 + ease(seg(p, 0.46, 0.68)) * 125;
  const faceY = (1 - ease(seg(p, 0.48, 0.86))) * 125;

  const lettersIn = ready && p > 0.03;

  return (
    <section ref={ref} aria-label={word} className="relative h-[280vh] bg-[#f3f1ea]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* The word, pale, behind everything */}
        <div className="absolute inset-x-0 top-[26%] px-6">
          <h2 className="text-center">
            <span className="sr-only">{word}</span>
            <span
              aria-hidden="true"
              className="flex justify-center font-display font-normal uppercase leading-none tracking-[0.04em] text-forest/20"
            >
              {word.split("").map((letter, i) => (
                <span
                  key={i}
                  className={`inline-block text-[3.25rem] transition-all duration-[900ms] ease-out sm:text-[6rem] lg:text-[9rem] ${
                    lettersIn ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h2>
        </div>

        {/* Caption */}
        <div
          className={`container-page absolute inset-x-0 top-[12%] transition-all duration-1000 ease-out ${
            lettersIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: `${word.length * 70 + 120}ms` }}
        >
          <p className="text-[0.7rem] font-medium uppercase leading-[1.9] tracking-[0.24em] text-forest/80 sm:text-xs">
            {caption[0]}
            <br />
            {caption[1]}
          </p>
          <span aria-hidden="true" className="mt-4 block h-px w-14 bg-forest/30" />
        </div>

        {/* Object slot 1 — the aloe, on transparency */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[6%] flex justify-center">
          <div
            className="w-[min(74vw,34rem)] will-change-transform"
            style={{ transform: `translate3d(0, ${aloeY}%, 0)` }}
          >
            <Image
              src="/aloe-front.png"
              alt=""
              width={1360}
              height={1024}
              sizes="(min-width: 1024px) 544px, 74vw"
              className="h-auto w-full drop-shadow-[0_24px_48px_rgb(30_47_33_/_0.22)]"
            />
          </div>
        </div>

        {/* Object slot 2 — the treatment photograph, as a card */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[6%] flex justify-center">
          <div
            className="relative h-[46vh] w-[min(58vw,20rem)] overflow-hidden rounded-[1.75rem] shadow-2xl shadow-forest/25 will-change-transform sm:h-[52vh]"
            style={{ transform: `translate3d(0, ${faceY}%, 0)` }}
          >
            <Image
              src="/ritual-face.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 320px, 58vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
