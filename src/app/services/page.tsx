import type { Metadata } from "next";
import { Section } from "@/components/Section";
import PageHero from "@/components/PageHero";
import ServiceFilter from "@/components/ServiceFilter";
import CTA from "@/components/CTA";
import TreatmentCatalogue from "@/components/TreatmentCatalogue";

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
        lead="Every programme below has a defined protocol, an expected number of sessions and a way to measure whether it is working. Filter by area to find yours."
      />
      <Section className="pt-10">
        <ServiceFilter />
      </Section>
      <TreatmentCatalogue />
      <CTA />
    </>
  );
}
