import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { organisationGraph, pageMetadata } from "@/lib/seo";
import WelcomeIntro from "@/components/WelcomeIntro";
import MeetTheDoctor from "@/components/MeetTheDoctor";
import ServicesGrid from "@/components/ServicesGrid";
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
      "DermFit is a dermatologist-led skin, hair and aesthetic clinic in Yadavgiri, Mysuru, led by Dr Sourab S. Hegde (MBBS, MD Dermatology). Acne, pigmentation, acne scars, hair loss, ageing skin, eczema and psoriasis — personalised, evidence-based care.",
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

      {/* 1. The clinic's own introduction */}
      <WelcomeIntro />

      {/* 2. The doctor behind it */}
      <MeetTheDoctor />

      {/* 3. Our services */}
      <ServicesGrid />

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
