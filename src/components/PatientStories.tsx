import { testimonials } from "@/data/content";
import Reveal from "./Reveal";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function PatientStories() {
  return (
    <section className="relative overflow-hidden bg-surface py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[52rem] -translate-x-1/2 rounded-full bg-gold-100/40 blur-[100px]"
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Patient stories</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-brand-950 sm:text-5xl">
            What people tell us{" "}
            <span className="text-gold-gradient">afterwards</span>
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-px w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
          />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 110}
              // Middle card sits proud so the row has some rhythm.
              className={i === 1 ? "lg:-translate-y-6" : ""}
            >
              <figure className="group relative flex h-full flex-col rounded-[1.75rem] bg-canvas p-8 ring-1 ring-line transition-all hover:-translate-y-1 hover:ring-gold-300 hover:shadow-xl hover:shadow-brand-950/5">
                {/* Decorative quote mark */}
                <span
                  aria-hidden="true"
                  className="absolute right-7 top-5 font-display text-7xl leading-none text-gold-300/45 transition-colors group-hover:text-gold-400/60"
                >
                  &rdquo;
                </span>

                <div className="flex gap-1 text-gold-500" aria-label="5 out of 5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} width="15" height="15" viewBox="0 0 14 14" aria-hidden="true">
                      <path
                        d="M7 1l1.8 3.7 4.1.6-3 2.9.7 4L7 10.3 3.4 12.2l.7-4-3-2.9 4.1-.6z"
                        fill="currentColor"
                      />
                    </svg>
                  ))}
                </div>

                <blockquote className="relative mt-5 flex-1 text-[0.95rem] leading-relaxed text-brand-900">
                  {t.quote}
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-3.5 border-t border-line pt-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-950 font-display text-sm font-semibold text-gold-300">
                    {initials(t.name)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-brand-950">{t.name}</span>
                    <span className="mt-0.5 block text-xs text-muted">{t.treatment}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
