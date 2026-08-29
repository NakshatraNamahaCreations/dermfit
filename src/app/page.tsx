import { Section, SectionHeading } from "@/components/Section";
import CTA from "@/components/CTA";
import HeroSlider from "@/components/HeroSlider";
import AboutShowcase from "@/components/AboutShowcase";
import NourishSection from "@/components/NourishSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import FirstVisit from "@/components/FirstVisit";
import FAQ from "@/components/FAQ";
import { testimonials } from "@/data/content";

export default function Home() {
  return (
    <>
      <HeroSlider />

      <AboutShowcase />

      <WhyChooseUs />

      <NourishSection />

      <FirstVisit />

      {/* Patient stories */}
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
                &ldquo;{t.quote}&rdquo;
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
