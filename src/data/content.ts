import { divisions, treatmentCount } from "./catalogue";

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
    name: "Dr. Sourab Hegde",
    initials: "SH",
    role: "Consultant Dermatologist · Founder",
    credentials: "MBBS, MD (Dermatology)",
    // PLACEHOLDER BIO — replace with Dr Hegde's actual credentials and background.
    bio: "Founder of Dermfit, practising across clinical dermatology, trichology and aesthetics with a focus on diagnosis-led treatment planning.",
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
 * Figures for the About page.
 *
 * Every one of these is either a qualification the clinic supplied or a number
 * counted from the catalogue in this repo, so none of them can drift or
 * overstate. The set that used to live here — "12+ years", "18k consultations",
 * "4.9 average rating" — was invented, and under the ASCI code those are
 * exactly the claims a clinic is held to prove.
 *
 * Real figures Dr Hegde is willing to stand behind can replace these.
 */
export const stats = [
  { value: "MBBS", label: "Medical degree" },
  { value: "MD", label: "Dermatology" },
  { value: String(divisions.length), label: "Clinical divisions" },
  { value: `${treatmentCount}+`, label: "Treatments offered" },
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
    a: "No. You can book directly through the form on this site or by calling the clinic. We will ask about your concern in advance so the right consultant sees you.",
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
