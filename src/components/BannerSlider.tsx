"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { banners } from "@/data/banners";
import { site } from "@/data/site";
import BannerIcon from "./BannerIcon";

const AUTOPLAY_MS = 6000;

/**
 * One word, animated letter by letter.
 *
 * The word is left whole in an sr-only span and the letters hidden from
 * assistive tech, so a screen reader reads "Restoring" rather than nine
 * separate characters.
 */
function Word({
  text,
  from,
  className = "",
}: {
  text: string;
  from: number;
  className?: string;
}) {
  return (
    <span className="inline-block">
      <span className="sr-only">{text}</span>
      {[...text].map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          aria-hidden="true"
          style={{ animationDelay: `${from + i * 45}ms` }}
          className={`animate-letter-in inline-block ${className}`}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

/**
 * Banner slider.
 *
 * Each slide is a supplied before/after composite whose centre is empty, so the
 * headline and feature labels are real text laid into that gap — animatable,
 * selectable, translatable and readable to screen readers, none of which is
 * true of type inside a JPEG.
 *
 * On wide screens the text overlays the artwork; below that the artwork is only
 * a couple of hundred pixels tall, so the text sits beneath it instead.
 *
 * The comparisons are illustrative rather than patient records, and say so.
 */
export default function BannerSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = banners.length;
  const slide = banners[index];

  const go = useCallback((n: number) => setIndex(((n % count) + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [paused, count, index]);

  // The text block is keyed on the slide, so changing slides remounts it and
  // the CSS entrance replays — no state to reset, and nothing to sequence in an
  // effect.
  const rise = "animate-banner-in";
  const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Dermfit treatments"
      className="relative bg-white"
      // Pause only for keyboard focus. Clicking an arrow or a dot also focuses
      // it, and since blur does not fire until focus moves elsewhere, pausing on
      // any focus left autoplay stopped for good after a single click.
      onFocus={(e) => {
        const el = e.target as HTMLElement;
        if (el === e.currentTarget) return;
        try {
          if (el.matches(":focus-visible")) setPaused(true);
        } catch {
          /* :focus-visible unsupported — leave autoplay running */
        }
      }}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const start = touchX.current;
        if (start === null) return;
        const dx = e.changedTouches[0].clientX - start;
        if (Math.abs(dx) > 45) go(index + (dx > 0 ? -1 : 1));
        touchX.current = null;
      }}
    >
      {/* Padded above and below to give the banner more height. The artwork is
          2.5:1 with the BEFORE and AFTER labels hard against its edges, so it
          cannot be cropped taller — the bands take each slide's own edge tone
          instead, which reads as part of the image.

          The padding is uneven on purpose: less above than below, which lifts
          the artwork and the text over it closer to the header without losing
          the height overall. */}
      <div
        className="relative pb-8 pt-2 transition-colors duration-700 sm:pb-12 sm:pt-3 lg:pb-28 lg:pt-10"
        style={{
          background: `linear-gradient(${slide.edge.top}, ${slide.edge.top} 50%, ${slide.edge.bottom})`,
        }}
      >
        {/* Every slide fills one fixed box rather than the first sizing the rest.
            The two artworks are 2.5:1 and 2.19:1, so letting slide one set the
            height left the other mispositioned; object-contain inside a shared
            box keeps both whole, and the letterboxing is invisible because both
            grounds are white. */}
        <div className="relative w-full" style={{ aspectRatio: "2.4 / 1" }}>
          {banners.map((b, i) => (
            <Image
              key={b.id}
              src={b.image}
              alt={i === index ? b.alt : ""}
              fill
              // Both are eager: a lazily loaded slide shows blank on the first
              // switch, before the browser has fetched it.
              priority
              sizes="100vw"
              aria-hidden={i !== index}
              className={`object-contain transition-opacity duration-500 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Sits above the vertical centre on wide screens: the artwork's two
            faces are bottom-weighted, so dead centre put the headline across
            their chins. */}
        <div className="px-6 pb-4 pt-8 lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center lg:p-0">
          <div
            key={slide.id}
            className="mx-auto w-full max-w-lg text-center lg:max-w-[40%] lg:-translate-y-[7%]"
          >
            <p
              style={delay(0)}
              className={`${rise} text-xs font-medium uppercase tracking-[0.34em] text-brand-800 sm:text-sm lg:text-base`}
            >
              {slide.strapline}
            </p>

            <h2 className="mt-4 font-display text-[2.1rem] font-semibold uppercase leading-[1.05] tracking-tight text-brand-950 sm:text-5xl lg:text-[3.9rem]">
              <Word text={slide.headline[0]} from={200} />{" "}
              {/* The gradient goes on the letters, the entrance on their
                  wrappers: filter and background-clip: text on one element is
                  where browsers disagree. */}
              <Word
                text={slide.headline[1]}
                from={200 + slide.headline[0].length * 45 + 90}
                className="text-gold-shimmer"
              />
            </h2>

            <span
              aria-hidden="true"
              style={delay(880)}
              className={`${rise} mx-auto mt-5 block h-px w-28 bg-gradient-to-r from-transparent via-gold-500 to-transparent`}
            />

            <ul className="mt-7 flex flex-wrap items-start justify-center gap-x-6 gap-y-6 sm:gap-x-7">
              {slide.features.map((f, i) => (
                <li
                  key={f.icon}
                  style={delay(1000 + i * 120)}
                  className={`${rise} flex w-20 flex-col items-center gap-2.5 text-center`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand-800 ring-1 ring-brand-200/80">
                    <BannerIcon name={f.icon} />
                  </span>
                  <span className="text-[0.68rem] font-semibold uppercase leading-tight tracking-[0.08em] text-brand-900">
                    {f.label[0]}
                    <br />
                    {f.label[1]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-200 bg-white/85 text-brand-900 backdrop-blur transition-colors hover:border-gold-400 lg:flex"
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d="M11 3.5 5.5 9l5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-200 bg-white/85 text-brand-900 backdrop-blur transition-colors hover:border-gold-400 lg:flex"
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d="m7 3.5 5.5 5.5L7 14.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="container-page pb-14 pt-6 text-center sm:pb-16">
        {count > 1 && (
          <div className="mb-7 flex justify-center gap-2">
            {banners.map((b, i) => (
              <button
                key={b.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-gold-500" : "w-1.5 bg-brand-200 hover:bg-brand-300"
                }`}
              />
            ))}
          </div>
        )}

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={slide.cta.href} className="btn btn-navy">
            {slide.cta.label}
          </Link>
          <a href={site.phoneHref} className="btn btn-outline">
            {site.phone}
          </a>
        </div>

        <p className="mx-auto mt-7 max-w-xl text-[0.7rem] leading-relaxed text-muted">
          Illustrative images, not patient records. Outcomes vary with the cause, which is
          established at consultation.
        </p>
      </div>
    </section>
  );
}
