import MeetTheDoctor from "@/components/MeetTheDoctor";
import WhyChooseUs from "@/components/WhyChooseUs";
import DivisionRow from "@/components/DivisionRow";
import AboutIntro from "@/components/AboutIntro";
import ConcernGrid from "@/components/ConcernGrid";
import ResultsBand from "@/components/ResultsBand";
import PatientStories from "@/components/PatientStories";
import BookingSection from "@/components/BookingSection";

export default function Home() {
  return (
    <>
      {/* 1. Doctor Hero Section */}
      <MeetTheDoctor />

      {/* 2. Why Choose Us / Clinical Pillars */}
      <WhyChooseUs />

      {/* 3. Clinical Services / Specialized Divisions */}
      <DivisionRow />

      {/* 4. About the Clinic Introduction */}
      <AboutIntro />

      {/* 5. Concerns Treated */}
      <ConcernGrid limit={4} />

      {/* 6. Clinical Results & Proof */}
      <ResultsBand />

      {/* 7. Verified Patient Testimonials */}
      <PatientStories />

      {/* 8. Direct Appointment Booking */}
      <BookingSection />
    </>
  );
}
