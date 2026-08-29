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

## Hero slider

The home page opens with a full-bleed carousel defined in `src/data/slides.ts`.
Each slide has an eyebrow, a two-part headline (the second half renders in gold),
two small uppercase lines, two buttons, and an optional card that floats over the
right of the banner.

Banner artwork should be **wide (about 2:1), with the subject on the right and
open space on the left** — the oversized headline sits over that space. Save
photos as **JPEG**, not PNG: the same image is ~90% smaller. Drop the file in
`public/` and point a slide's `image` at it. `image: null` renders the navy brand
panel instead, so the carousel works with however many photos you have.

`heroFeatures` and `heroStat` in the same file drive the trust strip along the
bottom of the banner; they are static, not per-slide. Icons live in
`src/components/HeroIcons.tsx`.

Autoplay is 7s, pauses on hover/focus, and is off for visitors who have "reduce
motion" enabled. Arrow keys, dot buttons and touch swipe all work.

## Logo

`public/logo.png` is the supplied artwork, byte-identical to the original file.
`public/logo-transparent.png` is what the site actually renders: the same lockup
with the flat navy backdrop turned into alpha and the empty margin trimmed, so it
can sit over the banner photography. Regenerate it with:

```bash
python make-logo-transparent.py
```

Nothing is cropped or recoloured — every element of the lockup is kept. The
favicons in `src/app/` stay on the navy square, which reads better in a browser
tab.

## About section image

`public/about-portrait.png` is the supplied artwork with its flat white page
removed, so the angled photo-card shape sits directly on the cream section
background. Regenerate from a new source with:

```bash
python make-about-cutout.py
```

It flood-fills the white inward from the borders only, so white *inside* the
photograph is preserved.

## Treatment catalogue

`src/data/catalogue.ts` holds the clinic's six divisions and all 61 treatments.
It drives two places: the division cards on the home page, and the interactive
tabbed catalogue at `/services#catalogue`. Add or rename a treatment there and
both update.

Two things in that file need the clinic's review:

- Each division's `blurb` is descriptive filler — reword in the clinic's voice.
- Division 06 lists both "Autologous Exosomes" and "Exosomes", as supplied.
  Confirm whether these are distinct offerings or a duplicate.

## Botanical statement section

A scroll-driven sequence. The section is `280vh` tall with a sticky
viewport-height frame, so scrolling scrubs a timeline: a large pale word sits on
a plain ground while objects pass in front of it — foliage slides in from the
left and right and holds, both drop away below, then the treatment photograph
rises from below to replace them. Timings are the `leafX` / `leafY` / `faceY`
expressions in `NourishSection.tsx`.

Cut-outs, all on transparency so nothing arrives as a rectangle:

- `public/leaf-left.png`, `public/leaf-right.png` — `make-leaf-cutout.py`,
  separating on greenness (works for foliage against a neutral wall)
- `public/ritual-face.png` — `make-face-cutout.py`; skin and backdrop overlap in
  colour, so that one fits a quadratic surface to the backdrop and uses
  saturation as a second gate

```bash
LEAF_SRC="photo.png" LEAF_OUT="public/leaf-left.png" python make-leaf-cutout.py
FACE_SRC="photo.png" python make-face-cutout.py
```

## Service orbit

`ServiceOrbit.tsx` arranges the six divisions on a hexagon around the clinic
mark and swings them in as you scroll. The ring rotates as one element and each
division counter-rotates by the same angle, so the group orbits while the labels
stay upright. Seat positions are rounded to fixed precision — raw trig produces
values like `32.999999999999986` that can serialise differently on the server
and trip a hydration mismatch.

## Journal covers

The site's photography is clinical and reusing it across the blog made every
card look alike, so the post covers are generated from the brand palette — one
composition per subject:

```bash
python make-post-covers.py
```

Writes `public/post-*.jpg`. Swap any of them for real photography by pointing a
post's `image` at a different file in `src/data/posts.ts`.

## Design tokens

The palette and fonts are defined once as Tailwind v4 `@theme` variables in `src/app/globals.css`: `brand-*` is the navy sampled from the logo (`brand-950` is its exact background, `#01122D`) and `gold-*` spans the logo's gold gradient, plus `ink` / `muted` / `line` / `surface` / `canvas`. Shared `.btn`, `.btn-gold`, `.btn-outline` and `.btn-ghost-light` classes live in the same file. Change the hex values there to rebrand the whole site.

## Before going live

- **Wire up the booking form.** `submitBooking` in `src/app/contact/actions.ts` currently validates and logs. Replace the `console.info` with a real destination (email via Resend/SendGrid, a CRM webhook, or a database) — it runs server-side, so credentials stay out of the browser.
- **Replace placeholder details** in `src/data/site.ts` (phone, email, address, social URLs) and the doctor profiles in `src/data/content.ts`.
- **Set the real domain** in `metadataBase` in `src/app/layout.tsx`.
- **Add a map embed** on the contact page — there is a placeholder block marked in `src/app/contact/page.tsx`.
- **Swap in real photography.** The site currently uses no raster images by design; hero and team sections are laid out to accept them.
- **Add legal pages** (privacy policy, terms) if you are collecting enquiries — and confirm the medical disclaimer in the footer matches your regulator's wording.
