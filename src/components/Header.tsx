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

  // Solid on every page: the bar is its own block, separate from the banner.
  // No hairline under it — the bar and the banner beneath are both white, so a
  // rule only drew a line across the join. Once the page moves under the bar a
  // soft shadow does the separating instead.

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? "shadow-lg shadow-brand-950/10" : ""
      }`}
    >
      <div
        className="container-page flex h-28 items-center justify-between gap-6 lg:h-36"
      >
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${site.name} ${site.byline} — home`}
        >
          {/* The lockup carries four lines of small type, so the wordmark beside
              it does the work at this size. */}
          {/* The lockup carries four lines of small type; below roughly 128px
              the bottom two stop resolving, which is what made it look soft. */}
          <Logo
            height={512}
            sizes="(min-width: 1024px) 108px, 84px"
            className="h-24 w-auto lg:h-32"
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
                    ? "bg-brand-50 text-brand-900"
                    : "text-muted hover:bg-brand-50 hover:text-brand-900"
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
            className="text-sm font-medium text-brand-900 transition-colors hover:text-gold-700"
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-brand-900 md:hidden"
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
        <div id="mobile-nav" className="border-t border-line bg-white md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-brand-900 hover:bg-brand-50"
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
            <a href={site.phoneHref} className="py-2 text-center text-sm text-muted">
              {site.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
