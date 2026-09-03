import Link from "next/link";
import DivisionIcon from "./DivisionIcon";
import { divisions } from "@/data/catalogue";
import Reveal from "./Reveal";

/**
 * The six divisions as a single reading line: numbered image discs joined by
 * arrows, each with its title and the treatments it covers.
 */
export default function DivisionRow({
  // The scroll sequence further down already says "Six divisions, one clinic",
  // so this leads differently rather than repeating it.
  label = "What we look after",
  lead = "Medical, aesthetic and regenerative care under one roof.",
}: { label?: string; lead?: string } = {}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gold-50 to-canvas py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[92rem] px-5">
        {/* Heading, ruled either side */}
        <div className="flex items-center gap-5">
          <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-400/60" />
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.24em] text-brand-950 sm:text-base">
            {label}
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-400/60" />
        </div>

        <p className="mx-auto mt-5 max-w-xl text-center text-base leading-relaxed text-muted">
          {lead}
        </p>

        <ol className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:flex lg:items-start lg:gap-0">
          {divisions.map((d, i) => (
            <li key={d.slug} className="contents lg:flex lg:flex-1 lg:items-start">
              <Reveal delay={i * 80} className="lg:flex-1">
                <Link href="/services#catalogue" className="group block px-2 text-center">
                  {/* Disc.

                      Icons rather than photographs. The stock frames behind
                      these were towels, lilies and cream lighting — a spa, not
                      a dermatology clinic, which is the impression the whole
                      site has been moved away from. A drawn instrument reads as
                      medical and, unlike a stock model, is not pretending to be
                      this clinic. The files are still in public/ if real
                      photography of the rooms replaces them. */}
                  <span className="relative mx-auto block h-24 w-24 sm:h-28 sm:w-28">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-surface text-brand-900 ring-1 ring-brand-950/10 transition-all group-hover:ring-2 group-hover:ring-gold-400 group-hover:text-gold-700">
                      <DivisionIcon name={d.icon} className="h-10 w-10 sm:h-11 sm:w-11" />
                    </span>
                    <span className="absolute -left-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-950 text-[0.65rem] font-semibold text-gold-300 ring-2 ring-gold-50">
                      {d.number}
                    </span>
                  </span>

                  <h3 className="mt-4 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-brand-950 sm:text-[0.82rem]">
                    {d.title}
                  </h3>

                  <p className="mx-auto mt-2.5 max-w-[16rem] text-[0.8rem] leading-relaxed text-muted sm:text-[0.85rem]">
                    {d.highlights.join(" · ")}
                  </p>
                </Link>
              </Reveal>

              {/* Connector, between items only */}
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
      </div>
    </section>
  );
}
