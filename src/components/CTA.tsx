import Link from "next/link";
import { site } from "@/data/site";

export default function CTA() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-card bg-brand-950 px-8 py-14 text-center sm:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-700/40 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl"
          />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-400">
              Next available slot this week
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Start with a proper diagnosis, not a package
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-200">
              Book a 30-minute consultation. You will leave with a written plan, expected
              timelines and clear costs — whether or not you decide to treat with us.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="btn btn-gold w-full sm:w-auto"
              >
                Book a consultation
              </Link>
              <a
                href={site.phoneHref}
                className="btn btn-ghost-light w-full sm:w-auto"
              >
                Call {site.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
