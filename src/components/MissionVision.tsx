import Link from "next/link";
import Reveal from "./Reveal";

/**
 * Mission, vision and goals — the clinic's own position, stated in its own
 * words.
 *
 * Set on navy rather than on another pale band. It lands between the white
 * About section and the pale concern grid, so the darkness is what stops the
 * middle of the page reading as one long scroll; it also lets a statement of
 * intent sit apart from the pages that sell treatments.
 *
 * NOTHING HERE IS A CLAIM ABOUT OUTCOMES. A mission may say what the clinic
 * intends and how it works — it may not promise a result, and under the ASCI
 * code and the Drugs and Magic Remedies Act a dermatology practice is held to
 * that. So the copy below is about method (diagnosis first, written plans,
 * the doctor's own hands) rather than about what your skin will do.
 *
 * PLACEHOLDER — written to match the position the clinic has taken across the
 * rest of the site. It should still be read and corrected by Dr Hegde before
 * launch, in case the wording of the mission matters to him.
 */

const pillars = [
  {
    id: "mission",
    label: "Our mission",
    title: "Treat the cause, not the complaint",
    body:
      "To give Mysuru a dermatology practice where the diagnosis comes first and the treatment follows from it — where every consultation, injectable and laser is carried out by a qualified dermatologist, and where the plan, its timeline and its cost are written down before anything is booked.",
    points: [
      "Diagnosis established before treatment is offered",
      "Written plans, with timelines and costs, up front",
      "No procedure delegated to a technician",
    ],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.4" />
      </svg>
    ),
  },
  {
    id: "vision",
    label: "Our vision",
    title: "Dermatology built for Indian skin",
    body:
      "To be the clinic Mysuru turns to for pigmentation, melasma, acne and hair — the conditions that behave differently on melanin-rich skin than the literature written elsewhere describes. Protocols and laser parameters calibrated for that skin, not adopted unchanged from somewhere it does not apply.",
    points: [
      "Protocols calibrated for melanin-rich skin",
      "Parameters set to avoid post-inflammatory marks",
      "Clinical dermatology, trichology and aesthetics in one place",
    ],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" />
        <circle cx="12" cy="12" r="2.8" />
      </svg>
    ),
  },
  {
    id: "goals",
    label: "Our goals",
    title: "What we hold ourselves to",
    body:
      "Care a patient can check: an examination that explains itself, a recommendation that can be declined without pressure, and honest limits — including saying when a treatment will not help, or when the right answer is to wait.",
    points: [
      "Treatments offered only when clinically indicated",
      "No packages pushed, no upselling at the chair",
      "Told plainly when a procedure will not help you",
    ],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s7.5-4.2 7.5-10.1V5.4L12 2.6 4.5 5.4v5.5C4.5 16.8 12 21 12 21z" />
        <path d="m9 11.6 2.1 2.1L15.2 9.6" />
      </svg>
    ),
  },
];

export default function MissionVision() {
  return (
    <section
      className="relative overflow-hidden bg-brand-950 py-16 sm:py-20 lg:py-24"
      aria-labelledby="mission-heading"
    >
      {/* Ambient gold, matching the treatment of the opening section. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-24 h-80 w-80 rounded-full bg-gold-500/15 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-[95rem] px-5 lg:px-10 xl:px-14">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-white/5 px-3.5 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-200">
                What we stand for
              </span>
            </span>

            <h2
              id="mission-heading"
              className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl"
            >
              Our mission, vision{" "}
              <span className="text-gold-shimmer">and goals</span>
            </h2>

            <p className="mt-4 text-[0.95rem] leading-relaxed text-brand-100">
              A dermatology clinic is judged on how it decides, not on what it
              sells. These are the rules Dermfit works to.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-8">
          {pillars.map((p, i) => (
            <Reveal key={p.id} delay={i * 120}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:bg-white/[0.07] lg:p-8">
                {/* Gold rule that draws itself across the top on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-300 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />

                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/15 text-gold-300 ring-1 ring-gold-400/30 transition-colors group-hover:bg-gold-500/25">
                  {p.icon}
                </span>

                <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
                  {p.label}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-white">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-brand-100">
                  {p.body}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                  {p.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold-400/20 text-gold-300"
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
                      <span className="text-[0.82rem] leading-snug text-brand-100">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={360}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-white/10 pt-9 sm:flex-row">
            <p className="text-center text-sm text-brand-100 sm:text-left">
              If that is how you would want to be treated, book a consultation.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn btn-gold px-6 py-2.5 text-xs">
                Book a consultation
              </Link>
              <Link href="/about" className="btn btn-ghost-light px-5 py-2.5 text-xs">
                About the clinic
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
