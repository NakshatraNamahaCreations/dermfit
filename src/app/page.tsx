import BannerSlider from "@/components/BannerSlider";
import AboutIntro from "@/components/AboutIntro";
import MeetDoctors from "@/components/MeetDoctors";
import ConcernGrid from "@/components/ConcernGrid";
import DivisionRow from "@/components/DivisionRow";
import ResultsBand from "@/components/ResultsBand";
import PatientStories from "@/components/PatientStories";
import BookingSection from "@/components/BookingSection";

export default function Home() {
  return (
    <>
      {/* Who we are -> who treats you -> concern -> what we treat -> results ->
          proof -> book. The form itself closes the page rather than a panel
          pointing at /contact, so nobody has to go looking for it.

          Deliberately short otherwise: the journal, the signup band and the
          seven-stage pathway live on their own pages. */}
      <BannerSlider />

      <AboutIntro />

      <MeetDoctors />

      <ConcernGrid limit={4} />

      <DivisionRow />

      <ResultsBand />

      <PatientStories />

      <BookingSection />
    </>
  );
}
