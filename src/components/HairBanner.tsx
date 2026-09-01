"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

/**
 * Before/after hair banner.
 *
 * The artwork is the supplied composite with its centre type painted out, so
 * the headline and feature labels can be real text sitting in that gap. That
 * keeps them animatable, selectable, translatable and readable to screen
 * readers — none of which is true of type baked into a JPEG.
 *
 * The comparison is illustrative rather than a patient record, and says so.
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
  thickness: <path d="M6 20c0-6 1.4-11 4-14M12 20c0-6.5 1.4-11.5 4-14.5M18 20c0-5 1-9 2.4-11.6" />,
  scalp: (
    <>
      <path d="M12 3.5 5 6.4v4.8c0 4.2 2.9 8.1 7 9.3 4.1-1.2 7-5.1 7-9.3V6.4z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </>
  ),
};

export default function HairBanner() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Shared entrance: same transition for every element, staggered by delay.
  const rise = `transition-all duration-[900ms] ease-out ${
    shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
  }`;
  const delay = (ms: number) => ({ transitionDelay: `${ms}ms` });

  return (
    <section className="relative bg-white">
      <div className="relative">
        <Image
          src="/banner-hair.jpg"
          alt="Before and after: thinning hair with a widening parting, and thicker hair with a denser parting."
          width={1983}
          height={793}
          priority
          sizes="100vw"
          className="h-auto w-full"
        />

        {/* Overlays the gap in the artwork on wide screens; below that the
            artwork is too short to hold type, so this sits beneath it. */}
        <div className="px-6 pb-4 pt-8 lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center lg:p-0">
          <div className="mx-auto w-full max-w-sm text-center lg:max-w-[26%]">
            <p
              style={delay(0)}
              className={`${rise} text-[0.6rem] font-medium uppercase tracking-[0.32em] text-brand-800 sm:text-[0.7rem]`}
            >
              Transforming hair.
            </p>

            <h1 className="mt-2 font-display text-xl font-semibold uppercase leading-tight tracking-tight text-brand-950 sm:text-2xl lg:text-[1.7rem]">
              <span style={delay(160)} className={`${rise} inline-block`}>
                Restoring{" "}
              </span>
              <span style={delay(300)} className={`${rise} inline-block text-gold-gradient`}>
                confidence.
              </span>
            </h1>

            <span
              aria-hidden="true"
              style={delay(460)}
              className={`${rise} mx-auto mt-3 block h-px w-20 bg-gradient-to-r from-transparent via-gold-500 to-transparent`}
            />

            <ul className="mt-5 flex flex-wrap items-start justify-center gap-x-4 gap-y-4 sm:gap-x-5">
              {features.map((f, i) => (
                <li
                  key={f.icon}
                  style={delay(560 + i * 110)}
                  className={`${rise} flex w-14 flex-col items-center gap-1.5 text-center`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-800 ring-1 ring-brand-200/80">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {iconPaths[f.icon]}
                    </svg>
                  </span>
                  <span className="text-[0.52rem] font-semibold uppercase leading-tight tracking-[0.08em] text-brand-900">
                    {f.label[0]}
                    <br />
                    {f.label[1]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container-page pb-14 pt-6 text-center sm:pb-16">
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/concerns#hair-fall" className="btn btn-navy">
            Hair fall, explained
          </Link>
          <a href={site.phoneHref} className="btn btn-outline">
            {site.phone}
          </a>
        </div>

        <p className="mx-auto mt-7 max-w-xl text-[0.7rem] leading-relaxed text-muted">
          Illustrative images, not a patient record. Outcomes vary with the cause of hair
          loss, which is established at consultation.
        </p>
      </div>
    </section>
  );
}
