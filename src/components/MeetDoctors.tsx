import Image from "next/image";
import Link from "next/link";
import { doctors } from "@/data/content";
import { ClinicianPortrait, type ClinicianProps } from "./illustrations/Clinician";
import Reveal from "./Reveal";

/**
 * "Meet our doctors" band — photo above, name and qualifications below, in the
 * manner of the reference site.
 *
 * PORTRAITS ARE MISSING. Every card falls back to an illustrated stand-in,
 * because the only faces available here are stock models, and a stock model
 * under a named doctor shows patients a stranger's face as their consultant.
 * Set `photo` on the entry in data/content.ts — e.g. photo: "/dr-hegde.jpg",
 * a 4:5 portrait dropped in public/ — and the illustration gives way to the
 * photograph with no other change.
 *
 * Supply portraits at 4:5 (900 x 1125 is what the current three use). The slot
 * is 4:5 and covers, so anything squarer loses its sides and anything taller
 * loses its feet — crop to the subject before dropping the file in, not here.
 *
 * NOTE: only Dr Sourab Hegde is real. The other two entries in content.ts are
 * placeholders and must be replaced with the clinic's actual consultants, or
 * removed, before this goes live.
 */
/** Varied so a row of stand-ins does not read as the same person three times. */
const looks: ClinicianProps[] = [
  { tone: "mid", hair: "short", beard: true },
  { tone: "deep", hair: "bun" },
  { tone: "warm", hair: "long" },
];

export default function MeetDoctors() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-canvas py-16 sm:py-24">
      {/* Soft gold wash so the band separates from the white About block above */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-gold-50 to-transparent"
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Experts</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl">
            Meet our doctors
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-5 block h-px w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
          />
          <p className="mt-5 text-base leading-relaxed text-muted">
            You are seen by a qualified dermatologist at every visit — the consultation, the
            procedure and the follow-up. Nothing is delegated to a technician.
          </p>
        </div>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d, i) => (
            <Reveal key={d.name} delay={i * 110} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-surface ring-1 ring-line transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-950/10 hover:ring-gold-300">
                <div className="relative aspect-[4/5] overflow-hidden bg-brand-950">
                  {d.photo ? (
                    <Image
                      src={d.photo}
                      alt={d.name}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <ClinicianPortrait
                      {...looks[i % looks.length]}
                      className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  {/* Gold hairline along the join */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 text-center sm:p-7">
                  <h3 className="font-display text-lg font-semibold text-brand-950">
                    {d.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-gold-700">
                    {d.role}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{d.credentials}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{d.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/contact" className="btn btn-navy">
            Book a consultation
          </Link>
          <Link href="/about" className="btn btn-outline">
            About the clinic
          </Link>
        </div>
      </div>
    </section>
  );
}
