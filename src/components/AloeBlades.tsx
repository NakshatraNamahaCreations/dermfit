/**
 * Drawn aloe foliage for the statement section.
 *
 * Blades are generated rather than hand-authored: each one is two quadratic
 * curves meeting at the tip, with serrated teeth sampled along both edges and
 * a highlight running up the centre. That is what separates it from a generic
 * leaf shape — real aloe has the toothed margin and the pale central stripe.
 */

type Pt = [number, number];

/** Quadratic bezier point and tangent at t. */
function qAt(p0: Pt, c: Pt, p1: Pt, t: number): { p: Pt; d: Pt } {
  const u = 1 - t;
  const p: Pt = [
    u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0],
    u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1],
  ];
  const d: Pt = [
    2 * u * (c[0] - p0[0]) + 2 * t * (p1[0] - c[0]),
    2 * u * (c[1] - p0[1]) + 2 * t * (p1[1] - c[1]),
  ];
  return { p, d };
}

function teethAlong(p0: Pt, c: Pt, p1: Pt, sign: number, count: number, size: number) {
  let d = "";
  for (let i = 1; i <= count; i++) {
    const t = 0.06 + (i / (count + 1)) * 0.86;
    const { p, d: tan } = qAt(p0, c, p1, t);
    const len = Math.hypot(tan[0], tan[1]) || 1;
    // Outward normal, scaled down towards the tip so teeth shrink with the blade.
    const taper = 1 - t * 0.55;
    const nx = (-tan[1] / len) * sign * size * taper;
    const ny = (tan[0] / len) * sign * size * taper;
    const bx = (tan[0] / len) * size * 1.5 * taper;
    const by = (tan[1] / len) * size * 1.5 * taper;
    d += `M${(p[0] - bx).toFixed(1)} ${(p[1] - by).toFixed(1)}`;
    d += `L${(p[0] + nx).toFixed(1)} ${(p[1] + ny).toFixed(1)}`;
    d += `L${(p[0] + bx).toFixed(1)} ${(p[1] + by).toFixed(1)}Z`;
  }
  return d;
}

export type BladeShape = {
  outline: string;
  teeth: string;
  highlight: string;
};

/** Builds one blade rising from the origin. `bend` leans it; `len`/`w` size it. */
function makeBlade(len: number, w: number, bend: number): BladeShape {
  const base: Pt = [-w, 0];
  const tip: Pt = [bend, -len];
  const cL: Pt = [-w * 0.92 + bend * 0.3, -len * 0.52];
  const cR: Pt = [w * 0.92 + bend * 0.7, -len * 0.52];
  const baseR: Pt = [w, 0];

  const outline =
    `M${base[0]} 0 Q${cL[0].toFixed(1)} ${cL[1].toFixed(1)} ${tip[0]} ${-len}` +
    ` Q${cR[0].toFixed(1)} ${cR[1].toFixed(1)} ${baseR[0]} 0 Z`;

  const teeth =
    teethAlong(base, cL, tip, -1, 16, w * 0.14) +
    teethAlong(baseR, cR, tip, 1, 16, w * 0.14);

  const highlight =
    `M${(-w * 0.28).toFixed(1)} -6 Q${(bend * 0.3).toFixed(1)} ${(-len * 0.55).toFixed(1)}` +
    ` ${(bend * 0.9).toFixed(1)} ${(-len * 0.93).toFixed(1)}` +
    ` Q${(w * 0.16 + bend * 0.4).toFixed(1)} ${(-len * 0.5).toFixed(1)}` +
    ` ${(w * 0.3).toFixed(1)} -6 Z`;

  return { outline, teeth, highlight };
}

type Placed = {
  shape: BladeShape;
  x: number;
  rotate: number;
  scale: number;
  tone: 0 | 1 | 2;
};

const shapes = [
  makeBlade(330, 28, 14),
  makeBlade(255, 24, -20),
  makeBlade(385, 32, -6),
  makeBlade(215, 21, 26),
  makeBlade(295, 26, 4),
];

/** Behind the word — taller and thinner, softened by the blur on the wrapper. */
export const backBlades: Placed[] = [
  { shape: shapes[2], x: 60, rotate: -12, scale: 0.95, tone: 0 },
  { shape: shapes[1], x: 205, rotate: 8, scale: 0.88, tone: 0 },
  { shape: shapes[0], x: 330, rotate: -5, scale: 1.0, tone: 1 },
  { shape: shapes[3], x: 470, rotate: 13, scale: 0.9, tone: 0 },
  { shape: shapes[2], x: 610, rotate: -8, scale: 0.98, tone: 1 },
  { shape: shapes[4], x: 745, rotate: 6, scale: 0.92, tone: 0 },
  { shape: shapes[1], x: 880, rotate: -13, scale: 1.02, tone: 1 },
  { shape: shapes[0], x: 1010, rotate: 10, scale: 0.9, tone: 0 },
  { shape: shapes[3], x: 1140, rotate: -6, scale: 0.96, tone: 1 },
];

/** In front of the word — sparser, so the letters stay readable between them. */
export const frontBlades: Placed[] = [
  { shape: shapes[0], x: 15, rotate: -18, scale: 1.05, tone: 2 },
  { shape: shapes[3], x: 175, rotate: 11, scale: 0.95, tone: 1 },
  { shape: shapes[2], x: 395, rotate: -6, scale: 1.02, tone: 2 },
  { shape: shapes[1], x: 560, rotate: 15, scale: 0.98, tone: 1 },
  { shape: shapes[4], x: 800, rotate: -11, scale: 1.06, tone: 2 },
  { shape: shapes[3], x: 985, rotate: 9, scale: 0.94, tone: 1 },
  { shape: shapes[2], x: 1165, rotate: -5, scale: 1.0, tone: 2 },
];

const fills = ["url(#aloe-a)", "url(#aloe-b)", "url(#aloe-c)"];

export function BladeGroup({
  blades,
  className = "",
  idSuffix,
}: {
  blades: Placed[];
  className?: string;
  idSuffix: string;
}) {
  return (
    <svg
      viewBox="0 0 1200 460"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={`aloe-a-${idSuffix}`} x1="0.2" y1="1" x2="0.6" y2="0">
          <stop offset="0%" stopColor="#2f4632" />
          <stop offset="60%" stopColor="#4d6b46" />
          <stop offset="100%" stopColor="#7f9d6a" />
        </linearGradient>
        <linearGradient id={`aloe-b-${idSuffix}`} x1="0.1" y1="1" x2="0.7" y2="0">
          <stop offset="0%" stopColor="#35513a" />
          <stop offset="55%" stopColor="#5c7d4f" />
          <stop offset="100%" stopColor="#93b079" />
        </linearGradient>
        <linearGradient id={`aloe-c-${idSuffix}`} x1="0.3" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="#273c2a" />
          <stop offset="50%" stopColor="#436038" />
          <stop offset="100%" stopColor="#6f9159" />
        </linearGradient>
      </defs>

      {blades.map((b, i) => (
        <g
          key={i}
          transform={`translate(${b.x} 470) rotate(${b.rotate}) scale(${b.scale})`}
        >
          <path
            d={b.shape.outline}
            fill={fills[b.tone].replace(")", `-${idSuffix})`)}
          />
          <path
            d={b.shape.teeth}
            fill={fills[b.tone].replace(")", `-${idSuffix})`)}
          />
          <path d={b.shape.highlight} fill="#ffffff" opacity="0.14" />
          <path d={b.shape.outline} fill="none" stroke="#1d2f20" strokeWidth="1.1" opacity="0.35" />
        </g>
      ))}
    </svg>
  );
}
