import { hours, shop } from "@/data/shop";
import { siteUrl } from "@/data/site";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/**
 * What Google reads to show the shop's hours, address and menu link in search and Maps. Only published facts:
 * no phone, price range or rating, since the shop publishes none of its own.
 */
export function ShopSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Bakery", "CafeOrCoffeeShop", "IceCreamShop"],
    "@id": `${siteUrl}/#shop`,
    name: "Castagna Pasticceria",
    description: "An Italian-owned pasticceria, gelateria and espresso bar on Plaza Way in Lafayette, California.",
    url: siteUrl,
    image: [`${siteUrl}/film/hero.jpg`, `${siteUrl}/photos/storefront.jpg`, `${siteUrl}/photos/interior.jpg`],
    hasMenu: `${siteUrl}/menu`,
    servesCuisine: ["Italian", "Pastry", "Gelato", "Coffee"],
    address: {
      "@type": "PostalAddress",
      streetAddress: shop.street,
      addressLocality: "Lafayette",
      addressRegion: "CA",
      postalCode: "94549",
      addressCountry: "US",
    },
    hasMap: shop.maps,
    sameAs: [shop.yelp],
    openingHoursSpecification: hours.flatMap((h, i) =>
      h.open === undefined || h.close === undefined
        ? []
        : [{ "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${DAYS[i]}`, opens: hhmm(h.open), closes: hhmm(h.close) }]
    ),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }} />;
}
