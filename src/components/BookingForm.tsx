"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitBooking } from "@/app/contact/actions";
import { initialBookingState } from "@/app/contact/booking-state";
import { services } from "@/data/services";

const fieldBase =
  "mt-1.5 w-full rounded-xl border bg-surface px-4 py-3 text-sm text-brand-950 placeholder:text-muted/70 transition-colors focus:border-gold-500";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-gold w-full disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Request an appointment"}
    </button>
  );
}

export default function BookingForm() {
  const [state, formAction] = useActionState(submitBooking, initialBookingState);

  if (state.status === "success") {
    return (
      <div className="rounded-card border border-gold-200 bg-gold-50 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-900">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path
              d="m6 11.5 3.5 3.5L16 8"
              stroke="currentColor"
              className="text-gold-300"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold text-brand-950">
          Request received
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="rounded-card border border-line bg-surface p-7 sm:p-8">
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && (
        <p role="alert" className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="text-sm font-medium text-brand-900">
            Full name <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Ananya Sharma"
            aria-invalid={Boolean(state.errors.name)}
            aria-describedby={state.errors.name ? "name-error" : undefined}
            className={`${fieldBase} ${state.errors.name ? "border-red-400" : "border-line"}`}
          />
          {state.errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-600">
              {state.errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-medium text-brand-900">
            Phone <span className="text-red-600">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91 98765 43210"
            aria-invalid={Boolean(state.errors.phone)}
            aria-describedby={state.errors.phone ? "phone-error" : undefined}
            className={`${fieldBase} ${state.errors.phone ? "border-red-400" : "border-line"}`}
          />
          {state.errors.phone && (
            <p id="phone-error" className="mt-1.5 text-xs text-red-600">
              {state.errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-brand-900">
            Email <span className="text-muted">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(state.errors.email)}
            aria-describedby={state.errors.email ? "email-error" : undefined}
            className={`${fieldBase} ${state.errors.email ? "border-red-400" : "border-line"}`}
          />
          {state.errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-600">
              {state.errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="service" className="text-sm font-medium text-brand-900">
            What would you like to discuss? <span className="text-red-600">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            defaultValue=""
            aria-invalid={Boolean(state.errors.service)}
            aria-describedby={state.errors.service ? "service-error" : undefined}
            className={`${fieldBase} ${state.errors.service ? "border-red-400" : "border-line"}`}
          >
            <option value="" disabled>
              Select an area
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Something else">Something else / not sure</option>
          </select>
          {state.errors.service && (
            <p id="service-error" className="mt-1.5 text-xs text-red-600">
              {state.errors.service}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium text-brand-900">
            Anything we should know? <span className="text-muted">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={1000}
            placeholder="How long you have had the concern, what you have tried, preferred days for an appointment…"
            className={`${fieldBase} resize-y ${state.errors.message ? "border-red-400" : "border-line"}`}
          />
          {state.errors.message && (
            <p className="mt-1.5 text-xs text-red-600">{state.errors.message}</p>
          )}
        </div>
      </div>

      <div className="mt-7">
        <SubmitButton />
        <p className="mt-3 text-center text-xs leading-relaxed text-muted">
          Please do not send clinical photographs or medical records through this form. We use
          your details only to arrange your appointment.
        </p>
      </div>
    </form>
  );
}
