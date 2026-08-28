/**
 * The clinic's full treatment catalogue, as supplied by Dermfit.
 *
 * Treatment names are the clinic's own wording (only capitalisation and
 * spacing were normalised). The one-line `blurb` under each division is
 * descriptive filler — review and reword it in the clinic's own voice.
 */
export type Division = {
  slug: string;
  number: string;
  title: string;
  blurb: string;
  icon: "clinical" | "aesthetic" | "hair" | "body" | "laser" | "regenerative";
  treatments: string[];
};

export const divisions: Division[] = [
  {
    slug: "clinical-dermatology",
    number: "01",
    title: "Clinical Dermatology",
    blurb:
      "Medical diagnosis and treatment of conditions affecting the skin, hair and nails.",
    icon: "clinical",
    treatments: [
      "Acne & Acne Scars",
      "Pigmentation & Melasma",
      "Eczema & Dermatitis",
      "Psoriasis",
      "Fungal & Bacterial Skin Infections",
      "Allergic Skin Conditions",
      "Vitiligo",
      "Warts, DPNs & Skin Tags",
      "Rosacea",
      "Hair & Nail Disorders",
      "Pediatric Dermatology",
      "Mole & Skin Lesion Evaluation",
    ],
  },
  {
    slug: "aesthetic-dermatology",
    number: "02",
    title: "Aesthetic Dermatology",
    blurb:
      "Procedures that refine skin texture, tone and volume, performed by a dermatologist.",
    icon: "aesthetic",
    treatments: [
      "Chemical Peels",
      "Microneedling",
      "Skin Boosters",
      "PRP / GFC",
      "Botulinum Toxin",
      "Dermal Fillers",
      "Threads",
      "Mesotherapy",
      "Hydrafacial / Medical Facials",
      "Laser Skin Rejuvenation",
      "Acne Scar Treatments",
      "Open Pores & Skin Texture",
      "Anti-Ageing Treatments",
      "Pigmentation & Tan Reduction",
    ],
  },
  {
    slug: "trichology-hair-restoration",
    number: "03",
    title: "Trichology & Hair Restoration",
    blurb:
      "Diagnosis-led management of hair and scalp disorders, through to transplantation.",
    icon: "hair",
    treatments: [
      "Hair Fall Evaluation",
      "Male & Female Pattern Hair Loss",
      "PRP / GFC for Hair",
      "Mesotherapy",
      "Seborrhoeic Dermatitis (Dandruff)",
      "Alopecia Areata",
      "Premature Greying",
      "Hair Transplantation",
      "Post-Hair-Transplant Care",
    ],
  },
  {
    slug: "body-contouring-skin-wellness",
    number: "04",
    title: "Body Contouring & Skin Wellness",
    blurb:
      "Non-surgical body treatments and the skin concerns that accompany weight change.",
    icon: "body",
    treatments: [
      "GLP-1 Agonist",
      "HIFU",
      "Fat Reduction",
      "Cellulite Reduction",
      "Skin Tightening",
      "Stretch Mark Treatments",
      "Body Pigmentation",
      "Excessive Sweating",
      "Weight-Loss-Related Skin Concerns",
      "Post-Weight-Loss Skin Management",
    ],
  },
  {
    slug: "lasers-advanced-procedures",
    number: "05",
    title: "Lasers & Advanced Procedures",
    blurb:
      "Laser and energy-based platforms selected and calibrated to your skin type.",
    icon: "laser",
    treatments: [
      "Laser Hair Reduction",
      "CO₂ Laser Treatments",
      "Pigmentation Lasers",
      "Vascular Lesion Treatments",
      "Tattoo Removal",
      "Skin Resurfacing",
      "Scar Revision",
      "Mole / Skin Lesion Removal",
      "Advanced Skin Rejuvenation",
    ],
  },
  {
    slug: "advanced-regenerative",
    number: "06",
    title: "Advanced Regenerative Procedures",
    blurb:
      "Newer regenerative therapies that work with the skin's own repair mechanisms.",
    icon: "regenerative",
    treatments: [
      // NOTE: the supplied list had both "Autologous exosomes" and "Exosomes".
      // Kept as two entries — confirm whether these are distinct offerings.
      "Autologous Exosomes",
      "Polynucleotides / PDRN",
      "Exosomes",
      "FSCT",
      "Nanofat-Based Treatment",
      "Regenerative Wound Care",
      "Scar Regeneration",
    ],
  },
];

export const treatmentCount = divisions.reduce(
  (n, d) => n + d.treatments.length,
  0,
);
