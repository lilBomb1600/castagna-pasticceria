import clsx from "clsx";
import { useId } from "react";

/**
 * The shop's window lettering, redrawn: CASTAGNA set on an arch over "Pasticceria" in script, the way it is
 * painted on the glass at Plaza Way.
 */
export function Lockup({ className, tone = "ink" }: { className?: string; tone?: "ink" | "paper" }) {
  const id = useId().replace(/:/g, "");
  const color = tone === "paper" ? "#fbf7f0" : "#211913";
  return (
    <span className={clsx("inline-flex flex-col items-center", className)} role="img" aria-label="Castagna Pasticceria">
      <svg viewBox="0 0 300 92" className="w-full overflow-visible" aria-hidden>
        <defs>
          <path id={`arc-${id}`} d="M 18 86 A 180 180 0 0 1 282 86" />
        </defs>
        <text fill={color} fontFamily="var(--font-display)" fontSize="40" fontWeight="500" letterSpacing="7">
          <textPath href={`#arc-${id}`} startOffset="50%" textAnchor="middle">
            CASTAGNA
          </textPath>
        </text>
      </svg>
      <span className="script -mt-[0.32em] text-[1em] leading-none" style={{ color }}>
        Pasticceria
      </span>
    </span>
  );
}
