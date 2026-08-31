/**
 * Patient concerns, in the words people actually arrive with.
 *
 * This is the site's front door: someone comes in with a problem, not with a
 * procedure name. Each concern names what is noticed, what the clinic does to
 * work out the cause, and which division it usually sits in.
 *
 * Clinical wording here should be reviewed by Dr Hegde before launch.
 */
export type Concern = {
  slug: string;
  /** What the patient notices, in their words. */
  title: string;
  /** The everyday description, not the diagnosis. */
  said: string;
  /** What the first appointment does about it. */
  workup: string;
  /** Division this usually belongs to. */
  division: string;
};

export const concerns: Concern[] = [
  {
    slug: "pigmentation",
    title: "Dark patches and uneven tone",
    said: "Patches across the cheeks or forehead that darken in the sun and never fully go.",
    workup:
      "Lamp assessment to establish whether the pigment sits in the epidermis, the dermis or both — which decides what can realistically be done.",
    division: "Clinical Dermatology",
  },
  {
    slug: "acne",
    title: "Breakouts that keep coming back",
    said: "Cycles of spots along the jaw and cheeks that clear and then return.",
    workup:
      "Grading of active lesions, and a look at the pattern and timing before anything is prescribed.",
    division: "Clinical Dermatology",
  },
  {
    slug: "acne-marks",
    title: "Marks and scars left behind",
    said: "The spots have gone but the brown marks and dents have stayed.",
    workup:
      "Distinguishing post-inflammatory pigmentation from true scarring, and scar type — they need different treatment and have different odds.",
    division: "Aesthetic Dermatology",
  },
  {
    slug: "hair-fall",
    title: "More hair falling than usual",
    said: "Hair in the shower and on the pillow, or a parting that looks wider.",
    workup:
      "Trichoscopy plus blood work, because shedding, pattern loss and deficiency look alike and are treated differently.",
    division: "Trichology & Hair Restoration",
  },
  {
    slug: "sensitive-skin",
    title: "Itching, flaring, sensitive skin",
    said: "Skin that reacts to most things and flares without an obvious trigger.",
    workup:
      "Severity scoring and a history of what sets it off, so flares and quiet periods can both be planned for.",
    division: "Clinical Dermatology",
  },
  {
    slug: "ageing",
    title: "Skin that looks tired or slack",
    said: "Lines, dullness, or a jawline that has softened.",
    workup:
      "An assessment of anatomy and movement rather than a menu of injectables — including whether anything is needed at all.",
    division: "Aesthetic Dermatology",
  },
  {
    slug: "unwanted-hair",
    title: "Unwanted facial or body hair",
    said: "Hair that needs constant threading, shaving or waxing.",
    workup:
      "A check for an underlying hormonal cause before laser is discussed, and a patch test for your skin type.",
    division: "Lasers & Advanced Procedures",
  },
  {
    slug: "white-patches",
    title: "White patches on the skin",
    said: "Pale areas that are spreading, or that appeared after an injury.",
    workup:
      "Examination to separate vitiligo from the several other causes of pale patches, which are managed quite differently.",
    division: "Clinical Dermatology",
  },
];
