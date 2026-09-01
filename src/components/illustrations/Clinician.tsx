/**
 * Illustrated clinician figures, used as placeholders until the clinic supplies
 * real photography.
 *
 * Drawn rather than photographed on purpose. The alternative was a stock model,
 * and a stock model under a named doctor shows patients a stranger's face as
 * their consultant. An illustration reads as a stand-in at a glance, carries no
 * licence, and can be drawn in Indian skin tones — which the free stock pools
 * searched here could not supply.
 *
 * Flat and geometric by design: minimal facial detail looks deliberate, where
 * near-realism drawn in vectors looks broken.
 */

/** Warm mid-to-deep tones, the range the clinic actually treats. */
export const SKIN = {
  deep: { base: "#8d5a37", shade: "#7a4c2d", light: "#a06943" },
  mid: { base: "#a9704a", shade: "#95603d", light: "#bd8259" },
  warm: { base: "#c08a5e", shade: "#a97650", light: "#d09d71" },
} as const;

export type SkinTone = keyof typeof SKIN;
export type HairStyle = "bun" | "short" | "long";

const HAIR = "#211711";
const HAIR_HI = "#3a2a1e";
const COAT = "#ffffff";
const COAT_SHADE = "#dfe5ee";
const SCRUB = "#1b3a63";

const TORSO = "M100 142c-17 0-31 3-43 9l-5 149h96l-5-149c-12-6-26-9-43-9z";
const ARM_L = "M57 151c-15 7-23 17-24 31l-5 118h26z";
const ARM_R = "M143 151c15 7 23 17 24 31l5 118h-26z";

export type ClinicianProps = {
  tone?: SkinTone;
  hair?: HairStyle;
  beard?: boolean;
  /** Off for one figure in a group so the row is not uniform. */
  stethoscope?: boolean;
};

/**
 * One figure, head and shoulders, drawn in a 200 x 300 local box with the coat
 * running off the bottom edge. Position it with a transform.
 */
export function ClinicianFigure({
  tone = "mid",
  hair = "short",
  beard = false,
  stethoscope = true,
}: ClinicianProps) {
  const skin = SKIN[tone];

  return (
    <g>
      {/* Arms behind the torso, so the shoulder line reads */}
      <path d={ARM_L} fill={COAT_SHADE} />
      <path d={ARM_R} fill={COAT_SHADE} />
      <path d={TORSO} fill={COAT} />

      {/* Neck */}
      <path d="M86 104h28v36c0 8-28 8-28 0z" fill={skin.shade} />

      {/* Scrub top in the opening, then the lapels over it */}
      <path d="M100 204 79 147c7-3 14-4 21-4s14 1 21 4z" fill={SCRUB} />
      <path d="M79 147 100 204 87 149c-3-1-6-1-8-2z" fill={COAT} />
      <path d="M121 147 100 204l13-55c3-1 6-1 8-2z" fill={COAT} />

      {/* Ears */}
      <ellipse cx="58" cy="74" rx="7" ry="10" fill={skin.shade} />
      <ellipse cx="142" cy="74" rx="7" ry="10" fill={skin.shade} />

      {/* Head */}
      <ellipse cx="100" cy="68" rx="42" ry="48" fill={skin.base} />
      <ellipse cx="100" cy="68" rx="42" ry="48" fill={skin.light} opacity="0.35" />

      {beard && (
        <path
          d="M62 72c0 30 17 48 38 48s38-18 38-48c0 22-17 32-38 32S62 94 62 72z"
          fill={HAIR}
          opacity="0.92"
        />
      )}

      {hair === "bun" && (
        <>
          <circle cx="100" cy="14" r="15" fill={HAIR} />
          <path
            d="M100 18c-25 0-40 16-41 40-1 9 0 15 2 20 2-22 14-33 39-33s37 11 39 33c2-5 3-11 2-20-1-24-16-40-41-40z"
            fill={HAIR}
          />
        </>
      )}
      {hair === "short" && (
        <path
          d="M100 18c-25 0-41 17-41 42 0 6 1 11 2 15 3-16 8-24 14-27 8 5 18 7 25 7s17-2 25-7c6 3 11 11 14 27 1-4 2-9 2-15 0-25-16-42-41-42z"
          fill={HAIR}
        />
      )}
      {hair === "long" && (
        <path
          d="M100 18c-27 0-43 18-43 44 0 34-4 52-9 68h22c-4-18-2-40-2-58 0-20 13-30 32-30s32 10 32 30c0 18 2 40-2 58h22c-5-16-9-34-9-68 0-26-16-44-43-44z"
          fill={HAIR}
        />
      )}
      <path
        d="M100 18c-14 0-25 5-32 14 9-6 20-9 32-9s23 3 32 9c-7-9-18-14-32-14z"
        fill={HAIR_HI}
      />

      {/* Face */}
      <ellipse cx="85" cy="70" rx="3.4" ry="4.2" fill="#2a1d14" />
      <ellipse cx="115" cy="70" rx="3.4" ry="4.2" fill="#2a1d14" />
      <path
        d="M78 60c4-3 9-3 13-1M109 59c4-2 9-2 13 1"
        stroke="#2a1d14"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M92 88c5 4 11 4 16 0"
        stroke="#5c3a25"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />

      {stethoscope && (
        <>
          <path
            d="M83 145c-4 22 2 40 17 44s25-12 23-32"
            stroke="#c3903a"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="122" cy="157" r="8" fill="#c3903a" />
          <circle cx="122" cy="157" r="3.4" fill="#e3b869" />
        </>
      )}
    </g>
  );
}

