"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { doctors } from "@/data/content";

/**
 * Editorial "about" section: a display headline split either side of a centred
 * portrait, with stat and trust cards floating above it and arrows to move
 * through the consultants.
 */
export default function AboutShowcase() {
  const [i, setI] = useState(0);
  const count = doctors.length;
  const doctor = doctors[i];

  const prev = () => setI((n) => (n - 1 + count) % count);
  const next = () => setI((n) => (n + 1) % count);

  return (
    <section className="overflow-hidden bg-gold-50 py-20 sm:py-24">
      <div className="container-page">
        {/* Floating cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-start">
          <div className="rounded-[1.75rem] bg-surface p-6 shadow-sm lg:col-span-3">
            <p className="font-display text-4xl font-semibold text-brand-950">12+</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">
              Years of clinical
              <br />
              dermatology practice
            </p>
          </div>

          <div className="hidden lg:col-span-4 lg:block" aria-hidden="true" />

          <div className="flex items-center gap-4 rounded-[1.75rem] bg-surface p-6 shadow-sm lg:col-span-5">
            <span className="shrink-0 self-start rounded-2xl bg-brand-950 px-3.5 py-2 font-display text-lg font-semibold text-gold-300">
              #01
            </span>
            <div>
              <h3 className="text-sm font-semibold text-brand-950">
                Diagnosis before treatment
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                Every plan starts with imaging, scoring or lab work — never a package sold
                off a menu. It is the reason our patients stop clinic-hopping.
              </p>
            </div>
          </div>
        </div>

        {/* Headline split around the portrait */}
        <div className="mt-12 grid items-center gap-8 lg:mt-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
          {/* Left words */}
          <div className="order-1 text-center lg:text-right">
            <p className="font-display text-5xl font-normal leading-[1.02] tracking-tight text-gold-500 sm:text-6xl lg:text-[4.5rem]">
              Skilled
            </p>
            <p className="mt-1 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-brand-950 sm:text-6xl lg:text-[4.5rem]">
              Skin
              <span className="lg:block"> Experts</span>
            </p>
          </div>

          {/* Portrait */}
          <div className="order-2 mx-auto w-full max-w-xs lg:w-72">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-brand-900 shadow-xl shadow-brand-950/15">
              {doctor.photo ? (
                <Image
                  src={doctor.photo}
                  alt={`${doctor.name}, ${doctor.role}`}
                  fill
                  sizes="(min-width: 1024px) 288px, 320px"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,var(--color-brand-800),var(--color-brand-950))]" />
                  <span className="absolute inset-0 flex items-center justify-center font-display text-7xl font-semibold text-gold-gradient">
                    {doctor.initials}
                  </span>
                </div>
              )}

              {/* Name plate */}
              <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-brand-950/70 px-4 py-3 backdrop-blur-md">
                <p className="text-sm font-semibold text-cream">{doctor.name}</p>
                <p className="mt-0.5 text-[0.7rem] text-cream/70">{doctor.role}</p>
              </div>
            </div>

            {/* Arrows */}
            {count > 1 && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous consultant"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-200 bg-surface text-brand-900 transition-colors hover:border-gold-400 hover:text-gold-700"
                >
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M11 3.5 5.5 9l5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next consultant"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-200 bg-surface text-brand-900 transition-colors hover:border-gold-400 hover:text-gold-700"
                >
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="m7 3.5 5.5 5.5L7 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Right words */}
          <div className="order-3 text-center lg:text-left">
            <p className="font-display text-5xl font-normal leading-[1.02] tracking-tight text-gold-500 sm:text-6xl lg:text-[4.5rem]">
              Results-
            </p>
            <p className="mt-1 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-brand-950 sm:text-6xl lg:text-[4.5rem]">
              Driven
            </p>
          </div>
        </div>

        {/* Bio + link */}
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-muted">{doctor.bio}</p>
          <Link
            href="/about"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 hover:underline"
          >
            More about the clinic
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
