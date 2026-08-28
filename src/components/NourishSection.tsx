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
 *   1. foliage slides in from the left and the right and holds
 *   2. both drop away below the frame
 *   3. the treatment photograph rises from below to take their place
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

  // Percentages are of each object's own box and the frame clips, so a value
  // past 100 parks it fully out of sight.
  const leafIn = ease(seg(p, 0, 0.3)); // slide in horizontally
  const leafOut = ease(seg(p, 0.46, 0.68)); // then drop away below
  const leafX = (1 - leafIn) * 118;
  const leafY = leafOut * 130;
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

        {/* Object slot 1 — foliage entering from either side */}
        <div
          className="pointer-events-none absolute bottom-[4%] left-0 w-[min(46vw,26rem)] will-change-transform"
          style={{ transform: `translate3d(${-leafX}%, ${leafY}%, 0)` }}
        >
          <Image
            src="/leaf-left.png"
            alt=""
            width={964}
            height={1011}
            sizes="(min-width: 1024px) 416px, 46vw"
            className="h-auto w-full"
          />
        </div>
        <div
          className="pointer-events-none absolute bottom-[4%] right-0 w-[min(50vw,30rem)] will-change-transform"
          style={{ transform: `translate3d(${leafX}%, ${leafY}%, 0)` }}
        >
          <Image
            src="/leaf-right.png"
            alt=""
            width={1523}
            height={1024}
            sizes="(min-width: 1024px) 480px, 50vw"
            className="h-auto w-full"
          />
        </div>

        {/* Object slot 2 — the treatment photograph, cut out like the plant */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[6%] flex justify-center">
          <div
            className="w-[min(78vw,27rem)] will-change-transform"
            style={{ transform: `translate3d(0, ${faceY}%, 0)` }}
          >
            {/* No shadow here: the subject is a soft-edged cut-out, so a drop
                shadow would trace its bounding box and read as a border. */}
            <Image
              src="/ritual-face.png"
              alt=""
              width={1122}
              height={1310}
              sizes="(min-width: 1024px) 432px, 78vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
