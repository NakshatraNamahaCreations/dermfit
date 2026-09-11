import Link from "next/link";
import DivisionIcon from "./DivisionIcon";
import Reveal from "./Reveal";
import { divisions, treatmentCount } from "@/data/catalogue";

/**
 * "Our Services" for the home page — the six divisions as cards, each showing
 * the treatments inside it.
 *
 * This replaces DivisionRow here rather than sitting beside it: the row is a
 * line of six discs, which tells a visitor the divisions exist but not what is
 * in them, and running both would put the same six headings on the page twice.
 * The row still opens /services, where the full catalogue follows it.
 *
 * Treatment names are the clinic's own wording, straight from the catalogue,
 * and the counts are computed — so nothing here can drift from what the clinic
 * actually offers.
 */
export default function ServicesGrid() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-white via-gold-50/25 to-canvas py-16 sm:py-20 lg:py-24"
      aria-labelledby="home-services-heading"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-gold-300/20 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-[95rem] px-5 lg:px-10 xl:px-14">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-gold-50/70 px-3.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-800">
                Our services
              </span>
            </span>

            <h2
              id="home-services-heading"
              className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-brand-950 sm:text-4xl"
            >
              What we <span className="text-gold-gradient">treat</span>
            </h2>

            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
              {treatmentCount} treatments across {divisions.length} divisions —
              medical, aesthetic and regenerative — all under one dermatologist.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {divisions.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 110}>
              <Link
                href="/services#catalogue"
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-xl hover:shadow-brand-950/5 lg:p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-13 w-13 items-center justify-center rounded-xl bg-canvas p-3 text-gold-700 ring-1 ring-line transition-colors group-hover:bg-gold-50 group-hover:ring-gold-300">
                    <DivisionIcon name={d.icon} className="h-7 w-7" />
                  </span>
                  <span className="font-display text-2xl font-semibold text-line transition-colors group-hover:text-gold-200">
                    {d.number}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-brand-950">
                  {d.title}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
                  {d.blurb}
                </p>

                {/* The treatments themselves, in the clinic's own wording. */}
                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {d.treatments.slice(0, 5).map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-500"
                      />
                      <span className="text-[0.82rem] leading-snug text-brand-900">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>

                <span className="mt-auto flex items-center gap-1.5 pt-5 text-[0.78rem] font-semibold text-gold-700">
                  {d.treatments.length > 5
                    ? `+${d.treatments.length - 5} more in this division`
                    : "See this division"}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M6 3.5 10.5 8 6 12.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <div className="mt-12 text-center">
            <Link href="/services" className="btn btn-navy px-7 py-3 text-sm">
              See all {treatmentCount} treatments
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
