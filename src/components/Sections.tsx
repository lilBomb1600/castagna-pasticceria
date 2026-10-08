"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Printer, Star } from "lucide-react";
import { AffogatoPour } from "./AffogatoPour";
import { Lockup } from "./Lockup";
import { QrCode } from "./QrCode";
import { menu, menuNote } from "@/data/menu";
import { reviews } from "@/data/reviews";
import { clock, hours, shop, status } from "@/data/shop";

/** A film that plays while it is on screen and rests on its first frame otherwise (always, for reduced motion). */
function Film({ src, poster, label, className }: { src: string; poster: string; label: string; className?: string }) {
  const v = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = v.current!;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <video ref={v} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} className={clsx("h-full w-full object-cover", className)} />
  );
}

const pick = (id: string, names: string[]) => {
  const s = menu.find((m) => m.id === id)!;
  return names.map((n) => s.items.find((i) => i.name === n)!).filter(Boolean);
};

function Price({ value }: { value?: string }) {
  return value ? <span className="tnum font-semibold text-ink">{value}</span> : <span className="text-[13px] text-ink-3">at the counter</span>;
}

/** One category of the case: names, with prices where the shop posts them and one "at the counter" line where it doesn't. */
function CaseList({ title, body, items }: { title: string; body: string; items: { name: string; note?: string; price?: string }[] }) {
  const priced = items.some((i) => i.price);
  return (
    <div>
      <h3 className="display text-[30px] font-medium italic leading-none">{title}</h3>
      <p className="mt-2 max-w-[40ch] text-[15.5px] leading-relaxed text-ink-2">{body}</p>
      <ul className="rule mt-4 border-t">
        {items.map((it) => (
          <li key={it.name} className="rule flex items-baseline justify-between gap-4 border-b py-2.5 text-[15.5px]">
            <span>
              {it.name}
              {it.note && <span className="text-ink-3"> · {it.note}</span>}
            </span>
            {it.price && <span className="tnum font-semibold">{it.price}</span>}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[13px] text-ink-3">{priced ? "Everything else: price at the counter." : "Prices at the counter."}</p>
    </div>
  );
}

export function TheCase() {
  const sec = (id: string) => menu.find((m) => m.id === id)!;
  return (
    <section id="case" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <figure>
            <div className="overflow-hidden rounded-[3px] bg-paper-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/interior.jpg"
                alt="Castagna's pastry case with its handwritten tags: croissant $3.50, bostock in hazelnut and tropical, mixed berry scones $4.75, and a tray of focaccia pizza"
                className="aspect-[4/5] w-full object-cover object-[50%_35%]"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 text-[13.5px] text-ink-3">The case on Plaza Way, tags and all. Photo from a Yelp customer.</figcaption>
          </figure>
          <div className="case-lists">
            <h2 className="display text-[clamp(38px,5vw,68px)] font-medium leading-[1]">What&apos;s in the case</h2>
            <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-ink-2">
              It changes every day. Like a small caf&eacute; in Europe, you choose from what came out of the oven that morning.
            </p>
            <div className="mt-10 space-y-10">
              <CaseList title="Pasticceria" body="Baked in the back, almost in front of you." items={sec("pasticceria").items} />
              <CaseList title="Caffè" body="Pulled at the bar and carried to your table, inside or out on the plaza." items={sec("caffe").items.slice(0, 4)} />
              <CaseList title="Panini & bread" body="Lunch from the same oven, and a loaf to take home." items={[...sec("salato").items, ...sec("pane").items.slice(0, 1)]} />
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {[
            { src: "/film/cortado.mp4", poster: "/film/cortado.jpg", label: "Steamed milk poured into a cortado on a red saucer", cap: "A cortado, on one of the red saucers." },
            { src: "/film/croissant.mp4", poster: "/film/croissant.jpg", label: "A croissant pulled apart over a red plate", cap: "A croissant, pulled apart." },
          ].map((f) => (
            <figure key={f.src}>
              <div className="aspect-[4/5] overflow-hidden rounded-[3px] bg-paper-2 sm:aspect-[3/4]">
                <Film src={f.src} poster={f.poster} label={f.label} />
              </div>
              <figcaption className="display mt-3 text-[20px] italic">{f.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const FLAVORS = ["Hazelnut", "Vanilla", "Belgian chocolate", "Salted caramel", "Tiramisu", "Sour cherry", "Ricotta", "Cassis", "Spumoni"];

export function Gelato() {
  const sizes = menu.find((m) => m.id === "gelato")!.items;
  return (
    <section id="gelato" className="bg-paper-2 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <h2 className="display text-[clamp(38px,5.2vw,72px)] font-medium leading-[1]">
              Gelato, <em className="font-normal italic">a taste first.</em>
            </h2>
            <p className="mt-5 max-w-[48ch] text-[17px] leading-relaxed text-ink-2">
              Ask to try a flavor or two before you choose. These have all been in the case; today&apos;s are behind the glass.
            </p>
            <div className="mt-10 aspect-[4/3] overflow-hidden rounded-[3px] bg-paper">
              <Film src="/film/gelato.mp4" poster="/film/gelato.jpg" label="A spatola folding gelato in Castagna's display case" />
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-x-8 sm:grid-cols-3" aria-label="Flavors seen in the case">
              {FLAVORS.map((f) => (
                <li key={f} className="rule display border-b py-3 text-[22px] italic leading-tight">
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <div className="rounded-[6px] bg-paper p-7 sm:p-9">
              <h3 className="display text-[30px] font-medium leading-tight">Cups</h3>
              <ul className="rule mt-4 border-t">
                {sizes.map((s) => (
                  <li key={s.name} className="rule flex items-baseline justify-between border-b py-3.5 text-[16.5px]">
                    <span>{s.name}</span>
                    <span className="tnum font-semibold">{s.price}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[13.5px] text-ink-3">Prices from the shop&apos;s own signs.</p>
            </div>

            <div className="mt-6 rounded-[6px] bg-paper px-7 pb-8 pt-8 sm:px-9">
              <AffogatoPour
                title="Affogato"
                body="A shot of espresso poured over a scoop of gelato, in one of the red cups. Vanilla is the classic."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TableQR() {
  const preview = menu.filter((m) => ["caffe", "pasticceria"].includes(m.id));
  return (
    <section id="table" className="relative overflow-hidden bg-ink px-5 py-24 text-paper sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        {/* the phone at the table */}
        <div className="relative mx-auto hidden w-[min(330px,80vw)] lg:block">
          <div className="rounded-[44px] bg-[#0f0b08] p-3 shadow-[0_40px_80px_-30px_rgb(0_0_0/.8)] ring-1 ring-white/10">
            <div className="h-[600px] overflow-hidden rounded-[34px] bg-paper text-ink">
              <div className="flex items-center justify-between px-5 pb-3 pt-5">
                <Lockup className="w-[92px] text-[19px]" />
                <span className="rounded-full bg-cup px-3 py-1 text-[11px] font-semibold text-white">Table menu</span>
              </div>
              <div className="flex gap-2 overflow-hidden px-5 pb-3">
                {menu.slice(0, 4).map((m, i) => (
                  <span key={m.id} className={clsx("shrink-0 rounded-full px-3 py-1.5 text-[12px] font-semibold", i === 0 ? "bg-ink text-paper" : "bg-paper-2 text-ink-2")}>
                    {m.title}
                  </span>
                ))}
              </div>
              <div className="space-y-5 px-5 pt-2">
                {preview.map((sec) => (
                  <div key={sec.id}>
                    <p className="display text-[22px] italic">{sec.title}</p>
                    <ul className="rule mt-1.5 border-t">
                      {sec.items.slice(0, 4).map((it) => (
                        <li key={it.name} className="rule flex items-baseline justify-between border-b py-2 text-[13.5px]">
                          <span>{it.name}</span>
                          <Price value={it.price} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="display text-[clamp(38px,5.2vw,72px)] font-medium leading-[1]">
            Scan the table, <em className="font-normal italic">the menu opens.</em>
          </h2>
          <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-paper/80">
            Every table carries a small card. Point your phone&apos;s camera at it and today&apos;s menu opens, big enough to read in the sun on the patio. No app, no paper.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-[6px] bg-paper p-6 text-ink">
              <QrCode path="/menu" label="QR code for Castagna's menu" className="mx-auto w-[min(180px,100%)]" />
              <p className="display mt-5 text-[24px] italic leading-none">The menu</p>
              <Link href="/menu" className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-cup hover:underline">
                Open it here <ArrowRight size={16} />
              </Link>
            </div>
            <div className="rounded-[6px] bg-cup p-6 text-white">
              <div className="rounded-[3px] bg-paper p-4">
                <QrCode href={shop.review} label="QR code to review Castagna on Yelp" className="mx-auto w-[min(148px,100%)]" />
              </div>
              <p className="display mt-5 text-[24px] italic leading-none">Loved it?</p>
              <a href={shop.review} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-white hover:underline">
                Leave a Yelp review <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <Link href="/table-card" className="btn mt-8 bg-white/10 text-paper ring-1 ring-white/20 hover:bg-white/20">
            <Printer size={17} /> Print the table cards
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display max-w-[16ch] text-[clamp(38px,5.2vw,72px)] font-medium leading-[1]">
            {shop.rating.stars} stars, <em className="font-normal italic">{shop.rating.count} reviews.</em>
          </h2>
          <a href={shop.yelp} target="_blank" rel="noopener noreferrer" className="btn btn-line">
            <Star size={16} /> Read them all on Yelp
          </a>
        </div>
        <div className="mt-14 gap-6 [column-fill:_balance] sm:columns-2 lg:columns-3">
          {reviews.map((r) => (
            <figure key={r.who} className="mb-6 break-inside-avoid rounded-[6px] bg-paper-2 p-7">
              <blockquote className="display text-[22px] leading-[1.35] text-ink">&ldquo;{r.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 text-[14px] text-ink-2">
                <span className="font-semibold text-ink">{r.who}</span> · {r.where} · {r.when}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-[13.5px] text-ink-3">Excerpts from Yelp reviews, quoted as written. Rating as of {shop.rating.checked}.</p>
      </div>
    </section>
  );
}

export function Visit() {
  const [today, setToday] = useState<number | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    const s = status();
    setToday(s.today);
    setLabel(s.label);
  }, []);
  return (
    <section id="visit" className="bg-paper-2 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="aspect-[4/3] overflow-hidden rounded-[3px] bg-paper lg:aspect-auto lg:min-h-[560px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/storefront.jpg" alt="Castagna's storefront on Plaza Way, with bistro chairs and a mosaic table outside" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div>
          <h2 className="display text-[clamp(38px,5.2vw,72px)] font-medium leading-[1]">
            On Plaza&nbsp;Way, <em className="font-normal italic">Lafayette.</em>
          </h2>
          <p className="mt-5 text-[18px] leading-relaxed">
            {shop.street}
            <br />
            {shop.city}
          </p>
          {label && <p className="mt-3 text-[15px] font-semibold text-cup">{label}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={shop.directions} target="_blank" rel="noopener noreferrer" className="btn btn-cup">
              Get directions <ArrowUpRight size={17} />
            </a>
            <Link href="/menu" className="btn btn-line">
              See the menu
            </Link>
          </div>
          <table className="mt-10 w-full text-[16px]">
            <caption className="sr-only">Opening hours</caption>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 0].map((d) => {
                const h = hours[d];
                const on = d === today;
                return (
                  <tr key={h.day} className={clsx("rule border-b", on && "font-semibold")}>
                    <th scope="row" className="py-3 text-left font-[inherit]">
                      {h.day}
                      {on && <span className="ml-2 rounded-full bg-cup px-2 py-0.5 text-[11px] font-semibold text-white">Today</span>}
                    </th>
                    <td className={clsx("tnum py-3 text-right", h.open === undefined && "text-ink-3")}>
                      {h.open !== undefined ? `${clock(h.open)} – ${clock(h.close!)}` : "Closed"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px] text-ink-2">
            {shop.amenities.map((a) => (
              <li key={a} className="flex items-start gap-2.5">
                <span aria-hidden className="mt-[9px] block h-1.5 w-1.5 shrink-0 rounded-full bg-cup" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink px-5 pb-10 pt-20 text-paper sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Lockup tone="paper" className="w-[min(320px,80vw)] text-[clamp(44px,8vw,64px)]" />
          <div className="flex flex-wrap gap-3">
            <Link href="/menu" className="btn btn-cup">
              Menu
            </Link>
            <a href={shop.review} target="_blank" rel="noopener noreferrer" className="btn bg-white/10 text-paper ring-1 ring-white/20 hover:bg-white/20">
              Review us on Yelp
            </a>
          </div>
        </div>
        <div className="mt-14 grid gap-8 border-t border-white/10 pt-8 text-[14.5px] text-paper/75 md:grid-cols-3">
          <p>
            {shop.street}
            <br />
            {shop.city}
          </p>
          <p>
            Tue–Thu & Sun 9 AM – 3 PM
            <br />
            Fri–Sat 8:30 AM – 4 PM · Closed Monday
          </p>
          <p className="text-[13px] leading-relaxed text-paper/55">
            Photos by Yelp customers. The short films were animated from those photos with AI. {menuNote} A concept site by Arman Digital, not affiliated with Castagna Pasticceria.
          </p>
        </div>
      </div>
    </footer>
  );
}
