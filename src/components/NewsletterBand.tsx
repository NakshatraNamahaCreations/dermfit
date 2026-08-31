"use client";

import Image from "next/image";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { subscribe } from "@/app/newsletter/actions";
import { initialSubscribeState } from "@/app/newsletter/state";

const promises = [
  "What actually works, and what does not",
  "No offers, no discount codes, nothing to buy",
  "One email a month. Unsubscribe in one click",
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-gradient-to-br from-gold-300 to-gold-600 px-6 py-3.5 text-sm font-semibold text-brand-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Joining…" : "Join the list"}
    </button>
  );
}

export default function NewsletterBand() {
  const [state, formAction] = useActionState(subscribe, initialSubscribeState);

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto w-full max-w-[92rem] px-5">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 ring-1 ring-white/10">
          {/* A clinical frame carries the ground, held right back so it reads as
              depth rather than as a picture competing with the form. */}
          <Image
            src="/banner-clinic.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 92rem, 100vw"
            aria-hidden="true"
            className="pointer-events-none object-cover object-[55%_center] opacity-[0.22]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/90 to-brand-950/75"
          />

          {/* Fine dot grid — a clinical texture rather than a decorative motif */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px] opacity-60"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/70 to-transparent"
          />

          <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:p-12">
            <div>
              <p className="flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-400">
                <span className="h-px w-7 bg-gold-500/70" />
                From the clinic
              </p>

              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl">
                Skin advice worth
                <span className="block text-gold-gradient">actually reading</span>
              </h2>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-200">
                Written by Dr Sourab Hegde, for people who would rather understand their
                skin than be sold to.
              </p>

              <ul className="mt-7 space-y-2.5">
                {promises.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-brand-100">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 18 18"
                      fill="none"
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-gold-400"
                    >
                      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.2" />
                      <path
                        d="m5.6 9.2 2.2 2.2 4.6-4.6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* The form, as its own card rather than floating on the panel */}
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm sm:p-7">
              {state.status === "success" ? (
                <div className="flex h-full flex-col items-center justify-center py-6 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      <path
                        d="m6 11.5 3.5 3.5L16 8"
                        stroke="#01122d"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-cream">{state.message}</p>
                </div>
              ) : (
                <form action={formAction} noValidate>
                  <div aria-hidden="true" className="hidden">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <p className="flex items-center gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-400">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect
                        x="3"
                        y="5.5"
                        width="18"
                        height="13"
                        rx="2.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="m4 7 8 6 8-6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Join the list
                  </p>

                  <label htmlFor="news-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="news-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={state.status === "error"}
                    aria-describedby={state.status === "error" ? "news-error" : undefined}
                    className={`mt-4 w-full rounded-full border bg-brand-950/50 px-5 py-3.5 text-sm text-cream placeholder:text-brand-300/60 transition-colors focus:border-gold-500 focus:bg-brand-950/70 ${
                      state.status === "error" ? "border-red-400/70" : "border-white/15"
                    }`}
                  />
                  {state.status === "error" && (
                    <p id="news-error" className="mt-2 text-xs text-red-300">
                      {state.message}
                    </p>
                  )}

                  <div className="mt-3">
                    <SubmitButton />
                  </div>

                  <p className="mt-4 text-center text-[0.68rem] leading-relaxed text-brand-300">
                    We use your address for this newsletter only, and never share it.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
