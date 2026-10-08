"use client";

import { useId } from "react";

/**
 * Castagna's cortado, drawn: a small glass on a red saucer filling from a pour. `fill` runs 0..1; espresso fills
 * the first `split` of it, then the stream turns to milk and a foam head rises. `stream` shows the pour itself.
 */
export function PourGlass({
  fill,
  stream = true,
  steam = false,
  split = 0.62,
  className,
}: {
  fill: number;
  stream?: boolean;
  steam?: boolean;
  split?: number;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const top = 64; // glass rim
  const bottom = 158; // inside floor
  const depth = bottom - top - 6;
  const f = Math.min(1, Math.max(0, fill));
  const coffee = Math.min(f, split) / 1; // share of the glass that is espresso
  const milk = Math.max(0, f - split);
  const coffeeTop = bottom - coffee * depth;
  const milkTop = coffeeTop - milk * depth;
  const liquidTop = Math.min(coffeeTop, milkTop);
  const pouringMilk = f > split;
  const streamColor = pouringMilk ? "#f4ece0" : "#3b2318";

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <defs>
        <clipPath id={`g-${id}`}>
          <path d="M66 62 L134 62 L127 152 Q126 160 118 160 L82 160 Q74 160 73 152 Z" />
        </clipPath>
        <linearGradient id={`c-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a4626" />
          <stop offset="0.12" stopColor="#4a2a19" />
          <stop offset="1" stopColor="#2a160d" />
        </linearGradient>
        <radialGradient id={`s-${id}`} cx="0.5" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#e2303c" />
          <stop offset="0.7" stopColor="#c41e2b" />
          <stop offset="1" stopColor="#8f141d" />
        </radialGradient>
      </defs>

      {/* saucer */}
      <ellipse cx="100" cy="166" rx="80" ry="15" fill={`url(#s-${id})`} />
      <ellipse cx="100" cy="163" rx="56" ry="8" fill="#a8151f" opacity="0.55" />

      {/* liquid */}
      <g clipPath={`url(#g-${id})`}>
        <rect x="60" y={coffeeTop} width="80" height={bottom - coffeeTop + 4} fill={`url(#c-${id})`} />
        {f > 0.05 && <rect x="60" y={coffeeTop - 2} width="80" height="5" fill="#c98a4b" opacity="0.9" />}
        {milk > 0 && (
          <>
            <rect x="60" y={milkTop} width="80" height={coffeeTop - milkTop + 1} fill="#efe3d2" />
            <rect x="60" y={milkTop} width="80" height="6" fill="#fbf6ee" />
          </>
        )}
      </g>

      {/* glass */}
      <path
        d="M66 62 L134 62 L127 152 Q126 160 118 160 L82 160 Q74 160 73 152 Z"
        fill="rgb(255 255 255 / 0.08)"
        stroke="#211913"
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <ellipse cx="100" cy="62" rx="34" ry="3.2" fill="none" stroke="#211913" strokeOpacity="0.45" strokeWidth="1.4" />
      <path d="M76 72 L82 148" stroke="#fff" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
      <path d="M124 76 L121 112" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />

      {/* spoon resting on the saucer */}
      <path d="M140 160 L182 150" stroke="#9aa0a6" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="141" cy="160.5" rx="6" ry="3.4" fill="#b7bcc1" transform="rotate(-14 141 160.5)" />

      {/* the pour */}
      {stream && f < 1 && (
        <path
          d={`M104 0 C 103 ${liquidTop * 0.4}, 101 ${liquidTop * 0.75}, 101 ${liquidTop}`}
          stroke={streamColor}
          strokeWidth={pouringMilk ? 5 : 3.2}
          strokeLinecap="round"
          fill="none"
        />
      )}

      {/* steam once it's poured */}
      {steam && (
        <g fill="none" stroke="#211913" strokeOpacity="0.28" strokeWidth="2" strokeLinecap="round">
          <path className="steam steam-a" d="M88 52 C 80 40, 96 32, 88 18" />
          <path className="steam steam-b" d="M102 54 C 94 40, 112 30, 102 12" />
          <path className="steam steam-c" d="M116 52 C 108 40, 124 32, 116 20" />
        </g>
      )}
    </svg>
  );
}
