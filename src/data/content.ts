export type Doctor = {
  name: string;
  initials: string;
  role: string;
  credentials: string;
  bio: string;
  /** Portrait, ideally 3:4. Drop a file in public/ and set it here (e.g.
   *  "/dr-hegde.jpg"). Without one the card falls back to a navy panel with
   *  the doctor's initials — never a stock model standing in for a real person. */
  photo?: string;
};

export const doctors: Doctor[] = [
  {
    name: "Dr. Sourab S Hegde",
    initials: "SH",
    role: "Director & Chief Dermatologist",
    credentials: "MBBS, MD (Dermatology), 5CC Europe, FISHR",
    // The clinic's own biography, supplied 16/09.
    bio: "Dr. Sourab S Hegde is the Director and Chief Dermatologist at Dermfit clinic, Mysuru. A graduate of SDM Medical College, Dharwad (MBBS) and Sri Siddhartha Medical College, Tumkur (MD Dermatology), he brings over 5 years of clinical and aesthetic dermatology experience, holds an Advanced Aesthetics Fellowship certified by 5CC Europe and a fellowship in hair transplantation (FISHR), and is trained nationally and internationally in aesthetic dermatology, lasers and hair restoration.",
    // PLACEHOLDER PORTRAIT — a generated likeness supplied by the clinic, not a
    // photograph of Dr Hegde. Replace with his own before launch.
    photo: "/doctor-hegde.jpg",
  },
];

export const differentiators = [
  {
    title: "Diagnosis before treatment",
    body: "Every plan starts with imaging, scoring or lab work — never a package sold off a menu.",
  },
  {
    title: "Dermatologist-performed",
    body: "Procedures are carried out by qualified doctors, not delegated to technicians.",
  },
  {
    title: "Transparent pricing",
    body: "You get a written plan with per-session costs before anything is scheduled.",
  },
  {
    title: "Measured outcomes",
    body: "Standardised photography and severity scores so progress is visible, not claimed.",
  },
];

/**
 * Figures for the About page, all from the clinic's own biography of
 * Dr Hegde (supplied 16/09).
 *
 * The set that used to live here — "12+ years", "18k consultations", "4.9
 * average rating" — was invented, and under the ASCI code those are exactly
 * the claims a clinic is held to prove. The set before that counted divisions
 * and treatments, which was true but said nothing about the doctor. "5+" is
 * the clinic's own figure, not a rounding of one.
 */
export const stats = [
  { value: "5+", label: "Years in practice" },
  { value: "MD", label: "Dermatology" },
  { value: "5CC", label: "Europe fellowship" },
  { value: "FISHR", label: "Hair transplantation" },
];
export const testimonials = [
  {
    quote:
      "I had been through three clinics for melasma before Dermfit. This is the first place that explained why it kept coming back instead of just selling me another peel package.",
    name: "Priya S.",
    treatment: "Pigmentation & Melasma",
  },
  {
    quote:
      "The trichoscopy report made the difference. Turned out my shedding was thyroid-related, and it was sorted in four months without any expensive procedure.",
    name: "Rahul M.",
    treatment: "Hair Loss & Regrowth",
  },
  {
    quote:
      "Six sessions in and my acne is genuinely under control. What I appreciated most was being told upfront which scars would improve and which would not.",
    name: "Nikita B.",
    treatment: "Acne & Acne Scar Treatment",
  },
];

export const faqs = [
  {
    q: "Do I need a referral to book a consultation?",
    a: "No. You can book directly through the form on this site or by calling the clinic. We will ask about your concern in advance so Dr Hegde has your history before you sit down.",
  },
  {
    q: "How long is a first consultation?",
    a: "Plan for 30 to 40 minutes. That includes examination, any imaging needed, and time to walk through your options and costs before you commit to anything.",
  },
  {
    q: "Are the treatments safe for deeper skin tones?",
    a: "Yes. Our laser platforms and chemical peel protocols are selected specifically for Fitzpatrick types III to V, and settings are adjusted after a patch test.",
  },
  {
    q: "Will I need to keep coming back forever?",
    a: "It depends on the condition. Acne and hair loss usually reach a stable maintenance phase. Chronic conditions such as melasma, eczema and psoriasis need ongoing management, which we will tell you at the outset.",
  },
  {
    q: "Do you offer online follow-ups?",
    a: "Follow-up reviews that do not require a procedure can be done over video. The initial consultation must be in person so we can examine your skin properly.",
  },
];
