"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Scroll-driven botanical sequence.
 *
 * The section is deliberately tall; its inner frame is sticky, so scrolling
 * through it scrubs a timeline rather than simply moving past it:
 *
 *   1. the aloe rises from below the frame
 *   2. it holds, with the word interleaved between its two layers
 *   3. it drops back down out of frame
 *   4. the treatment photograph rises from below to take its place
 *
 * The aloe is one photograph layered twice (make-aloe-layers.py): the plate
 * behind the word and a transparent cut-out over it, which is what lets the
 * leaves cross the letters. Both layers share a single offset - moving them
 * independently would show the plant twice.
 */

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
/** Normalised progress through one slice of the timeline. */
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1);
/** Ease so the arrivals settle rather than stop dead. */
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
      // Hold the sequence at the point where the aloe is composed with the word.
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

  // Aloe: in over 0-0.30, holds, then back down over 0.46-0.68.
  const aloeY = (1 - ease(seg(p, 0, 0.3))) * 105 + ease(seg(p, 0.46, 0.68)) * 105;
  // Face: starts rising while the aloe is still on its way down, so the frame
  // never sits empty between the two.
  const faceY = (1 - ease(seg(p, 0.48, 0.86))) * 105;

  const aloeStyle = { transform: `translate3d(0, ${aloeY}%, 0)` };
  const faceStyle = { transform: `translate3d(0, ${faceY}%, 0)` };
  const plate = "object-cover object-bottom";

  // The word settles in with the aloe and stays for the whole sequence.
  const lettersIn = ready && p > 0.04;

  return (
    <section
      ref={ref}
      aria-label={word}
      className="relative h-[280vh] bg-[#f1ede7]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 4. Treatment photograph, arriving last and sitting furthest back */}
        <div aria-hidden="true" className="absolute inset-0 will-change-transform" style={faceStyle}>
          <Image src="/ritual-face.jpg" alt="" fill sizes="100vw" className="object-cover object-center" />
        </div>

        {/* 1. Aloe plate, behind the word */}
        <div aria-hidden="true" className="absolute inset-0 will-change-transform" style={aloeStyle}>
          <Image src="/aloe-back.jpg" alt="" fill sizes="100vw" className={plate} />
        </div>

        {/* 2. The word */}
        <div className="absolute inset-x-0 top-[18%] px-6 sm:top-[20%]">
          <h2 className="text-center">
            <span className="sr-only">{word}</span>
            <span
              aria-hidden="true"
              className="flex justify-center font-display font-normal uppercase leading-none tracking-[0.02em] text-forest"
            >
              {word.split("").map((letter, i) => (
                <span
                  key={i}
                  className={`inline-block text-[3rem] transition-all duration-[900ms] ease-out sm:text-[5.5rem] lg:text-[8.5rem] ${
                    lettersIn ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h2>

          <div
            className={`container-page mt-8 transition-all duration-1000 ease-out sm:mt-12 ${
              lettersIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: `${word.length * 70 + 120}ms` }}
          >
            <p className="text-[0.7rem] font-medium uppercase leading-[1.9] tracking-[0.24em] text-forest/85 sm:text-xs">
              {caption[0]}
              <br />
              {caption[1]}
            </p>
            <span aria-hidden="true" className="mt-4 block h-px w-14 bg-forest/35" />
          </div>
        </div>

        {/* 3. Aloe cut-out, over the word - this is what crosses the letters */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={aloeStyle}
        >
          <Image src="/aloe-front.png" alt="" fill sizes="100vw" className={plate} />
        </div>
      </div>
    </section>
  );
}
