import type { Metadata } from "next";
import { TableCards } from "./TableCards";

export const metadata: Metadata = {
  title: "Table cards · Castagna Pasticceria",
  robots: { index: false },
};

export default function TableCardPage() {
  return <TableCards />;
}
