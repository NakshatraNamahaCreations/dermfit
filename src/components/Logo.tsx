import Image from "next/image";
import { site } from "@/data/site";

/**
 * The clinic logo, used unmodified. public/logo.png is a byte-for-byte copy of
 * the supplied "dermfit logo-1.png" — renamed only so the URL has no space.
 */
export default function Logo({
  className = "",
  size = 56,
  decorative = false,
}: {
  className?: string;
  size?: number;
  decorative?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt={decorative ? "" : `${site.name} ${site.byline} — ${site.kind}`}
      width={size}
      height={size}
      priority
      className={className}
    />
  );
}
