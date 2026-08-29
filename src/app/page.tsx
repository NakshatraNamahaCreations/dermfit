import { Section, SectionHeading } from "@/components/Section";
import BlogSection from "@/components/BlogSection";
import HeroSlider from "@/components/HeroSlider";
import AboutShowcase from "@/components/AboutShowcase";
import NourishSection from "@/components/NourishSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import FirstVisit from "@/components/FirstVisit";
import PatientStories from "@/components/PatientStories";
import NewsletterBand from "@/components/NewsletterBand";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <HeroSlider />

      <AboutShowcase />

      <WhyChooseUs />

      <NourishSection />

      <FirstVisit />

      <PatientStories />

      {/* FAQ */}
      <Section>
        <SectionHeading eyebrow="Questions" title="Before you book" align="center" />
        <div className="mx-auto max-w-3xl">
          <FAQ />
        </div>
      </Section>

      <BlogSection />

      <NewsletterBand />
    </>
  );
}
