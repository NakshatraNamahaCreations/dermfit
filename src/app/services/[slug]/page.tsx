import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import CTA from "@/components/CTA";
import { getService, services } from "@/data/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Treatment not found" };
  return { title: service.title, description: service.summary };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="container-page py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/services" className="hover:text-brand-700 hover:underline">
              Treatments
            </Link>
            <span className="mx-2 text-line">/</span>
            <span className="text-brand-900">{service.title}</span>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-brand-700">
                {service.category}
              </span>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-brand-950 sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                {service.summary}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line">
              <div className="bg-surface p-5">
                <dt className="text-xs uppercase tracking-[0.1em] text-muted">Per session</dt>
                <dd className="mt-1.5 font-display text-lg font-semibold text-brand-900">
                  {service.duration}
                </dd>
              </div>
              <div className="bg-surface p-5">
                <dt className="text-xs uppercase tracking-[0.1em] text-muted">Typical course</dt>
                <dd className="mt-1.5 font-display text-lg font-semibold text-brand-900">
                  {service.sessions}
                </dd>
              </div>
              <div className="col-span-2 bg-surface p-5">
                <Link
                  href="/contact"
                  className="block rounded-full bg-brand-700 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                >
                  Book a consultation
                </Link>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold text-brand-950">
              About this treatment
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">{service.overview}</p>

            <h2 className="mt-12 font-display text-2xl font-semibold text-brand-950">
              How the course runs
            </h2>
            <ol className="mt-6 space-y-5">
              {service.process.map((p, i) => (
                <li
                  key={p.step}
                  className="flex gap-4 rounded-card border border-line bg-surface p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-brand-950">{p.step}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{p.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="rounded-card border border-line bg-surface p-7">
            <h2 className="font-display text-lg font-semibold text-brand-950">
              Suitable if you have
            </h2>
            <ul className="mt-5 space-y-3">
              {service.goodFor.map((g) => (
                <li key={g} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-brand-600"
                  >
                    <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.3" />
                    <path
                      d="m5.6 9.2 2.2 2.2 4.6-4.6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {g}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted">
              Suitability is confirmed at consultation. Outcomes vary between individuals and
              nothing here should be read as a guarantee of results.
            </p>
          </aside>
        </div>
      </Section>

      <Section className="bg-surface">
        <h2 className="font-display text-2xl font-semibold text-brand-950">
          Other treatments
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
