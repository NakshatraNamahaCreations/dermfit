import BannerSlider from "@/components/BannerSlider";
import AboutIntro from "@/components/AboutIntro";
import MeetDoctors from "@/components/MeetDoctors";
import ConcernGrid from "@/components/ConcernGrid";
import DivisionRow from "@/components/DivisionRow";
import CarePathway from "@/components/CarePathway";
import ResultsBand from "@/components/ResultsBand";
import PatientStories from "@/components/PatientStories";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      {/* Who we are -> who treats you -> concern -> what we treat -> how care
          runs -> results -> proof -> book. Deliberately short: the journal and
          the signup band live on their own pages rather than lengthening the
          home page. */}
      <BannerSlider />

      <AboutIntro />

      <MeetDoctors />

      <ConcernGrid limit={4} />

      <DivisionRow />

      <CarePathway />

      <ResultsBand />

      <PatientStories />

      <CTA />
    </>
  );
}
