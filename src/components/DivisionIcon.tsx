const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const paths: Record<string, React.ReactNode> = {
  // Stethoscope — clinical
  clinical: (
    <>
      <path d="M6 3v5a4 4 0 0 0 8 0V3" />
      <path d="M4.5 3h3M12.5 3h3" />
      <path d="M10 12v3a5 5 0 0 0 10 0v-1" />
      <circle cx="20" cy="10.5" r="2" />
    </>
  ),
  // Sparkle — aesthetic
  aesthetic: (
    <>
      <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" />
      <path d="M18 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </>
  ),
  // Strand — hair
  hair: (
    <>
      <path d="M5 21c0-6 1.5-11 4-14M11 21c0-7 1.8-12 4.5-15M17 21c0-5 .9-9 2.4-12" />
      <path d="M4 6.5C6.5 3.5 9.5 2 13 2" />
    </>
  ),
  // Torso — body
  body: (
    <>
      <circle cx="12" cy="4.5" r="2.2" />
      <path d="M8 9.2A4 4 0 0 1 12 8a4 4 0 0 1 4 1.2" />
      <path d="M9 21v-4.5l-1.4-4A4.6 4.6 0 0 1 12 8a4.6 4.6 0 0 1 4.4 4.5L15 16.5V21" />
    </>
  ),
  // Beam — laser
  laser: (
    <>
      <path d="M12 2v6" />
      <path d="M8.5 8h7l-1.4 3.2a2.4 2.4 0 0 1-4.2 0z" />
      <path d="M12 13.5V22M9 18.5l3 3 3-3M6.5 4.5 8 6M17.5 4.5 16 6" />
    </>
  ),
  // Helix — regenerative
  regenerative: (
    <>
      <path d="M7 2c0 5 10 5 10 10S7 17 7 22" />
      <path d="M17 2c0 5-10 5-10 10s10 5 10 10" />
      <path d="M8.4 6h7.2M8.4 18h7.2M9.6 9.5h4.8M9.6 14.5h4.8" />
    </>
  ),
};

export default function DivisionIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg {...base} className={className}>
      {paths[name] ?? paths.clinical}
    </svg>
  );
}
