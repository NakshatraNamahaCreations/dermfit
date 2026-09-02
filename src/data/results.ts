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

/**
 * Two cases here, not four: with the closing panel they fill the row exactly.
 * Every pair is on the concern cards as well, so nothing is lost by trimming.
 */

/** Off only when every pair below is a consented patient record. */
export const resultsAreIllustrative = true;

export const results: ResultCase[] = [
  {
    id: "pigmentation",
    concern: "Pigmentation & melasma",
    headline: "Dark patches and uneven tone",
    before: "/result-pigmentation-before.jpg",
    after: "/result-pigmentation-after.jpg",
    beforeAlt:
      "A cheek in three-quarter view with dark patches and an uneven tone across it.",
    afterAlt: "The same cheek at the same angle, with an even tone and the patches faded.",
    summary:
      "Patches and mottled tone across the cheek, against an even tone from the same angle. Whether the pigment sits in the epidermis, the dermis or both is what decides how far it will move — a lamp assessment settles that first.",
    href: "/concerns#pigmentation",
  },
  {
    id: "acne",
    concern: "Acne & acne marks",
    headline: "Breakouts that keep coming back",
    before: "/result-skin-before.jpg",
    after: "/result-skin-after.jpg",
    beforeAlt:
      "A cheek in three-quarter view with active acne, redness and uneven texture.",
    afterAlt: "The same cheek at the same angle, clear and calm.",
    summary:
      "Active lesions, redness and uneven texture, against calm skin from the same angle. Grading the acne and reading its pattern and timing comes before anything is prescribed.",
    href: "/concerns#acne",
  },
];
