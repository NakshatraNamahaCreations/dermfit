import Image from "next/image";
import { site } from "@/data/site";

/**
 * The clinic logo - the complete supplied artwork, used as-is everywhere.
 *
 * public/logo.png is a byte-for-byte copy of "dermfit logo-1.png" (identical
 * MD5); it is renamed only so the URL carries no space. Nothing is cropped,
 * recoloured or redrawn. Display size is the only thing that varies.
 */
export default function Logo({
  className = "",
  size = 320,
  sizes = "320px",
  decorative = false,
}: {
  className?: string;
  size?: number;
  sizes?: string;
  decorative?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt={decorative ? "" : `${site.name} ${site.byline} - ${site.kind}`}
      width={size}
      height={size}
      quality={100}
      sizes={sizes}
      priority
      className={className}
    />
  );
}
