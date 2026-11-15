import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Hanken_Grotesk, Italianno } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/JsonLd";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo/config";
import { siteJsonLd } from "@/lib/seo/jsonld";
import { rootMetadata } from "@/lib/seo/metadata";
import "./globals.css";

const display = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", axes: ["opsz"], style: ["normal", "italic"] });
const text = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken" });
const script = Italianno({ subsets: ["latin"], weight: "400", variable: "--font-italianno" });

// Base URL, robots (noindex while it's an unpaid preview), share card: src/lib/seo (LAUNCH-STANDARD.md).
// The home page sets its own canonical (app/page.tsx).
export const metadata: Metadata = rootMetadata({ title: HOME_TITLE, description: HOME_DESCRIPTION });

export const viewport: Viewport = {
  themeColor: "#f7f2ea",
};

const CONTRACT = `
THESIS: The category standard executed at Blue Bottle and Tartine craft: the food carries the page, and the one thing a neighbouring cafe can't copy is Castagna's own case, cups and prices. Refuses latte-art stock and generic "artisan" copy.
OWN-WORLD: warm paper ground, espresso ink, Castagna cup red as the only accent; Bodoni display with its Italian italics, Hanken Grotesk text, the window's "Pasticceria" script once. Red cups, marble, mosaic.
STORY: Visitors see the affogato pour, learn what's in the case and when it's open, then walk over; seated guests scan to read the menu and leave a review.
FIRST VIEWPORT: full-bleed affogato pour film, the CASTAGNA / Pasticceria lockup and headline lower left, See today's menu primary, open-now line beside it, rating chip top right.
FORM: canon (category standard by choice), seed e2e67eab.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} ${script.variable} antialiased`}>
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: `<!--${CONTRACT}-->` }} />
        <JsonLd data={siteJsonLd()} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
