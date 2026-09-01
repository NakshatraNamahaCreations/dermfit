/**
 * Banner slides.
 *
 * Each is a supplied before/after composite with an empty centre, so the
 * headline and feature labels can be real text sitting in that gap rather than
 * type baked into a JPEG.
 *
 * The comparisons are illustrative rather than patient records — the banner
 * says so beneath them.
 */
export type Banner = {
  id: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  strapline: string;
  /** Two words: the second takes the gold. */
  headline: [string, string];
  features: { icon: string; label: [string, string] }[];
  /** Sampled from the artwork's top and bottom edges, so the padding around it
   *  blends instead of showing a band. */
  edge: { top: string; bottom: string };
  cta: { label: string; href: string };
};

export const banners: Banner[] = [
  {
    id: "hair",
    image: "/banner-hair.jpg",
    width: 1983,
    height: 793,
    alt: "Before and after: thinning hair with a widening parting, and thicker hair with a denser parting.",
    edge: { top: "#fefefe", bottom: "#fcfcfc" },
    strapline: "Transforming hair.",
    headline: ["Restoring", "confidence."],
    features: [
      { icon: "roots", label: ["Stronger", "roots"] },
      { icon: "growth", label: ["Natural", "growth"] },
      { icon: "thickness", label: ["Thicker", "hair"] },
      { icon: "scalp", label: ["Healthy", "scalp"] },
    ],
    cta: { label: "Hair fall, explained", href: "/concerns#hair-fall" },
  },
  {
    id: "skin",
    image: "/banner-skin.jpg",
    width: 1855,
    height: 848,
    alt: "Before and after: skin with active acne and marks, and calmer skin with a more even tone.",
    edge: { top: "#fefefe", bottom: "#f5f5f5" },
    strapline: "Treating acne.",
    headline: ["Restoring", "skin."],
    features: [
      { icon: "calm", label: ["Fewer", "breakouts"] },
      { icon: "tone", label: ["Even", "tone"] },
      { icon: "marks", label: ["Fading", "marks"] },
      { icon: "barrier", label: ["Healthy", "barrier"] },
    ],
    cta: { label: "Acne, explained", href: "/concerns#acne" },
  },
];
