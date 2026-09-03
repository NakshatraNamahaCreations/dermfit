import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/data/site";
import { absoluteUrl, indexingAllowed } from "@/lib/seo";
import "./globals.css";

// One family across the site. Poppins carries both roles: regular for body,
// the heavier weights for headings, which is simpler than pairing two faces.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

/**
 * Site-wide defaults. Per-page tags are built with `pageMetadata` in
 * src/lib/seo.ts, which fills the canonical, Open Graph and Twitter tags from
 * one description so no page can end up pointing at another.
 *
 * The title template puts the location in every tab and every search result:
 * "Skin, Hair & Laser Treatments · Dermfit Mysuru". Local intent is most of
 * what a clinic is searched with — "dermatologist near me", "skin doctor in
 * Mysuru" — and the title is the strongest place to answer it. It is kept
 * short deliberately: Google truncates a title around 60 characters, and a
 * keyword that falls off the end may as well not be there.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Dermatologist in ${site.city} | ${site.name} ${site.kind} — Dr Sourab Hegde`,
    template: `%s · ${site.name} ${site.city}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: `${site.name} ${site.kind}` }],
  creator: `${site.name} ${site.kind}`,
  publisher: `${site.name} ${site.kind}`,
  category: "Health",
  alternates: { canonical: absoluteUrl("/") },
  // The site still carries placeholder clinical content — a profile and
  // journal articles published under a real doctor's name that he has not
  // read, invented opening hours and an invented email. Search engines are
  // kept out until that is replaced. Set NEXT_PUBLIC_ALLOW_INDEXING=true in
  // the Vercel environment to go live; /robots.txt follows the same switch.
  robots: indexingAllowed
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false },
  openGraph: {
    title: `Dermatologist in ${site.city} | ${site.name} — Dr Sourab Hegde`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — dermatology clinic in ${site.city}, by Dr Sourab Hegde`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Dermatologist in ${site.city} | ${site.name}`,
    description: site.description,
    images: ["/og-default.png"],
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: "#01122d",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Browser extensions (QuillBot, Grammarly, password managers) inject attributes
    // onto <html> before React hydrates; suppressHydrationWarning ignores that diff.
    <html
      lang="en"
      className={poppins.variable}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-950"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>
  );
}
