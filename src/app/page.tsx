import BannerSlider from "@/components/BannerSlider";
import AboutIntro from "@/components/AboutIntro";
import ConcernGrid from "@/components/ConcernGrid";
import DivisionRow from "@/components/DivisionRow";
import CarePathway from "@/components/CarePathway";
import PatientStories from "@/components/PatientStories";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      {/* Who we are -> concern -> what we treat -> how care runs -> proof ->
          book. Deliberately short: the journal and the signup band live on
          their own pages rather than lengthening the home page. */}
      <BannerSlider />

      <AboutIntro />

      <ConcernGrid limit={4} />

      <DivisionRow />

      <CarePathway />

      <PatientStories />

      <CTA />
    </>
  );
}
