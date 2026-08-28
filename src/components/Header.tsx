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

  // At the top of the home page the header is a tall transparent masthead so
  // the full logo lockup renders large enough to actually read. Once you
  // scroll it collapses to a compact solid bar. Other pages always get the
  // compact bar. The tall height is what the hero pulls itself up by.
  const masthead = pathname === "/" && !scrolled && !open;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        masthead ? "bg-transparent" : "bg-brand-950 shadow-lg shadow-brand-950/25"
      }`}
    >
      <div
        className={`container-page flex items-center justify-between gap-6 transition-[height] duration-300 ${
          masthead ? "h-40 lg:h-44" : "h-20 lg:h-24"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${site.name} ${site.byline} — home`}
        >
          {/* The lockup carries four lines of small type; below ~128px the
              bottom lines stop resolving, hence the tall masthead at rest. */}
          <Logo
            height={432}
            sizes="(min-width: 1024px) 144px, 112px"
            className={`w-auto transition-[height] duration-300 ${
              masthead ? "h-28 lg:h-36" : "h-14 lg:h-16"
            }`}
          />
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
        <div id="mobile-nav" className="border-t border-white/10 bg-brand-950 md:hidden">
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
