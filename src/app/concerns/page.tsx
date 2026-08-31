import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ConcernGrid from "@/components/ConcernGrid";
import CarePathway from "@/components/CarePathway";

export const metadata: Metadata = {
  title: "Concerns",
  description:
    "Start from what you have noticed. How Dermfit works up pigmentation, acne, acne marks, hair fall and other common concerns before any treatment is proposed.",
};

export default function ConcernsPage() {
  return (
    <>
      <PageHero
        eyebrow="Start here"
        title="Come in with the concern"
        lead="You do not need to arrive knowing which condition you have or which treatment you want. These are the things people most often notice — and what the first appointment does about each one."
      />
      <ConcernGrid />
      <CarePathway />
    </>
  );
}
