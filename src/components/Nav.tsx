"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Lockup } from "./Lockup";

const links = [
  { href: "#case", label: "The case" },
  { href: "#gelato", label: "Gelato" },
  { href: "#table", label: "Table menu" },
  { href: "#visit", label: "Visit" },
];

/** Clear over the film; settles onto paper once the page moves. */
export function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > window.innerHeight * 0.7);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ease-[var(--ease-out-quart)]",
        solid ? "bg-paper/92 text-ink shadow-[0_1px_0_rgb(33_25_19/.08)] backdrop-blur-md" : "bg-transparent text-white"
      )}
    >
      <div className="mx-auto flex h-[68px] max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <a href="#top" aria-label="Castagna Pasticceria, back to top" className="w-[118px] text-[25px]">
          <Lockup tone={solid ? "ink" : "paper"} className="w-full" />
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={clsx(
                "rounded-full px-4 py-2 text-[14.5px] font-medium transition-colors",
                solid ? "text-ink-2 hover:bg-paper-2 hover:text-ink" : "text-white/85 hover:bg-white/10 hover:text-white"
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Link href="/menu" className="btn btn-cup !px-5 !py-2.5 text-[14px]">
          Menu
        </Link>
      </div>
    </header>
  );
}
