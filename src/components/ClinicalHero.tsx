import Link from "next/link";
import { concerns } from "@/data/concerns";
import { treatmentCount } from "@/data/catalogue";
import { site } from "@/data/site";

/**
 * The front door.
 *
 * Deliberately typographic: the previous hero led on polished treatment
 * photography, which read as a beauty brand. This leads on the clinician and on
 * the visitor's own concern — the first thing offered is a way in by problem,
 * not a carousel of procedures.
 */
export default function ClinicalHero() {
  return (
    <section className="relative isolate -mt-40 overflow-hidden bg-brand-950 lg:-mt-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-20 h-[36rem] w-[36rem] rounded-full bg-brand-800/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl"
      />

      <div className="container-page relative pb-16 pt-40 sm:pb-20 lg:pt-52">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              <span className="h-px w-8 bg-gold-500/70" />
              Dermatology clinic · {site.byline.replace("by ", "")}
            </p>

            <h1 className="mt-7 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-cream sm:text-5xl lg:text-6xl">
              Every plan starts with
              <span className="block text-gold-gradient">a diagnosis</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-brand-200">
              Dermfit is a doctor-led dermatology practice. Nothing is treated until it
              has been examined and named — and you are told plainly what will improve,
              what will not, and what it costs before you commit to anything.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-gold">
                Book a consultation
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost-light">
                {site.phone}
              </a>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {[
                { v: "MBBS, MD", l: "Dermatology" },
                { v: String(treatmentCount), l: "Treatments" },
                { v: "6", l: "Divisions" },
              ].map((s) => (
                <div key={s.l}>
                  <dd className="font-display text-xl font-semibold text-cream sm:text-2xl">
                    {s.v}
                  </dd>
                  <dt className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-brand-300">
                    {s.l}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Problem-led entry: the first thing offered is the visitor's concern */}
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-8">
            <h2 className="font-display text-xl font-semibold text-cream">
              What brings you in?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-300">
              Start from what you have noticed. We work out which condition it is.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {concerns.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/concerns#${c.slug}`}
                    className="inline-block rounded-full border border-white/15 px-3.5 py-2 text-xs font-medium text-brand-100 transition-colors hover:border-gold-400 hover:text-gold-200"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/concerns"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gold-300 hover:underline"
            >
              See how each one is worked up
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path
                  d="M2 6h8M6.5 2.5 10 6l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
