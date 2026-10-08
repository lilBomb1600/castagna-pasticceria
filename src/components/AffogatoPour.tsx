"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));

// the spout tip stays fixed while the pitcher tips around it, so the stream always leaves the spout
const SPOUT = { x: 112, y: 30 };
const RIM = { cx: 130, cy: 112, rx: 66, ry: 20 };
const BACK_ARC = `M${RIM.cx - RIM.rx} ${RIM.cy} A ${RIM.rx} ${RIM.ry} 0 0 1 ${RIM.cx + RIM.rx} ${RIM.cy}`;
const FRONT_ARC = `M${RIM.cx - RIM.rx} ${RIM.cy} A ${RIM.rx} ${RIM.ry} 0 0 0 ${RIM.cx + RIM.rx} ${RIM.cy}`;

/**
 * Castagna's affogato, drawn and poured: their ribbed red paper cup, a scoop of hazelnut gelato, and a shot of
 * espresso from a steel pitcher that coats the scoop and pools around it as the scoop sinks. Plays once when it
 * comes into view; the pitcher rests in frame afterwards.
 */
export function AffogatoPour({ title, body, className }: { title: string; body: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const raf = useRef(0);

  const play = useCallback(() => {
    cancelAnimationFrame(raf.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(1);
      return;
    }
    const start = performance.now();
    const step = (now: number) => {
      const v = Math.min(1, (now - start) / 4600);
      setT(v);
      if (v < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(box.current!);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [play]);

  // timeline: tip, pour, settle back upright; the pitcher never leaves the frame
  const tilt = 14 + 42 * inOut(seg(t, 0.06, 0.2)) - 42 * inOut(seg(t, 0.76, 0.9));
  const pouring = t > 0.15 && t < 0.8;
  const pool = ease(seg(t, 0.28, 0.95));
  const glaze = ease(seg(t, 0.18, 0.62));
  const drip = ease(seg(t, 0.3, 0.85));
  const sink = inOut(seg(t, 0.35, 1));

  const poolCy = RIM.cy + 7 - pool * 6;
  const poolRx = 44 + pool * 16;
  const poolRy = 11 + pool * 5;
  const scoopCx = 132;
  const scoopCy = 90 + sink * 10;
  const scoopR = 31 - sink * 2;
  const scoopTop = scoopCy - scoopR;
  const scoop = `M${scoopCx - scoopR} ${scoopCy + 6}
    C ${scoopCx - scoopR} ${scoopTop + 4}, ${scoopCx - 12} ${scoopTop - 2}, ${scoopCx + 2} ${scoopTop}
    C ${scoopCx + 18} ${scoopTop - 1}, ${scoopCx + scoopR + 1} ${scoopTop + 10}, ${scoopCx + scoopR} ${scoopCy + 6} Z`;

  return (
    <div ref={box} className={className}>
      <svg viewBox="0 -18 260 268" className="mx-auto w-full max-w-[360px]" role="img" aria-label="Espresso poured over a scoop of hazelnut gelato in a red paper cup">
        <defs>
          <clipPath id="aff-rim">
            <rect x="0" y="-40" width="260" height={RIM.cy + 40} />
            <ellipse cx={RIM.cx} cy={RIM.cy} rx={RIM.rx} ry={RIM.ry} />
          </clipPath>
          <clipPath id="aff-inside">
            <ellipse cx={RIM.cx} cy={RIM.cy} rx={RIM.rx - 2} ry={RIM.ry - 1.5} />
          </clipPath>
          <clipPath id="aff-surface">
            <rect x="0" y="-40" width="260" height={poolCy + 40} />
            <ellipse cx={RIM.cx} cy={poolCy} rx={poolRx} ry={poolRy} />
          </clipPath>
          <clipPath id="aff-scoop">
            <path d={scoop} />
          </clipPath>
          <linearGradient id="aff-cup" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8f131d" />
            <stop offset="0.3" stopColor="#d9293b" />
            <stop offset="0.62" stopColor="#c41e2b" />
            <stop offset="1" stopColor="#7d0f18" />
          </linearGradient>
          <radialGradient id="aff-paper" cx="0.5" cy="0.2" r="0.8">
            <stop offset="0" stopColor="#d9cbb8" />
            <stop offset="1" stopColor="#f3ebdf" />
          </radialGradient>
          <radialGradient id="aff-scoop-fill" cx="0.38" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#f3e4c9" />
            <stop offset="0.55" stopColor="#dcc19a" />
            <stop offset="1" stopColor="#b9946a" />
          </radialGradient>
          <radialGradient id="aff-glaze" cx="0.4" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#8a5130" />
            <stop offset="0.6" stopColor="#5a2e18" />
            <stop offset="1" stopColor="#3f1f10" />
          </radialGradient>
          <radialGradient id="aff-pool" cx="0.5" cy="0.45" r="0.6">
            <stop offset="0" stopColor="#5a2f19" />
            <stop offset="0.75" stopColor="#3f2011" />
            <stop offset="1" stopColor="#a8693a" />
          </radialGradient>
          <linearGradient id="aff-steel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f4f5f6" />
            <stop offset="0.45" stopColor="#b3b9bf" />
            <stop offset="1" stopColor="#737a82" />
          </linearGradient>
        </defs>

        {/* shadow on the marble, in warm ink */}
        <ellipse cx="130" cy="236" rx="74" ry="9" fill="#5b4c40" opacity="0.22" />

        {/* the cup, ribbed like Castagna's paper cups */}
        <path d="M64 112 L80 226 Q130 240 180 226 L196 112 Z" fill="url(#aff-cup)" />
        {Array.from({ length: 13 }).map((_, i) => (
          <path key={i} d={`M${70 + i * 10} 118 L${84 + i * 7.7} 226`} stroke="#6f0d15" strokeOpacity="0.3" strokeWidth="1.3" />
        ))}

        {/* inside: white paper, the back of the rim, then the espresso */}
        <ellipse cx={RIM.cx} cy={RIM.cy} rx={RIM.rx} ry={RIM.ry} fill="url(#aff-paper)" />
        <path d={BACK_ARC} stroke="#f5eee4" strokeWidth="4" fill="none" />
        <g clipPath="url(#aff-inside)">
          <ellipse cx={RIM.cx} cy={poolCy} rx={poolRx} ry={poolRy} fill="url(#aff-pool)" opacity={pool > 0.01 ? 1 : 0} />
          {pool > 0.2 &&
            [
              [86, 0.2],
              [94, -0.35],
              [168, 0.3],
              [174, -0.2],
              [160, 0.55],
            ].map(([x, dy], i) => <circle key={i} cx={x} cy={poolCy + dy * poolRy} r={1.4 + (i % 2)} fill="#c98a4b" opacity={0.7 * pool} />)}
        </g>

        {/* the scoop, behind the cup's front wall and below the espresso's surface */}
        <g clipPath="url(#aff-rim)">
          <g clipPath="url(#aff-surface)">
            <path d={scoop} fill="url(#aff-scoop-fill)" />
            <g clipPath="url(#aff-scoop)">
              <path d={`M${scoopCx - 20} ${scoopTop + 16} q 12 -8 24 -2`} stroke="#b8956a" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
              <path d={`M${scoopCx - 2} ${scoopTop + 24} q 12 -7 22 0`} stroke="#b8956a" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
              {/* the espresso spreads over the top of the scoop and runs down in drips */}
              <ellipse cx={scoopCx - 3} cy={scoopTop + 2} rx={4 + glaze * 22} ry={3 + glaze * 10} fill="url(#aff-glaze)" opacity={glaze > 0.01 ? 0.92 : 0} />
              {[
                [-18, 18],
                [-6, 24],
                [8, 21],
                [19, 15],
              ].map(([dx, len], i) => (
                <path
                  key={i}
                  d={`M${scoopCx - 3 + dx} ${scoopTop + 6} q ${i % 2 ? 1.5 : -1.5} ${len * 0.5} 0 ${len}`}
                  stroke="#5a2e18"
                  strokeWidth={4.5 - (i % 2)}
                  strokeLinecap="round"
                  fill="none"
                  pathLength={1}
                  strokeDasharray="1 1"
                  strokeDashoffset={1 - drip}
                  opacity="0.88"
                />
              ))}
              <path d={`M${scoopCx - 16} ${scoopTop + 6} q 8 -6 18 -5`} stroke="#fff" strokeOpacity="0.55" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          </g>
          {pool > 0.05 && (
            <path
              d={`M${RIM.cx - poolRx} ${poolCy} A ${poolRx} ${poolRy} 0 0 0 ${RIM.cx + poolRx} ${poolCy}`}
              stroke="#c98a4b"
              strokeOpacity={0.55 * pool}
              strokeWidth="2.5"
              fill="none"
            />
          )}
          {/* wooden spoon, dipping in behind the cup's front wall */}
          <path d={`M154 ${scoopCy + 12} L184 46`} stroke="#d8b886" strokeWidth="7" strokeLinecap="round" />
          <path d={`M157 ${scoopCy + 6} L184 46`} stroke="#b28c58" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* the front of the rim, in front of everything inside the cup */}
        <path d={FRONT_ARC} stroke="#f5eee4" strokeWidth="4" fill="none" />
        <path d={`M${RIM.cx - RIM.rx + 2} ${RIM.cy + 3} A ${RIM.rx} ${RIM.ry} 0 0 0 ${RIM.cx + RIM.rx - 2} ${RIM.cy + 3}`} stroke="#c9bba8" strokeWidth="1" fill="none" opacity="0.8" />

        {/* the pour, from the spout tip to the top of the scoop */}
        {pouring && (
          <>
            <path
              d={`M${SPOUT.x + 1} ${SPOUT.y + 2} Q ${SPOUT.x + 8} ${SPOUT.y + 14}, ${scoopCx - 6} ${scoopTop + 2}`}
              stroke="#3a1a0d"
              strokeWidth={3.4 + Math.sin(t * 60) * 0.5}
              strokeLinecap="round"
              fill="none"
            />
            <path d={`M${SPOUT.x + 2} ${SPOUT.y + 4} Q ${SPOUT.x + 8} ${SPOUT.y + 14}, ${scoopCx - 7} ${scoopTop}`} stroke="#b97a45" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7" />
          </>
        )}

        {/* steel pitcher, drawn with its spout tip at the origin */}
        <g transform={`translate(${SPOUT.x} ${SPOUT.y}) rotate(${tilt})`}>
          <path d="M-64 6 L-14 6 L-18 62 Q-40 70 -60 62 Z" fill="url(#aff-steel)" />
          <path d="M-16 4 L0 0 L-11 14 Z" fill="#c9ced3" />
          <path d="M-64 6 L-14 6" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="2" />
          <path d="M-63 16 C-86 20, -86 52, -60 56" stroke="#7b838b" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M-54 14 L-51 58" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M-40 10 L-38 60" stroke="#5f666e" strokeOpacity="0.25" strokeWidth="6" strokeLinecap="round" />
        </g>
      </svg>
      <h3 className="display mt-4 text-center text-[30px] font-medium leading-tight">{title}</h3>
      <p className="mx-auto mt-2 max-w-[34ch] text-center text-[16px] leading-relaxed text-ink-2">{body}</p>
      <button
        type="button"
        onClick={play}
        className="mx-auto mt-3 flex items-center gap-1.5 text-[14px] font-semibold text-ink-2 underline-offset-4 transition-colors hover:text-cup hover:underline"
      >
        <RotateCcw size={14} /> Pour again
      </button>
    </div>
  );
}
