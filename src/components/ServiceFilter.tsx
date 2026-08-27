"use client";

import { useMemo, useState } from "react";
import { categories, services } from "@/data/services";
import ServiceCard from "./ServiceCard";

export default function ServiceFilter() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const shown = useMemo(
    () => (active === "All" ? services : services.filter((s) => s.category === active)),
    [active],
  );

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter treatments">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === c
                ? "bg-brand-900 text-gold-200"
                : "border border-line bg-surface text-muted hover:border-gold-300 hover:text-brand-900"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
    </>
  );
}
