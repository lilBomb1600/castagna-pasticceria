import type { Viewport } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { getMenu } from "@/data/live-menu";
import { MenuSheet } from "./MenuSheet";

export const metadata = pageMetadata({
  title: "Menu · Castagna Pasticceria",
  description: "Today's menu at Castagna Pasticceria, Lafayette: espresso, gelato, pastry, panini and bread.",
  path: "/menu",
});

export const viewport: Viewport = {
  themeColor: "#211913",
};

export default async function MenuPage() {
  return <MenuSheet menu={await getMenu()} />;
}