/**
 * Head-and-shoulders crop for a doctor card. Fills its box; the caller sets the
 * aspect ratio.
 */
export function ClinicianPortrait({
  className = "",
  ...figure
}: ClinicianProps & { className?: string }) {
  return (
    <svg
      viewBox="20 -6 160 200"
      preserveAspectRatio="xMidYMin slice"
      className={className}
      aria-hidden="true"
    >
      <rect x="-40" y="-46" width="280" height="300" fill="#01122d" />
      <circle cx="100" cy="72" r="86" fill="none" stroke="#c3903a" strokeWidth="1.4" opacity="0.35" />
      <circle cx="100" cy="72" r="104" fill="none" stroke="#c3903a" strokeWidth="1" opacity="0.18" />
      <ClinicianFigure {...figure} />
    </svg>
  );
}

/**
 * Three clinicians in a consulting room, for the About band. 900 x 700, drawn
 * to be cropped by object-cover at any ratio down to about 4:3.
 */
export function ClinicTeamScene({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 900 700" className={className} role="img" aria-label="Illustration of the Dermfit clinical team">
      <rect width="900" height="700" fill="#eef2f7" />
      <circle cx="450" cy="320" r="300" fill="#f3e3c4" opacity="0.6" />
      <rect y="545" width="900" height="155" fill="#e0e6ef" />

      {/* Framed certificate on the wall */}
      <rect x="44" y="64" width="104" height="134" rx="8" fill="#01122d" />
      <rect
        x="55"
        y="75"
        width="82"
        height="112"
        rx="4"
        fill="none"
        stroke="#c3903a"
        strokeWidth="2"
      />
      <path d="M74 152h44" stroke="#c3903a" strokeWidth="3" strokeLinecap="round" />

      {/* Balancing mark, top right */}
      <circle cx="810" cy="120" r="44" fill="none" stroke="#c3903a" strokeWidth="3" opacity="0.6" />
      <circle cx="810" cy="120" r="26" fill="#c3903a" opacity="0.18" />

      {/* Flanking figures first so the centre one overlaps them */}
      <g transform="translate(64,146) scale(1.5)">
        <ClinicianFigure tone="deep" hair="bun" />
      </g>
      <g transform="translate(532,146) scale(1.5)">
        <ClinicianFigure tone="warm" hair="long" stethoscope={false} />
      </g>
      <g transform="translate(275,92) scale(1.78)">
        <ClinicianFigure tone="mid" hair="short" beard />
      </g>
    </svg>
  );
}
