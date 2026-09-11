import Image from "next/image";

/**
 * The opening banner: the clinic's introduction.
 *
 * THE TEXT IS THE CLINIC'S SUPPLIED COPY AND NOTHING ELSE — complete, in their
 * order, not reworded. An earlier version added descriptive notes and a chip
 * list that the clinic never wrote; on a doctor's opening screen an invented
 * sentence is indistinguishable from the clinic's own voice, so there is none.
 *
 * The four photographs carry what the copy names — clinical dermatology,
 * aesthetic dermatology, trichology and hair restoration — without adding a
 * word to it. They are the division photographs already in public/, unused
 * since the division row moved to icons.
 *
 * IMAGERY. The clinical and aesthetic frames are the clinic's own supplied
 * photographs. The trichology and laser frames are still stock, and the people
 * in them are not on Indian skin — which is most of this practice's caseload —
 * so those two remain placeholders.
 * Replace them under NEW FILENAMES: /_next/image caches on the source path, so
 * reusing a name leaves every returning visitor on the old picture.
 *
 * Set in the logo's own two colours: navy sampled from the lockup's background
 * (#01122D), gold sampled across the mark's gradient.
 *
 * THE TOP STRIP MUST STAY FLAT NAVY. The header carries this same bg-brand-950
 * on the home page so the bar and the banner read as one block, and anything
 * that lightens the banner's top edge — a glow, the grid — puts a visible seam
 * back at the join. Every decoration below is therefore held clear of the top.
 */

const paragraphs = [
  "DermFit Clinic is a dermatologist-led skin, hair and aesthetic clinic in Yadavgiri, Mysuru, dedicated to providing personalised, evidence-based care for your skin, hair and overall appearance.",
  "Founded and led by Dr. Sourab S. Hegde, MBBS, MD Dermatology, DermFit brings together clinical dermatology, aesthetic dermatology, trichology and advanced hair restoration under one roof.",
];

/**
 * Alt text describes what is in each frame, for a screen reader — it is not
 * a caption and none of it is rendered, so no text is being added to the page.
 */
const photos = [
  {
    // Supplied by the clinic, 11/09. New filename, not a replacement of the
    // old one: /_next/image caches on the source path.
    src: "/banner-clinical-indian.jpg",
    alt: "A clinician cleansing a patient's face at the treatment couch, with the trolley of products beside them.",
    ratio: "aspect-[3/4]",
  },
  {
    src: "/division-hair.jpg",
    alt: "A scalp being examined strand by strand during a trichology consultation.",
    ratio: "aspect-square",
  },
  {
    // Supplied by the clinic, 11/09. New filename, not a replacement of the
    // old one: /_next/image caches on the source path.
    src: "/banner-aesthetic-indian.jpg",
    alt: "A gloved dermatologist giving a facial injection to a patient resting on the treatment couch.",
    ratio: "aspect-square",
  },
  {
    src: "/division-laser.jpg",
    alt: "A laser handpiece being used on a patient's face under eye protection.",
    ratio: "aspect-[3/4]",
  },
];

