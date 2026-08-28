export type Slide = {
  id: string;
  eyebrow: string;
  /** Kept short — this renders very large. Two words is the sweet spot. */
  title: string;
  titleAccent: string;
  /** Small uppercase lines under the headline. Two is ideal. */
  lines: string[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  /** Card floating over the right of the banner. Hidden below lg. */
  card?: { tag: string; title: string; body: string; href: string; cta: string };
  /**
   * Banner artwork: wide (roughly 2:1), subject on the RIGHT, open space on
   * the LEFT — the headline sits over that space. Drop files in public/ and
   * point here. null renders the navy brand panel instead.
   */
  image: string | null;
};

export const slides: Slide[] = [
  {
    id: "healthy-skin",
    eyebrow: "Skin · Hair · Aesthetics",
    title: "HEALTHY SKIN,",
    titleAccent: "HONESTLY DONE.",
    lines: ["Diagnosis first.", "Treatment second."],
    primary: { label: "Book a consultation", href: "/contact" },
    secondary: { label: "Explore treatments", href: "/services" },
    card: {
      tag: "Most booked",
      title: "Acne & Acne Scar Programme",
      body: "Clear active breakouts, then remodel the scarring they leave behind.",
      href: "/services/acne-scar-treatment",
      cta: "See the protocol",
    },
    image: "/hero-1.jpg",
  },
  {
    id: "radiance",
    eyebrow: "Pigmentation & Melasma",
    title: "RADIANT SKIN,",
    titleAccent: "BACKED BY SCIENCE.",
    lines: ["Evidence-based dermatology.", "By Dr Sourab Hegde."],
    primary: { label: "Book a consultation", href: "/contact" },
    secondary: { label: "See pigmentation care", href: "/services/pigmentation-melasma" },
    card: {
      tag: "Chronic care",
      title: "Melasma, Managed Properly",
      body: "Stability over speed — built on priming and rigorous photoprotection.",
      href: "/services/pigmentation-melasma",
      cta: "How we treat it",
    },
    image: "/hero-2.jpg",
  },
  {
    id: "written-plan",
    eyebrow: "Transparent Care",
    title: "A WRITTEN PLAN,",
    titleAccent: "BEFORE YOU COMMIT.",
    lines: ["Clear costs up front.", "No pressure to book."],
    primary: { label: "Book a consultation", href: "/contact" },
    secondary: { label: "Why Dermfit", href: "/about" },
    image: null,
  },
];

/** Static trust strip along the bottom of the banner — not per-slide. */
export const heroFeatures = [
  { icon: "stethoscope", label: "Dermatologist-\nperformed" },
  { icon: "scan", label: "Diagnosis before\ntreatment" },
  { icon: "receipt", label: "Transparent\npricing" },
];

export const heroStat = { value: "18k+", label: "Consultations" };
