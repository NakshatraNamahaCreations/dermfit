import Image from "next/image";
import { site } from "@/data/site";

/**
 * The clinic logo - the complete supplied lockup, nothing cropped or redrawn.
 *
 * public/logo-header.png is what renders. Both it and logo-transparent.png come
 * from make-logo-transparent.py, which turns the flat navy backdrop into alpha
 * and trims the empty margin; the header copy then has its light end deepened.
 * The lockup is a gold gradient running almost to white at the highlights, and
 * against a white bar that left the hairline strokes and the three lines of
 * small type under DERMFIT barely visible. Hue is unchanged - only the pale end
 * is pulled down, so it still reads as the same gold.
 *
 * The untouched original stays at public/logo.png (byte-identical to the
 * supplied "dermfit logo-1.png").
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
      src="/logo-header.png"
      alt={decorative ? "" : `${site.name} ${site.byline} - ${site.kind}`}
      width={Math.round((height * W) / H)}
      height={height}
      quality={100}
      sizes={sizes}
      priority
      className={className}
    />
  );
}
