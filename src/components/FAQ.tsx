import { faqs } from "@/data/content";

export default function FAQ() {
  return (
    <div className="mt-10 divide-y divide-line rounded-card border border-line bg-surface">
      {faqs.map((item) => (
        <details key={item.q} className="group px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-medium text-brand-950 [&::-webkit-details-marker]:hidden">
            {item.q}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="shrink-0 text-brand-600 transition-transform group-open:rotate-45"
            >
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </summary>
          <p className="pb-5 pr-8 text-sm leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
