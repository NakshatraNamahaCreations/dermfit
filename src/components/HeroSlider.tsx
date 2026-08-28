"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { slides } from "@/data/slides";

const AUTOPLAY_MS = 6000;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);
  const prev = useCallback(() => go(index - 1), [go, index]);
  const next = useCallback(() => go(index + 1), [go, index]);

  // Autoplay, paused on hover/focus and for anyone who prefers reduced motion.
  useEffect(() => {
    if (paused || count < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, count]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Dermfit highlights"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const start = touchStartX.current;
        if (start === null) return;
        const dx = e.changedTouches[0].clientX - start;
        if (Math.abs(dx) > 45) (dx > 0 ? prev : next)();
        touchStartX.current = null;
      }}
      className="relative isolate overflow-hidden rounded-b-[2rem] focus-visible:outline-none"
    >
      <div className="relative h-[30rem] sm:h-[32rem] lg:h-[36rem]">
        {slides.map((slide, i) => {
          const active = i === index;
          const light = slide.image !== null;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!active}
              inert={!active ? true : undefined}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {slide.image ? (
                <>
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    quality={90}
                    className="object-cover object-[70%_center]"
                  />
                  {/* Keeps the copy readable over the open area of the photo. */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#fbf3e7] via-[#fbf3e7]/85 to-transparent sm:to-transparent lg:via-[#fbf3e7]/70" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-brand-950" />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,var(--color-brand-800),transparent_58%)]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl"
                  />
                </>
              )}

              <div className="container-page relative flex h-full items-center">
                <div className="max-w-xl">
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                      light ? "text-gold-700" : "text-gold-400"
                    }`}
                  >
                    {slide.eyebrow}
                  </p>
                  <h1
                    className={`mt-4 font-display text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl ${
                      light ? "text-brand-950" : "text-white"
                    }`}
                  >
                    {slide.title}
                    {slide.titleAccent && (
                      <>
                        <br />
                        <span className={light ? "text-gold-700" : "text-gold-gradient"}>
                          {slide.titleAccent}
                        </span>
                      </>
                    )}
                  </h1>
                  <div
                    className={`mt-6 space-y-1.5 text-base leading-relaxed sm:text-lg ${
                      light ? "text-brand-800" : "text-brand-200"
                    }`}
                  >
                    {slide.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Link href={slide.primary.href} className="btn btn-gold">
                      {slide.primary.label}
                    </Link>
                    <Link
                      href={slide.secondary.href}
                      className={`btn ${light ? "btn-outline" : "btn-ghost-light"}`}
                    >
                      {slide.secondary.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-brand-950/15 bg-white/80 text-brand-950 backdrop-blur transition-colors hover:bg-white sm:left-6"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11 3.5 5.5 9l5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-brand-950/15 bg-white/80 text-brand-950 backdrop-blur transition-colors hover:bg-white sm:right-6"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="m7 3.5 5.5 5.5L7 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="container-page pointer-events-none absolute inset-x-0 bottom-7 z-10">
            <div className="pointer-events-auto flex gap-2.5">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index
                      ? "w-8 bg-gold-500"
                      : slides[index].image
                        ? "w-2.5 bg-brand-950/25 hover:bg-brand-950/45"
                        : "w-2.5 bg-white/35 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
