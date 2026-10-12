import type { Metadata, Viewport } from "next";
import { getMenu } from "@/data/live-menu";
import { MenuSheet } from "../MenuSheet";

/**
 * The address printed on the table cards. Same menu as /menu, on its own path so the analytics can tell a scan
 * at a table apart from a visit from the website.
 */
export const metadata: Metadata = {
  title: "Menu · Castagna Pasticceria",
  description: "Today's menu at Castagna Pasticceria, Lafayette: espresso, gelato, pastry, panini and bread.",
  alternates: { canonical: "/menu" },
  robots: { index: false },
};

export const viewport: Viewport = {
  themeColor: "#211913",
};

export default async function TableMenuPage() {
  return <MenuSheet menu={await getMenu()} />;
}
