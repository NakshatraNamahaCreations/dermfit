"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BladeGroup, backBlades, frontBlades } from "./AloeBlades";

/**
 * Full-bleed statement section: a large word with botanical layers behind AND
 * in front of it, so the plants interleave with the letters.
 *
 * `word` and `caption` default to the clinic's own wording; pass others to
 * change them without touching the layout.
 *
 * Swap the placeholder blades for photography by passing image paths:
 *   backLayer  — the scene behind the word (a normal photo is fine)
 *   frontLayer — a transparent PNG cut-out; this is what overlaps the letters
 * Both need the plants to sit low, since the word runs across the middle.
 */
export default function NourishSection({
  word = "RESTORE",
  caption = "Skin · Hair · Aesthetics",
  backLayer,
  frontLayer,
}: {
  word?: string;
  caption?: string;
  backLayer?: string;
  frontLayer?: string;
} = {}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Gentle parallax: the front layer drifts against the page as you scroll.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        const progress = (window.innerHeight - r.top) / (window.innerHeight + r.height);
        setOffset(Math.max(-1, Math.min(1, progress * 2 - 1)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-label={word}
      className="relative isolate overflow-hidden bg-gold-50 py-20 sm:py-24"
    >
      <div className="relative mx-auto h-[22rem] w-full max-w-[90rem] sm:h-[26rem] lg:h-[32rem]">
        {/* Behind the word. Entrance lives on the outer element and parallax on
            the inner one — sharing a node would let the inline transform
            clobber the entrance transform. */}
        <div
          className={`absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-out ${
            shown ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        >
          <div className="h-full w-full" style={{ transform: `translateY(${offset * -14}px)` }}>
            {backLayer ? (
              <Image src={backLayer} alt="" fill sizes="100vw" className="object-cover object-bottom" />
            ) : (
              <BladeGroup blades={backBlades} className="h-full w-full" />
            )}
          </div>
        </div>

        {/* The word */}
        <h2 className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 text-center">
          <span className="sr-only">{word}</span>
          <span
            aria-hidden="true"
            className="flex justify-center font-display font-semibold uppercase leading-none tracking-[-0.02em] text-brand-950"
          >
            {word.split("").map((letter, i) => (
              <span
                key={i}
                className={`inline-block text-[3.5rem] transition-all duration-[900ms] ease-out sm:text-[6rem] lg:text-[9rem] ${
                  shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${200 + i * 70}ms` }}
              >
                {letter}
              </span>
            ))}
          </span>
        </h2>

        {/* In front of the word — this is what creates the depth */}
        <div
          className={`pointer-events-none absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-out ${
            shown ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="h-full w-full" style={{ transform: `translateY(${offset * 26}px)` }}>
            {frontLayer ? (
              <Image
                src={frontLayer}
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-bottom"
              />
            ) : (
              <BladeGroup blades={frontBlades} className="h-full w-full" />
            )}
          </div>
        </div>
      </div>

      <p
        className={`container-page mt-10 text-center text-sm uppercase tracking-[0.2em] text-muted transition-opacity duration-1000 ${
          shown ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        {caption}
      </p>
    </section>
  );
}
