import Image from "next/image";
import Link from "next/link";
import { divisions, treatmentCount } from "@/data/catalogue";
import { site } from "@/data/site";
import Reveal from "./Reveal";

/**
 * Home-page "About us" band, sitting directly under the banner.
 *
 * Photograph on the left with a navy card overlapping its lower edge, the
 * clinic's case on the right — the reference site's two-column About block.
 *
 * The frame is an examination rather than a treatment being enjoyed, which is
 * the tone the clinic asked for; the glossy candle-lit alternative in public/
 * would have read as a spa. It does repeat lower down as the Regenerative
 * Dermatology thumbnail. Replace it with a real photograph of Dr Hegde or the
 * consulting room and the repeat goes away with it — same box, same crop.
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
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Photograph, with the consultant card lapping over its lower edge */}
          <Reveal from="left">
            <div className="mx-auto max-w-md lg:mx-0 lg:max-w-none">
              <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-line">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/division-regenerative.jpg"
                    alt="A dermatologist examining a patient's face at Dermfit"
                    fill
                    sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                {/* Grounds the card against the pale top of the photograph */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-950/25 to-transparent"
                />
              </div>

              <div className="relative z-10 -mt-12 mx-5 overflow-hidden rounded-[1.25rem] bg-brand-950 text-white shadow-xl shadow-brand-950/20 sm:mx-8">
                <div className="flex items-center gap-4 px-6 py-5">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 font-display text-base font-semibold text-gold-200 ring-1 ring-white/15"
                  >
                    SH
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold">Dr Sourab Hegde</p>
                    <p className="mt-0.5 text-xs text-gold-200">MBBS, MD (Dermatology)</p>
                  </div>
                </div>

                <dl className="grid grid-cols-2 gap-px bg-white/10">
                  <div className="bg-brand-950 px-6 py-4">
                    <dd className="font-display text-2xl font-semibold">{divisions.length}</dd>
                    <dt className="mt-0.5 text-[0.65rem] uppercase tracking-[0.12em] text-white/60">
                      Clinical divisions
                    </dt>
                  </div>
                  <div className="bg-brand-950 px-6 py-4">
                    <dd className="font-display text-2xl font-semibold">{treatmentCount}</dd>
                    <dt className="mt-0.5 text-[0.65rem] uppercase tracking-[0.12em] text-white/60">
                      Treatments offered
                    </dt>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>

          {/* The case */}
          <Reveal from="right" delay={120}>
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

            <p className="mt-7 border-t border-line pt-5 text-sm leading-relaxed text-muted">
              {site.address.line1}, {site.address.line3} ·{" "}
              <a href={site.phoneHref} className="text-brand-900 hover:text-gold-700">
                {site.phone}
              </a>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
