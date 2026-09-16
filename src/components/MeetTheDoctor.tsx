import Image from "next/image";
import Link from "next/link";
import { doctors } from "@/data/content";
import { site } from "@/data/site";
import Reveal from "./Reveal";

/**
 * "Meet your doctor".
 *
 * THE PROFILE IS THE CLINIC'S, SUPPLIED 16/09 — the first real biography on
 * this site. It replaces placeholder copy I had written, and it lets several
 * invented details go with it:
 *
 *   - "Board Certified · MD" on the portrait. Board certification is an
 *     American construct; nobody is board certified in India, and the clinic
 *     never claimed it. The badge now carries his actual fellowship.
 *   - "Founder & Chief Consultant Dermatologist" — his title is Director and
 *     Chief Dermatologist.
 *   - Two of the four highlight boxes counted divisions and treatments because
 *     there was nothing real to put in them. There is now.
 *
 * Every qualification below is from the clinic's own text. Nothing here is
 * inferred, and no figure is rounded up.
 */
const credentials = [
  "MBBS",
  "MD (Dermatology)",
  "Advanced Aesthetics Fellowship — 5CC Europe",
  "FISHR (Hair Transplantation)",
];

export default function MeetTheDoctor() {
  const doctor = doctors[0];

  // All four from the clinic's own biography. "5+" is their figure, not a
  // rounding of one.
  const highlights = [
    { value: "5+", label: "Years", note: "Clinical & aesthetic practice" },
    { value: "MD", label: "Dermatology", note: "Sri Siddhartha, Tumkur" },
    { value: "5CC", label: "Europe", note: "Advanced Aesthetics Fellowship" },
    { value: "FISHR", label: "Fellowship", note: "Hair transplantation" },
  ];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#FAF8F5] to-[#EFEAE0] py-16 sm:py-20 lg:py-24"
      aria-labelledby="doctor-heading"
    >

      {/* Layered luxury ambient light orbs */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 -top-20 h-72 w-72 rounded-full bg-gold-300/25 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 h-56 w-[32rem] rounded-full bg-white/40 blur-3xl"
      />

      {/* Wider than `container-page` (76rem) on purpose: the portrait gets
          bigger, the profile gets a longer measure, and the four stat cards
          stop crowding. Matches the welcome section above it, so the two read
          as one opening rather than as two blocks of different widths. */}
      <div className="relative z-10 mx-auto w-full max-w-[95rem] px-5 lg:px-10 xl:px-14">
        <div className="grid items-center gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14 xl:gap-20">
          {/* Left Column: Doctor Portrait Presentation */}
          <Reveal from="left">
            <div className="relative mx-auto max-w-sm lg:mx-0 lg:max-w-none xl:max-w-[26rem]">
              {/* Soft gold halo behind frame */}
              <div
                aria-hidden="true"
                className="absolute -inset-1 rounded-[2.25rem] bg-gradient-to-tr from-gold-400/35 via-gold-200/20 to-brand-900/10 blur-xl opacity-80"
              />

              {/* Multi-layered luxury card container */}
              <div className="relative rounded-[1.75rem] bg-gradient-to-b from-white via-gold-50/40 to-white p-2 shadow-2xl shadow-brand-950/12 ring-1 ring-gold-300/50">
                {/* Floating Doctor-Led badge (top left) */}
                <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 shadow-md shadow-brand-950/10 backdrop-blur-md ring-1 ring-gold-300/60">
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold-100 text-gold-800">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </span>
                  <span className="text-[0.64rem] font-bold uppercase tracking-wider text-brand-950">
                    100% Doctor-Led
                  </span>
                </div>

                {/* Floating Board Certified badge (top right) */}
                <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 shadow-md shadow-brand-950/10 backdrop-blur-md ring-1 ring-gold-400/40">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  </span>
                  <span className="text-[0.64rem] font-semibold uppercase tracking-wider text-brand-950">
                    MBBS · MD Dermatology
                  </span>
                </div>

                {/* Inner Image Wrapper */}
                <div className="relative aspect-[4/4.2] w-full overflow-hidden rounded-[1.35rem] bg-brand-950 ring-1 ring-black/5">
                  {doctor.photo && (
                    <Image
                      src={doctor.photo}
                      alt={doctor.name}
                      fill
                      sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 34vw, (min-width: 640px) 24rem, 90vw"
                      className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                    />
                  )}
                  {/* Subtle dark gradient overlay at bottom of photo */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/65 via-transparent to-transparent"
                  />
                </div>
              </div>

              {/* Overlapping Doctor Info Card (Deep Brand Navy) */}
              <div className="relative z-20 -mt-8 mx-3 sm:mx-4 rounded-xl bg-brand-950 px-4 py-3 text-white shadow-xl shadow-brand-950/30 ring-1 ring-gold-400/30 backdrop-blur-md">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-display text-base font-bold tracking-tight text-white sm:text-lg">
                        {doctor.name}
                      </h3>
                      <span
                        className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-gold-400 text-brand-950"
                        title="Verified Medical Practitioner"
                      >
                        <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path
                            d="M10 3L4.5 8.5L2 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                    <p className="text-[0.7rem] font-medium text-gold-300">
                      Director & Chief Dermatologist
                    </p>
                  </div>

                  <span className="rounded-full bg-gold-500/20 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-gold-200 ring-1 ring-gold-400/30">
                    {site.city}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-white/10 pt-1.5 text-[0.68rem] text-brand-100">
                  <span className="font-semibold text-gold-300">MBBS, MD</span>
                  <span className="text-white/40">·</span>
                  <span>5CC Europe</span>
                  <span className="text-white/40">·</span>
                  <span>FISHR</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Hero Profile & Content */}
          <Reveal from="right" delay={120}>
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-white/90 px-3 py-1 shadow-xs backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500 animate-pulse" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-800">
                Meet Your Doctor
              </span>
            </div>

            {/* Headline */}
            {/* h2, not h1: the welcome section above owns the page's only h1. */}
            <h2
              id="doctor-heading"
              className="mt-2 font-display text-2xl font-bold leading-[1.12] tracking-tight text-brand-950 sm:text-3xl lg:text-[2.8rem] xl:text-[3.1rem]"
            >
              Treated by a{" "}
              <span className="text-gold-shimmer font-bold">dermatologist</span>,
              <br className="hidden sm:block" /> every single visit.
            </h2>

            {/* Credentials Badges Ribbon */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              {credentials.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-[0.72rem] font-medium text-brand-900 shadow-xs ring-1 ring-line transition hover:border-gold-400 hover:bg-gold-50/40 hover:text-gold-800 cursor-default"
                >
                  <span className="h-1 w-1 rounded-full bg-gold-500" />
                  {c}
                </span>
              ))}
            </div>

            {/* Bio Narrative — the clinic's own text, supplied 16/09. */}
            <div className="mt-3 max-w-3xl space-y-2.5 text-[0.9rem] leading-relaxed text-muted xl:text-[0.95rem]">
              <p>
                <strong className="font-semibold text-brand-950">
                  Dr. Sourab S Hegde
                </strong>{" "}
                is the Director and Chief Dermatologist at Dermfit clinic,
                Mysuru. A graduate of SDM Medical College, Dharwad (MBBS) and
                Sri Siddhartha Medical College, Tumkur (MD Dermatology), Dr.
                Sourab brings over{" "}
                <strong className="font-semibold text-brand-950">
                  5 years of clinical and aesthetic dermatology experience
                </strong>
                . He holds an Advanced Aesthetics Fellowship certified by 5CC
                Europe and a fellowship in hair transplantation (FISHR), and is
                trained nationally and internationally in aesthetic dermatology,
                lasers, and hair restoration.
              </p>
              <p>
                From clinical dermatology and hair concerns to advanced
                aesthetic treatments, his focus is on comprehensive, holistic
                care with natural and meaningful results.
              </p>
            </div>

            {/* The clinic's own closing lines. Replaces a quotation I had
                written and attributed to nobody. */}
            <div className="mt-3.5 rounded-xl border-l-4 border-gold-500 bg-white/90 p-3 shadow-xs ring-1 ring-line/80 backdrop-blur-xs sm:p-3.5">
              <p className="text-[0.82rem] font-medium leading-snug text-brand-950 sm:text-[0.88rem]">
                Because when you feel comfortable with your care, you can feel
                confident in your skin.
              </p>
              <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-gold-gradient sm:text-[0.76rem]">
                DermFit Clinic — Expertise with empathy. Care with comfort.
              </p>
            </div>

            {/* 4 Stats Cards Grid */}
            <dl className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="group rounded-xl bg-white p-2.5 text-center shadow-xs ring-1 ring-line transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-gold-300"
                >
                  <dd className="font-display text-base sm:text-lg xl:text-xl font-bold text-brand-950 transition-colors group-hover:text-gold-600">
                    {h.value}
                  </dd>
                  <dt className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-gold-700">
                    {h.label}
                  </dt>
                  <p className="text-[0.6rem] leading-tight text-muted">
                    {h.note}
                  </p>
                </div>
              ))}
            </dl>

            {/* Action Buttons & Contact Callout */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <Link
                href="/contact"
                className="btn btn-gold inline-flex items-center gap-2 px-5 py-2.5 text-xs shadow-lg shadow-gold-500/20 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-gold-500/30"
              >
                <span>Book with Dr Hegde</span>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              <Link
                href="/services"
                className="btn btn-outline inline-flex items-center gap-2 px-4 py-2.5 text-xs shadow-xs transition-all hover:border-gold-500 hover:bg-gold-50/50"
              >
                <span>Explore Treatments</span>
              </Link>

              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-brand-900 transition hover:text-gold-700 sm:ml-2"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-brand-900 ring-1 ring-brand-200">
                  <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6.6 3.5 8 6.4 6.5 7.9c.8 1.7 2 2.9 3.6 3.6l1.5-1.5 2.9 1.4v2.4c0 .7-.6 1.3-1.3 1.2A11.4 11.4 0 0 1 3 5.4c-.1-.7.5-1.3 1.2-1.3h2.4z"/>
                  </svg>
                </span>
                <span>{site.phone}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
