import type { MetadataRoute } from "next";
import { absoluteUrl, indexingAllowed } from "@/lib/seo";

/**
 * Served at /robots.txt.
 *
 * While the site still carries placeholder clinical content, this disallows
 * everything — and the noindex header in the root layout backs it up, because
 * robots.txt only asks a crawler not to fetch a page; it does not stop one
 * that has already found the URL from listing it. The two together do.
 *
 * Set NEXT_PUBLIC_ALLOW_INDEXING=true in the Vercel environment to open the
 * site, once the content on it is the clinic's own.
 */
export default function robots(): MetadataRoute.Robots {
  if (!indexingAllowed) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing useful for a crawler, and the form action is a POST target.
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
