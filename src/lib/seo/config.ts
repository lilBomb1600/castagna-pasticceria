/**
 * SEO kit config for Castagna Pasticceria (the only kit file edited for this project).
 *
 * Every value is read from src/data/shop.ts (its Yelp listing, reviews and the signage in customer photos) or carried
 * over word for word from the JSON-LD the site already had (components/ShopSchema.tsx before the kit). The shop
 * publishes no phone, email, website or price range, so none appears here, and its Yelp/Google rating stays off the
 * JSON-LD (self-serving stars, LAUNCH-STANDARD.md B5).
 */
import { hours, shop } from "@/data/shop";
import { siteUrl } from "@/data/site";
import type { BusinessFacts, DayOfWeek, Locale, OgImage, PageEntry, ServiceFact } from "./types";

/** The preview URL (src/data/site.ts). On launch: NEXT_PUBLIC_SITE_URL=https://www.the-shops-domain.com in Vercel. */
export const FALLBACK_URL: string = siteUrl;

/** One URL per page, English only. */
export const LOCALES: Locale[] = ["en"];
export const DEFAULT_LOCALE: Locale = "en";

/**
 * src/app/opengraph-image.jpg (1200 x 630, alt in opengraph-image.alt.txt). Next serves that file as og:image for
 * every route; this entry gives twitter:image and the JSON-LD the same picture.
 */
export const OG_IMAGE: OgImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "An affogato being poured into a red Castagna cup on a marble table, with the Castagna Pasticceria lockup",
};

/** Home title and description, unchanged from the site's first build (63 and 155 characters). */
export const HOME_TITLE = "Castagna Pasticceria · Gelato, espresso and pastry in Lafayette";
export const HOME_DESCRIPTION =
  "An Italian-owned pasticceria on Plaza Way in Lafayette: croissants and bread from the oven in the back, gelato in the case, espresso brought to your table.";

/** "Lafayette, CA 94549" -> locality, region, postal code. */
const [, locality, region, postalCode] = shop.city.match(/^(.+), ([A-Z]{2}) (\d{5})$/) ?? [];

const minutes = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

export const facts: BusinessFacts = {
  name: `${shop.name} ${shop.kind}`,
  type: ["Bakery", "CafeOrCoffeeShop", "IceCreamShop"],
  description: "An Italian-owned pasticceria, gelateria and espresso bar on Plaza Way in Lafayette, California.",
  // Storefront: the street address on its listings.
  address: { street: shop.street, locality, region, postalCode },
  serviceArea: [`${locality}, ${region}`],
  image: ["/film/hero.jpg", "/photos/storefront.jpg", "/photos/interior.jpg"],
  hasMap: shop.maps,
  sameAs: [shop.yelp],
  // Posted hours (shop.ts); Monday is closed, so it has no entry.
  hours: hours.flatMap((h) =>
    h.open === undefined || h.close === undefined
      ? []
      : [{ days: [h.day as DayOfWeek], opens: minutes(h.open), closes: minutes(h.close) }],
  ),
  menu: "/menu",
  servesCuisine: ["Italian", "Pastry", "Gelato", "Coffee"],
};

/** A pasticceria: the menu is the offer, so no Service nodes. */
export const services: ServiceFact[] = [];

/** Indexable pages (live sitemap only). /menu/table (QR scans) and /table-card (print sheet) stay out. */
export const pages: PageEntry[] = [{ path: "/" }, { path: "/menu" }];
