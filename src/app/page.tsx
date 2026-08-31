import BlogSection from "@/components/BlogSection";
import ClinicalHero from "@/components/ClinicalHero";
import ConcernGrid from "@/components/ConcernGrid";
import CarePathway from "@/components/CarePathway";
import WhyChooseUs from "@/components/WhyChooseUs";
import DivisionRow from "@/components/DivisionRow";
import PatientStories from "@/components/PatientStories";
import NewsletterBand from "@/components/NewsletterBand";
import FaqSection from "@/components/FaqSection";

export default function Home() {
  return (
    <>
      {/* Concern -> examination -> diagnosis -> plan -> treatment -> follow-up
          -> outcome. The order of the page follows the order of care. */}
      <ClinicalHero />

      <ConcernGrid limit={4} />

      <CarePathway />

      <WhyChooseUs />

      <DivisionRow />

      <PatientStories />

      <FaqSection />

      <BlogSection />

      <NewsletterBand />
    </>
  );
}
