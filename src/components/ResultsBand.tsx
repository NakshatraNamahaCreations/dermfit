import Image from "next/image";
import Link from "next/link";
import { results, resultsAreIllustrative } from "@/data/results";
import Reveal from "./Reveal";

/**
 * Before / after results band — three columns, as on the reference.
 *
 * The frame is 3:2 and each half is exactly 3:4, which is the ratio the source
 * files are cut to, so neither picture is cropped by the layout. The earlier
 * single wide frame cropped a portrait to 3:2 and took the tops off the faces.
 *
 * Two comparisons and a closing card. There are only two honest pairs to show,
 * and padding the row with a third by re-cropping one of them would be showing
 * the same case twice — so the third column carries the invitation instead.
 *
 * These are illustrative images, not patient records, and the band says so in
 * text. See data/results.ts for what has to be true before that changes.
 */
export default function ResultsBand() {
  return (
    <section className="bg-surface py-16 sm:py-24" aria-labelledby="results-heading">
      <div className="container-page text-center">
        <p className="eyebrow">Results</p>
        <h2
          id="results-heading"
          className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl lg:text-5xl"
        >
          Life changing results
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-5 block h-px w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
        />
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">
          What changes, and what it depends on. Every plan starts from a diagnosis, so what
          is achievable is established before anything is booked.
        </p>
      </div>

      <div className="mt-14 bg-canvas py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {results.map((r, i) => (
              <Reveal key={r.id} delay={i * 120} className="h-full">
                <article className="group relative h-full">
                  {/* Navy offset blocks, as on the reference */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-2 -top-2 h-16 w-16 rounded-tl-xl bg-brand-950 transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 -right-2 h-16 w-16 rounded-br-xl bg-brand-950 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"
                  />

                  <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-surface shadow-lg shadow-brand-950/5 transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-brand-950/10">
                    {/* 3:2 frame, two 3:4 halves — the ratio the files are cut
                        to, so nothing is cropped by the layout. */}
                    <div className="relative grid aspect-[3/2] grid-cols-2">
                      <div className="relative overflow-hidden">
                        <Image
                          src={r.before}
                          alt={r.beforeAlt}
                          fill
                          sizes="(min-width: 1024px) 16vw, (min-width: 768px) 24vw, 45vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="relative overflow-hidden">
                        <Image
                          src={r.after}
                          alt={r.afterAlt}
                          fill
                          sizes="(min-width: 1024px) 16vw, (min-width: 768px) 24vw, 45vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </div>

                      {/* Divider, and the light that runs down it on hover */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/90"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-0 h-1/3 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:animate-seam group-hover:opacity-100"
                      />
                    </div>

                    <div className="grid grid-cols-2 border-b border-line text-center text-[0.7rem] font-semibold uppercase tracking-[0.14em]">
                      <span className="border-r border-line py-2.5 text-muted">Before</span>
                      <span className="bg-gold-50 py-2.5 text-gold-700">After</span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-700">
                        {r.concern}
                      </p>
                      <h3 className="mt-2.5 font-display text-lg font-semibold leading-snug text-brand-950">
                        {r.headline}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{r.summary}</p>
                      <Link
                        href={r.href}
                        className="mt-auto pt-6 text-xs font-semibold uppercase tracking-[0.16em] text-brand-950 underline decoration-gold-500 underline-offset-8 transition-colors hover:text-gold-700"
                      >
                        How this is diagnosed
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}

            {/* Third column: the invitation, rather than a third case we do not
                honestly have. */}
            <Reveal delay={results.length * 120} className="h-full">
              <article className="group relative h-full">
                <span
                  aria-hidden="true"
                  className="absolute -left-2 -top-2 h-16 w-16 rounded-tl-xl bg-gold-500 transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2 -right-2 h-16 w-16 rounded-br-xl bg-gold-500 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"
                />

                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl bg-brand-950 p-8 text-white shadow-lg shadow-brand-950/10 transition-shadow duration-500 group-hover:shadow-2xl">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-500/10 blur-2xl"
                  />

                  <div className="relative">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-200">
                      Your case
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold leading-tight">
                      What changes for you depends on the cause
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/70">
                      Two people with the same complaint rarely have the same diagnosis.
                      Yours is worked out first — with imaging, scoring or bloods — and you
                      leave with a written plan and its costs before anything is booked.
                    </p>

                    <ul className="mt-6 space-y-2.5 text-sm text-white/85">
                      {["Examination and diagnosis", "A written plan you keep", "Progress measured, not claimed"].map(
                        (t) => (
                          <li key={t} className="flex items-start gap-2.5">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 20 20"
                              fill="none"
                              aria-hidden="true"
                              className="mt-1 shrink-0 text-gold-400"
                            >
                              <path
                                d="m4 10.5 4 4 8-9"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {t}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  <div className="relative mt-8 flex flex-col gap-3">
                    <Link href="/contact" className="btn btn-gold w-full justify-center">
                      Book a consultation
                    </Link>
                    <Link
                      href="/concerns"
                      className="btn btn-ghost-light w-full justify-center"
                    >
                      Start from your concern
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>

          {resultsAreIllustrative && (
            <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-muted">
              Illustrative images, not patient records. Outcomes differ with the cause, the
              severity and the individual, and are never guaranteed — yours is established at
              consultation.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
