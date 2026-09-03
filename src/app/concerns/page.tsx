import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import ConcernGrid from "@/components/ConcernGrid";
import CarePathway from "@/components/CarePathway";

export const metadata: Metadata = pageMetadata({
  title: "Skin & Hair Concerns We Treat",
  description:
    "Pigmentation, melasma, acne, acne marks, hair fall and more — what each concern actually is, and how Dermfit works it up before any treatment is proposed. Dr Sourab Hegde, Yadavgiri, Mysuru.",
  path: "/concerns",
});

export default function ConcernsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Concerns", path: "/concerns" }])} />
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
