import Link from "next/link";
import { site } from "@/data/site";

/**
 * The closing call to action, used at the foot of About, Services and the
 * journal pages.
 *
 * FULL-BLEED, not a rounded card in a container. As a card it read as one more
 * block in the stack — the same width, the same corners, the same inset as
 * everything above it — which is the opposite of what a closing panel is for.
 * Edge to edge, the navy becomes a full stop: the page visibly ends, and the
 * only thing left to do is the thing the buttons offer.
 *
 * The eyebrow used to read "Next available slot this week". That is a claim
 * about the diary, made by a static page that cannot see it, and it is wrong
 * on any week the diary is full. It now names the consultation instead.
 */

const assurances = [
  {
    label: "Seen by Dr Hegde",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s7.5-4.2 7.5-10.1V5.4L12 2.6 4.5 5.4v5.5C4.5 16.8 12 21 12 21z" />
        <path d="m9 11.6 2.1 2.1 4.1-4.1" />
      </svg>
    ),
  },
  {
    label: "Written plan to take away",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M8.5 13h7M8.5 17h4" />
      </svg>
    ),
  },
  {
    label: "Costs given up front",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M9.5 9.5h5M9.5 12.5h5" />
      </svg>
    ),
  },
];

export default function CTA() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 py-20 sm:py-24 lg:py-28">
      {/* Ambient light. Two golds and a blue, placed so the centre of the band
          lifts and the corners fall away. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-[26rem] w-[26rem] rounded-full bg-brand-700/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-28 h-[26rem] w-[26rem] rounded-full bg-gold-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/10 blur-3xl"
      />

      {/* Faint grid, so the navy has a surface rather than being flat ink. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      {/* Gold hairlines top and bottom: the seam that tells you the band is
          deliberate rather than the page simply running out. */}
      <span aria-hidden="true" className="rule-gold absolute inset-x-0 top-0 opacity-60" />
      <span aria-hidden="true" className="rule-gold absolute inset-x-0 bottom-0 opacity-60" />

      <div className="relative mx-auto w-full max-w-3xl px-5 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-400" />
          </span>
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-200">
            Consultation with Dr Sourab Hegde
          </span>
        </span>

        <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
          Start with a proper diagnosis,{" "}
          <span className="text-gold-shimmer">not a package</span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-brand-100">
          Thirty minutes with the dermatologist. You leave with a written plan and
          clear costs, whether or not you treat with us.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="btn btn-gold group inline-flex w-full items-center justify-center gap-2 px-7 shadow-lg shadow-gold-500/20 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-gold-500/30 sm:w-auto"
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
            className="btn btn-ghost-light inline-flex w-full items-center justify-center gap-2 px-7 backdrop-blur-sm transition-all hover:bg-white/5 sm:w-auto"
          >
            <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M6.6 3.5 8 6.4 6.5 7.9c.8 1.7 2 2.9 3.6 3.6l1.5-1.5 2.9 1.4v2.4c0 .7-.6 1.3-1.3 1.2A11.4 11.4 0 0 1 3 5.4c-.1-.7.5-1.3 1.2-1.3h2.4z" />
            </svg>
            <span>Call {site.phone}</span>
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-white/10 pt-7">
          {assurances.map((a) => (
            <li key={a.label} className="flex items-center gap-2 text-[0.78rem] text-brand-100">
              <span className="text-gold-400">{a.icon}</span>
              <span>{a.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