function Photo({
  src,
  alt,
  ratio,
  index,
}: {
  src: string;
  alt: string;
  ratio: string;
  index: number;
}) {
  return (
    <div
      className={`group relative ${ratio} w-full overflow-hidden rounded-2xl ring-1 ring-white/15 transition-all duration-500 hover:ring-gold-400/50`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={index < 2}
        sizes="(min-width: 1024px) 22vw, 45vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      {/* Navy wash, so the photographs sit inside the section's colour rather
          than punching four bright holes through it and pulling the eye off
          the text. It lifts on hover. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/75 via-brand-950/25 to-brand-950/10 transition-opacity duration-500 group-hover:opacity-40"
      />
    </div>
  );
}

export default function WelcomeIntro() {
  return (
    <section
      className="relative isolate overflow-hidden bg-brand-950 pb-16 pt-10 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-14"
      aria-labelledby="welcome-heading"
    >
      {/* Gold light off the lockup's gradient, blurred back into the navy. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-16 h-[30rem] w-[30rem] rounded-full bg-gold-500/20 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -right-32 h-[30rem] w-[30rem] rounded-full bg-gold-400/15 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-700/30 blur-3xl"
      />

      {/* Faint grid so the navy has a surface rather than being flat ink. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_at_50%_55%,black,transparent_72%)]"
      />

      <span aria-hidden="true" className="rule-gold absolute inset-x-0 bottom-0 opacity-60" />

      <div className="relative z-10 mx-auto w-full max-w-[95rem] px-5 lg:px-10 xl:px-14">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-20">
          {/* The introduction */}
          <div>
            <h1
              id="welcome-heading"
              className="animate-banner-in font-display text-[2.15rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-[2.9rem] lg:text-[3.5rem]"
            >
              Welcome to <span className="text-gold-shimmer">DermFit Clinic</span>
            </h1>

            <span
              aria-hidden="true"
              className="rule-gold animate-banner-in mt-6 block w-40"
              style={{ animationDelay: "160ms" }}
            />

            <div
              className="animate-banner-in mt-6 space-y-5 text-[0.98rem] leading-relaxed text-brand-100 lg:text-[1.02rem]"
              style={{ animationDelay: "240ms" }}
            >
              {paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>

            {/* The philosophy line, given its own weight. It is the sentence
                the rest of the site has to live up to. */}
            <p
              className="animate-banner-in mt-8 rounded-r-xl border-l-2 border-gold-400 bg-gradient-to-r from-gold-400/12 to-transparent py-4 pl-5 pr-4 font-display text-lg font-medium leading-snug text-white sm:text-xl"
              style={{ animationDelay: "340ms" }}
            >
              Our philosophy is simple — healthy skin comes first,{" "}
              <span className="text-gold-300">aesthetics come second.</span>
            </p>

            <p
              className="animate-banner-in mt-8 text-[0.98rem] leading-relaxed text-brand-100 lg:text-[1.02rem]"
              style={{ animationDelay: "420ms" }}
            >
              Every patient is different, which is why we believe in
              understanding your concerns, assessing your skin or hair
              carefully, and creating a treatment plan that is tailored to your
              individual needs. Whether you are dealing with acne, pigmentation,
              acne scars, hair loss, ageing skin, dandruff or chronic skin
              conditions such as eczema and psoriasis, our approach focuses on
              achieving natural, sustainable results rather than quick fixes.
            </p>
          </div>

          {/* The photographs. Offset columns so the block reads as a composition
              rather than as a grid of four tiles. */}
          <div className="mx-auto grid w-full max-w-lg grid-cols-2 gap-4 lg:max-w-none lg:gap-5">
            <div className="space-y-4 lg:mt-10 lg:space-y-5">
              {photos.slice(0, 2).map((p, i) => (
                <Photo key={p.src} {...p} index={i} />
              ))}
            </div>
            <div className="space-y-4 pt-8 sm:pt-12 lg:pt-0 lg:space-y-5">
              {photos.slice(2).map((p, i) => (
                <Photo key={p.src} {...p} index={i + 2} />
              ))}
            </div>
          </div>
        </div>

        {/* The closing statement, set as the mark's own type: spaced caps in
            the gold gradient, between two rules. */}
        <div className="mt-14 flex items-center justify-center gap-5">
          <span aria-hidden="true" className="rule-gold hidden w-16 flex-shrink-0 sm:block" />
          <p className="text-center font-display text-lg font-semibold uppercase leading-snug tracking-[0.14em] text-gold-gradient sm:text-xl sm:tracking-[0.18em]">
            Advanced Dermatology. Personalised Care.
          </p>
          <span aria-hidden="true" className="rule-gold hidden w-16 flex-shrink-0 sm:block" />
        </div>
      </div>
    </section>
  );
}
