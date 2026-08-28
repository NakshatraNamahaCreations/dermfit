/**
 * Placeholder botanical layer for the Nourish section.
 *
 * Stands in until real cut-out plant photography is supplied — see
 * NourishSection for how to swap it (`backLayer` / `frontLayer` image props).
 */
const BLADE =
  "M100 420C88 330 90 236 118 132C126 100 138 58 152 20C156 6 164 4 166 18C176 88 172 168 158 246C146 316 128 372 112 420Z";

type Blade = { x: number; y: number; rotate: number; scale: number; opacity: number };

export function BladeGroup({
  blades,
  className = "",
}: {
  blades: Blade[];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1200 460"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="blade-fill" x1="0" y1="1" x2="0.3" y2="0">
          <stop offset="0%" stopColor="#3f5340" />
          <stop offset="55%" stopColor="#5f7a55" />
          <stop offset="100%" stopColor="#8aa678" />
        </linearGradient>
      </defs>
      {blades.map((b, i) => (
        <g
          key={i}
          transform={`translate(${b.x} ${b.y}) rotate(${b.rotate}) scale(${b.scale})`}
          opacity={b.opacity}
        >
          <path d={BLADE} fill="url(#blade-fill)" />
          <path d={BLADE} fill="#ffffff" opacity="0.09" transform="translate(6 0) scale(0.82 0.97)" />
        </g>
      ))}
    </svg>
  );
}

/** Sits behind the word — taller, paler, further away. */
export const backBlades: Blade[] = [
  { x: 90, y: 470, rotate: -14, scale: 1.05, opacity: 0.5 },
  { x: 300, y: 470, rotate: 6, scale: 0.9, opacity: 0.42 },
  { x: 620, y: 470, rotate: -6, scale: 1.15, opacity: 0.46 },
  { x: 880, y: 470, rotate: 12, scale: 0.95, opacity: 0.4 },
  { x: 1090, y: 470, rotate: -10, scale: 1.08, opacity: 0.5 },
];

/** Sits in front of the word — the layer that creates the depth. */
export const frontBlades: Blade[] = [
  { x: 40, y: 500, rotate: -22, scale: 1.25, opacity: 0.96 },
  { x: 250, y: 505, rotate: 14, scale: 1.05, opacity: 0.94 },
  { x: 520, y: 500, rotate: -8, scale: 1.3, opacity: 0.92 },
  { x: 780, y: 505, rotate: 18, scale: 1.1, opacity: 0.95 },
  { x: 1010, y: 500, rotate: -16, scale: 1.22, opacity: 0.96 },
  { x: 1170, y: 505, rotate: 8, scale: 1.15, opacity: 0.93 },
];
