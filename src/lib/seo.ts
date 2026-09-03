import type { Metadata } from "next";
import { divisions, treatmentCount } from "@/data/catalogue";
import { doctors } from "@/data/content";
import { site } from "@/data/site";

/**
 * Everything the site needs to be found, in one place.
 *
 * TWO THINGS TO UNDERSTAND BEFORE CHANGING ANY OF THIS.
 *
 * 1. INDEXING IS STILL SWITCHED OFF, on purpose. The site carries placeholder
 *    clinical content — a profile and journal articles published under a real
 *    doctor's name that he has not read, invented opening hours and an invented
 *    email. Every tag below is correct and ready, but `robots` says noindex
 *    until NEXT_PUBLIC_ALLOW_INDEXING=true is set in the Vercel environment.
 *    That switch should be thrown by the clinic, after the content is theirs.
 *
 * 2. THE STRUCTURED DATA MUST STAY TRUE. Schema.org markup is a set of factual
 *    claims made to Google in a form it will repeat in search results, and for
 *    a medical practice it is held to the same standard as the page. So there
 *    is no aggregateRating (no verified reviews), no priceRange (no published
 *    prices), and no geo coordinates (nobody has confirmed the pin). Each of
 *    those helps rankings; none of them is worth asserting blind. Add them when
 *    the clinic supplies the real values.
 */

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** True only when the clinic has explicitly opened the site to search engines. */
export const indexingAllowed = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

/**
 * Page metadata with the canonical, Open Graph and Twitter tags filled in from
 * one description, so no page can end up with a canonical pointing at another.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  image,
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const images = [{ url: absoluteUrl(image ?? "/og-default.png") }];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: "en_IN",
      type,
      images,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
      images,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Structured data                                                      */
/* ------------------------------------------------------------------ */

type Json = Record<string, unknown>;

const doctor = doctors[0];

/** Stable @id values, so the graph nodes can reference each other. */
export const ids = {
  clinic: absoluteUrl("/#clinic"),
  doctor: absoluteUrl("/#dr-sourab-hegde"),
  website: absoluteUrl("/#website"),
};

const postalAddress: Json = {
  "@type": "PostalAddress",
  streetAddress: `${site.address.line1}, ${site.address.line2}`,
  addressLocality: site.locality,
  addressRegion: site.region,
  postalCode: site.postalCode,
  addressCountry: site.country,
};

/**
 * The doctor. `Physician` rather than `Person`: this is the entity Google shows
 * for "dermatologist in Mysuru", and it is the one the clinic is built on.
 */
export const physicianSchema: Json = {
  "@type": "Physician",
  "@id": ids.doctor,
  name: doctor.name,
  jobTitle: doctor.role,
  description: doctor.bio,
  medicalSpecialty: "Dermatology",
  // Qualifications the clinic supplied. Nothing inferred.
  hasCredential: ["MBBS", "MD (Dermatology)"].map((c) => ({
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    name: c,
  })),
  worksFor: { "@id": ids.clinic },
  address: postalAddress,
  telephone: site.phone,
  url: absoluteUrl("/about"),
};

/**
 * The clinic. `MedicalClinic` is a LocalBusiness, which is what puts the
 * address, hours and phone into the local pack.
 */
export const clinicSchema: Json = {
  "@type": "MedicalClinic",
  "@id": ids.clinic,
  name: `${site.name} — ${site.kind}`,
  alternateName: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: postalAddress,
  areaServed: { "@type": "City", name: site.city },
  medicalSpecialty: "Dermatology",
  founder: { "@id": ids.doctor },
  employee: { "@id": ids.doctor },
  currenciesAccepted: "INR",
  openingHoursSpecification: site.openingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  // The six divisions, so the services are machine-readable rather than only
  // being words in a heading.
  availableService: divisions.map((d) => ({
    "@type": "MedicalProcedure",
    name: d.title,
    url: absoluteUrl("/services"),
  })),
  // NO aggregateRating and NO priceRange here — see the note at the top.
};

export const websiteSchema: Json = {
  "@type": "WebSite",
  "@id": ids.website,
  url: site.url,
  name: site.name,
  inLanguage: "en-IN",
  publisher: { "@id": ids.clinic },
};

/** The clinic + doctor + site graph. Rendered once, on the home page. */
export const organisationGraph = {
  "@context": "https://schema.org",
  "@graph": [clinicSchema, physicianSchema, websiteSchema],
};

/** Breadcrumbs for an inner page. Google renders these under the result. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** A journal article, attributed to the clinic rather than to the doctor. */
export function articleSchema(post: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    datePublished: post.date,
    dateModified: post.date,
    image: absoluteUrl(post.image),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    // Attributed to the clinic, not to Dr Hegde. These are placeholder
    // articles he has not reviewed; putting a named physician in the `author`
    // field would tell Google a doctor wrote something he did not.
    author: { "@id": ids.clinic },
    publisher: { "@id": ids.clinic },
  };
}

/** FAQ markup, which Google can show as expandable questions in the result. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Used in the treatments page copy and metadata, so the number cannot drift. */
export const catalogueSize = { divisions: divisions.length, treatments: treatmentCount };
