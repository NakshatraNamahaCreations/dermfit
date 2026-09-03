import BannerSlider from "@/components/BannerSlider";
import AboutIntro from "@/components/AboutIntro";
import MeetTheDoctor from "@/components/MeetTheDoctor";
import ConcernGrid from "@/components/ConcernGrid";
import DivisionRow from "@/components/DivisionRow";
import PatientStories from "@/components/PatientStories";
import ResultsBand from "@/components/ResultsBand";
import BookingSection from "@/components/BookingSection";

export default function Home() {
  return (
    <>
      {/* Who we are -> who treats you -> concern -> what we treat -> proof ->
          book. Doctor-led order on purpose: the person doing the treating comes
          before the treatments. The form closes the page rather than a panel
          pointing at /contact, so nobody has to go looking for it. */}
      <BannerSlider />

      <AboutIntro />

      <MeetTheDoctor />

      <ConcernGrid limit={4} />

      <DivisionRow />

      <ResultsBand />

      <PatientStories />

      <BookingSection />
    </>
  );
}
