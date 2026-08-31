import { site } from "@/data/site";
import SocialIcon from "./SocialIcon";

/**
 * Floating WhatsApp button, bottom right.
 *
 * Unlike the back-to-top control this is always visible: it is a way to reach
 * the clinic, so it should not depend on how far the visitor has scrolled.
 * Back-to-top stacks above it once it appears.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Message the clinic on WhatsApp"
      className="group fixed bottom-6 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-brand-950/25 transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
    >
      <SocialIcon name="whatsapp" className="h-6 w-6" />
    </a>
  );
}
