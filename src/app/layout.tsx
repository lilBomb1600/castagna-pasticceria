import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Hanken_Grotesk, Italianno } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteUrl } from "@/data/site";
import "./globals.css";

const display = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", axes: ["opsz"], style: ["normal", "italic"] });
const text = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken" });
const script = Italianno({ subsets: ["latin"], weight: "400", variable: "--font-italianno" });

const description =
  "An Italian-owned pasticceria on Plaza Way in Lafayette: croissants and bread from the oven in the back, gelato in the case, espresso brought to your table.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Castagna Pasticceria · Gelato, espresso and pastry in Lafayette",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Castagna Pasticceria",
    title: "Castagna Pasticceria · Lafayette",
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: "Castagna Pasticceria · Lafayette", description },
};

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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
