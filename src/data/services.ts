export type Service = {
  slug: string;
  title: string;
  category: "Skin" | "Hair" | "Aesthetics" | "Laser";
  summary: string;
  duration: string;
  sessions: string;
  overview: string;
  goodFor: string[];
  process: { step: string; detail: string }[];
};

export const services: Service[] = [
  {
    slug: "acne-scar-treatment",
    title: "Acne & Acne Scar Treatment",
    category: "Skin",
    summary:
      "Medical-grade protocols that clear active breakouts and remodel the scars they leave behind.",
    duration: "30–45 min",
    sessions: "4–6 sessions",
    overview:
      "We treat acne in two phases: first calming active inflammation with topical and oral therapy tailored to your skin type, then resurfacing residual scarring with microneedling radiofrequency, subcision or fractional laser depending on the scar pattern.",
    goodFor: [
      "Persistent hormonal or inflammatory acne",
      "Boxcar, rolling and ice-pick scarring",
      "Post-inflammatory hyperpigmentation",
    ],
    process: [
      { step: "Skin analysis", detail: "Digital imaging and grading of active lesions and scar type." },
      { step: "Clearance phase", detail: "A prescription regimen to bring breakouts under control." },
      { step: "Resurfacing", detail: "Staged microneedling RF or fractional laser sessions." },
      { step: "Maintenance", detail: "A simplified home routine plus quarterly reviews." },
    ],
  },
  {
    slug: "pigmentation-melasma",
    title: "Pigmentation & Melasma",
    category: "Skin",
    summary:
      "Targeted depigmenting therapy for melasma, sun spots and uneven tone — without rebound darkening.",
    duration: "30 min",
    sessions: "6–8 sessions",
    overview:
      "Melasma is chronic and relapsing, so our approach prioritises stability over speed. We combine tyrosinase-inhibiting topicals, gentle chemical peels and low-fluence laser toning, all built on rigorous photoprotection.",
    goodFor: [
      "Melasma and hormonal pigmentation",
      "Sun-induced dark spots",
      "Uneven skin tone and dullness",
    ],
    process: [
      { step: "Lamp assessment", detail: "Determines whether pigment is epidermal, dermal or mixed." },
      { step: "Priming", detail: "Four weeks of topical therapy before any procedure." },
      { step: "In-clinic sessions", detail: "Peels or laser toning spaced 3–4 weeks apart." },
      { step: "Relapse control", detail: "Long-term maintenance to hold your result." },
    ],
  },
  {
    slug: "hair-loss-treatment",
    title: "Hair Loss & Regrowth",
    category: "Hair",
    summary:
      "Trichoscopy-led diagnosis with PRP, medical therapy and nutritional correction for real regrowth.",
    duration: "45 min",
    sessions: "6 sessions",
    overview:
      "Hair loss has many causes, and treating the wrong one wastes months. We start with trichoscopy and blood work to identify the pattern — androgenetic, telogen effluvium, or autoimmune — then build a protocol around that diagnosis.",
    goodFor: [
      "Male and female pattern baldness",
      "Post-illness or postpartum shedding",
      "Thinning crown and widening parting",
    ],
    process: [
      { step: "Trichoscopy", detail: "Magnified scalp imaging plus density and pull tests." },
      { step: "Lab work-up", detail: "Ferritin, thyroid, vitamin D and hormonal screening." },
      { step: "PRP therapy", detail: "Monthly platelet-rich plasma sessions into affected zones." },
      { step: "Review", detail: "Standardised photography at month 3 and month 6." },
    ],
  },
  {
    slug: "laser-hair-removal",
    title: "Laser Hair Removal",
    category: "Laser",
    summary:
      "Diode laser hair reduction calibrated for deeper skin tones, with contact cooling for comfort.",
    duration: "20–60 min",
    sessions: "6–8 sessions",
    overview:
      "Our 808nm diode platform is safe across Fitzpatrick types III–V. Sessions are spaced by hair-growth cycle rather than a fixed calendar, which is why our clients typically need fewer sittings than average.",
    goodFor: [
      "Unwanted facial and body hair",
      "Ingrown hairs and razor bumps",
      "PCOS-related hirsutism",
    ],
    process: [
      { step: "Patch test", detail: "A test spot 48 hours before your first full session." },
      { step: "Treatment", detail: "Cooled diode passes over the target area." },
      { step: "Aftercare", detail: "Soothing gel and sun-avoidance guidance." },
      { step: "Top-ups", detail: "Annual maintenance once your course is complete." },
    ],
  },
  {
    slug: "anti-ageing",
    title: "Anti-Ageing & Skin Tightening",
    category: "Aesthetics",
    summary:
      "Botulinum toxin, fillers and HIFU used conservatively — refreshed, never frozen.",
    duration: "30–60 min",
    sessions: "1–3 sessions",
    overview:
      "We plan anti-ageing treatment around facial anatomy rather than trends. That usually means small, well-placed volumes and a preference for gradual change you can stop at any point.",
    goodFor: [
      "Fine lines and dynamic wrinkles",
      "Volume loss in cheeks and temples",
      "Early jowling and skin laxity",
    ],
    process: [
      { step: "Facial mapping", detail: "A consult covering anatomy, movement and your goals." },
      { step: "Treatment plan", detail: "A staged plan with clear costs before anything is done." },
      { step: "Procedure", detail: "Performed in-clinic by a dermatologist, not a technician." },
      { step: "Two-week review", detail: "Refinement once the result has settled." },
    ],
  },
  {
    slug: "eczema-psoriasis",
    title: "Eczema & Psoriasis Care",
    category: "Skin",
    summary:
      "Long-term management of chronic inflammatory skin disease, including biologics where indicated.",
    duration: "30 min",
    sessions: "Ongoing",
    overview:
      "Chronic skin disease needs a plan for flares and a plan for the quiet periods. We provide both, along with access to phototherapy and modern systemic options for moderate-to-severe disease.",
    goodFor: [
      "Atopic dermatitis in adults and children",
      "Plaque and scalp psoriasis",
      "Chronic hand eczema",
    ],
    process: [
      { step: "Severity scoring", detail: "Objective baseline scoring so progress is measurable." },
      { step: "Flare protocol", detail: "A written plan you can act on the day symptoms start." },
      { step: "Maintenance", detail: "Barrier repair and proactive weekend therapy." },
      { step: "Escalation", detail: "Phototherapy or biologics if topical control is insufficient." },
    ],
  },
];

export const categories = ["All", "Skin", "Hair", "Laser", "Aesthetics"] as const;

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
