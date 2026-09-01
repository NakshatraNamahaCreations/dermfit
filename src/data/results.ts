/**
 * Before / after comparisons for the results band.
 *
 * IMPORTANT — these are NOT patient records. Both pairs are cut from the same
 * illustrative composites used on the home banner, and the section says so on
 * the page, in text, next to them.
 *
 * Real patient comparisons carry obligations here that stock imagery does not:
 * written consent for publication, images shot under matched lighting and
 * angle, and — under the Drugs and Magic Remedies Act and the ASCI code — no
 * implied guarantee of outcome. When the clinic has consented, matched pairs,
 * they replace `before` and `after` and the `illustrative` flag comes off,
 * which is what removes the disclaimer.
 */
export type ResultCase = {
  id: string;
  /** What the patient came in for, in their own words. */
  concern: string;
  headline: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  /** Describes what the two frames show — not a promise about anyone else. */
  summary: string;
  /** Reads across to the concern page rather than to a treatment sales page. */
  href: string;
};

/** Off only when every pair below is a consented patient record. */
export const resultsAreIllustrative = true;

export const results: ResultCase[] = [
  {
    id: "hair",
    concern: "Hair fall & thinning",
    headline: "Density at the crown",
    before: "/result-hair-before.jpg",
    after: "/result-hair-after.jpg",
    beforeAlt:
      "The crown of a head seen from above, with scalp visible through thinned hair.",
    afterAlt: "The same crown from the same angle, with the scalp covered by denser hair.",
    summary:
      "Scalp showing through at the vertex, against fuller cover from the same angle. What is achievable depends on the cause and the stage — trichoscopy and bloods establish both before anything is offered.",
    href: "/concerns#hair-fall",
  },
  {
    id: "acne",
    concern: "Acne & acne marks",
    headline: "Active acne and the marks it leaves",
    before: "/result-skin-before.jpg",
    after: "/result-skin-after.jpg",
    beforeAlt:
      "A face turned to three-quarters, with active acne and post-inflammatory marks across the cheek and jaw.",
    afterAlt: "The same face at the same angle, with clear skin and an even tone.",
    summary:
      "Active lesions and post-inflammatory pigmentation, against clear skin at the same angle. Marks and scars behave differently — which of yours will respond is established at examination.",
    href: "/concerns#acne",
  },
];
