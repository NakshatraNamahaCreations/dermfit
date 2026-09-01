import HairBanner from "@/components/HairBanner";
import ConcernGrid from "@/components/ConcernGrid";
import DivisionRow from "@/components/DivisionRow";
import CarePathway from "@/components/CarePathway";
import PatientStories from "@/components/PatientStories";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      {/* Concern -> what we treat -> how care runs -> proof -> book.
          Deliberately short: the journal and the signup band live on their own
          pages rather than lengthening the home page. */}
      <HairBanner />

      <ConcernGrid limit={4} />

      <DivisionRow />

      <CarePathway />

      <PatientStories />

      <CTA />
    </>
  );
}
