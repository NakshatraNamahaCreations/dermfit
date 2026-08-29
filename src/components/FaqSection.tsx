import Link from "next/link";
import { faqs } from "@/data/content";
import { site } from "@/data/site";
import FAQ from "./FAQ";
import Reveal from "./Reveal";

export default function FaqSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-16 h-96 w-96 rounded-full bg-gold-200/25 blur-3xl"
      />

      <div className="container-page relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        {/* Intro, held in place while the answers scroll past on desktop */}
        <Reveal from="left" className="lg:sticky lg:top-32">
          <p className="eyebrow">Questions</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-brand-950 sm:text-5xl">
            Before <span className="text-gold-gradient">you book</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            The {faqs.length} things people ask most often, answered plainly. If yours is
            not here, the front desk would rather you called than guessed.
          </p>

          <div className="mt-8 rounded-[1.5rem] bg-brand-950 p-6 sm:p-7">
            <p className="font-display text-lg font-semibold text-cream">
              Still not sure?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-brand-200">
              Tell us the concern and we will match you to the right consultant — no
              obligation to book.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <Link href="/contact" className="btn btn-gold">
                Ask a question
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost-light">
                {site.phone}
              </a>
            </div>
          </div>
        </Reveal>

        {/* The answers */}
        <Reveal from="right" delay={120}>
          <FAQ />
        </Reveal>
      </div>
    </section>
  );
}
