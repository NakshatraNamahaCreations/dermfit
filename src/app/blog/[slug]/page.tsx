import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import CTA from "@/components/CTA";
import { formatPostDate, getPost, posts } from "@/data/posts";
import { site } from "@/data/site";
import JsonLd from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    image: post.image,
    publishedTime: post.date,
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Journal", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <article>
        <header className="border-b border-line bg-surface">
          <div className="container-page py-14 sm:py-20">
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link href="/blog" className="hover:text-gold-700 hover:underline">
                Journal
              </Link>
              <span className="mx-2 text-line">/</span>
              <span className="text-brand-900">{post.category}</span>
            </nav>

            <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-brand-950 sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {post.excerpt}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.14em] text-muted">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time> ·{" "}
              {post.readingMinutes} min read
            </p>
          </div>
        </header>

        <div className="container-page">
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-card">
            <Image
              src={post.image}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 76rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <Section>
          <div className="mx-auto max-w-2xl">
            {post.body.map((para) => (
              <p key={para.slice(0, 40)} className="mt-6 text-base leading-[1.8] text-brand-900 first:mt-0">
                {para}
              </p>
            ))}

            <aside className="mt-12 rounded-card bg-canvas p-7 ring-1 ring-line">
              <p className="text-sm leading-relaxed text-muted">
                This article is general information, not medical advice, and cannot account
                for your individual case. If it applies to something you are dealing with,{" "}
                <Link href="/contact" className="font-semibold text-gold-700 hover:underline">
                  book a consultation
                </Link>{" "}
                or call{" "}
                <a href={site.phoneHref} className="font-semibold text-gold-700 hover:underline">
                  {site.phone}
                </a>
                .
              </p>
            </aside>
          </div>
        </Section>
      </article>

      <Section className="bg-surface">
        <h2 className="font-display text-2xl font-semibold text-brand-950">
          More from the journal
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-card bg-canvas ring-1 ring-line transition-all hover:-translate-y-1 hover:ring-gold-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-gold-600">
                  {p.category}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-brand-950">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
