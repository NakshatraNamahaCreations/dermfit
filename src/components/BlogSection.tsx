import Image from "next/image";
import Link from "next/link";
import { formatPostDate, posts } from "@/data/posts";
import Reveal from "./Reveal";

export default function BlogSection() {
  const [lead, ...rest] = posts.slice(0, 4);

  return (
    <section className="bg-surface py-20 sm:py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow">From the journal</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-brand-950 sm:text-5xl">
              Notes from <span className="text-gold-gradient">the clinic</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-gold-700 hover:underline"
          >
            All articles →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          {/* Lead article */}
          <Reveal from="left">
            <Link
              href={`/blog/${lead.slug}`}
              className="group block overflow-hidden rounded-[1.75rem] bg-canvas ring-1 ring-line transition-all hover:-translate-y-1 hover:ring-gold-300 hover:shadow-xl hover:shadow-brand-950/5"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={lead.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute left-5 top-5 rounded-full bg-brand-950/85 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-gold-300 backdrop-blur">
                  {lead.category}
                </span>
              </div>
              <div className="p-7 sm:p-8">
                <p className="flex items-center gap-2.5 text-xs text-muted">
                  <time dateTime={lead.date}>{formatPostDate(lead.date)}</time>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold-400" />
                  {lead.readingMinutes} min read
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-snug text-brand-950 sm:text-3xl">
                  {lead.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{lead.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
                  Read the article
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    <path
                      d="M2 6h8M6.5 2.5 10 6l-3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          </Reveal>

          {/* The rest, as a stacked list */}
          <div className="space-y-4">
            {rest.map((post, i) => (
              <Reveal key={post.slug} from="right" delay={i * 100}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex gap-5 rounded-[1.5rem] bg-canvas p-4 ring-1 ring-line transition-all hover:-translate-y-0.5 hover:ring-gold-300"
                >
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-32">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="128px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="min-w-0 py-1">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-gold-600">
                      {post.category}
                    </p>
                    <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-brand-950">
                      {post.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <p className="mt-2 text-[0.68rem] text-muted">
                      <time dateTime={post.date}>{formatPostDate(post.date)}</time> ·{" "}
                      {post.readingMinutes} min read
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
