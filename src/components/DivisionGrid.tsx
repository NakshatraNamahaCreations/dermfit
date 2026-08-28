import Link from "next/link";
import { divisions } from "@/data/catalogue";
import DivisionIcon from "./DivisionIcon";
import Reveal from "./Reveal";

export default function DivisionGrid() {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {divisions.map((d, i) => (
        <Reveal key={d.slug} delay={i * 70}>
          <Link
            href="/services#catalogue"
            className="group flex h-full flex-col rounded-[1.75rem] border border-line bg-surface p-7 transition-all hover:-translate-y-1 hover:border-gold-300 hover:shadow-xl hover:shadow-brand-950/8"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-950 text-gold-300 transition-colors group-hover:bg-gold-400 group-hover:text-brand-950">
                <DivisionIcon name={d.icon} className="h-5.5 w-5.5" />
              </span>
              <span className="text-xs font-semibold tracking-[0.16em] text-gold-500">
                {d.number}
              </span>
            </div>

            <h3 className="mt-5 text-lg font-bold leading-snug tracking-[-0.02em] text-brand-950">
              {d.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{d.blurb}</p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {d.treatments.slice(0, 3).map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-gold-50 px-2.5 py-1 text-[0.7rem] font-medium text-gold-700"
                >
                  {t}
                </li>
              ))}
              {d.treatments.length > 3 && (
                <li className="rounded-full bg-brand-50 px-2.5 py-1 text-[0.7rem] font-medium text-brand-700">
                  +{d.treatments.length - 3} more
                </li>
              )}
            </ul>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
