import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

/**
 * Editorial "about" section: a display headline split either side of a centred
 * image, with a stat card and a numbered trust card floating above it.
 *
 * The image is public/about-portrait.png — the supplied artwork with its white
 * page cut away by make-about-cutout.py, so its angled card shape reads
 * directly against the cream background.
 */
export default function AboutShowcase() {
  return (
    <section className="overflow-hidden bg-gold-50 py-20 sm:py-24">
      <div className="container-page">
        {/* Floating cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-3">
          <div className="rounded-[1.75rem] bg-surface p-6 shadow-sm">
            <p className="text-4xl font-bold tracking-[-0.02em] text-brand-950">12+</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">
              Years of clinical
              <br />
              dermatology practice
            </p>
          </div>
          </Reveal>

          <div className="hidden lg:col-span-4 lg:block" aria-hidden="true" />

          <Reveal delay={120} className="lg:col-span-5">
          <div className="flex items-center gap-4 rounded-[1.75rem] bg-surface p-6 shadow-sm">
            <span className="shrink-0 self-start rounded-2xl bg-brand-950 px-3.5 py-2 text-lg font-bold text-gold-300">
              #01
            </span>
            <div>
              <h3 className="text-sm font-semibold text-brand-950">
                Diagnosis before treatment
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                Every plan starts with imaging, scoring or lab work — never a package sold
                off a menu. It is the reason our patients stop clinic-hopping.
              </p>
            </div>
          </div>
          </Reveal>
        </div>

        {/* Headline split around the image */}
        <div className="mt-10 grid items-center gap-6 lg:mt-14 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          <Reveal from="left" delay={200} className="order-1 text-center lg:text-right">
            <p className="text-5xl font-normal leading-[1.02] tracking-[-0.03em] text-gold-500 sm:text-6xl lg:text-[4.5rem]">
              Skilled
            </p>
            <p className="mt-1 text-5xl font-bold leading-[1.02] tracking-[-0.03em] text-brand-950 sm:text-6xl lg:text-[4.5rem]">
              Skin
              <span className="lg:block"> Experts</span>
            </p>
          </Reveal>

          {/* The artwork carries its own angled card shape and shadow. Reveal
              handles the entrance; the inner element does the continuous drift,
              so the two transforms never fight each other. */}
          <Reveal delay={80} className="order-2 mx-auto w-full max-w-[19rem] lg:w-[19rem]">
            <div className="animate-float">
              <Image
                src="/about-portrait.png"
                alt="A patient applying a serum after treatment at Dermfit"
                width={760}
                height={1173}
                sizes="(min-width: 1024px) 304px, 304px"
                quality={90}
                className="h-auto w-full drop-shadow-[0_18px_40px_rgb(1_18_45_/_0.18)]"
              />
            </div>
          </Reveal>

          <Reveal from="right" delay={200} className="order-3 text-center lg:text-left">
            <p className="text-5xl font-normal leading-[1.02] tracking-[-0.03em] text-gold-500 sm:text-6xl lg:text-[4.5rem]">
              Results-
            </p>
            <p className="mt-1 text-5xl font-bold leading-[1.02] tracking-[-0.03em] text-brand-950 sm:text-6xl lg:text-[4.5rem]">
              Driven
            </p>
          </Reveal>
        </div>

        {/* Lead-in */}
        <Reveal delay={280} className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-muted">
            Dermfit is a clinical dermatology practice led by Dr Sourab Hegde. Every
            procedure is performed by a qualified dermatologist, every plan is written down
            with its costs, and nothing is treated until it has been properly diagnosed.
          </p>
          <Link
            href="/about"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 hover:underline"
          >
            More about the clinic
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2 6h8M6.5 2.5 10 6l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
