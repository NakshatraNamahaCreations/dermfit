type IconProps = { className?: string };

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function Leaf({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20c0-8 5-13 16-14 0 10-5 15-13 15H4z" />
      <path d="M4 20c3-4 6.5-6.6 11-8.5" />
    </svg>
  );
}

function Flask({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9 3h6M10.5 3v6.2L5.6 17.7A2 2 0 0 0 7.3 21h9.4a2 2 0 0 0 1.7-3.3L13.5 9.2V3" />
      <path d="M7.8 15h8.4" />
    </svg>
  );
}

function Droplet({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.2c3.6 4 5.4 6.8 5.4 9.4A5.4 5.4 0 0 1 12 18a5.4 5.4 0 0 1-5.4-5.4c0-2.6 1.8-5.4 5.4-9.4z" />
      <path d="M9.6 13.2a2.4 2.4 0 0 0 2.4 2.3" />
    </svg>
  );
}

const icons = { leaf: Leaf, flask: Flask, droplet: Droplet };

export type IconName = keyof typeof icons;

export default function HeroIcon({ name, className }: { name: string; className?: string }) {
  const Cmp = icons[name as IconName] ?? Leaf;
  return <Cmp className={className} />;
}
