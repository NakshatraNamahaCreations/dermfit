"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type From = "up" | "left" | "right";

const hidden: Record<From, string> = {
  up: "translate-y-10 opacity-0",
  left: "-translate-x-10 opacity-0",
  right: "translate-x-10 opacity-0",
};

/**
 * Reveals its children once they scroll into view.
 *
 * Anyone who prefers reduced motion still gets the reveal, but the global
 * reduced-motion rule collapses the transition to ~0ms, so it simply appears.
 * Browsers without IntersectionObserver show the finished state outright.
 */
export default function Reveal({
  children,
  from = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  from?: From;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (very old browsers): show it rather than leave a
    // blank space. Deferred a frame so this is not a synchronous effect setState.
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-out ${
        shown ? "translate-x-0 translate-y-0 opacity-100" : hidden[from]
      } ${className}`}
    >
      {children}
    </div>
  );
}
