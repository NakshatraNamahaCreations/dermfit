/**
 * The opening banner: the clinic's introduction.
 *
 * THIS SECTION CONTAINS THE CLINIC'S SUPPLIED COPY AND NOTHING ELSE.
 *
 * An earlier version set the four disciplines as cards with a descriptive note
 * under each, and the conditions as chips with a link — none of which the
 * clinic wrote. Those notes were mine, and on a doctor's opening screen an
 * invented sentence is indistinguishable from the clinic's own voice. Every
 * word below is theirs, in their order, complete.
 *
 * So the design does its work through type and colour alone: the navy sampled
 * from the logo's background (#01122D) and the gold sampled across the mark's
 * gradient, with the headline, the philosophy line and the closing statement
 * carrying the three levels of emphasis. No cards, no chips, no buttons —
 * anything of that sort would be content, and there is none to add.
 */

const paragraphs = [
  "DermFit Clinic is a dermatologist-led skin, hair and aesthetic clinic in Yadavgiri, Mysuru, dedicated to providing personalised, evidence-based care for your skin, hair and overall appearance.",
  "Founded and led by Dr. Sourab S. Hegde, MBBS, MD Dermatology, DermFit brings together clinical dermatology, aesthetic dermatology, trichology and advanced hair restoration under one roof.",
];

export default function WelcomeIntro() {
  return (
    <section
      className="relative isolate overflow-hidden bg-brand-950 py-20 sm:py-24 lg:py-28"
      aria-labelledby="welcome-heading"
    >
      {/* Gold light off the lockup's gradient, blurred back into the navy. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-gold-500/20 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -right-32 h-[30rem] w-[30rem] rounded-full bg-gold-400/15 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-700/40 blur-3xl"
      />

      {/* Faint grid so the navy has a surface rather than being flat ink. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]"
      />

      {/* Gold hairlines top and bottom, the same gradient as the mark. */}
      <span aria-hidden="true" className="rule-gold absolute inset-x-0 bottom-0 opacity-60" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center lg:px-8">
        <h1
          id="welcome-heading"
          className="animate-banner-in font-display text-[2rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-[2.75rem] lg:text-[3.25rem]"
        >
          Welcome to <span className="text-gold-shimmer">DermFit Clinic</span>
        </h1>

        <span
          aria-hidden="true"
          className="rule-gold mx-auto mt-8 block w-40"
        />

        <div className="mx-auto mt-8 max-w-3xl space-y-6 text-[1rem] leading-relaxed text-brand-100 sm:text-[1.05rem]">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>

        {/* The philosophy line, given its own weight. It is the sentence the
            rest of the site has to live up to. */}
        <p className="mx-auto mt-10 max-w-2xl font-display text-xl font-medium leading-snug text-white sm:text-2xl">
          Our philosophy is simple — healthy skin comes first,{" "}
          <span className="text-gold-300">aesthetics come second.</span>
        </p>

        <p className="mx-auto mt-10 max-w-3xl text-[1rem] leading-relaxed text-brand-100 sm:text-[1.05rem]">
          Every patient is different, which is why we believe in understanding
          your concerns, assessing your skin or hair carefully, and creating a
          treatment plan that is tailored to your individual needs. Whether you
          are dealing with acne, pigmentation, acne scars, hair loss, ageing
          skin, dandruff or chronic skin conditions such as eczema and
          psoriasis, our approach focuses on achieving natural, sustainable
          results rather than quick fixes.
        </p>

        {/* The closing statement, set as the mark's own type: spaced caps in
            gold, between two rules. */}
        <div className="mt-12 flex items-center justify-center gap-5">
          <span aria-hidden="true" className="rule-gold hidden w-16 flex-shrink-0 sm:block" />
          <p className="font-display text-lg font-semibold uppercase leading-snug tracking-[0.14em] text-gold-gradient sm:text-xl sm:tracking-[0.18em]">
            Advanced Dermatology. Personalised Care.
          </p>
          <span aria-hidden="true" className="rule-gold hidden w-16 flex-shrink-0 sm:block" />
        </div>
      </div>
    </section>
  );
}
