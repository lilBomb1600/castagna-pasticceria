import type { Metadata } from "next";
import { privatePageMetadata } from "@/lib/seo/metadata";
import { TableCards } from "./TableCards";

export const metadata: Metadata = {
  title: "Table cards · Castagna Pasticceria",
  ...privatePageMetadata,
};

export default function TableCardPage() {
  return <TableCards />;
}
