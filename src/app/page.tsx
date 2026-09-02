import BannerSlider from "@/components/BannerSlider";
import AboutIntro from "@/components/AboutIntro";
import ConcernGrid from "@/components/ConcernGrid";
import DivisionRow from "@/components/DivisionRow";
import PatientStories from "@/components/PatientStories";
import ResultsBand from "@/components/ResultsBand";
import BookingSection from "@/components/BookingSection";

export default function Home() {
  return (
    <>
      {/* Who we are -> concern -> what we treat -> proof -> book. The form
          itself closes the page rather than a panel pointing at /contact, so
          nobody has to go looking for it.

          The concern cards and the results band draw on the same four pairs,
          so three of them appear twice on this page. Give results.ts its own
          cases and that goes away. Meet-our-doctors lives on /about. */}
      <BannerSlider />

      <AboutIntro />

      <ConcernGrid limit={4} />

      <DivisionRow />

      <ResultsBand />

      <PatientStories />

      <BookingSection />
    </>
  );
}
