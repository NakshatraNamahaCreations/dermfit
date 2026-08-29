"use client";

import Image from "next/image";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { subscribe } from "@/app/newsletter/actions";
import { initialSubscribeState } from "@/app/newsletter/state";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-gradient-to-br from-gold-300 to-gold-600 px-6 py-3 text-sm font-semibold text-brand-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Joining…" : "Join now"}
    </button>
  );
}

export default function NewsletterBand() {
  const [state, formAction] = useActionState(subscribe, initialSubscribeState);

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto w-full max-w-[92rem] px-5">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-brand-950">
          {/* Foliage accent, low opacity so the copy stays legible */}
          <Image
            src="/leaf-left.png"
            alt=""
            width={964}
            height={1011}
            sizes="320px"
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 -left-10 hidden w-72 opacity-25 saturate-[0.6] sm:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold-400/10 blur-3xl"
          />

          <div className="relative grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-[1.35fr_auto_1fr] lg:gap-12">
            <div className="sm:pl-52 lg:pl-56">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-400">
                From the clinic
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl">
                Skin advice worth
                <span className="block text-gold-gradient">actually reading</span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-200">
                One email a month from Dr Sourab Hegde — what works, what does not, and
                what to ignore. No offers, no pressure.
              </p>
            </div>

            {/* Divider, as in the reference */}
            <span
              aria-hidden="true"
              className="hidden w-px self-stretch bg-gradient-to-b from-transparent via-white/20 to-transparent lg:block"
            />

            <div>
              <p className="flex items-center gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
                Join now
              </p>

              {state.status === "success" ? (
                <p className="mt-4 rounded-2xl bg-white/[0.07] p-4 text-sm leading-relaxed text-cream ring-1 ring-white/10">
                  {state.message}
                </p>
              ) : (
                <form action={formAction} noValidate className="mt-4">
                  <div aria-hidden="true" className="hidden">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

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
                    className={`w-full rounded-full border bg-white/[0.06] px-5 py-3 text-sm text-cream placeholder:text-brand-300/70 focus:bg-white/[0.1] ${
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
                  <p className="mt-3 text-[0.68rem] leading-relaxed text-brand-300">
                    Unsubscribe any time. We never share your address.
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
