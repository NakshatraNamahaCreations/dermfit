import Link from "next/link";
import { treatmentCount, divisions } from "@/data/catalogue";
import { site } from "@/data/site";
import Reveal from "./Reveal";

const steps = [
  {
    title: "Examination & imaging",
    body: "Dermoscopy, trichoscopy or a lamp assessment — whatever your concern needs.",
  },
  {
    title: "Explanation",
    body: "What is actually happening in your skin, in plain language.",
  },
  {
    title: "A written plan",
    body: "Options, session counts, timelines and per-session cost.",
  },
  {
    title: "No pressure to book",
    body: "Take the plan away. It is yours whether you treat here or not.",
  },
];

/** PLACEHOLDER FIGURE — replace with the clinic's own number. */
const YEARS = "12+";

export default function FirstVisit() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-canvas to-gold-50 py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-gold-200/25 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-[88rem] gap-12 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        {/* The pitch */}
        <Reveal from="left">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-surface px-3.5 py-1.5 text-xs font-medium text-gold-700">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Dermatology clinic · {site.byline.replace("by ", "")} · Bengaluru
          </p>

          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-brand-950 sm:text-5xl">
            Your first visit,
            <span className="block text-gold-gradient">start to finish</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Thirty minutes, and you leave knowing exactly what is going on and what it
            would cost to treat — whether or not you book anything.
          </p>

          <dl className="mt-9 grid max-w-lg grid-cols-3 gap-4">
            {[
              { v: YEARS, l: "Years in practice" },
              { v: String(treatmentCount), l: "Treatments" },
              { v: String(divisions.length), l: "Divisions" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-surface p-4 ring-1 ring-line">
                <dd className="font-display text-2xl font-semibold text-brand-950">{s.v}</dd>
                <dt className="mt-1 text-[0.68rem] uppercase tracking-[0.12em] text-muted">
                  {s.l}
                </dt>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn btn-gold">
              Book a consultation
            </Link>
            <a href={site.phoneHref} className="btn btn-outline">
              {site.phone}
            </a>
          </div>
        </Reveal>

        {/* The timeline */}
        <Reveal from="right" delay={120}>
          <div className="rounded-[1.75rem] bg-brand-950 p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
              What a first visit looks like
            </p>

            <ol className="mt-8 space-y-0">
              {steps.map((s, i) => (
                <li key={s.title} className="relative flex gap-5 pb-8 last:pb-0">
                  {/* Connector between the numbers */}
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[1.375rem] top-11 h-[calc(100%-1.75rem)] w-px bg-gradient-to-b from-gold-500/60 to-gold-500/10"
                    />
                  )}
                  <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 font-display text-sm font-semibold text-brand-950">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-base font-semibold text-cream">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-brand-200">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-8 flex items-start gap-3 rounded-2xl bg-white/[0.06] p-4 text-sm leading-relaxed text-brand-100 ring-1 ring-white/10">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-gold-400"
              >
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M12 10.5v6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="7.8" r="1" fill="currentColor" />
              </svg>
              <span>
                The consultation fee is adjusted against your first treatment.{" "}
                <a
                  href={site.phoneHref}
                  className="font-semibold text-gold-300 underline underline-offset-4"
                >
                  Call us
                </a>{" "}
                to check availability.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
