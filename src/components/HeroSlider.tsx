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
      className="relative isolate -mt-32 min-h-[42rem] overflow-hidden bg-brand-950 focus-visible:outline-none lg:-mt-36 lg:min-h-[48rem]"
    >
      {/* Cross-fading backdrops */}
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
              className="object-cover object-[70%_center]"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-brand-950" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_40%,var(--color-brand-800),transparent_60%)]" />
              <div className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl" />
            </>
          )}
        </div>
      ))}

      {/* Vignette: heavy left for the headline, heavy foot for the strip */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-brand-950/92 via-brand-950/55 to-brand-950/15"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-brand-950/95 via-brand-950/55 to-transparent"
      />

      {/* Headline block */}
      <div className="container-page relative flex min-h-[42rem] flex-col justify-center pb-44 pt-32 lg:min-h-[48rem] lg:pb-48 lg:pt-36">
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h1 className="font-light uppercase leading-[0.86] tracking-[-0.02em] text-cream">
              <span className="block text-[4.5rem] sm:text-[7rem] lg:text-[9.5rem]">
                {active.title}
              </span>
              <span className="block text-[4.5rem] sm:text-[7rem] lg:text-[9.5rem]">
                {active.titleAccent}
              </span>
            </h1>

            <div className="mt-9 space-y-0.5 text-lg font-semibold uppercase tracking-[0.02em] text-cream sm:text-xl">
              {active.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <Link
              href={active.cta.href}
              className="group mt-9 inline-flex items-center gap-3 rounded-full border border-cream/45 px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:border-cream hover:bg-cream/10"
            >
              {active.cta.label}
              <svg
                width="15"
                height="15"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path
                  d="M2 6h8M6.5 2.5 10 6l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Product-style card floating right */}
          {active.card && (
            <Link
              href={active.card.href}
              className="group mt-10 hidden w-64 shrink-0 rounded-2xl border border-cream/15 bg-brand-950/55 p-5 backdrop-blur-md transition-colors hover:border-gold-400/60 hover:bg-brand-950/70 lg:mt-0 lg:block"
            >
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-300">
                {active.card.tag}
              </span>
              <h2 className="mt-2 text-sm font-semibold uppercase leading-snug tracking-[0.08em] text-cream">
                {active.card.title}
              </h2>
              <p className="mt-2.5 text-xs leading-relaxed text-cream/70">{active.card.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-300">
                {active.card.cta}
                <svg
                  width="12"
                  height="12"
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

      {/* Foot: icon features left, stat right */}
      <div className="container-page absolute inset-x-0 bottom-0 z-10 pb-9">
        <div className="flex items-end justify-between gap-6">
          <ul className="flex flex-wrap items-start gap-x-9 gap-y-4 sm:gap-x-12">
            {heroFeatures.map((f) => (
              <li key={f.label} className="flex flex-col gap-2.5">
                <HeroIcon name={f.icon} className="h-6 w-6 text-cream/85" />
                <span className="whitespace-pre-line text-[0.7rem] font-medium leading-tight text-cream/85">
                  {f.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="hidden shrink-0 text-right sm:block">
            <p className="text-3xl font-semibold text-cream lg:text-4xl">{heroStat.value}</p>
            <p className="mt-0.5 text-[0.72rem] text-cream/70">{heroStat.label}</p>
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
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cream/25 bg-brand-950/30 text-cream backdrop-blur transition-colors hover:border-cream/70 hover:bg-brand-950/60 sm:left-5"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11 3.5 5.5 9l5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cream/25 bg-brand-950/30 text-cream backdrop-blur transition-colors hover:border-cream/70 hover:bg-brand-950/60 sm:right-5"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="m7 3.5 5.5 5.5L7 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="container-page pointer-events-none absolute inset-x-0 bottom-32 z-10">
            <div className="pointer-events-auto flex gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-cream" : "w-1.5 bg-cream/35 hover:bg-cream/60"
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
