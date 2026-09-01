"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { results, resultsAreIllustrative } from "@/data/results";

const AUTOPLAY_MS = 8000;

/**
 * Before / after results band.
 *
 * Rather than two frames sitting side by side, each case is a single frame with
 * a wipe across it: the comparison opens on the "before" state and sweeps to
 * half, so it plays itself once, and can then be dragged. That is the whole
 * point of a before/after — seeing the same pixels change — and it is lost when
 * the eye has to travel between two separate pictures.
 *
 * The sweep is a CSS keyframe until the visitor touches the handle, at which
 * point an inline clip takes over. No animation loop in JS, and no state to
 * reset between slides — the frame is keyed on the case, so changing case
 * remounts it and the sweep replays.
 *
 * These are illustrative images, not patient records, and the band says so in
 * text. See data/results.ts for what has to be true before that changes.
 */
export default function ResultsBand() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Null until dragged: null means "let the CSS sweep run".
  const [x, setX] = useState<number | null>(null);
  const frame = useRef<HTMLDivElement>(null);
  // Touch reports buttons as 0, so the mouse-button test alone left dragging
  // dead on phones. Track it explicitly instead.
  const dragging = useRef(false);
  const count = results.length;
  const item = results[index];

  const go = useCallback(
    (n: number) => {
      setIndex(((n % count) + count) % count);
      setX(null);
    },
    [count],
  );

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % count);
      setX(null);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [paused, count, index]);

  const track = (clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setX(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  const swept = x === null;
  const clip = swept ? undefined : { clipPath: `inset(0 ${100 - x}% 0 0)` };
  const handleAt = swept ? undefined : { left: `${x}%` };

  return (
    <section className="bg-surface py-16 sm:py-24" aria-labelledby="results-heading">
      <div className="container-page text-center">
        <p className="eyebrow">Results</p>
        <h2
          id="results-heading"
          className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl lg:text-5xl"
        >
          Life changing results
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-5 block h-px w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
        />
      </div>

      <div className="mt-12 bg-canvas py-12 sm:py-16">
        <div className="container-page">
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Navy offset blocks and the dot field, as on the reference */}
            <span
              aria-hidden="true"
              className="absolute -left-2 -top-2 hidden h-24 w-24 rounded-tl-2xl bg-brand-950 sm:block lg:-left-4 lg:-top-4 lg:h-32 lg:w-32"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-2 -right-2 hidden h-24 w-24 rounded-br-2xl bg-brand-950 sm:block lg:-bottom-4 lg:-right-4 lg:h-32 lg:w-32"
            />
            <span
              aria-hidden="true"
              className="absolute -right-1 -top-6 hidden h-20 w-40 lg:block"
              style={{
                backgroundImage: "radial-gradient(var(--color-brand-200) 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />

            <div className="relative overflow-hidden rounded-2xl bg-surface p-4 shadow-xl shadow-brand-950/5 sm:p-6 lg:p-8">
              <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
                {/* The comparison */}
                <div
                  key={item.id}
                  ref={frame}
                  className="relative aspect-[3/2] w-full touch-pan-y select-none overflow-hidden rounded-xl bg-canvas"
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId);
                    dragging.current = true;
                    track(e.clientX);
                  }}
                  onPointerMove={(e) => {
                    if (dragging.current) track(e.clientX);
                  }}
                  onPointerUp={() => (dragging.current = false)}
                  onPointerCancel={() => (dragging.current = false)}
                >
                  <Image
                    src={item.after}
                    alt={item.afterAlt}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover object-top"
                  />

                  <div
                    className={`absolute inset-0 ${swept ? "animate-wipe" : ""}`}
                    style={clip}
                  >
                    <Image
                      src={item.before}
                      alt={item.beforeAlt}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Handle */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-y-0 w-px -translate-x-1/2 bg-white/90 shadow-[0_0_0_1px_rgba(1,18,45,0.12)] ${
                      swept ? "animate-wipe-handle" : ""
                    }`}
                    style={handleAt}
                  >
                    <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-900 shadow-lg">
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                        <path
                          d="M7.5 4 4 9l3.5 5M10.5 4 14 9l-3.5 5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-brand-950/85 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white">
                    Before
                  </span>
                  <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-gold-500/95 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand-950">
                    After
                  </span>
                </div>

                {/* The case */}
                <div key={`${item.id}-copy`} className="animate-rise">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
                    {item.concern}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-brand-950 sm:text-3xl">
                    {item.headline}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                    {item.summary}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link href={item.href} className="btn btn-navy">
                      How this is diagnosed
                    </Link>
                    <Link href="/contact" className="btn btn-outline">
                      Book a consult
                    </Link>
                  </div>

                  <p className="mt-6 text-xs text-muted">
                    Drag the handle to compare.
                  </p>
                </div>
              </div>
            </div>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Previous result"
                  className="absolute -left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-brand-900 shadow-lg ring-1 ring-line transition-colors hover:text-gold-700 lg:flex"
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
                  aria-label="Next result"
                  className="absolute -right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-brand-900 shadow-lg ring-1 ring-line transition-colors hover:text-gold-700 lg:flex"
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

          {count > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {results.map((r, i) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={r.concern}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-9 bg-gold-500" : "w-1.5 bg-brand-200 hover:bg-brand-300"
                  }`}
                />
              ))}
            </div>
          )}

          {resultsAreIllustrative && (
            <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted">
              Illustrative images, not patient records. Outcomes differ with the cause, the
              severity and the individual, and are never guaranteed — yours is established at
              consultation.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
