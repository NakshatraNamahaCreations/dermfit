import Link from "next/link";
import { pathway } from "@/data/pathway";
import { site } from "@/data/site";
import Reveal from "./Reveal";

/**
 * The clinical pathway, stage by stage. Treatment is stage five of seven, which
 * is the point: this is a diagnostic practice, not a treatment menu.
 */
export default function CarePathway() {
  return (
    <section className="bg-brand-950 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[88rem] px-5">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <Reveal from="left" className="lg:sticky lg:top-32">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              <span className="h-px w-8 bg-gold-500/70" />
              How care runs here
            </p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-cream sm:text-5xl">
              Seven stages,
              <span className="block text-gold-gradient">in that order</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-brand-200">
              Treatment is the fifth stage, not the first. Everything before it exists so
              that what follows is the right thing — and everything after it exists to
              prove whether it worked.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-gold">
                Book a consultation
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost-light">
                {site.phone}
              </a>
            </div>
          </Reveal>

          <Reveal from="right" delay={120}>
            <ol className="relative">
              {pathway.map((s, i) => (
                <li key={s.stage} className="relative flex gap-6 pb-9 last:pb-0">
                  {i < pathway.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[1.4rem] top-12 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-gold-500/50 to-gold-500/5"
                    />
                  )}

                  <span
                    className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold ${
                      i === 4
                        ? "bg-gradient-to-br from-gold-300 to-gold-600 text-brand-950"
                        : "border border-white/15 bg-brand-900 text-gold-300"
                    }`}
                  >
                    {i + 1}
                  </span>

                  <div className="pt-1">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-400">
                      {s.stage}
                    </p>
                    <h3 className="mt-1.5 font-display text-lg font-semibold text-cream">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-brand-200">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
