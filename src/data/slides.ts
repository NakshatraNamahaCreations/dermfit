export type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  lines: string[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  /**
   * Banner artwork, 2:1, subject to the RIGHT and open space on the LEFT —
   * the copy sits over that space. Drop new files in public/ and reference
   * them here. Leave null to use the navy brand panel instead.
   */
  image: string | null;
  /** Only used when `image` is set: tints the scrim over the open space. */
  tone?: "light";
};

export const slides: Slide[] = [
  {
    id: "radiance",
    eyebrow: "Skin · Hair · Aesthetics",
    title: "Radiant Skin,",
    titleAccent: "Backed by Science.",
    lines: [
      "Evidence-based dermatology from Dr Sourab Hegde.",
      "Diagnosis first, treatment second — always.",
    ],
    primary: { label: "Book a consultation", href: "/contact" },
    secondary: { label: "Explore treatments", href: "/services" },
    image: "/b1.png",
    tone: "light",
  },
  {
    id: "hair",
    eyebrow: "Hair Restoration",
    title: "Real Regrowth,",
    titleAccent: "Not Guesswork.",
    lines: [
      "Trichoscopy and blood work before any procedure.",
      "PRP, medical therapy and nutritional correction.",
    ],
    primary: { label: "Book a consultation", href: "/contact" },
    secondary: { label: "See hair treatments", href: "/services/hair-loss-treatment" },
    image: null,
  },
  {
    id: "clarity",
    eyebrow: "Transparent Care",
    title: "A Written Plan,",
    titleAccent: "Before You Commit.",
    lines: [
      "Session counts, timelines and costs up front.",
      "Yours to keep, whether you treat with us or not.",
    ],
    primary: { label: "Book a consultation", href: "/contact" },
    secondary: { label: "Why Dermfit", href: "/about" },
    image: null,
  },
];
