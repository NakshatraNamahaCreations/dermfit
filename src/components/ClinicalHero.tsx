import Image from "next/image";
import Link from "next/link";
import { concerns } from "@/data/concerns";
import { treatmentCount } from "@/data/catalogue";
import { site } from "@/data/site";

/**
 * The front door: a full-bleed consultation photograph with the copy running
 * down the left, where the frame is blurred shelving rather than a face.
 *
 * Leads on the clinician and on the visitor's own concern rather than on a
 * carousel of procedures — the first thing offered is a way in by problem.
 */
export default function ClinicalHero() {
  return (
    <section className="relative isolate -mt-40 min-h-[44rem] overflow-hidden bg-brand-950 lg:-mt-44 lg:min-h-[48rem]">
      <Image
        src="/banner-clinic.jpg"
        alt="A dermatologist treating a patient at the Dermfit clinic"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center]"
      />

      {/* Copy sits on near-solid ground at the left and the photograph opens up
          towards the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-950/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-brand-950/70"
      />

      <div className="container-page relative flex min-h-[44rem] flex-col justify-center pb-16 pt-40 lg:min-h-[48rem] lg:pt-48">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            <span className="h-px w-8 bg-gold-500/70" />
            Dermatology clinic · {site.byline.replace("by ", "")}
          </p>

          <h1 className="mt-6 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-cream sm:text-4xl lg:text-5xl">
            Every plan starts with
            <span className="block text-gold-gradient">a diagnosis</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-100 sm:text-lg">
            Dermfit is a doctor-led dermatology practice. Nothing is treated until it has
            been examined and named — and you are told plainly what will improve, what
            will not, and what it costs before you commit to anything.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn btn-gold">
              Book a consultation
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost-light">
              {site.phone}
            </a>
          </div>

          {/* Problem-led entry, kept in the hero */}
          <div className="mt-11 border-t border-white/15 pt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
              What brings you in?
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {concerns.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/concerns#${c.slug}`}
                    className="inline-block rounded-full border border-white/20 bg-brand-950/40 px-3.5 py-2 text-xs font-medium text-brand-100 backdrop-blur-sm transition-colors hover:border-gold-400 hover:text-gold-200"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/concerns"
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-gold-300 hover:underline"
                >
                  All concerns
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      d="M2 6h8M6.5 2.5 10 6l-3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Credentials strip along the foot */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-brand-950/45 backdrop-blur-sm">
        <div className="container-page flex flex-wrap items-center gap-x-10 gap-y-2 py-4">
          {[
            { v: "MBBS, MD", l: "Dermatology" },
            { v: String(treatmentCount), l: "Treatments" },
            { v: "6", l: "Divisions" },
            { v: "Written", l: "Plans, every time" },
          ].map((s) => (
            <p key={s.l} className="flex items-baseline gap-2 text-sm">
              <span className="font-display font-semibold text-cream">{s.v}</span>
              <span className="text-[0.7rem] uppercase tracking-[0.14em] text-brand-300">
                {s.l}
              </span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
