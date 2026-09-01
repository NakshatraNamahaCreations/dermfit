import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import TreatmentCatalogue from "@/components/TreatmentCatalogue";
import DivisionRow from "@/components/DivisionRow";

export const metadata: Metadata = {
  title: "Treatments",
  description:
    "Skin, hair, laser and aesthetic treatments at Dermfit — each with a defined protocol, session count and measurable outcome.",
};

export default function ServicesPage() {
  return (
    <>
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
