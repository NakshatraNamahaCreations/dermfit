import Link from "next/link";
import { divisions, treatmentCount } from "@/data/catalogue";
import { site } from "@/data/site";
import Reveal from "./Reveal";

/**
 * Home-page "About us" band, sitting directly under the banner.
 *
 * Two columns in the manner of the reference site: the clinic's case on the
 * left, a summary panel on the right.
 *
 * Deliberately without a photograph. The stock frames available here are the
 * glossy, fair-skinned, spa-lit kind the clinic asked us to move away from, and
 * putting one in the first block below the banner would set exactly that tone.
 * The panel is built to take a real portrait of Dr Hegde or the consulting room
 * the moment there is one — drop the file in public/ and replace the monogram
 * block with an <Image fill> in the same box.
 *
 * The two figures are counted from the real catalogue rather than asserted, so
 * they cannot drift out of date or overstate anything.
 */

const points = [
  "Diagnosis before any treatment is offered",
  "Every procedure performed by a dermatologist",
  "A written plan, with costs, before you commit",
  "Progress measured, not claimed",
];

export default function AboutIntro() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* The case */}
          <Reveal from="left">
            <p className="eyebrow">About us</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-brand-950 sm:text-4xl">
              A dermatology clinic in {site.city},
              <br className="hidden sm:block" /> led by{" "}
              <span className="text-gold-gradient">Dr Sourab Hegde</span>
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              <p>
                Dermfit treats skin, hair and aesthetic concerns the way any other
                medical problem is treated — by working out the cause first. Pigmentation,
                melasma, acne and the marks it leaves behind behave differently on Indian
                skin, and a great deal of our practice is exactly that.
              </p>
              <p>
                You are examined, given a diagnosis in plain language, and shown a written
                plan with its timelines and costs before anything is booked. If a treatment
                will not help your particular case, we will say so rather than sell it.
              </p>
            </div>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-brand-900">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-gold-600"
                  >
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.2" />
                    <path
                      d="m6.4 10.2 2.4 2.4 4.8-5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-navy">
                Book an appointment
              </Link>
              <Link href="/about" className="btn btn-outline">
                More about the clinic
              </Link>
            </div>
          </Reveal>

          {/* Summary panel */}
          <Reveal from="right" delay={120}>
            <div className="overflow-hidden rounded-[1.75rem] bg-brand-950 text-white ring-1 ring-brand-900">
              <div className="flex items-center gap-5 p-8 sm:p-9">
                <span
                  aria-hidden="true"
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/10 font-display text-xl font-semibold text-gold-200 ring-1 ring-white/15"
                >
                  SH
                </span>
                <div>
                  <p className="font-display text-lg font-semibold">Dr Sourab Hegde</p>
                  <p className="mt-0.5 text-sm text-gold-200">MBBS, MD (Dermatology)</p>
                  <p className="mt-1 text-xs text-white/60">
                    Consultant Dermatologist · Founder
                  </p>
                </div>
              </div>

              <dl className="grid grid-cols-2 gap-px bg-white/10">
                <div className="bg-brand-950 px-8 py-7">
                  <dd className="font-display text-3xl font-semibold text-white">
                    {divisions.length}
                  </dd>
                  <dt className="mt-1 text-xs uppercase tracking-[0.12em] text-white/60">
                    Clinical divisions
                  </dt>
                </div>
                <div className="bg-brand-950 px-8 py-7">
                  <dd className="font-display text-3xl font-semibold text-white">
                    {treatmentCount}
                  </dd>
                  <dt className="mt-1 text-xs uppercase tracking-[0.12em] text-white/60">
                    Treatments offered
                  </dt>
                </div>
              </dl>

              <div className="space-y-4 px-8 py-7 sm:px-9">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-white/50">Clinic</p>
                  <address className="mt-1.5 text-sm not-italic leading-relaxed text-white/85">
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                    <br />
                    {site.address.line3}
                  </address>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-white/50">
                    Appointments
                  </p>
                  <a
                    href={site.phoneHref}
                    className="mt-1.5 inline-block text-sm text-white/85 transition-colors hover:text-gold-200"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
