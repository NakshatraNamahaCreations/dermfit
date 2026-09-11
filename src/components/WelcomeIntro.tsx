import Link from "next/link";
import { site } from "@/data/site";
import Reveal from "./Reveal";

/**
 * The opening section: the clinic's own introduction.
 *
 * THE COPY HERE IS THE CLINIC'S, SUPPLIED BY THEM — unlike most of the text on
 * this site it is not placeholder, so it should not be reworded without asking.
 * The only liberty taken is typographic: the philosophy line is pulled out as a
 * quote, the four disciplines are set as cards and the list of conditions is
 * set as chips, because a wall of prose at the top of a page does not get read.
 *
 * Set in the logo's own two colours — the navy sampled from the lockup's
 * background (#01122D) and the gold sampled across its gradient. The mark is
 * gold-on-navy, so an opening screen in anything else would be introducing a
 * different brand to the one in the header.
 *
 * NOTE ON THE NAME: the clinic supplied "Dr. Sourab S. Hegde" here, with the
 * middle initial. The rest of the site says "Dr Sourab Hegde". Both are used as
 * given; if one is the preferred form, align the other.
 */

/** "under one roof", from the clinic's copy. */
const disciplines = [
  {
    name: "Clinical Dermatology",
    note: "Medical skin conditions, diagnosed and treated",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 3v4a4 4 0 0 0 8 0V3" />
        <path d="M12 11v4a4 4 0 0 1-8 0v-1" />
        <circle cx="18" cy="14" r="2.5" />
      </svg>
    ),
  },
  {
    name: "Aesthetic Dermatology",
    note: "Appearance, once the skin itself is well",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m12 3 2.2 4.9L19 10l-4.8 2.1L12 17l-2.2-4.9L5 10l4.8-2.1z" />
        <path d="M18.5 17.5 19 19l1.5.5L19 20l-.5 1.5L18 20l-1.5-.5L18 19z" />
      </svg>
    ),
  },
  {
    name: "Trichology",
    note: "Hair and scalp, worked up before treatment",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 20c0-6 2-11 4-13M9 20c0-7 2-12 4-14M14 20c0-6 2-10 4-12M19.5 20c0-4 .8-7 1.5-8.5" />
      </svg>
    ),
  },
  {
    name: "Advanced Hair Restoration",
    note: "Density restored where the cause allows it",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21c-4-2-6-5-6-9a6 6 0 0 1 12 0c0 4-2 7-6 9z" />
        <path d="M12 21V9M12 13l2.5-2.5M12 15l-2.5-2.5" />
      </svg>
    ),
  },
];

/** The conditions named in the clinic's own copy, in its order. */
const conditions = [
  "Acne",
  "Pigmentation",
  "Acne scars",
  "Hair loss",
  "Ageing skin",
  "Dandruff",
  "Eczema",
  "Psoriasis",
];

export default function WelcomeIntro() {
  return (
    <section
      className="relative isolate overflow-hidden bg-brand-950 py-16 sm:py-20 lg:py-24"
      aria-labelledby="welcome-heading"
    >
      {/* Gold light off the lockup's gradient, blurred back into the navy. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-gold-500/20 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 right-0 h-[30rem] w-[30rem] rounded-full bg-gold-400/12 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-0 h-80 w-[36rem] -translate-y-1/2 rounded-full bg-brand-700/40 blur-3xl"
      />

      {/* Faint grid so the navy has a surface rather than being flat ink. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[95rem] px-5 lg:px-10 xl:px-14">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:gap-20">
          {/* The introduction itself */}
          <Reveal from="left">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-200">
                Welcome to DermFit Clinic
              </span>
            </span>

            <h1
              id="welcome-heading"
              className="mt-6 font-display text-[2.1rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
            >
              Advanced Dermatology.
              <br />
              <span className="text-gold-shimmer">Personalised Care.</span>
            </h1>

            {/* Gold rule, the same gradient as the mark. */}
            <span aria-hidden="true" className="rule-gold mt-7 block w-40" />

            <div className="mt-7 space-y-5 text-[0.98rem] leading-relaxed text-brand-100 lg:text-base">
              <p>
                DermFit Clinic is a dermatologist-led skin, hair and aesthetic
                clinic in{" "}
                <strong className="font-semibold text-white">
                  Yadavgiri, Mysuru
                </strong>
                , dedicated to providing personalised, evidence-based care for
                your skin, hair and overall appearance.
              </p>
              <p>
                Founded and led by{" "}
                <strong className="font-semibold text-gold-300">
                  Dr. Sourab S. Hegde, MBBS, MD Dermatology
                </strong>
                , DermFit brings together clinical dermatology, aesthetic
                dermatology, trichology and advanced hair restoration under one
                roof.
              </p>
            </div>

            {/* The philosophy line, pulled out. It is the sentence the rest of
                the page has to live up to, so it should not sit mid-paragraph. */}
            <blockquote className="mt-8 rounded-r-xl border-l-2 border-gold-400 bg-white/[0.05] py-5 pl-6 pr-5 backdrop-blur-sm">
              <p className="font-display text-lg font-medium leading-snug text-white sm:text-xl">
                Our philosophy is simple — healthy skin comes first,{" "}
                <span className="text-gold-300">aesthetics come second.</span>
              </p>
            </blockquote>

            <p className="mt-7 text-[0.95rem] leading-relaxed text-brand-100">
              Every patient is different, which is why we believe in
              understanding your concerns, assessing your skin or hair
              carefully, and creating a treatment plan that is tailored to your
              individual needs. Our approach focuses on achieving natural,
              sustainable results rather than quick fixes.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="btn btn-gold group inline-flex items-center justify-center gap-2 px-7 shadow-lg shadow-gold-500/20 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-gold-500/30"
              >
                <span>Book a consultation</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M6 3.5 10.5 8 6 12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <a
                href={site.phoneHref}
                className="btn btn-ghost-light inline-flex items-center justify-center gap-2 px-7 backdrop-blur-sm transition-all hover:bg-white/5"
              >
                <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M6.6 3.5 8 6.4 6.5 7.9c.8 1.7 2 2.9 3.6 3.6l1.5-1.5 2.9 1.4v2.4c0 .7-.6 1.3-1.3 1.2A11.4 11.4 0 0 1 3 5.4c-.1-.7.5-1.3 1.2-1.3h2.4z" />
                </svg>
                <span>{site.phone}</span>
              </a>
            </div>
          </Reveal>

          {/* The four disciplines, and what the clinic treats */}
          <Reveal from="right" delay={140}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
                Under one roof
              </p>

              <ul className="mt-5 space-y-3">
                {disciplines.map((d) => (
                  <li
                    key={d.name}
                    className="group flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-300 hover:border-gold-400/40 hover:bg-white/[0.07]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold-500/15 text-gold-300 ring-1 ring-gold-400/25 transition-colors group-hover:bg-gold-500/25">
                      {d.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[0.95rem] font-semibold leading-snug text-white">
                        {d.name}
                      </span>
                      <span className="mt-0.5 block text-[0.78rem] leading-snug text-brand-200">
                        {d.note}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 border-t border-white/10 pt-6">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
                  Commonly treated here
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {conditions.map((c) => (
                    <li
                      key={c}
                      className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[0.78rem] font-medium text-brand-100 transition-colors hover:border-gold-400/40 hover:text-gold-200"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[0.78rem] leading-relaxed text-brand-200">
                  Including chronic conditions such as eczema and psoriasis.{" "}
                  <Link
                    href="/concerns"
                    className="font-semibold text-gold-300 underline-offset-4 hover:underline"
                  >
                    See every concern we treat
                  </Link>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
