"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

/**
 * Before/after hair banner.
 *
 * The comparison is illustrative, not a patient record — that is stated on the
 * banner itself, because a before/after on a clinic site otherwise reads as a
 * documented outcome.
 *
 * Text animates on mount rather than on scroll: this sits above the fold, so
 * there is nothing to wait for.
 */

const features = [
  { icon: "roots", label: ["Stronger", "roots"] },
  { icon: "growth", label: ["Natural", "growth"] },
  { icon: "thickness", label: ["Thicker", "hair"] },
  { icon: "scalp", label: ["Healthy", "scalp"] },
];

const iconPaths: Record<string, React.ReactNode> = {
  roots: (
    <>
      <path d="M12 20V9" />
      <path d="M8.5 20c0-4 1.4-7.4 3.5-9.6 2.1 2.2 3.5 5.6 3.5 9.6" />
      <path d="M7 5.5c1.8-1.6 3.6-2.2 5-2.2s3.2.6 5 2.2" />
    </>
  ),
  growth: (
    <>
      <path d="M12 21V8" />
      <path d="M12 12c0-2.8 2-5 4.8-5.4C16.6 9.4 14.6 12 12 12z" />
      <path d="M12 15.5c0-2.4-1.7-4.4-4.2-4.8.2 2.6 1.9 4.8 4.2 4.8z" />
    </>
  ),
  thickness: (
    <>
      <path d="M6 20c0-6 1.4-11 4-14M12 20c0-6.5 1.4-11.5 4-14.5M18 20c0-5 1-9 2.4-11.6" />
    </>
  ),
  scalp: (
    <>
      <path d="M12 3.5 5 6.4v4.8c0 4.2 2.9 8.1 7 9.3 4.1-1.2 7-5.1 7-9.3V6.4z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </>
  ),
};

function FeatureIcon({ name }: { name: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

function Portrait({
  src,
  side,
  label,
  points,
  shown,
}: {
  src: string;
  side: "left" | "right";
  label: string;
  points: string[];
  shown: boolean;
}) {
  const from = side === "left" ? "-translate-x-8" : "translate-x-8";
  return (
    <div
      className={`flex items-center gap-5 transition-all duration-[900ms] ease-out ${
        shown ? "translate-x-0 opacity-100" : `${from} opacity-0`
      } ${side === "right" ? "flex-row-reverse" : ""}`}
    >
      <div className={side === "right" ? "text-left" : "text-right"}>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-900">
          {label}
        </p>
        <span
          aria-hidden="true"
          className={`mt-2 block h-px w-10 bg-brand-300 ${side === "right" ? "" : "ml-auto"}`}
        />
        <ul className="mt-3 space-y-0.5 text-[0.78rem] leading-relaxed text-muted">
          {points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>

      <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full ring-1 ring-brand-200/70 sm:h-40 sm:w-40 lg:h-48 lg:w-48">
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 192px, 160px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default function HairBanner() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const line2 = ["Restoring", "confidence."];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f4f7fb] to-canvas py-14 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[46rem] -translate-x-1/2 rounded-full bg-brand-100/50 blur-[100px]"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr_auto] lg:gap-8">
          <Portrait
            src="/hair-before.jpg"
            side="left"
            label="Before"
            points={["Thinning hair", "Widening parting", "Low volume"]}
            shown={shown}
          />

          {/* The line */}
          <div className="order-first text-center lg:order-none">
            <p
              className={`text-[0.7rem] font-medium uppercase tracking-[0.3em] text-muted transition-all duration-700 sm:text-xs ${
                shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              Transforming hair.
            </p>

            <h1 className="mt-3 flex flex-wrap justify-center gap-x-3 font-display text-2xl font-semibold uppercase tracking-[-0.01em] text-brand-950 sm:text-3xl lg:text-4xl">
              {line2.map((word, i) => (
                <span
                  key={word}
                  className={`transition-all duration-[900ms] ease-out ${
                    shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  } ${i === 1 ? "text-gold-gradient" : ""}`}
                  style={{ transitionDelay: `${180 + i * 160}ms` }}
                >
                  {word}
                </span>
              ))}
            </h1>

            <span
              aria-hidden="true"
              className={`mx-auto mt-5 block h-px w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent transition-opacity duration-700 ${
                shown ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "520ms" }}
            />

            <ul className="mt-7 flex flex-wrap items-start justify-center gap-x-7 gap-y-5 sm:gap-x-9">
              {features.map((f, i) => (
                <li
                  key={f.icon}
                  className={`flex w-20 flex-col items-center gap-2 text-center transition-all duration-700 ease-out ${
                    shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${620 + i * 110}ms` }}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-800 ring-1 ring-brand-200/80">
                    <FeatureIcon name={f.icon} />
                  </span>
                  <span className="text-[0.62rem] font-semibold uppercase leading-tight tracking-[0.1em] text-brand-900">
                    {f.label[0]}
                    <br />
                    {f.label[1]}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className={`mt-9 flex flex-col justify-center gap-3 transition-all duration-700 sm:flex-row ${
                shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "1080ms" }}
            >
              <Link href="/concerns#hair-fall" className="btn btn-navy">
                Hair fall, explained
              </Link>
              <a href={site.phoneHref} className="btn btn-outline">
                {site.phone}
              </a>
            </div>
          </div>

          <Portrait
            src="/hair-after.jpg"
            side="right"
            label="After"
            points={["Thicker hair", "Denser parting", "Healthy scalp"]}
            shown={shown}
          />
        </div>

        {/* Required on any before/after shown by a clinic */}
        <p className="mt-10 text-center text-[0.68rem] leading-relaxed text-muted">
          Illustrative images, not a patient record. Outcomes vary with the cause of hair
          loss, and are established at consultation.
        </p>
      </div>
    </section>
  );
}
