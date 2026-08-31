import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dermfit.example.com"),
  title: {
    default: `${site.name} ${site.byline} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  // The site still carries placeholder clinical content — invented colleagues,
  // testimonials and unreviewed articles published under a real doctor's name.
  // Search engines are kept out until that is replaced. Set
  // NEXT_PUBLIC_ALLOW_INDEXING=true in the Netlify environment to go live.
  robots:
    process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true"
      ? undefined
      : { index: false, follow: false },
  openGraph: {
    title: `${site.name} ${site.byline} — ${site.tagline}`,
    description: site.description,
    type: "website",
    images: [{ url: "/logo.png", width: 4689, height: 4689 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Browser extensions (QuillBot, Grammarly, password managers) inject attributes
    // onto <html> before React hydrates; suppressHydrationWarning ignores that diff.
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable}`}
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
