import Link from "next/link";
import { nav, site } from "@/data/site";
import { services } from "@/data/services";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-24 bg-brand-950 text-brand-100">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      <div className="container-page grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo size={480} sizes="224px" className="w-56 max-w-full rounded-lg" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-200">
            {site.description}
          </p>
          <div className="mt-5 flex gap-3">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-brand-200 transition-colors hover:border-gold-500 hover:text-gold-200"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-400">
            Pages
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-brand-200 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-400">
            Treatments
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-brand-200 hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-400">
            Visit
          </h3>
          <address className="mt-4 space-y-1 text-sm not-italic text-brand-200">
            <p>{site.address.line1}</p>
            <p>{site.address.line2}</p>
          </address>
          <div className="mt-4 space-y-1 text-sm">
            <p>
              <a href={site.phoneHref} className="text-brand-200 hover:text-white">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="text-brand-200 hover:text-white">
                {site.email}
              </a>
            </p>
          </div>
          <dl className="mt-4 space-y-1 text-xs text-brand-300">
            {site.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4">
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} {site.kind}. All rights reserved.
          </p>
          <p>
            Information on this site is educational and is not a substitute for a medical
            consultation.
          </p>
        </div>
      </div>
    </footer>
  );
}
