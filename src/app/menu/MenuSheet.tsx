"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Star } from "lucide-react";
import { Lockup } from "@/components/Lockup";
import { menu, menuNote } from "@/data/menu";
import { shop, status } from "@/data/shop";

/**
 * The table menu: what a guest sees after scanning the card. The sheet rises over a photo of the counter, the
 * category chips stay pinned and follow the reading position, and everything is sized for a phone in the sun.
 */
export function MenuSheet() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(menu[0].id);
  const [open, setOpen] = useState<string | null>(null);
  const chips = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(status().label);
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (seen) setActive(seen.target.id);
      },
      { rootMargin: "-120px 0px -60% 0px" }
    );
    menu.forEach((m) => io.observe(document.getElementById(m.id)!));
    return () => io.disconnect();
  }, []);

  // keep the active chip in view, scrolling the chip row only (never the page)
  useEffect(() => {
    const row = chips.current;
    const chip = row?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (!row || !chip) return;
    row.scrollTo({ left: chip.offsetLeft - row.clientWidth / 2 + chip.clientWidth / 2, behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="min-h-[100svh] bg-ink">
      <div className="relative h-[34svh] min-h-[220px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/photos/counter.jpg" alt="Castagna's counter, pastry case and espresso bar" className="absolute inset-0 h-full w-full object-cover" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgb(20_14_10/.55),rgb(20_14_10/.2)_45%,rgb(20_14_10/.7))]" />
        <Link href="/" className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-2 text-[13px] font-semibold text-white backdrop-blur-sm">
          <ArrowLeft size={15} /> Website
        </Link>
        <div className="absolute inset-x-0 bottom-10 flex justify-center">
          <Lockup tone="paper" className="w-[min(220px,60vw)] text-[clamp(34px,10vw,46px)]" />
        </div>
      </div>

      <motion.main
        initial={reduce ? false : { y: "40%", opacity: 0.6 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 22, mass: 0.9 }}
        className="relative -mt-6 rounded-t-[28px] bg-paper pb-16 text-ink shadow-[0_-20px_40px_-20px_rgb(0_0_0/.5)]"
      >
        <div aria-hidden className="mx-auto h-1.5 w-12 translate-y-3 rounded-full bg-ink/15" />
        <div className="mx-auto max-w-[680px] px-5 pt-8">
          <h1 className="display text-[40px] font-medium leading-none">Today&apos;s menu</h1>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{menuNote}</p>
          {open && <p className="mt-2 text-[14.5px] font-semibold text-cup">{open}</p>}
        </div>

        <div className="sticky top-0 z-10 mt-6 bg-paper/95 backdrop-blur-md">
          <div ref={chips} className="mx-auto flex max-w-[680px] gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {menu.map((m) => (
              <button
                key={m.id}
                type="button"
                data-chip={m.id}
                onClick={() => go(m.id)}
                aria-current={active === m.id ? "true" : undefined}
                className={clsx(
                  "shrink-0 rounded-full px-4 py-2 text-[14.5px] font-semibold transition-colors duration-200",
                  active === m.id ? "bg-ink text-paper" : "bg-paper-2 text-ink-2"
                )}
              >
                {m.title}
              </button>
            ))}
          </div>
          <div className="rule border-b" />
        </div>

        <div className="mx-auto max-w-[680px] px-5">
          {menu.map((m) => (
            <section key={m.id} id={m.id} className="scroll-mt-20 pt-10">
              <h2 className="display text-[34px] font-medium italic leading-none">{m.title}</h2>
              <p className="mt-2 text-[15px] text-ink-2">{m.intro}</p>
              <ul className="rule mt-4 border-t">
                {m.items.map((it) => (
                  <li key={it.name} className="rule flex items-baseline justify-between gap-4 border-b py-4">
                    <span>
                      <span className="block text-[18px] font-semibold leading-snug">{it.name}</span>
                      {it.note && <span className="mt-0.5 block text-[14.5px] text-ink-2">{it.note}</span>}
                    </span>
                    {it.price ? (
                      <span className="tnum shrink-0 text-[18px] font-semibold">{it.price}</span>
                    ) : (
                      <span className="shrink-0 text-[13.5px] text-ink-3">at the counter</span>
                    )}
                  </li>
                ))}
              </ul>
              {m.extra?.map((x) => (
                <div key={x.title} className="mt-4 rounded-[16px] bg-paper-2 px-4 py-3.5">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-2">{x.title}</p>
                  {x.lines.map((l) => (
                    <p key={l} className="mt-1 text-[15.5px] leading-snug">
                      {l}
                    </p>
                  ))}
                </div>
              ))}
            </section>
          ))}

          <div className="mt-14 rounded-[22px] bg-cup p-6 text-white">
            <p className="display text-[30px] italic leading-none">Loved it?</p>
            <p className="mt-2 text-[15.5px] text-white/85">A quick review on Yelp helps a small shop more than you&apos;d think.</p>
            <a href={shop.review} target="_blank" rel="noopener noreferrer" className="btn btn-paper mt-5">
              <Star size={16} /> Write a review <ArrowUpRight size={16} />
            </a>
          </div>
          <p className="mt-8 text-center text-[13px] text-ink-3">
            {shop.oneLine} · Concept by Arman Digital
          </p>
        </div>
      </motion.main>
    </div>
  );
}
