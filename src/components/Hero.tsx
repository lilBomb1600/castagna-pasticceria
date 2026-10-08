"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { PourGlass } from "./PourGlass";
import { Lockup } from "./Lockup";
import { lockScroll } from "./SmoothScroll";
import { shop, status } from "@/data/shop";

const FILMS = {
  wide: { src: "/film/affogato.mp4", poster: "/film/affogato.jpg" },
  mid: { src: "/film/affogato-960.mp4", poster: "/film/affogato.jpg" },
  tall: { src: "/film/affogato-phone.mp4", poster: "/film/affogato-phone.jpg" },
};

function OpenNow({ className }: { className?: string }) {
  const [s, setS] = useState<ReturnType<typeof status> | null>(null);
  useEffect(() => {
    const tick = () => setS(status());
    tick();
    const t = window.setInterval(tick, 60_000);
    return () => window.clearInterval(t);
  }, []);
  if (!s) return <span className={className}>&nbsp;</span>;
  return (
    <span className={clsx("inline-flex items-center gap-2", className)}>
      <span aria-hidden className={clsx("h-2 w-2 rounded-full", s.open ? "bg-paper" : "bg-white/40")} />
      {s.label}
    </span>
  );
}

/**
 * The opening: a cortado pours while the film buffers, then the film of espresso poured over Castagna's gelato
 * takes the whole screen.
 */
export function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const [film, setFilm] = useState<(typeof FILMS)["wide"] | null>(null);
  const [buffered, setBuffered] = useState(0);
  const [ready, setReady] = useState(false);
  const [shown, setShown] = useState(0);
  const [lifted, setLifted] = useState(false);
  const [gone, setGone] = useState(false);
  const started = useRef(performance.now());

  useEffect(() => {
    const tall = window.matchMedia("(max-aspect-ratio: 4/5)").matches;
    const mid = window.matchMedia("(max-width: 1100px)").matches;
    setFilm(tall ? FILMS.tall : mid ? FILMS.mid : FILMS.wide);
    if (!window.location.hash) {
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
    lockScroll(true);
    const t = window.setTimeout(() => setReady(true), 8000); // never hold the page for a slow network
    return () => {
      window.clearTimeout(t);
      lockScroll(false);
    };
  }, []);

  // the pour runs at least 1.6 s, follows the buffer, and finishes once the film can play through
  useEffect(() => {
    if (lifted) return;
    let raf = 0;
    const step = () => {
      const t = (performance.now() - started.current) / 1600;
      const goal = ready ? Math.min(1, t) : Math.min(0.92, Math.max(buffered, t * 0.6));
      setShown((s) => (s >= goal ? s : s + Math.min(0.025, goal - s)));
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [ready, buffered, lifted]);

  useEffect(() => {
    if (lifted || shown < 1) return;
    const a = window.setTimeout(() => {
      setLifted(true);
      lockScroll(false);
      const v = video.current;
      if (v) {
        v.currentTime = 0;
        v.play().catch(() => {});
      }
    }, 650);
    return () => window.clearTimeout(a);
  }, [shown, lifted]);

  useEffect(() => {
    if (!lifted) return;
    const t = window.setTimeout(() => setGone(true), 900);
    return () => window.clearTimeout(t);
  }, [lifted]);

  const onProgress = () => {
    const v = video.current;
    if (!v || !v.duration || !v.buffered.length) return;
    setBuffered(Math.min(1, v.buffered.end(v.buffered.length - 1) / v.duration));
  };

  return (
    <section id="top" aria-label="Castagna Pasticceria" className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink text-white">
      {film && (
        <video
          ref={video}
          src={film.src}
          poster={film.poster}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          onProgress={onProgress}
          onCanPlayThrough={() => setReady(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(20_14_10/.45)_0%,transparent_22%,transparent_48%,rgb(20_14_10/.82)_100%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_0%_100%,rgb(20_14_10/.55),transparent_70%)]" />

      <a
        href={shop.yelp}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-5 top-[88px] z-10 inline-flex items-center gap-2 rounded-full bg-black/35 px-3.5 py-2 text-[13px] font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-black/50 sm:right-8 lg:right-12"
      >
        <Star size={14} className="fill-paper text-paper" />
        {shop.rating.stars} on Yelp · {shop.rating.count} reviews
      </a>

      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-[max(32px,6vh)] sm:px-8 lg:px-12">
        <div
          className={clsx(
            "mx-auto max-w-[1320px] transition-[opacity,transform,filter] duration-[1200ms] ease-[var(--ease-out-expo)]",
            lifted ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-[6px]"
          )}
        >
          <Lockup tone="paper" className="mb-6 w-[min(330px,70vw)] text-[clamp(40px,5.5vw,62px)]" />
          <h1 className="display max-w-[16ch] text-[clamp(40px,5.6vw,84px)] font-medium leading-[0.95] tracking-[-0.03em] [text-shadow:0_2px_24px_rgb(0_0_0/.35)]">
            Pastry from the oven, gelato from the case, <em className="font-normal italic">espresso at your table.</em>
          </h1>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[46ch] text-[16.5px] leading-relaxed text-white/88 sm:text-[17.5px]">
              An Italian-owned pasticceria on Plaza Way in Lafayette. Croissants, cookies and bread baked in the back, a case of gelato up front, and espresso brought out to wherever you sit.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <OpenNow className="order-last w-full text-[14px] font-medium text-white/85 sm:order-none sm:w-auto" />
              <Link href="/menu" className="btn btn-cup">
                See today&apos;s menu <ArrowRight size={17} />
              </Link>
              <a href="#visit" className="btn btn-paper">
                Plan a visit
              </a>
            </div>
          </div>
        </div>
      </div>

      {!gone && (
        <div
          role="status"
          aria-label="Loading"
          className={clsx(
            "fixed inset-0 z-[80] grid place-items-center bg-paper text-ink transition-[opacity,clip-path] duration-[900ms] ease-[var(--ease-out-expo)]",
            lifted ? "pointer-events-none opacity-0 [clip-path:inset(0_0_100%_0)]" : "opacity-100 [clip-path:inset(0_0_0%_0)]"
          )}
        >
          <div className="flex flex-col items-center">
            <PourGlass fill={shown} steam={shown >= 1} className="w-[min(300px,66vw)]" />
            <Lockup className="mt-4 w-[min(240px,58vw)] text-[clamp(34px,8vw,52px)]" />
            <span className="tnum mt-5 text-[12px] font-semibold tracking-[0.2em] text-ink-3">{Math.round(shown * 100)}%</span>
          </div>
        </div>
      )}
    </section>
  );
}
