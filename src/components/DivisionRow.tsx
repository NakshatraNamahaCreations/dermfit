import Link from "next/link";
import DivisionIcon from "./DivisionIcon";
import { divisions } from "@/data/catalogue";
import Reveal from "./Reveal";

/**
 * The six divisions as a single reading line: numbered image discs joined by
 * arrows, each with its title and the treatments it covers.
 */
export default function DivisionRow({
  label = "Our Clinical Services",
  lead = "Comprehensive medical, aesthetic and regenerative care across six specialized divisions.",
}: { label?: string; lead?: string } = {}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gold-50/20 to-canvas py-16 sm:py-20 lg:py-24" aria-labelledby="services-heading">
      <div className="mx-auto w-full max-w-[92rem] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-gold-50/60 px-3.5 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-800 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500 animate-pulse" />
            Specialized Care
          </div>
          <h2
            id="services-heading"
            className="mt-3.5 font-display text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl lg:text-[2.6rem]"
          >
            {label}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            {lead}
          </p>
        </div>

        {/* 6 Divisions Row */}
        <ol className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:flex lg:items-start lg:gap-0">
          {divisions.map((d, i) => (
            <li key={d.slug} className="contents lg:flex lg:flex-1 lg:items-start">
              <Reveal delay={i * 80} className="lg:flex-1">
                <Link href="/services#catalogue" className="group block px-2 text-center">
                  {/* Disc */}
                  <span className="relative mx-auto block h-24 w-24 sm:h-28 sm:w-28">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-surface text-brand-900 ring-1 ring-brand-950/10 shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:ring-2 group-hover:ring-gold-400 group-hover:text-gold-700">
                      <DivisionIcon name={d.icon} className="h-10 w-10 sm:h-11 sm:w-11" />
                    </span>
                    <span className="absolute -left-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-950 text-[0.65rem] font-semibold text-gold-300 ring-2 ring-gold-50 shadow-sm">
                      {d.number}
                    </span>
                  </span>

                  <h3 className="mt-4 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-brand-950 sm:text-[0.85rem] transition-colors group-hover:text-gold-700">
                    {d.title}
                  </h3>

                  <p className="mx-auto mt-2 max-w-[16rem] text-[0.78rem] leading-relaxed text-muted sm:text-[0.82rem]">
                    {d.highlights.join(" · ")}
                  </p>
                </Link>
              </Reveal>

              {/* Connector between items on desktop */}
              {i < divisions.length - 1 && (
                <span aria-hidden="true" className="hidden shrink-0 pt-12 lg:block">
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="text-gold-500/70">
                    <path
                      d="M1 6h16M13.5 1.5 18 6l-4.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ol>

        {/* Bottom CTA to View Full Catalogue */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/services#catalogue"
            className="btn btn-outline inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider shadow-xs hover:border-gold-500 hover:bg-gold-50/40"
          >
            <span>Explore All 61+ Treatments in Catalogue</span>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
