import Link from "next/link";
import { site } from "@/data/site";
import Reveal from "./Reveal";

const features = [
  {
    title: "Board Certified Dermatologist",
    desc: "Dr. Sourab Hegde holds an MBBS and an MD in Dermatology, bringing postgraduate medical expertise to every clinical dermatology, trichology, and aesthetic consultation.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    title: "Personalized Treatment Plans",
    desc: "Treatment plans tailored strictly to your specific skin type, clinical scoring, and personal goals. No cookie-cutter protocols — every patient is treated uniquely.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Advanced Skin & Laser Technology",
    desc: "US-FDA approved, medical-grade equipment and precision laser technology — never underpowered salon devices. Safe, calibrated, and proven effective.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 18h8" />
        <path d="M3 22h18" />
        <path d="M14 22a7 7 0 1 0 0-14h-1" />
        <path d="M9 14h2" />
        <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
        <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
      </svg>
    ),
  },
  {
    title: "Ethical, Scientific & Result-Oriented",
    desc: "Treatments recommended only when clinically appropriate. No unnecessary upselling or pushed packages — just honest, science-driven medical dermatology.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Specialized for Indian Skin",
    desc: "Pigmentation, melasma, and acne marks behave uniquely on melanin-rich skin. Our protocols and laser parameters are specifically calibrated to prevent post-inflammatory marks.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
  },
  {
    title: "Physician-Led Care at Every Step",
    desc: "All consultations and clinical procedures are personally performed by Dr. Sourab Hegde — no delegation to untrained technicians or assistants, ever.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="relative overflow-hidden bg-[#FAF8F5] py-16 sm:py-20 lg:py-24"
      aria-labelledby="why-choose-heading"
    >
      {/* Subtle background ambient warm glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-1/4 h-96 w-96 rounded-full bg-gold-300/15 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-1/4 h-96 w-96 rounded-full bg-gold-400/15 blur-3xl"
      />

      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
              — WHY CHOOSE DR. HEGDE
            </p>
            <h2
              id="why-choose-heading"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl lg:text-[2.65rem]"
            >
              Why Patients Choose <span className="text-gold-gradient">Dr. Sourab Hegde</span>
            </h2>
            <p className="mt-3.5 text-sm leading-relaxed text-muted sm:text-base">
              Every consultation at Dermfit is designed to deliver clarity, precision, and results — honest, evidence-based dermatology care.
            </p>
          </div>
        </Reveal>

        {/* 6-Card Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 70}>
              <article className="group relative flex h-full flex-col justify-between rounded-2xl bg-white p-7 ring-1 ring-line/80 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-950/6 hover:ring-gold-400/80">
                <div>
                  {/* Icon Box */}
                  <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-brand-950 text-gold-300 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-gold-500 group-hover:text-brand-950">
                    {f.icon}
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 font-display text-lg font-bold leading-snug text-brand-950 transition-colors group-hover:text-gold-700">
                    {f.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-[0.84rem] leading-relaxed text-muted">
                    {f.desc}
                  </p>
                </div>

                {/* Micro accent line at bottom */}
                <div
                  aria-hidden="true"
                  className="mt-6 h-0.5 w-8 rounded-full bg-gold-400/30 transition-all duration-300 group-hover:w-14 group-hover:bg-gold-500"
                />
              </article>
            </Reveal>
          ))}
        </div>

        {/* Bottom Assurance & Consultation Strip */}
        <Reveal delay={450}>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gold-300/40 bg-white/80 p-5 px-6 backdrop-blur-xs shadow-xs sm:flex-row sm:p-6 sm:px-8">
            <div>
              <p className="font-display text-base font-bold text-brand-950">
                Ready to consult with Dr. Sourab Hegde?
              </p>
              <p className="mt-0.5 text-xs text-muted">
                One-on-one medical evaluation with honest treatment roadmaps.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="btn btn-gold inline-flex items-center gap-2 px-5 py-2.5 text-xs shadow-md shadow-gold-500/20 transition-all hover:scale-[1.02]"
              >
                <span>Book Appointment</span>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href={site.phoneHref}
                className="btn btn-outline inline-flex items-center gap-2 px-4 py-2.5 text-xs bg-white"
              >
                <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.6 3.5 8 6.4 6.5 7.9c.8 1.7 2 2.9 3.6 3.6l1.5-1.5 2.9 1.4v2.4c0 .7-.6 1.3-1.3 1.2A11.4 11.4 0 0 1 3 5.4c-.1-.7.5-1.3 1.2-1.3h2.4z" />
                </svg>
                <span>{site.phone}</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
