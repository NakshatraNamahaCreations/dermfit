import Image from "next/image";
import Link from "next/link";
import { divisions, treatmentCount } from "@/data/catalogue";
import { doctors } from "@/data/content";
import Reveal from "./Reveal";

/**
 * "Meet your doctor" — the founder's own section, built on the reference site's
 * layout: credentials at a glance, a short profile, four highlight boxes and a
 * portrait.
 *
 * WHAT IS NOT HERE, DELIBERATELY. The reference fills its four boxes with
 * "Gold Medalist", "10000+ Patients" and "3+ Years". Those are claims about a
 * real, named doctor, and inventing them would be a straightforward
 * misrepresentation — under the ASCI code and the Drugs and Magic Remedies Act
 * they are also exactly the sort of claim a clinic is held to. So two boxes
 * carry credentials the clinic gave us, and two carry figures counted from the
 * real catalogue.
 *
 * If Dr Hegde has awards, fellowships, a patient count or a number of years he
 * is willing to stand behind, they belong in `credentials` and `highlights`
 * below — the layout has room for them and nothing else needs to change.
 */

// PLACEHOLDER — this is the only profile copy on the site written without
// Dr Hegde's input. It says nothing that is not already implied by the
// catalogue and the clinic's stated position, but it should still be read and
// corrected by him before launch.
const profile = [
  "Dr Sourab Hegde is a consultant dermatologist and the founder of Dermfit, practising across clinical dermatology, trichology and aesthetic dermatology in Mysuru.",
  "His practice is diagnosis-led: the cause is established before a treatment is offered, and the plan is written down with its timelines and costs before anything is booked. A large part of the caseload is pigmentation, melasma, acne and the marks it leaves on Indian skin — conditions that behave differently here than the textbooks written elsewhere describe.",
];

/** Qualifications as supplied by the clinic. Add fellowships and memberships. */
const credentials = [
  "MBBS",
  "MD (Dermatology)",
  "Consultant Dermatologist",
  "Trichology",
  "Aesthetic Dermatology",
];

export default function MeetTheDoctor() {
  const doctor = doctors[0];

  const highlights = [
    { value: "MD", label: "Dermatology", note: "Postgraduate qualification" },
    { value: "MBBS", label: "Medical degree", note: "Registered practitioner" },
    // Counted, not asserted — these two cannot drift or overstate.
    { value: String(divisions.length), label: "Clinical divisions", note: "Skin, hair and aesthetics" },
    { value: `${treatmentCount}`, label: "Treatments offered", note: "Across the six divisions" },
  ];

  return (
    <section
      className="relative overflow-hidden bg-canvas py-16 sm:py-24"
      aria-labelledby="doctor-heading"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold-300/20 blur-3xl"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Portrait */}
          <Reveal from="left">
            <div className="relative mx-auto max-w-sm lg:mx-0 lg:max-w-none">
              <span
                aria-hidden="true"
                className="absolute -left-3 -top-3 h-24 w-24 rounded-tl-[1.5rem] border-l-2 border-t-2 border-gold-400"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 h-24 w-24 rounded-br-[1.5rem] border-b-2 border-r-2 border-gold-400"
              />

              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-brand-950 ring-1 ring-line">
                {doctor.photo && (
                  <Image
                    src={doctor.photo}
                    alt={doctor.name}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 24rem, 88vw"
                    className="object-cover object-top"
                  />
                )}
              </div>

              <div className="relative z-10 -mt-10 mx-6 rounded-[1.25rem] bg-brand-950 px-6 py-5 text-center text-white shadow-xl shadow-brand-950/20">
                <p className="font-display text-lg font-semibold">{doctor.name}</p>
                <p className="mt-1 text-xs text-gold-200">{doctor.credentials}</p>
              </div>
            </div>
          </Reveal>

          {/* Profile */}
          <Reveal from="right" delay={120}>
            <p className="eyebrow">Meet your doctor</p>
            <h2
              id="doctor-heading"
              className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-brand-950 sm:text-4xl"
            >
              Treated by a <span className="text-gold-gradient">dermatologist</span>,
              <br className="hidden sm:block" /> every visit
            </h2>

            <ul className="mt-6 flex flex-wrap gap-2">
              {credentials.map((c) => (
                <li
                  key={c}
                  className="rounded-full bg-surface px-3.5 py-1.5 text-xs font-medium text-brand-900 ring-1 ring-line"
                >
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              {profile.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <blockquote className="mt-7 border-l-2 border-gold-400 pl-5 text-base italic leading-relaxed text-brand-900">
              Every consultation and every procedure is carried out by a qualified
              dermatologist. Injectables and laser work are never delegated to a technician.
            </blockquote>

            <dl className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-2xl bg-surface p-4 text-center ring-1 ring-line transition-shadow hover:shadow-lg hover:shadow-brand-950/5"
                >
                  <dd className="font-display text-2xl font-semibold text-brand-950">
                    {h.value}
                  </dd>
                  <dt className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-gold-700">
                    {h.label}
                  </dt>
                  <p className="mt-1.5 text-[0.7rem] leading-snug text-muted">{h.note}</p>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-navy">
                Book with Dr Hegde
              </Link>
              <Link href="/about" className="btn btn-outline">
                About the clinic
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
