import Link from "next/link";
import { concerns } from "@/data/concerns";
import Reveal from "./Reveal";

/**
 * Concern-led entry. Cards are text, not photography: the point is to name the
 * problem in the visitor's own words and say what the first appointment does
 * about it, rather than illustrate an idealised result.
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
            <p className="mt-5 text-base leading-relaxed text-muted">
              You do not need to know the name of the condition, or which treatment you
              want. Bring the observation — working out the rest is the consultation.
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
                className="group flex h-full scroll-mt-32 flex-col rounded-[1.5rem] bg-surface p-6 ring-1 ring-line transition-all hover:-translate-y-1 hover:ring-gold-300"
              >
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
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
