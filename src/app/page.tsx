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
      {/* Who treats you -> who we are -> concern -> what we treat -> proof ->
          book. The doctor opens the page, ahead of the clinic: this is a
          practice built round one dermatologist, and a visitor deciding whether
          to trust it is deciding about him. The form closes the page rather
          than a panel pointing at /contact, so nobody goes looking for it. */}
      <BannerSlider />

      <MeetTheDoctor />

      <AboutIntro />

      <ConcernGrid limit={4} />

      <DivisionRow />

      <ResultsBand />

      <PatientStories />

      <BookingSection />
    </>
  );
}
