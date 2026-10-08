import type { Metadata, Viewport } from "next";
import { MenuSheet } from "./MenuSheet";

export const metadata: Metadata = {
  title: "Menu · Castagna Pasticceria",
  description: "Today's menu at Castagna Pasticceria, Lafayette: espresso, gelato, pastry, panini and bread.",
};

export const viewport: Viewport = {
  themeColor: "#211913",
};

export default function MenuPage() {
  return <MenuSheet />;
}
