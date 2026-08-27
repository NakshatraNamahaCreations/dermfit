import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import { services } from "@/data/services";
import { differentiators, stats, testimonials } from "@/data/content";
import { site } from "@/data/site";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-gold-100/60 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-gold-100/80 blur-3xl"
        />
        <div className="container-page relative grid gap-14 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-3.5 py-1.5 text-xs font-medium text-gold-700">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              Dermatology clinic · Dr Sourab Hegde · Bengaluru
            </p>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-brand-950 sm:text-5xl lg:text-6xl">
              Skin and hair care that starts with the right diagnosis
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Dermfit is a clinical dermatology practice. We diagnose before we treat, tell you
              honestly what will and will not improve, and price every plan in writing.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="btn btn-gold"
              >
                Book a consultation
              </Link>
              <Link
                href="/services"
                className="btn btn-outline"
              >
                Explore treatments
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-semibold text-brand-900">
                    {s.value}
                  </dd>
                  <p className="mt-1 text-xs uppercase tracking-[0.1em] text-muted">{s.label}</p>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="rounded-card border border-line bg-surface p-8 shadow-xl shadow-brand-900/5">
              <p className="eyebrow">What a first visit looks like</p>
              <ol className="mt-6 space-y-6">
                {[
                  {
                    t: "Examination & imaging",
                    d: "Dermoscopy, trichoscopy or Wood's lamp — whatever your concern needs.",
                  },
                  {
                    t: "Explanation",
                    d: "What is actually happening in your skin, in plain language.",
                  },
                  {
                    t: "A written plan",
                    d: "Options, session counts, timelines and per-session cost.",
                  },
                  {
                    t: "No pressure to book",
                    d: "Take the plan away. It is yours whether you treat here or not.",
                  },
                ].map((item, i) => (
                  <li key={item.t} className="flex gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-900 text-xs font-semibold text-gold-200">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-brand-950">{item.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-7 rounded-xl bg-canvas p-4 text-sm text-muted">
                Consultation fee is adjusted against your first treatment.{" "}
                <a href={site.phoneHref} className="font-medium text-gold-700 hover:underline">
                  Call us
                </a>{" "}
                to check availability.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <Section className="bg-surface">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Treatments"
            title="Focused programmes, not menus"
            lead="Six core areas we treat, each with a defined protocol and a way to measure whether it is working."
          />
          <Link
            href="/services"
            className="text-sm font-semibold text-gold-700 hover:underline"
          >
            View all treatments →
          </Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      {/* Why us */}
      <Section>
        <SectionHeading
          eyebrow="Why Dermfit"
          title="Clinical standards, plainly applied"
          lead="Aesthetic dermatology has a marketing problem. These four commitments are how we work around it."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {differentiators.map((d, i) => (
            <div
              key={d.title}
              className="rounded-card border border-line bg-surface p-7"
            >
              <span className="font-display text-sm font-semibold text-gold-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-brand-950">
                {d.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-surface">
        <SectionHeading
          eyebrow="Patient stories"
          title="What people tell us afterwards"
          align="center"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-card border border-line bg-canvas p-7"
            >
              <div className="flex gap-0.5 text-gold-400" aria-label="5 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <path
                      d="M7 1l1.8 3.7 4.1.6-3 2.9.7 4L7 10.3 3.4 12.2l.7-4-3-2.9 4.1-.6z"
                      fill="currentColor"
                    />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-brand-900">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                <p className="text-sm font-semibold text-brand-950">{t.name}</p>
                <p className="mt-0.5 text-xs text-muted">{t.treatment}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading eyebrow="Questions" title="Before you book" align="center" />
        <div className="mx-auto max-w-3xl">
          <FAQ />
        </div>
      </Section>

      <CTA />
    </>
  );
}
