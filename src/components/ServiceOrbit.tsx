"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { divisions } from "@/data/catalogue";
import DivisionIcon from "./DivisionIcon";

/**
 * The six divisions arranged around the clinic mark, revealed by scroll.
 *
 * The section is tall with a sticky frame, so scrolling scrubs the reveal: the
 * whole ring swings in from the upper right and settles level while each
 * division fades up in turn.
 *
 * The ring is rotated as one element and every division is counter-rotated by
 * the same angle, so the group orbits while the labels stay upright.
 */

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1);
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/** Even hexagon, offset so nothing sits directly above or below the mark. */
const RX = 34;
const RY = 31;
// Rounded deliberately: the raw trig produces values like 32.999999999999986,
// which can serialise differently on the server than in the browser and trip a
// hydration mismatch. Fixed precision makes both sides agree.
const round = (n: number) => Number(n.toFixed(3));
const seats = divisions.map((_, i) => {
  const a = ((-60 + i * 60) * Math.PI) / 180;
  return { x: round(50 + RX * Math.cos(a)), y: round(50 + RY * Math.sin(a)) };
});

export default function ServiceOrbit() {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => {
        setStill(true);
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

  const settle = ease(seg(p, 0, 0.5));
  const angle = still ? 0 : (1 - settle) * 34;
  const scale = still ? 1 : 0.9 + settle * 0.1;

  return (
    <section
      ref={ref}
      className="relative bg-[#f6f4ef] lg:h-[220vh]"
      aria-labelledby="orbit-heading"
    >
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        <div className="container-page py-20 lg:py-0">
          <div className="lg:absolute lg:inset-x-0 lg:top-10 lg:z-20">
            <div className="container-page text-center">
              <p className="eyebrow">What we treat</p>
              <h2
                id="orbit-heading"
                className="mt-3 text-3xl font-bold tracking-[-0.03em] text-brand-950 sm:text-4xl"
              >
                Six divisions, one clinic
              </h2>
            </div>
          </div>

          {/* Orbit — large screens only; the ring needs the room */}
          <div className="relative mx-auto hidden h-screen max-w-6xl lg:block">
            <div
              className="absolute inset-0 will-change-transform"
              style={{ transform: `rotate(${angle}deg) scale(${scale})` }}
            >
              {divisions.map((d, i) => {
                const seat = seats[i];
                const right = seat.x > 50;
                const shown = seg(p, 0.06 + i * 0.05, 0.3 + i * 0.05);
                return (
                  <div
                    key={d.slug}
                    className="absolute w-60"
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
                        opacity: still ? 1 : shown,
                        transform: `translateY(${still ? 0 : (1 - ease(shown)) * 16}px)`,
                      }}
                    >
                      <span
                        className={`flex h-14 w-14 items-center justify-center rounded-full bg-surface text-brand-900 shadow-sm ring-1 ring-brand-100 transition-colors group-hover:bg-brand-950 group-hover:text-gold-300 ${
                          right ? "" : "ml-auto"
                        }`}
                      >
                        <DivisionIcon name={d.icon} className="h-6 w-6" />
                      </span>
                      <h3 className="mt-3 text-base font-bold tracking-[-0.01em] text-brand-950">
                        {d.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">{d.blurb}</p>
                      <span className="mt-2 inline-block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gold-600">
                        {d.treatments.length} treatments
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* The mark at the centre */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ opacity: still ? 1 : ease(seg(p, 0, 0.25)) }}
            >
              <Image
                src="/logo-transparent.png"
                alt=""
                width={2860}
                height={3389}
                sizes="200px"
                className="h-auto w-44 opacity-95"
              />
            </div>
          </div>

          {/* Small screens: the same six, stacked */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:hidden">
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
      </div>
    </section>
  );
}
