import Link from "next/link";
import { nav, site } from "@/data/site";
import { divisions } from "@/data/catalogue";
import Logo from "./Logo";
import SocialIcon from "./SocialIcon";

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  [site.address.line1, site.address.line2, site.address.line3].join(", "),
)}`;

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-brand-950 text-brand-100">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl"
      />

      <div className="container-page relative grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Logo height={560} sizes="200px" className="h-auto w-48 max-w-full" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-200">
            {site.description}
          </p>

          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-gradient-to-br from-gold-300 to-gold-600 px-6 py-3 text-sm font-semibold text-brand-950 transition-opacity hover:opacity-90"
          >
            Book a consultation
          </Link>

          <div className="mt-7 flex gap-2.5">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-brand-200 transition-colors hover:border-gold-400 hover:text-gold-300"
              >
                <SocialIcon name={s.label} />
              </a>
            ))}

            {/* WhatsApp is a way to reach the clinic rather than a profile, so it
                takes the brand green and sits slightly apart from the socials. */}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Message the clinic on WhatsApp"
              className="ml-1.5 flex h-10 w-10 items-center justify-center rounded-full border border-[#25D366]/40 text-[#25D366] transition-colors hover:border-[#25D366] hover:bg-[#25D366]/10"
            >
              <SocialIcon name="whatsapp" />
            </a>
          </div>
        </div>

        {/* Explore */}
        <nav className="lg:col-span-2" aria-label="Footer">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-400">
            Explore
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-brand-200 transition-colors hover:text-gold-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divisions */}
        <div className="lg:col-span-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-400">
            Divisions
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            {divisions.map((d) => (
              <li key={d.slug}>
                <Link
                  href="/services#catalogue"
                  className="text-brand-200 transition-colors hover:text-gold-300"
                >
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Visit */}
        <div className="lg:col-span-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-400">
            Visit
          </h2>

          <address className="mt-5 space-y-1 text-sm not-italic leading-relaxed text-brand-200">
            <p>{site.address.line1}</p>
            <p>{site.address.line2}</p>
            <p>{site.address.line3}</p>
          </address>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 transition-colors hover:text-gold-300"
          >
            Get directions
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2 6h8M6.5 2.5 10 6l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <ul className="mt-5 space-y-2 text-sm">
            {site.phones.map((t) => (
              <li key={t.href}>
                <a href={t.href} className="text-brand-200 hover:text-gold-300">
                  {t.display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="text-brand-200 hover:text-gold-300">
                {site.email}
              </a>
            </li>
          </ul>

          <dl className="mt-6 rounded-2xl bg-white/[0.05] p-4 text-xs ring-1 ring-white/10">
            <h3 className="mb-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-gold-400">
              Opening hours
            </h3>
            {site.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4 py-1">
                <dt className="text-brand-300">{h.days}</dt>
                <dd className="text-brand-100">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} {site.kind}. All rights reserved.
          </p>
          <p className="sm:max-w-md sm:text-right">
            Information on this site is educational and is not a substitute for a medical
            consultation.
          </p>
        </div>
      </div>
    </footer>
  );
}
