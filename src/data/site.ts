export const site = {
  name: "Dermfit",
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
