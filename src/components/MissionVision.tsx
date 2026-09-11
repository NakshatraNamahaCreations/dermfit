import Reveal from "./Reveal";

/**
 * Vision and Mission, on the About page.
 *
 * THE TEXT IS THE CLINIC'S, SUPPLIED BY THEM. An earlier version of this
 * section carried three blocks — mission, vision and goals — written by me to
 * fill the layout. All of that invented copy is gone. Two blocks now, as the
 * clinic asked, each holding their sentence and nothing beside it.
 *
 * TWO WORDS WERE UNCLEAR in the handwritten note, both cut off at the edge of
 * the page, and are set here as the most likely reading:
 *   - "ethical, perso…"  → "ethical, personalised"
 *   - "aesthetic innovat…" → "aesthetic innovation"
 * Confirm both with the clinic. Everything else is transcribed as written,
 * with "thru" set as "through" and the ampersands spelled out.
 *
 * Set in the logo's two colours, the same navy and gold as the opening banner,
 * so the two statements of intent on the site read as one voice.
 */

const blocks = [
  {
    id: "vision",
    label: "Our vision",
    text: "To empower individuals with confidence through healthy, radiant skin — by combining medical expertise with aesthetic innovation.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" />
        <circle cx="12" cy="12" r="2.8" />
      </svg>
    ),
  },
  {
    id: "mission",
    label: "Our mission",
    text: "At DermFit Clinic, our mission is to provide ethical, personalised and science-backed dermatological care that prioritises long-term skin health and patient well-being.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.4" />
      </svg>
    ),
  },
];

export default function MissionVision() {
  return (
    <section
      className="relative isolate overflow-hidden bg-brand-950 py-16 sm:py-20 lg:py-24"
      aria-labelledby="mission-heading"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-24 h-80 w-80 rounded-full bg-gold-500/18 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gold-400/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[88rem] px-5 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-200">
                What we stand for
              </span>
            </span>

            <h2
              id="mission-heading"
              className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl"
            >
              Our vision <span className="text-gold-shimmer">and mission</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {blocks.map((b, i) => (
            <Reveal key={b.id} delay={i * 140}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:bg-white/[0.07] lg:p-10">
                {/* Gold rule that draws itself across the top on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-300 to-transparent transition-transform duration-500 group-hover:scale-x-100 lg:inset-x-10"
                />

                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold-500/15 text-gold-300 ring-1 ring-gold-400/30 transition-colors group-hover:bg-gold-500/25">
                  {b.icon}
                </span>

                <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-400">
                  {b.label}
                </p>

                <p className="mt-4 font-display text-lg font-medium leading-relaxed text-white sm:text-xl lg:text-[1.35rem]">
                  {b.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
