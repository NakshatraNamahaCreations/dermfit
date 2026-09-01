import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

/**
 * Before/after hair banner, shown as the supplied artwork.
 *
 * The headline and feature labels are baked into the image, so the same words
 * are repeated in a screen-reader-only heading below — otherwise the page would
 * have no readable H1 for assistive tech or for search.
 *
 * The comparison is illustrative rather than a patient record, and says so:
 * a before/after on a clinic site otherwise reads as a documented outcome.
 */
export default function HairBanner() {
  return (
    <section className="bg-white">
      {/* The artwork is 2.5:1 and its type is part of the image, so it is shown
          whole rather than cropped — cropping would cut the words. */}
      <Image
        src="/banner-hair.jpg"
        alt="Before and after: thinning hair with a widening parting, and thicker hair with a denser parting. Transforming hair, restoring confidence — stronger roots, natural growth, thicker hair, healthy scalp."
        width={1983}
        height={793}
        priority
        sizes="100vw"
        className="h-auto w-full"
      />

      <div className="container-page pb-14 pt-8 text-center sm:pb-16">
        <h1 className="sr-only">
          Transforming hair, restoring confidence — hair loss treatment at {site.name},{" "}
          {site.city}
        </h1>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/concerns#hair-fall" className="btn btn-navy">
            Hair fall, explained
          </Link>
          <a href={site.phoneHref} className="btn btn-outline">
            {site.phone}
          </a>
        </div>

        <p className="mx-auto mt-7 max-w-xl text-[0.7rem] leading-relaxed text-muted">
          Illustrative images, not a patient record. Outcomes vary with the cause of hair
          loss, which is established at consultation.
        </p>
      </div>
    </section>
  );
}
