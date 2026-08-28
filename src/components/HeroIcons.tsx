type IconProps = { className?: string };

const base = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function Stethoscope({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 3v5a4 4 0 0 0 8 0V3" />
      <path d="M4.5 3h3M12.5 3h3" />
      <path d="M10 12v3a5 5 0 0 0 10 0v-1" />
      <circle cx="20" cy="11" r="2" />
    </svg>
  );
}

function Scan({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 8V5a2 2 0 0 1 2-2h3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 1-2 2h-3" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}

function Receipt({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 3h14v18l-2.3-1.6L14.4 21 12 19.4 9.6 21l-2.3-1.6L5 21z" />
      <path d="M9 8h6M9 12h6" />
    </svg>
  );
}

const icons = { stethoscope: Stethoscope, scan: Scan, receipt: Receipt };

export type IconName = keyof typeof icons;

export default function HeroIcon({ name, className }: { name: string; className?: string }) {
  const Cmp = icons[name as IconName] ?? Scan;
  return <Cmp className={className} />;
}
