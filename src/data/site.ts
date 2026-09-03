export const site = {
  name: "Dermfit",
  /**
   * Canonical origin. Every absolute URL on the site is built from this — the
   * canonical tags, the sitemap, the Open Graph images and the structured data
   * — so a wrong value here silently points search engines at the wrong host.
   *
   * Set NEXT_PUBLIC_SITE_URL in the Vercel project when the clinic's own
   * domain is live; the Vercel address is the fallback, not the target.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dermfit.vercel.app").replace(
    /\/$/,
    "",
  ),
  tagline: "Skin · Hair · Aesthetics",
  byline: "by Dr Sourab Hegde",
  kind: "Dermatology Clinic",
  description:
    "Dermfit is a dermatology clinic led by Dr Sourab Hegde, offering evidence-based skin, hair and aesthetic treatments.",
  /** Primary number — used wherever a single number is shown. */
  phone: "+91 95134 93467",
  phoneHref: "tel:+919513493467",
  /** Both clinic numbers, for the contact page and footer. */
  phones: [
    { display: "+91 95134 93467", href: "tel:+919513493467" },
    { display: "+91 82172 04087", href: "tel:+918217204087" },
  ],
  // PLACEHOLDER — the clinic's real address is set below, but this email
  // is still invented. Replace before launch.
  email: "hello@dermfit.com",
  whatsapp: "https://wa.me/919513493467",
  address: {
    line1: "Dermfit Clinic, Avyuktha Edge, 1st Floor",
    line2: "Opposite Brahmakumaris Samaj, Near Akashvani Circle",
    line3: "Yadavgiri, Mysuru 570020",
  },
  city: "Mysuru",
  hours: [
    { days: "Monday – Friday", time: "10:00 AM – 8:00 PM" },
    { days: "Saturday", time: "10:00 AM – 5:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  /** Locality and region, for the local-business structured data. */
  locality: "Mysuru",
  region: "Karnataka",
  postalCode: "570020",
  country: "IN",
  /**
   * Opening hours in the machine format schema.org wants. Kept beside the
   * human-readable `hours` above; if one changes, change both.
   *
   * PLACEHOLDER — like `hours`, these were not supplied by the clinic.
   */
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "20:00" },
    { days: ["Saturday"], opens: "10:00", closes: "17:00" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Concerns", href: "/concerns" },
  { label: "Treatments", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
