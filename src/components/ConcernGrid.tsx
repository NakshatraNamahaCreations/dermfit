import Image from "next/image";
import Link from "next/link";
import { concerns } from "@/data/concerns";
import Reveal from "./Reveal";

/**
 * Concern-led entry: the problem in the visitor's own words, and what the first
 * appointment does about it.
 *
 * Cards carry a before/after pair where there is one. The frame is 3:2 and each
 * half exactly 3:4, the ratio the files are cut to, so the layout crops
 * neither. A card needs both halves or neither — one on its own is a claim with
 * nothing to compare it against.
 *
 * The pairs are ILLUSTRATIVE, not patient records, and the grid says so beneath
 * the cards. Real patient comparisons need written consent, matched lighting
 * and angle, and no implied guarantee of outcome under the Drugs and Magic
 * Remedies Act and the ASCI code.
 */
export default function ConcernGrid({ limit }: { limit?: number } = {}) {
  const shown = limit ? concerns.slice(0, limit) : concerns;

  return (
    <section className="bg-canvas py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[88rem] px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Start here</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-brand-950 sm:text-5xl">
              What have you <span className="text-gold-gradient">noticed?</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              You do not need the name of the condition. That is the consultation.
            </p>
          </div>
          {limit && (
            <Link href="/concerns" className="text-sm font-semibold text-gold-700 hover:underline">
              All concerns →
            </Link>
          )}
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 4) * 80}>
              <Link
                href={`/concerns#${c.slug}`}
                id={c.slug}
                className="group flex h-full scroll-mt-32 flex-col overflow-hidden rounded-[1.5rem] bg-surface ring-1 ring-line transition-all hover:-translate-y-1 hover:ring-gold-300"
              >
                {c.before && c.after && (
                  <div className="relative">
                    <div className="relative grid aspect-[3/2] grid-cols-2">
                      <div className="relative overflow-hidden">
                        <Image
                          src={c.before}
                          alt={c.beforeAlt ?? ""}
                          fill
                          sizes="(min-width: 1024px) 21vw, (min-width: 640px) 45vw, 92vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="relative overflow-hidden">
                        <Image
                          src={c.after}
                          alt={c.afterAlt ?? ""}
                          fill
                          sizes="(min-width: 1024px) 21vw, (min-width: 640px) 45vw, 92vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/90"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-0 h-1/3 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:animate-seam group-hover:opacity-100"
                      />
                    </div>
                    <div className="grid grid-cols-2 text-center text-[0.6rem] font-semibold uppercase tracking-[0.14em]">
                      <span className="border-r border-line py-2 text-muted">Before</span>
                      <span className="bg-gold-50 py-2 text-gold-700">After</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold leading-snug text-brand-950">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-sm italic leading-relaxed text-muted">
                  &ldquo;{c.said}&rdquo;
                </p>

                <div className="mt-5 border-t border-line pt-4">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold-600">
                    First appointment
                  </p>
                  <p className="mt-1.5 flex-1 text-[0.8rem] leading-relaxed text-brand-900">
                    {c.workup}
                  </p>
                </div>

                <p className="mt-4 text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                  {c.division}
                </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        {shown.some((c) => c.before) && (
          <p className="mt-8 text-center text-xs leading-relaxed text-muted">
            Illustrative images, not patient records. Outcomes differ with the cause, the
            severity and the individual, and are never guaranteed.
          </p>
        )}
      </div>
    </section>
  );
}
