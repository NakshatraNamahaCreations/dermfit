/**
 * The clinical pathway. This is the spine of the site: a patient arrives with a
 * concern and leaves with a measured outcome, and every stage between is named.
 *
 * Deliberately not a treatment menu — the treatment is one stage of seven.
 */
export const pathway = [
  {
    stage: "Concern",
    title: "You tell us what you have noticed",
    body: "Not a procedure name. What changed, when it started, what makes it worse, and what you have already tried.",
  },
  {
    stage: "Examination",
    title: "Clinical examination",
    body: "Dermoscopy, trichoscopy or a lamp assessment as the concern requires, plus blood work where it is indicated.",
  },
  {
    stage: "Diagnosis",
    title: "A named diagnosis",
    body: "What the condition actually is, explained in plain language — including when it is not what you had assumed.",
  },
  {
    stage: "Plan",
    title: "A written treatment plan",
    body: "Options, expected sessions and spacing, what will improve and what will not, and cost per session rather than a package.",
  },
  {
    stage: "Treatment",
    title: "Treatment by a dermatologist",
    body: "Procedures are carried out by a qualified doctor. Nothing is delegated to a technician.",
  },
  {
    stage: "Follow-up",
    title: "Scheduled review",
    body: "Reviews are booked in from the start, and the protocol is adjusted on what the skin actually does.",
  },
  {
    stage: "Outcome",
    title: "A measured outcome",
    body: "Standardised photography and severity scores, so progress is something you can see rather than something we claim.",
  },
];
