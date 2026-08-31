import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import { differentiators, doctors, stats } from "@/data/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dermfit is a clinical dermatology practice built around diagnosis, dermatologist-performed procedures and transparent pricing.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the clinic"
        title="A dermatology practice, not a beauty salon"
        lead="Dermfit was founded on a simple frustration: too much of aesthetic dermatology is sold as packages before anyone has worked out what is actually wrong."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5 text-base leading-relaxed text-muted">
            <p>
              We opened in Yadavgiri with one operating principle: nothing is treated until it is
              diagnosed. In practice that means imaging, scoring or blood work at the first
              visit, and a written plan you can take away and think about.
            </p>
            <p>
              It also means we say no. If a scar type will not respond to the laser you read
              about, we will tell you. If your hair loss is nutritional rather than
              androgenetic, we will treat the deficiency rather than sell you a course of PRP.
              That costs us revenue in the short term and earns us referrals in the long one.
            </p>
            <p>
              Every procedure at Dermfit is performed by a qualified dermatologist. We do not
              delegate injectables or laser work to technicians, and we do not run promotional
              discounts on medical procedures.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line">
            {stats.map((s) => (
              <div key={s.label} className="bg-surface p-6">
                <dd className="font-display text-3xl font-semibold text-brand-900">
                  {s.value}
                </dd>
                <dt className="mt-1 text-xs uppercase tracking-[0.1em] text-muted">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading
          eyebrow="The team"
          title="Who you will actually see"
          lead="Three consultants, each with a defined area. You are matched to the right one when you book."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {doctors.map((d) => (
            <article key={d.name} className="rounded-card border border-line bg-canvas p-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-900 font-display text-lg font-semibold text-gold-200">
                {d.initials}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-brand-950">
                {d.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-gold-700">{d.role}</p>
              <p className="mt-0.5 text-xs text-muted">{d.credentials}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{d.bio}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Our commitments" title="Four things we hold to" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {differentiators.map((d) => (
            <div key={d.title} className="rounded-card border border-line bg-surface p-7">
              <h3 className="font-display text-lg font-semibold text-brand-950">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
