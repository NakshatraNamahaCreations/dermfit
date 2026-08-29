import { faqs } from "@/data/content";

/**
 * Accordion built on <details>/<summary>, so it opens and closes without any
 * JavaScript and stays keyboard-accessible for free.
 */
export default function FAQ() {
  return (
    <div className="space-y-3">
      {faqs.map((item, i) => (
        <details
          key={item.q}
          className="group rounded-2xl bg-surface ring-1 ring-line transition-all open:ring-gold-300 open:shadow-lg open:shadow-brand-950/5 hover:ring-gold-200"
        >
          <summary className="flex cursor-pointer list-none items-center gap-4 p-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-display text-sm font-semibold text-gold-600 transition-colors group-open:text-gold-700">
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="flex-1 text-base font-medium leading-snug text-brand-950">
              {item.q}
            </span>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-canvas text-brand-900 transition-all group-open:bg-brand-950 group-open:text-gold-300 group-hover:bg-gold-50">
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-open:rotate-45"
              >
                <path
                  d="M8 3v10M3 8h10"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </summary>

          <p className="border-t border-line px-5 pb-5 pt-4 text-sm leading-relaxed text-muted sm:pl-14">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
