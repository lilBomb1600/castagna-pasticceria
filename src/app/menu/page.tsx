import type { Metadata, Viewport } from "next";
import { getMenu } from "@/data/live-menu";
import { MenuSheet } from "./MenuSheet";

export const metadata: Metadata = {
  title: "Menu · Castagna Pasticceria",
  description: "Today's menu at Castagna Pasticceria, Lafayette: espresso, gelato, pastry, panini and bread.",
  alternates: { canonical: "/menu" },
};

export const viewport: Viewport = {
  themeColor: "#211913",
};

export default async function MenuPage() {
  return <MenuSheet menu={await getMenu()} />;
}
