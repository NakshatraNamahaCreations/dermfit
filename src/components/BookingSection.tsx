import BookingForm from "./BookingForm";
import Reveal from "./Reveal";
import { site } from "@/data/site";

/**
 * Booking band for the home page.
 *
 * The clinic's side on the left, the form on the right. Anyone ready to book
 * has a form in front of them; anyone who would rather ring has the numbers in
 * the same view, which is usually the faster route for a clinic.
 *
 * The form is the same component and the same server action as /contact — one
 * validation path, one destination to wire up, rather than two forms drifting
 * apart. It runs `bare` here because the panel already supplies the chrome.
 *
 * NOTE: the action still only logs. See app/contact/actions.ts — a real
 * destination (clinic CRM, email or a database) has to be connected before
 * launch, or enquiries land nowhere.
 */

const assurances = [
  {
    title: "A consultation, not a sales call",
    body: "Thirty minutes with a dermatologist. You leave with a written plan and its costs, whether or not you treat with us.",
  },
  {
    title: "We call back within one working day",
    body: "The front desk confirms a slot that suits you — evenings and Saturdays included.",
  },
  {
    title: "Nothing is booked before it is diagnosed",
    body: "If a treatment will not help your particular case, we will tell you rather than sell it.",
  },
];

function Icon({ name }: { name: "phone" | "whatsapp" | "pin" | "clock" }) {
  const common = {
    width: 17,
    height: 17,
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "phone")
    return (
      <svg {...common}>
        <path d="M6.6 3.5 8 6.4 6.5 7.9c.8 1.7 2 2.9 3.6 3.6l1.5-1.5 2.9 1.4v2.4c0 .7-.6 1.3-1.3 1.2A11.4 11.4 0 0 1 3 5.4c-.1-.7.5-1.3 1.2-1.3h2.4z" />
      </svg>
    );
  if (name === "whatsapp")
    return (
      <svg {...common}>
        <path d="M3.6 16.4 4.7 13a6.5 6.5 0 1 1 2.5 2.4z" />
        <path d="M7.6 7.4c.3 1.6 1.6 3 3.2 3.4" />
      </svg>
    );
  if (name === "pin")
    return (
      <svg {...common}>
        <path d="M10 17.5s5.2-4.6 5.2-8.4a5.2 5.2 0 1 0-10.4 0c0 3.8 5.2 8.4 5.2 8.4z" />
        <circle cx="10" cy="9" r="1.9" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v4.3l2.6 1.6" />
    </svg>
  );
}

export default function BookingSection() {
  return (
    <section
      id="book"
      className="relative overflow-hidden bg-gradient-to-b from-gold-50 to-canvas py-16 sm:py-24"
      aria-labelledby="book-heading"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-gold-300/20 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-brand-200/40 blur-3xl"
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Appointments</p>
          <h2
            id="book-heading"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl lg:text-5xl"
          >
            Book an appointment
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-5 block h-px w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
          />
          <p className="mt-5 text-base leading-relaxed text-muted">
            Tell us what you have noticed and we will call back to confirm a slot. If you
            would rather speak to someone now, the clinic numbers are below.
          </p>
        </div>

        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-[1.75rem] shadow-2xl shadow-brand-950/10 ring-1 ring-line lg:grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* The clinic's side */}
            <div className="relative overflow-hidden bg-brand-950 p-8 text-white sm:p-10">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl"
              />

              <div className="relative">
                <h3 className="font-display text-2xl font-semibold leading-tight">
                  What happens after
                  <br />
                  you send this
                </h3>

                <ul className="mt-8 space-y-6">
                  {assurances.map((a, i) => (
                    <li key={a.title} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[0.7rem] font-semibold text-gold-200 ring-1 ring-white/15"
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{a.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-white/65">{a.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-9 space-y-4 border-t border-white/10 pt-8 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-gold-400">
                      <Icon name="phone" />
                    </span>
                    <p className="flex flex-wrap gap-x-3 gap-y-1">
                      {site.phones.map((p) => (
                        <a
                          key={p.href}
                          href={p.href}
                          className="text-white/90 transition-colors hover:text-gold-200"
                        >
                          {p.display}
                        </a>
                      ))}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-gold-400">
                      <Icon name="whatsapp" />
                    </span>
                    <a
                      href={site.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/90 transition-colors hover:text-gold-200"
                    >
                      Message us on WhatsApp
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-gold-400">
                      <Icon name="pin" />
                    </span>
                    <address className="not-italic leading-relaxed text-white/75">
                      {site.address.line1}
                      <br />
                      {site.address.line2}
                      <br />
                      {site.address.line3}
                    </address>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-gold-400">
                      <Icon name="clock" />
                    </span>
                    <dl className="space-y-1 text-white/75">
                      {site.hours.map((h) => (
                        <div key={h.days} className="flex flex-wrap gap-x-2">
                          <dt>{h.days}</dt>
                          <dd className="text-white/90">{h.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* The form */}
            <div className="bg-surface p-8 sm:p-10">
              <BookingForm bare />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
