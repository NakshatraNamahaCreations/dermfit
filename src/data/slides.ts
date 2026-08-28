export type Slide = {
  id: string;
  /** Renders enormous. One short word per line is the intent. */
  title: string;
  titleAccent: string;
  /** Two short uppercase statements under the headline. */
  lines: string[];
  /** The reference layout carries a single outlined pill. */
  cta: { label: string; href: string };
  /** Card floating over the right of the banner. Hidden below lg. */
  card?: { tag: string; title: string; body: string; href: string; cta: string };
  /**
   * Banner artwork: wide (about 2:1), subject on the RIGHT, open space on the
   * LEFT — the headline sits over that space. null renders the navy panel.
   */
  image: string | null;
};

export const slides: Slide[] = [
  {
    id: "glow",
    title: "GLOW",
    titleAccent: "BETTER",
    lines: ["Healthy skin.", "Confident you."],
    cta: { label: "Explore Skincare", href: "/services" },
    card: {
      tag: "New at Dermfit",
      title: "Vitamin C Protocol",
      body: "Brighten, renew and protect for radiant skin.",
      href: "/services/pigmentation-melasma",
      cta: "Learn more",
    },
    image: "/hero-1.jpg",
  },
  {
    id: "radiance",
    title: "TREAT",
    titleAccent: "SMARTER",
    lines: ["Evidence first.", "Always."],
    cta: { label: "Explore Treatments", href: "/services" },
    card: {
      tag: "Most booked",
      title: "Acne & Scar Programme",
      body: "Clear breakouts, then remodel the scarring they leave behind.",
      href: "/services/acne-scar-treatment",
      cta: "See the protocol",
    },
    image: "/hero-2.jpg",
  },
  {
    id: "written-plan",
    title: "KNOW",
    titleAccent: "FIRST",
    lines: ["Clear costs.", "No pressure."],
    cta: { label: "Why Dermfit", href: "/about" },
    card: {
      tag: "Every consultation",
      title: "A Written Plan",
      body: "Options, timelines and per-session cost, yours to take away.",
      href: "/contact",
      cta: "Book a consult",
    },
    image: null,
  },
];

/** Static strip along the bottom of the banner — not per-slide. */
export const heroFeatures = [
  { icon: "leaf", label: "Clean\nIngredients" },
  { icon: "flask", label: "Dermatologist\nTested" },
  { icon: "droplet", label: "For All\nSkin Types" },
];

/**
 * PLACEHOLDER FIGURE — replace with a number the clinic can stand behind, or
 * delete the block entirely. Do not publish an invented patient count.
 */
export const heroStat = { value: "25K+", label: "Happy Customers" };
