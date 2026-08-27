import Image from "next/image";
import { site } from "@/data/site";

/**
 * The clinic logo. The artwork is never redrawn or recoloured — `mark` and
 * `full` are just two framings of the supplied file, produced by crop-logo.py.
 * The untouched original stays at public/logo.png.
 *
 *  mark — the DF monogram alone; stays legible down to ~40px (header, icons)
 *  full — the complete lockup with the wordmark; needs ~180px+ (footer)
 */
export default function Logo({
  variant = "mark",
  className = "",
  size = 176,
  decorative = false,
}: {
  variant?: "mark" | "full";
  className?: string;
  size?: number;
  decorative?: boolean;
}) {
  const full = variant === "full";
  return (
    <Image
      src={full ? "/logo-full.png" : "/logo-mark.png"}
      alt={decorative ? "" : `${site.name} ${site.byline} — ${site.kind}`}
      width={size}
      height={full ? Math.round(size * (940 / 800)) : size}
      quality={90}
      sizes={full ? "180px" : "56px"}
      priority
      className={className}
    />
  );
}
