# Dermfit — Skin & Hair Clinic

A Next.js 16 (App Router) marketing site for a dermatology clinic. TypeScript, Tailwind CSS v4, no external UI libraries.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

## Structure

```
src/
  app/
    layout.tsx              root layout: fonts, header, footer, metadata
    page.tsx                home
    globals.css             Tailwind v4 @theme design tokens
    not-found.tsx           404
    about/page.tsx
    services/page.tsx       treatment list with category filter
    services/[slug]/page.tsx  treatment detail (statically generated)
    contact/
      page.tsx              clinic details + booking form
      actions.ts            "use server" form handler
      booking-state.ts      shared form-state type/constant
  components/               Header, Footer, Logo, PageHero, Section,
                            ServiceCard, ServiceFilter, BookingForm, FAQ, CTA
  data/
    site.ts                 clinic name, phone, address, hours, nav
    services.ts             all treatments (drives listing, detail, sitemap)
    content.ts              doctors, stats, testimonials, FAQs
```

## Editing content

Almost all copy lives in `src/data/`. Adding a treatment to `services.ts` automatically creates its detail page, its card on `/services` and `/`, its footer link, and an option in the booking form's dropdown — no routing changes needed.

## Structure: problem-led, not treatment-led

The page order follows the order of care rather than a treatment menu:

```
concern -> examination -> diagnosis -> plan -> treatment -> follow-up -> outcome
```

- `src/data/concerns.ts` — what patients notice, in their own words, plus what
  the first appointment does about it. This is the site's front door: the hero
  and `/concerns` both lead from here.
- `src/data/pathway.ts` — the seven stages, rendered by `CarePathway`. Treatment
  is stage five of seven, deliberately.
- `src/data/catalogue.ts` — the six divisions and 61 treatments. Reached *after*
  the concern, never as the entry point.

## Imagery

Only real clinical photography ships. Earlier drafts used AI-generated imagery,
which read as a beauty brand rather than a dermatology practice; those files and
the scripts that produced them have been removed.

`make-division-covers.py` cuts the six division discs from supplied photographs,
and `make-post-covers.py` derives the journal covers from the same frames. The
multi-megabyte originals are not kept in the repo, so a missing source skips
that image rather than failing the run.

**Outstanding:** the current photography is licensed stock and under-represents
Indian and brown skin, which is most of the clinic's practice. Real photographs
of the clinic, of Dr Hegde, and — with written consent — of patients should
replace it. Drop files in `public/` and point `image` at them in the relevant
data file.

## Design tokens

Type is Poppins throughout — one family, with the display role carried by weight and tracking rather than a second typeface. The palette and fonts are defined once as Tailwind v4 `@theme` variables in `src/app/globals.css`: `brand-*` is the navy sampled from the logo (`brand-950` is its exact background, `#01122D`) and `gold-*` spans the logo's gold gradient, plus `ink` / `muted` / `line` / `surface` / `canvas`. Shared `.btn`, `.btn-gold`, `.btn-outline` and `.btn-ghost-light` classes live in the same file. Change the hex values there to rebrand the whole site.

## Before going live

- **Wire up the booking form.** `submitBooking` in `src/app/contact/actions.ts` currently validates and logs. Replace the `console.info` with a real destination (email via Resend/SendGrid, a CRM webhook, or a database) — it runs server-side, so credentials stay out of the browser.
- **Replace placeholder details** in `src/data/site.ts` (phone, email, address, social URLs) and the doctor profiles in `src/data/content.ts`.
- **Set the real domain** in `metadataBase` in `src/app/layout.tsx`.
- **Add a map embed** on the contact page — there is a placeholder block marked in `src/app/contact/page.tsx`.
- **Swap in real photography.** The site currently uses no raster images by design; hero and team sections are laid out to accept them.
- **Add legal pages** (privacy policy, terms) if you are collecting enquiries — and confirm the medical disclaimer in the footer matches your regulator's wording.
