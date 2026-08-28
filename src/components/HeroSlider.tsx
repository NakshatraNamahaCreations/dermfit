"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroFeatures, heroStat, slides } from "@/data/slides";
import HeroIcon from "./HeroIcons";

const AUTOPLAY_MS = 7000;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback((n: number) => setIndex(((n % count) + count) % count), [count]);
  const prev = useCallback(() => go(index - 1), [go, index]);
  const next = useCallback(() => go(index + 1), [go, index]);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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

  const active = slides[index];

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
      className="relative isolate min-h-[40rem] overflow-hidden bg-brand-950 lg:min-h-[46rem] focus-visible:outline-none"
    >
      {/* Backdrops — cross-fade underneath the copy */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {slide.image ? (
            <Image
              src={slide.image}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              quality={90}
              className="object-cover object-[68%_center]"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-brand-950" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,var(--color-brand-800),transparent_60%)]" />
              <div className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl" />
            </>
          )}
        </div>
      ))}

      {/* Scrims: darken left for the headline, and the foot for the trust strip */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/70 to-brand-950/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-brand-950/95 to-transparent"
      />

      <div className="container-page relative flex min-h-[40rem] flex-col justify-center pb-40 pt-16 lg:min-h-[46rem] lg:pb-44">
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
              <span className="h-px w-8 bg-gold-500/70" />
              {active.eyebrow}
            </p>

            <h1 className="mt-6 font-display font-semibold uppercase leading-[0.92] tracking-tight text-white">
              <span className="block text-[2.75rem] sm:text-6xl lg:text-[5rem]">
                {active.title}
              </span>
              <span className="mt-1 block text-[2.75rem] text-gold-gradient sm:text-6xl lg:text-[5rem]">
                {active.titleAccent}
              </span>
            </h1>

            <div className="mt-7 space-y-1 text-sm font-medium uppercase tracking-[0.14em] text-brand-200 sm:text-base">
              {active.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={active.primary.href} className="btn btn-gold">
                {active.primary.label}
              </Link>
              <Link href={active.secondary.href} className="btn btn-ghost-light">
                {active.secondary.label}
              </Link>
            </div>
          </div>

          {/* Floating feature card, like the reference layout */}
          {active.card && (
            <Link
              href={active.card.href}
              className="group mt-10 hidden w-72 shrink-0 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md transition-colors hover:border-gold-400/60 hover:bg-white/15 lg:mt-0 lg:block"
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-300">
                {active.card.tag}
              </span>
              <h2 className="mt-3 font-display text-lg font-semibold leading-snug text-white">
                {active.card.title}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-brand-100/85">
                {active.card.body}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300">
                {active.card.cta}
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path
                    d="M2 6h8M6.5 2.5 10 6l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Trust strip + stat */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10">
        <div className="container-page flex items-center justify-between gap-6 py-5">
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {heroFeatures.map((f) => (
              <li key={f.label} className="flex items-center gap-3">
                <HeroIcon name={f.icon} className="h-5 w-5 shrink-0 text-gold-400" />
                <span className="whitespace-pre-line text-[0.72rem] font-medium uppercase leading-tight tracking-[0.1em] text-brand-200">
                  {f.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="hidden shrink-0 text-right sm:block">
            <p className="font-display text-2xl font-semibold text-white">{heroStat.value}</p>
            <p className="text-[0.68rem] uppercase tracking-[0.14em] text-brand-300">
              {heroStat.label}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-colors hover:border-gold-400/70 hover:bg-white/20 sm:left-6"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11 3.5 5.5 9l5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-colors hover:border-gold-400/70 hover:bg-white/20 sm:right-6"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="m7 3.5 5.5 5.5L7 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="container-page pointer-events-none absolute inset-x-0 bottom-24 z-10">
            <div className="pointer-events-auto flex gap-2.5">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-9 bg-gold-500" : "w-2 bg-white/35 hover:bg-white/60"
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
