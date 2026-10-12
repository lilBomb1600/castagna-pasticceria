"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { Lockup } from "@/components/Lockup";
import { QrCode } from "@/components/QrCode";
import { shop } from "@/data/shop";

function Card() {
  return (
    <div className="table-card flex h-[3.5in] w-[5.5in] flex-col overflow-hidden rounded-[10px] bg-paper text-ink ring-1 ring-ink/15 print:rounded-none print:ring-ink/30">
      <div className="flex items-center justify-between bg-cup px-5 py-2.5 text-white">
        <Lockup tone="paper" className="w-[118px] text-[21px]" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">3531 Plaza Way</span>
      </div>
      <div className="grid flex-1 grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-2.5 px-4">
          <QrCode path="/menu/table" label="Menu QR code" className="w-[1.45in]" />
          <p className="display text-[19px] italic leading-none">Scan for the menu</p>
          <p className="text-center text-[10.5px] leading-snug text-ink-2">Point your phone&apos;s camera at the code.</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2.5 border-l border-dashed border-ink/20 px-4">
          <QrCode href={shop.review} label="Google review QR code" className="w-[1.45in]" />
          <p className="display text-[19px] italic leading-none">Loved it?</p>
          <p className="text-center text-[10.5px] leading-snug text-ink-2">Scan to leave us a review on Google. Grazie!</p>
        </div>
      </div>
    </div>
  );
}

/** Two table cards per letter sheet: cut along the outline, fold or slide into a stand. */
export function TableCards() {
  return (
    <div className="min-h-screen bg-paper-2 px-5 py-10 print:bg-white print:p-0">
      <div className="mx-auto mb-8 flex max-w-[5.5in] flex-wrap items-center justify-between gap-4 print:hidden">
        <Link href="/" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink-2 hover:text-ink">
          <ArrowLeft size={15} /> Website
        </Link>
        <button type="button" onClick={() => window.print()} className="btn btn-cup">
          <Printer size={17} /> Print cards
        </button>
      </div>
      <div className="flex flex-col items-center gap-[0.6in] print:gap-[0.5in] print:pt-[0.6in]">
        <Card />
        <Card />
      </div>
      <p className="mx-auto mt-8 max-w-[5.5in] text-center text-[13px] text-ink-3 print:hidden">
        Prints two 5.5 × 3.5 in cards on a letter sheet. The menu code always points at this website&apos;s own address.
      </p>
    </div>
  );
}
