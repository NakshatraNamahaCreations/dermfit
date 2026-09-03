import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { absoluteUrl } from "@/lib/seo";

/**
 * Served at /sitemap.xml and pointed at from /robots.txt.
 *
 * Priorities are relative, not absolute: the home page and the two pages a
 * patient actually converts on — concerns and contact — sit above the journal.
 * Articles carry their own publication date so a re-crawl is cheap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: { path: string; priority: number; frequency: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1, frequency: "weekly" },
    { path: "/concerns", priority: 0.9, frequency: "monthly" },
    { path: "/services", priority: 0.9, frequency: "monthly" },
    { path: "/contact", priority: 0.8, frequency: "monthly" },
    { path: "/about", priority: 0.7, frequency: "monthly" },
    { path: "/blog", priority: 0.6, frequency: "weekly" },
  ];

  return [
    ...pages.map((p) => ({
      url: absoluteUrl(p.path),
      lastModified: now,
      changeFrequency: p.frequency,
      priority: p.priority,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
