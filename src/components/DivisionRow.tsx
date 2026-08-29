import Image from "next/image";
import Link from "next/link";
import { divisions, treatmentCount } from "@/data/catalogue";
import Reveal from "./Reveal";

/**
 * The six divisions as a single reading line: numbered image discs joined by
 * arrows, each with its title and the treatments it covers.
 */
export default function DivisionRow({
  // The scroll sequence further down already says "Six divisions, one clinic",
  // so this leads differently rather than repeating it.
  label = "Areas of care",
}: { label?: string } = {}) {
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

        <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-muted">
          {treatmentCount} treatments, grouped by the kind of problem each one solves — so
          you can start from the concern rather than the procedure name.
        </p>

        <ol className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:flex lg:items-start lg:gap-0">
          {divisions.map((d, i) => (
            <li key={d.slug} className="contents lg:flex lg:flex-1 lg:items-start">
              <Reveal delay={i * 80} className="lg:flex-1">
                <Link href="/services#catalogue" className="group block px-2 text-center">
                  {/* Disc */}
                  <span className="relative mx-auto block h-24 w-24 sm:h-28 sm:w-28">
                    <span className="block h-full w-full overflow-hidden rounded-full ring-1 ring-brand-950/10 transition-all group-hover:ring-2 group-hover:ring-gold-400">
                      <Image
                        src={d.image}
                        alt=""
                        width={900}
                        height={1200}
                        sizes="112px"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </span>
                    <span className="absolute -left-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-950 text-[0.65rem] font-semibold text-gold-300 ring-2 ring-gold-50">
                      {d.number}
                    </span>
                  </span>

                  <h3 className="mt-4 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-brand-950 sm:text-xs">
                    {d.title}
                  </h3>

                  <p className="mx-auto mt-2 max-w-[15rem] text-[0.7rem] leading-relaxed text-muted">
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
