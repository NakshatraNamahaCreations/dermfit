import BlogSection from "@/components/BlogSection";
import HeroSlider from "@/components/HeroSlider";
import AboutShowcase from "@/components/AboutShowcase";
import NourishSection from "@/components/NourishSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import FirstVisit from "@/components/FirstVisit";
import PatientStories from "@/components/PatientStories";
import NewsletterBand from "@/components/NewsletterBand";
import FaqSection from "@/components/FaqSection";

export default function Home() {
  return (
    <>
      <HeroSlider />

      <AboutShowcase />

      <WhyChooseUs />

      <NourishSection />

      <FirstVisit />

      <PatientStories />

      <FaqSection />

      <BlogSection />

      <NewsletterBand />
    </>
  );
}
