"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import Logo from "./Logo";

/**
 * Header with the logo centred and the navigation split either side of it.
 *
 * ON THE HOME PAGE IT IS PART OF THE BANNER. The opening section is navy, and a
 * white bar above it drew a hard line across the top of the page — two blocks,
 * not one. So on "/" the bar carries the banner's own navy and its type goes
 * light: the header and the banner read as a single field of colour, with the
 * gold lockup sitting in it. The logo swaps to the untouched gold copy there,
 * since the deepened one exists to survive a white bar and dies on navy.
 *
 * Once the page scrolls past the banner the bar goes white and the type goes
 * dark again, because below the banner it is over white sections. Every other
 * page has a light hero, so the bar is white on all of them from the start.
 *
 * The lockup is the clinic's strongest asset and it is symmetrical, so it holds
 * the middle better than it held a corner. Six links split 3/3 around it, and
 * with the booking button at the right edge and the phone at the left, which is
 * what keeps the logo optically centred: a button on one side and nothing on
 * the other would drag the middle across. The utility strip that used to carry
 * WhatsApp and the hours is gone; those live in the footer, the floating
 * WhatsApp button and /contact.
 *
 * No hairline under the bar: it sits over a white banner, so a rule only drew a
 * line across the join. Once the page moves, a soft shadow separates them.
 */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /** Only the home page opens on the navy banner. */
  const overBanner = pathname === "/";

  useEffect(() => {
    if (!overBanner) return;
    // Swap once the bar has cleared the banner's first screen. Deliberately
    // not the banner's full height: the swap should happen while the navy is
    // still behind it, not a moment after white has appeared under the bar.
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overBanner]);

  /** True while the bar is sitting on the banner's navy. */
  const onNavy = overBanner && !scrolled;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const half = Math.ceil(nav.length / 2);
  const left = nav.slice(0, half);
  const right = nav.slice(half);

  const linkClass = (href: string) =>
    `relative py-2 text-[0.8rem] font-medium uppercase tracking-[0.12em] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-center after:scale-x-0 after:bg-gold-400 after:transition-transform hover:after:scale-x-100 ${
      onNavy
        ? isActive(href)
          ? "text-white after:scale-x-100"
          : "text-brand-100 hover:text-white"
        : isActive(href)
          ? "text-brand-950 after:scale-x-100"
          : "text-muted hover:text-brand-950"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        onNavy ? "bg-brand-950" : "bg-white shadow-sm shadow-brand-950/5"
      }`}
    >
      {/* Main bar: nav | logo | nav */}
      <div className="container-page flex h-28 items-center justify-between gap-6 lg:h-36 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        {/* Left column: nav */}
        <div className="hidden items-center justify-end gap-8 lg:flex">
          <nav className="flex items-center gap-8" aria-label="Main">
            {left.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={linkClass(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile: menu button on the left of the centred logo */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
            onNavy
              ? "border-white/25 text-white"
              : "border-line text-brand-900"
          }`}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2 5h14M2 9h14M2 13h14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>

        <Link
          href="/"
          aria-label={`${site.name} ${site.byline} — home`}
          className="mx-auto shrink-0 lg:px-10"
        >
          {/* The lockup carries four lines of small type under DERMFIT, and they
              need both size and contrast to hold: hence 144px here and the
              deepened logo-header.png rather than the over-photography copy. */}
          <Logo
            onDark={onNavy}
            height={576}
            sizes="(min-width: 1024px) 122px, 95px"
            className="h-24 w-auto transition-transform duration-500 hover:scale-[1.03] lg:h-36"
          />
        </Link>

        <div className="flex items-center justify-start gap-8 lg:justify-between">
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main, continued">
            {right.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={linkClass(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="hidden whitespace-nowrap rounded-full bg-gradient-to-br from-gold-300 to-gold-600 px-6 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-950 shadow-sm transition-all hover:shadow-md hover:shadow-gold-600/25 lg:inline-flex"
          >
            Book appointment
          </Link>

          {/* Mobile counterweight to the menu button, so the logo sits true */}
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phone}`}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-gold-400 lg:hidden ${
              onNavy
                ? "border-white/25 text-white hover:text-gold-300"
                : "border-line text-brand-900 hover:text-gold-700"
            }`}
          >
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M6.6 3.5 8 6.4 6.5 7.9c.8 1.7 2 2.9 3.6 3.6l1.5-1.5 2.9 1.4v2.4c0 .7-.6 1.3-1.3 1.2A11.4 11.4 0 0 1 3 5.4c-.1-.7.5-1.3 1.2-1.3h2.4z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-white lg:hidden">
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
