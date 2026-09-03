import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { organisationGraph, pageMetadata } from "@/lib/seo";
import MeetTheDoctor from "@/components/MeetTheDoctor";
import WhyChooseUs from "@/components/WhyChooseUs";
import DivisionRow from "@/components/DivisionRow";
import AboutIntro from "@/components/AboutIntro";
import MissionVision from "@/components/MissionVision";
import ConcernGrid from "@/components/ConcernGrid";
import ResultsBand from "@/components/ResultsBand";
import PatientStories from "@/components/PatientStories";
import BookingSection from "@/components/BookingSection";

/**
 * The home page carries the whole organisation graph — clinic, doctor and
 * website — because it is the page every other one links back to, and Google
 * resolves the @id references from here.
 */
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Dermatologist in Mysuru",
    description:
      "Dermfit is a doctor-led dermatology clinic in Yadavgiri, Mysuru. Dr Sourab Hegde (MBBS, MD) treats pigmentation, melasma, acne, acne marks and hair fall — diagnosis first, written plans, costs up front.",
    path: "/",
  }),
  // Absolute, so the home page is not "Dermatologist in Mysuru · Dermfit
  // Mysuru" with the city twice.
  title: { absolute: `Dermatologist in Mysuru | Dermfit — Dr Sourab Hegde` },
};

export default function Home() {
  return (
    <>
      <JsonLd data={organisationGraph} />

      {/* 1. Doctor Hero Section */}
      <MeetTheDoctor />

      {/* 2. Why Choose Us / Clinical Pillars */}
      <WhyChooseUs />

      {/* 3. Clinical Services / Specialized Divisions */}
      <DivisionRow />

      {/* 4. About the Clinic Introduction */}
      <AboutIntro />

      {/* 5. Mission, Vision & Goals */}
      <MissionVision />

      {/* 6. Concerns Treated */}
      <ConcernGrid limit={4} />

      {/* 7. Clinical Results & Proof */}
      <ResultsBand />

      {/* 8. Verified Patient Testimonials */}
      <PatientStories />

      {/* 9. Direct Appointment Booking */}
      <BookingSection />
    </>
  );
}
