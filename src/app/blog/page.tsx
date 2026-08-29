import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/Section";
import CTA from "@/components/CTA";
import { formatPostDate, posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from the Dermfit clinic on skin, hair and aesthetic treatment — what works, what does not, and what to ignore.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="From the journal"
        title="Notes from the clinic"
        lead="Plain explanations of the things patients ask about most — written to be useful whether or not you ever book with us."
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-card bg-surface ring-1 ring-line transition-all hover:-translate-y-1 hover:ring-gold-300 hover:shadow-xl hover:shadow-brand-950/5"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-brand-950/85 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold-300 backdrop-blur">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-xl font-semibold leading-snug text-brand-950">
                  {post.title}
                </h2>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <p className="mt-5 border-t border-line pt-4 text-xs text-muted">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time> ·{" "}
                  {post.readingMinutes} min read
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
