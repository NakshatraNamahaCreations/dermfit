import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import PageHero from "@/components/PageHero";
import BookingForm from "@/components/BookingForm";
import FAQ from "@/components/FAQ";
import { site } from "@/data/site";
import { faqs } from "@/data/content";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, clinicSchema, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book a Dermatologist Appointment",
  description: `Book a consultation with Dr Sourab Hegde at Dermfit, ${site.address.line2}, Yadavgiri, Mysuru. Call ${site.phone} or send an appointment request online.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/* The clinic's address, phone and hours again on the page a patient
          lands on from a map result, and the FAQ marked up so Google can show
          the questions under it. */}
      <JsonLd
        data={{ "@context": "https://schema.org", ...clinicSchema }}
      />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])} />
      <PageHero
        eyebrow="Contact"
        title="Book a consultation"
        lead="Send a request and the front desk will call you back within one working day to confirm a slot. For anything urgent, please call the clinic directly."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-5">
            <div className="rounded-card border border-line bg-surface p-7">
              <h2 className="font-display text-lg font-semibold text-brand-950">The clinic</h2>
              <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-muted">
                <p>{site.address.line1}</p>
                <p>{site.address.line2}</p>
                <p>{site.address.line3}</p>
              </address>
              <div className="mt-5 space-y-2 text-sm">
                <p>
                  <span className="text-muted">Phone · </span>
                  {site.phones.map((t, i) => (
                    <span key={t.href}>
                      {i > 0 && <span className="text-muted"> · </span>}
                      <a href={t.href} className="font-medium text-gold-700 hover:underline">
                        {t.display}
                      </a>
                    </span>
                  ))}
                </p>
                <p>
                  <span className="text-muted">Email · </span>
                  <a
                    href={`mailto:${site.email}`}
                    className="font-medium text-gold-700 hover:underline"
                  >
                    {site.email}
                  </a>
                </p>
                <p>
                  <span className="text-muted">WhatsApp · </span>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-medium text-gold-700 hover:underline"
                  >
                    Message the front desk
                  </a>
                </p>
              </div>
            </div>

            <div className="rounded-card border border-line bg-surface p-7">
              <h2 className="font-display text-lg font-semibold text-brand-950">
                Opening hours
              </h2>
              <dl className="mt-4 space-y-2.5 text-sm">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
                    <dt className="text-muted">{h.days}</dt>
                    <dd className="font-medium text-brand-900">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="overflow-hidden rounded-card border border-line bg-gold-50">
              <div className="flex h-48 items-center justify-center bg-[radial-gradient(circle_at_30%_30%,var(--color-gold-100),var(--color-gold-50))]">
                <p className="px-6 text-center text-sm text-gold-800">
                  Map placeholder — drop in a Google Maps embed for{" "}
                  <span className="font-medium">{site.address.line3}</span>.
                </p>
              </div>
            </div>
          </div>

          <BookingForm />
        </div>
      </Section>

      <Section className="bg-surface pt-0">
        <SectionHeading eyebrow="Questions" title="Before you book" align="center" />
        <div className="mx-auto max-w-3xl">
          <FAQ />
        </div>
      </Section>
    </>
  );
}
