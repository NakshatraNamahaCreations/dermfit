import Image from "next/image";
import Link from "next/link";
import { differentiators } from "@/data/content";
import Reveal from "./Reveal";

const SEAL_TEXT = "DIAGNOSIS FIRST · DERMATOLOGIST-PERFORMED · WRITTEN PLANS · ";

/**
 * Two-panel band: the clinic's case on the left, the reasons behind it on the
 * right. Patient stories stay in their own section.
 */
export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="grid gap-5 lg:grid-cols-2">
          {/* The case for the clinic */}
          <Reveal from="left">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-surface ring-1 ring-line sm:flex-row">
              {/* Image column, full panel height. The source is landscape, so the
                  crop is biased left to keep the aloe as well as the subject. */}
              <div className="relative h-56 shrink-0 sm:h-auto sm:w-[42%]">
                <Image
                  src="/why-choose.jpg"
                  alt="Aloe beside a patient during a facial treatment at Dermfit"
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 42vw, 100vw"
                  className="object-cover object-[36%_center]"
                />
              </div>

              <div className="flex flex-1 flex-col p-7 sm:p-8 sm:pr-28">
                <p className="eyebrow">Why choose us</p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-brand-950">
                  The thinking behind
                  <br />
                  every plan
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Nothing is treated until it has been diagnosed. Every procedure is
                  performed by a qualified dermatologist, never delegated. And every plan
                  is written down with its timelines and costs before you commit to any
                  of it.
                </p>

                <Link
                  href="/about"
                  className="mt-auto pt-7 text-xs font-semibold uppercase tracking-[0.18em] text-brand-950 underline underline-offset-8 decoration-gold-500 hover:text-gold-700"
                >
                  Meet the clinic
                </Link>
              </div>

              {/* Rotating seal */}
              <div className="pointer-events-none absolute bottom-5 right-5 hidden h-24 w-24 items-center justify-center sm:flex">
                <svg viewBox="0 0 200 200" className="animate-seal h-full w-full" aria-hidden="true">
                  <defs>
                    <path
                      id="seal-arc"
                      d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
                      fill="none"
                    />
                  </defs>
                  <text
                    className="fill-brand-950/55"
                    style={{ fontSize: "15px", letterSpacing: "1.5px", fontWeight: 600 }}
                  >
                    <textPath href="#seal-arc">{SEAL_TEXT}</textPath>
                  </text>
                </svg>
                <span className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-brand-950 text-gold-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 3 4.5 6.2v5c0 4.4 3.1 8.5 7.5 9.8 4.4-1.3 7.5-5.4 7.5-9.8v-5z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                    <path
                      d="m8.8 12 2.2 2.2 4.2-4.4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </Reveal>

          {/* The reasons */}
          <Reveal from="right" delay={120}>
            <div className="flex h-full flex-col justify-center rounded-[1.75rem] bg-brand-950 p-7 sm:p-9">
              <h2 className="text-center font-display text-3xl font-normal italic tracking-tight text-cream">
                Why choose us
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-center text-xs leading-relaxed text-brand-300">
                Four commitments we hold to on every case.
              </p>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {differentiators.map((d, i) => (
                  <li
                    key={d.title}
                    className="flex flex-col rounded-2xl bg-[#f3f1ea] p-5"
                  >
                    <span className="font-display text-sm font-semibold text-gold-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-sm font-bold leading-snug text-brand-950">
                      {d.title}
                    </h3>
                    <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted">
                      {d.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
