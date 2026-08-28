import Image from "next/image";
import { site } from "@/data/site";

/**
 * The clinic logo - the complete supplied lockup, nothing cropped or redrawn.
 *
 * public/logo-transparent.png is generated from the original by
 * make-logo-transparent.py: it turns the flat navy backdrop into alpha and
 * trims the empty margin, so the logo can sit over photography. The untouched
 * original stays at public/logo.png (byte-identical to "dermfit logo-1.png").
 */
const W = 2860;
const H = 3389;

export default function Logo({
  className = "",
  height = 128,
  sizes = "128px",
  decorative = false,
}: {
  className?: string;
  height?: number;
  sizes?: string;
  decorative?: boolean;
}) {
  return (
    <Image
      src="/logo-transparent.png"
      alt={decorative ? "" : `${site.name} ${site.byline} - ${site.kind}`}
      width={Math.round((height * W) / H)}
      height={height}
      quality={90}
      sizes={sizes}
      priority
      className={className}
    />
  );
}
