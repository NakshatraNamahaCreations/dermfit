import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, catalogueSize, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import TreatmentCatalogue from "@/components/TreatmentCatalogue";
import DivisionRow from "@/components/DivisionRow";

export const metadata: Metadata = pageMetadata({
  title: "Skin, Hair & Laser Treatments",
  description: `${catalogueSize.treatments} dermatology treatments across ${catalogueSize.divisions} divisions at Dermfit, Mysuru — clinical dermatology, trichology, lasers, regenerative and aesthetic dermatology. Each with a defined protocol and session count.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Treatments", path: "/services" }])} />
      <PageHero
        eyebrow="Treatments"
        title="What we treat, and how"
        lead="Six divisions, and every treatment inside them."
      />
      <DivisionRow />
      <TreatmentCatalogue />
      <CTA />
    </>
  );
}
