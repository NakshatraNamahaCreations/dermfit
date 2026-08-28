"use client";

import Link from "next/link";
import { useState } from "react";
import { divisions, treatmentCount } from "@/data/catalogue";
import DivisionIcon from "./DivisionIcon";

export default function TreatmentCatalogue() {
  const [active, setActive] = useState(0);
  const division = divisions[active];

  return (
    <section id="catalogue" className="scroll-mt-28 bg-brand-950 py-20 sm:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
            <span className="h-px w-8 bg-gold-500/70" />
            Full catalogue
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-cream sm:text-5xl">
            Six divisions.{" "}
            <span className="text-gold-gradient">{treatmentCount} treatments.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-200">
            Everything Dermfit offers, grouped by the kind of problem it solves. Pick a
            division to see what sits inside it.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[22rem_1fr] lg:gap-12">
          {/* Division list */}
          <div
            role="tablist"
            aria-label="Treatment divisions"
            aria-orientation="vertical"
            className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {divisions.map((d, i) => {
              const on = i === active;
              return (
                <button
                  key={d.slug}
                  role="tab"
                  id={`tab-${d.slug}`}
                  aria-selected={on}
                  aria-controls={`panel-${d.slug}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                      e.preventDefault();
                      setActive((n) => (n + 1) % divisions.length);
                    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      setActive((n) => (n - 1 + divisions.length) % divisions.length);
                    }
                  }}
                  className={`group flex min-w-[15rem] shrink-0 items-center gap-4 rounded-2xl border p-4 text-left transition-all lg:min-w-0 ${
                    on
                      ? "border-gold-400/50 bg-white/10"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.07]"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      on ? "bg-gold-400 text-brand-950" : "bg-white/10 text-gold-300"
                    }`}
                  >
                    <DivisionIcon name={d.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
                      {d.number}
                    </span>
                    <span
                      className={`mt-0.5 block text-sm font-semibold leading-snug ${
                        on ? "text-cream" : "text-brand-100"
                      }`}
                    >
                      {d.title}
                    </span>
                    <span className="mt-0.5 block text-[0.7rem] text-brand-300">
                      {d.treatments.length} treatments
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active division */}
          <div
            role="tabpanel"
            id={`panel-${division.slug}`}
            aria-labelledby={`tab-${division.slug}`}
            key={division.slug}
            className="animate-panel rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 sm:p-9"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.02em] text-cream sm:text-3xl">
                  {division.title}
                </h3>
                <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-brand-200">
                  {division.blurb}
                </p>
              </div>
              <span className="hidden shrink-0 text-right sm:block">
                <span className="block text-3xl font-bold text-gold-gradient">
                  {division.number}
                </span>
              </span>
            </div>

            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {division.treatments.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3 border-b border-white/[0.07] pb-3 text-sm text-brand-100"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-gold-400"
                  >
                    <path
                      d="m4 9.4 3 3L14 5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contact" className="btn btn-gold">
                Book a consultation
              </Link>
              <p className="text-xs leading-relaxed text-brand-300 sm:ml-2">
                Not sure which applies to you? Tell us the concern and we will match you
                to the right consultant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
