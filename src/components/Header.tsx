"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-brand-950 transition-shadow ${
        scrolled ? "shadow-lg shadow-brand-950/25" : ""
      }`}
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      <div className="container-page flex items-center justify-between gap-6 py-3.5">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${site.name} ${site.byline} — home`}
        >
          <span className="inline-flex shrink-0 rounded-xl ring-1 ring-gold-500/25">
            <Logo size={176} decorative className="h-12 w-12 rounded-xl sm:h-13 sm:w-13" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.4rem] font-semibold leading-none tracking-[0.2em] text-gold-gradient">
              DERMFIT
            </span>
            <span className="mt-1.5 text-[0.58rem] font-medium uppercase tracking-[0.22em] text-brand-300">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-gold-300"
                    : "text-brand-200 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={site.phoneHref}
            className="text-sm font-medium text-brand-200 transition-colors hover:text-white"
          >
            {site.phone}
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-br from-gold-300 to-gold-600 px-5 py-2.5 text-sm font-semibold text-brand-950 transition-opacity hover:opacity-90"
          >
            Book a consult
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-gold-200 md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-white/10 md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-brand-100 hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 px-5 py-3 text-center text-sm font-semibold text-brand-950"
            >
              Book a consult
            </Link>
            <a href={site.phoneHref} className="py-2 text-center text-sm text-brand-300">
              {site.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
