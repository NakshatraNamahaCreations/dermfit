import Link from "next/link";
import type { Service } from "@/data/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-card border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/5"
    >
      <span className="w-fit rounded-full bg-brand-50 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-brand-700">
        {service.category}
      </span>
      <h3 className="mt-4 font-display text-xl font-semibold text-brand-950">
        {service.title}
      </h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{service.summary}</p>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
        <span>
          {service.duration} · {service.sessions}
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-brand-700">
          Details
          <svg
            width="12"
            height="12"
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
  );
}
