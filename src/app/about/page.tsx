import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import { differentiators, doctors, stats } from "@/data/content";
import { divisions } from "@/data/catalogue";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dermfit is a doctor-led dermatology practice in Mysuru. Every consultation and procedure is carried out by Dr Sourab Hegde, MBBS, MD (Dermatology).",
};

/**
 * About the clinic.
 *
 * TWO THINGS THIS PAGE USED TO GET WRONG, both now fixed.
 *
 * It defined the clinic by what it is not — "a dermatology practice, not a
 * beauty salon". Naming the thing you are not is still letting it set the
 * terms, and a visitor's first impression of a doctor's page should not be a
 * salon. The page now says what the practice is: one dermatologist, MBBS and
 * MD, doing the work himself.
 *
 * It also listed three consultants, two of whom did not exist. Dermfit is a
 * single-doctor practice, so the team section is now Dr Hegde's own.
 */

/** What he practises, drawn from the real catalogue rather than asserted. */
const practiceAreas = divisions.map((d) => d.title);

export default function AboutPage() {
  const doctor = doctors[0];

  return (
    <>
      <PageHero
        eyebrow="About the clinic"
        title="One dermatologist, start to finish"
        lead="Dermfit is a doctor-led practice in Mysuru. The consultant who examines you is the consultant who plans your treatment and the consultant who performs it — the same person at every visit."
      />

      {/* The doctor, first. Everything else on this page follows from him. */}
      <Section className="bg-canvas">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal from="left">
            <div className="relative mx-auto max-w-sm lg:mx-0 lg:max-w-none">
              <span
                aria-hidden="true"
                className="absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-gold-400/30 via-gold-200/15 to-brand-900/10 blur-xl"
              />
              <div className="relative rounded-[1.6rem] bg-white p-2 shadow-2xl shadow-brand-950/10 ring-1 ring-gold-300/50">
                <div className="relative aspect-[4/4.4] overflow-hidden rounded-[1.25rem] bg-brand-950">
                  {doctor.photo && (
                    <Image
                      src={doctor.photo}
                      alt={doctor.name}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 22rem, 90vw"
                      className="object-cover object-top"
                    />
                  )}
                </div>
              </div>

              <div className="relative z-10 -mt-8 mx-4 rounded-xl bg-brand-950 px-5 py-4 text-white shadow-xl shadow-brand-950/25 ring-1 ring-gold-400/30">
                <p className="font-display text-lg font-semibold">{doctor.name}</p>
                <p className="mt-0.5 text-[0.72rem] font-medium text-gold-300">
                  {doctor.role}
                </p>
                <p className="mt-1 text-[0.68rem] text-brand-100">
                  {doctor.credentials}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal from="right" delay={120}>
            <p className="eyebrow">The doctor</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-brand-950 sm:text-4xl">
              You see the same{" "}
              <span className="text-gold-gradient">consultant</span> every time
            </h2>

            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
              <p>
                Dermfit was founded by{" "}
                <strong className="font-semibold text-brand-950">
                  Dr Sourab Hegde
                </strong>
                , MBBS, MD (Dermatology), and it is his practice: clinical
                dermatology, trichology and aesthetic dermatology, all under one
                consultant rather than split across a rota you are assigned to on
                the day.
              </p>
              <p>
                That is the whole point of the arrangement. Skin conditions are
                followed over months, and continuity is diagnostic — the doctor
                who saw your face in March is the one who can tell what has
                changed by June. Nothing is handed to a technician, and nothing
                is re-explained to a stranger at the second visit.
              </p>
              <p>
                A large part of the caseload is pigmentation, melasma, acne and
                the marks it leaves on Indian skin — conditions that behave
                differently on melanin-rich skin than the literature written
                elsewhere describes, and that are treated here with parameters
                set for it.
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-line bg-surface p-4 text-center"
                >
                  <dd className="font-display text-xl font-semibold text-brand-950">
                    {s.value}
                  </dd>
                  <dt className="mt-1 text-[0.65rem] uppercase tracking-[0.1em] text-muted">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-gold px-6 py-3 text-sm">
                Book with Dr Hegde
              </Link>
              <a href={site.phoneHref} className="btn btn-outline px-6 py-3 text-sm">
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* How the practice works. Method, not promises. */}
      <Section className="bg-surface">
        <SectionHeading
          eyebrow="How we work"
          title="Nothing is treated until it is diagnosed"
          lead="The operating principle the clinic was opened on, and the one everything else follows from."
        />
        <div className="mt-10 grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5 text-base leading-relaxed text-muted">
            <p>
              In practice that means imaging, scoring or blood work at the first
              visit, and a written plan you can take away and think about — with
              its timeline and its per-session cost on it, before anything is
              scheduled.
            </p>
            <p>
              It also means we say no. If a scar type will not respond to the
              laser you read about, you will be told. If your hair loss is
              nutritional rather than androgenetic, the deficiency is treated
              rather than a course of PRP sold. That costs the clinic revenue in
              the short term and earns it referrals in the long one.
            </p>
            <p>
              Every procedure at Dermfit is performed by a qualified
              dermatologist. Injectables and laser work are never delegated to a
              technician, and medical procedures are never put on promotional
              discount.
            </p>
          </div>

          <div className="rounded-card border border-line bg-canvas p-7">
            <p className="eyebrow">What he practises</p>
            <ul className="mt-4 space-y-3">
              {practiceAreas.map((area) => (
                <li key={area} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700"
                  >
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm leading-snug text-brand-900">{area}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="mt-6 inline-block text-sm font-semibold text-gold-700 hover:text-gold-800"
            >
              See the full treatment list →
            </Link>
          </div>
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
