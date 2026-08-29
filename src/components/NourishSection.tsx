"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { divisions, treatmentCount } from "@/data/catalogue";
import DivisionIcon from "./DivisionIcon";

/**
 * One continuous scroll-scrubbed sequence.
 *
 * The section is tall and its inner frame is sticky, so scrolling drives a
 * timeline rather than simply moving past it:
 *
 *   1. foliage slides in from the left and right; the word and the service
 *      summary hold between them
 *   2. the foliage drops away below the frame
 *   3. the treatment portrait rises from below and parks in the centre
 *   4. the portrait stays put while the six divisions swing in around it
 *
 * It is one component because the divisions orbit the portrait, so both have to
 * share a single scroll position.
 */

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1);
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/** Hexagon around the portrait, offset so nothing sits directly above or below. */
const RX = 36;
const RY = 30;
// Rounded: raw trig yields values like 32.999999999999986, which can serialise
// differently on the server and in the browser and trip a hydration mismatch.
const round = (n: number) => Number(n.toFixed(3));
const seats = divisions.map((_, i) => {
  const a = ((-60 + i * 60) * Math.PI) / 180;
  return { x: round(50 + RX * Math.cos(a)), y: round(50 + RY * Math.sin(a)) };
});

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
  const [still, setStill] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => {
        setStill(true);
        setReady(true);
        setP(1);
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

  // 1-2. Foliage in from the sides, then away below.
  const leafX = (1 - ease(seg(p, 0, 0.16))) * 118;
  const leafY = ease(seg(p, 0.3, 0.42)) * 130;
  // 3. Portrait rises, then holds for the rest of the section.
  const portraitY = (1 - ease(seg(p, 0.34, 0.52))) * 120;
  // Word and summary belong to the foliage beat and clear before the orbit.
  const wordOut = ease(seg(p, 0.46, 0.56));
  const copy = ease(seg(p, 0.06, 0.16)) * (1 - ease(seg(p, 0.26, 0.36)));
  // 4. The ring swings in from the upper right and settles level.
  const orbit = ease(seg(p, 0.56, 0.82));
  const angle = still ? 0 : (1 - orbit) * 34;
  const scale = still ? 1 : 0.92 + orbit * 0.08;
  const orbitCopy = still ? 1 : ease(seg(p, 0.54, 0.64));

  const lettersIn = ready && p > 0.02;

  return (
    <section ref={ref} aria-label={word} className="relative bg-[#f3f1ea] lg:h-[420vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* The word, pale, behind everything */}
        <div
          className="absolute inset-x-0 top-[16%] px-6 transition-opacity duration-300"
          style={{ opacity: 1 - wordOut }}
        >
          <h2 className="text-center">
            <span className="sr-only">{word}</span>
            <span
              aria-hidden="true"
              className="flex justify-center font-display font-normal uppercase leading-none tracking-[0.04em] text-forest/25"
            >
              {word.split("").map((letter, i) => (
                <span
                  key={i}
                  className={`inline-block text-[3.5rem] transition-all duration-[900ms] ease-out sm:text-[7rem] lg:text-[10rem] ${
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
          className="container-page absolute inset-x-0 top-[8%] transition-opacity duration-300"
          style={{ opacity: (1 - wordOut) * (lettersIn ? 1 : 0) }}
        >
          <p className="text-[0.7rem] font-medium uppercase leading-[1.9] tracking-[0.24em] text-forest/80 sm:text-xs">
            {caption[0]}
            <br />
            {caption[1]}
          </p>
          <span aria-hidden="true" className="mt-4 block h-px w-14 bg-forest/30" />
        </div>

        {/* Service summary — belongs to the foliage beat */}
        <div
          className="absolute inset-x-0 top-[52%] px-6 transition-opacity duration-500"
          style={{ opacity: copy }}
          aria-hidden={copy < 0.05}
        >
          <div className="container-page text-center">
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-forest sm:text-xl">
              Clinical dermatology, aesthetics, trichology, lasers and regenerative care —{" "}
              {treatmentCount} treatments under one roof.
            </p>
          </div>
        </div>

        {/* Foliage entering from either side */}
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
            className="h-auto w-full opacity-90 brightness-115 saturate-[0.72]"
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
            className="h-auto w-full opacity-90 brightness-115 saturate-[0.72]"
          />
        </div>

        {/* Orbit heading */}
        <div
          className="absolute inset-x-0 top-[14%] z-20 hidden transition-opacity duration-500 lg:block"
          style={{ opacity: orbitCopy }}
          aria-hidden={orbitCopy < 0.05}
        >
          <div className="container-page text-center">
            <p className="eyebrow">What we treat</p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-brand-950">
              Six divisions, one clinic
            </h2>
          </div>
        </div>

        {/* The portrait — rises, then holds while the divisions orbit it */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[16%] flex items-center justify-center">
          <div
            className="w-[min(62vw,20rem)] will-change-transform"
            style={{ transform: `translate3d(0, ${portraitY}%, 0)` }}
          >
            <Image
              src="/ritual-face.png"
              alt=""
              width={1114}
              height={1091}
              sizes="(min-width: 1024px) 320px, 62vw"
              className="h-auto w-full"
            />
          </div>
        </div>

        {/* The divisions, orbiting the portrait */}
        <div className="absolute inset-x-0 bottom-0 top-[16%] hidden lg:block">
          <div
            className="absolute inset-0 mx-auto max-w-6xl will-change-transform"
            style={{ transform: `rotate(${angle}deg) scale(${scale})` }}
          >
            {divisions.map((d, i) => {
              const seat = seats[i];
              const right = seat.x > 50;
              const shown = still ? 1 : seg(p, 0.58 + i * 0.03, 0.74 + i * 0.03);
              return (
                <div
                  key={d.slug}
                  className="absolute w-56"
                  style={{
                    left: `${seat.x}%`,
                    top: `${seat.y}%`,
                    transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                  }}
                >
                  <Link
                    href="/services#catalogue"
                    className={`group block ${right ? "text-left" : "text-right"}`}
                    style={{
                      opacity: shown,
                      transform: `translateY(${(1 - ease(shown)) * 14}px)`,
                    }}
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full bg-surface text-brand-900 shadow-sm ring-1 ring-brand-100 transition-colors group-hover:bg-brand-950 group-hover:text-gold-300 ${
                        right ? "" : "ml-auto"
                      }`}
                    >
                      <DivisionIcon name={d.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-2.5 text-sm font-bold leading-snug tracking-[-0.01em] text-brand-950">
                      {d.title}
                    </h3>
                    <p className="mt-1 text-[0.72rem] leading-relaxed text-muted">{d.blurb}</p>
                    <span className="mt-1.5 inline-block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold-600">
                      {d.treatments.length} treatments
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Small screens: the ring needs width it cannot get, so the same six are
          listed beneath the sequence instead. */}
      <div className="container-page pb-20 lg:hidden">
        <p className="eyebrow">What we treat</p>
        <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-brand-950">
          Six divisions, one clinic
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {divisions.map((d) => (
            <Link
              key={d.slug}
              href="/services#catalogue"
              className="group rounded-[1.5rem] bg-surface p-6 ring-1 ring-brand-100 transition-colors hover:ring-gold-300"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-950 text-gold-300">
                <DivisionIcon name={d.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-brand-950">{d.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{d.blurb}</p>
              <span className="mt-2 inline-block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gold-600">
                {d.treatments.length} treatments
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
