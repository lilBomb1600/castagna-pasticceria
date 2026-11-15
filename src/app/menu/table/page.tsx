import type { Metadata, Viewport } from "next";
import { pageMetadata, privatePageMetadata } from "@/lib/seo/metadata";
import { getMenu } from "@/data/live-menu";
import { MenuSheet } from "../MenuSheet";

/**
 * The address printed on the table cards. Same menu as /menu, on its own path so the analytics can tell a scan
 * at a table apart from a visit from the website.
 */
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Menu · Castagna Pasticceria",
    description: "Today's menu at Castagna Pasticceria, Lafayette: espresso, gelato, pastry, panini and bread.",
    path: "/menu",
  }),
  // Never indexed, even on the live site: it's the QR scan twin of /menu.
  ...privatePageMetadata,
};

export const viewport: Viewport = {
  themeColor: "#211913",
};

export default async function TableMenuPage() {
  return <MenuSheet menu={await getMenu()} />;
}
