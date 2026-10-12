import { cacheLife } from "next/cache";
import { composeMenu, fileMenu, fileSections, seenFlavors, type Menu, type Section } from "./menu";

/**
 * The owner's menu, read from a Google Sheet. One row per item with the columns Section, Item, Description,
 * Price, Sold out. Rows whose section mentions "flavor" become today's gelato flavors. MENU_SHEET_CSV holds either
 * the sheet's normal share link ("Anyone with the link can view"), which reads the live sheet so edits show within
 * about half a minute, or a "Publish to web" CSV link, which Google only refreshes every few minutes. The menu is
 * re-read every 15 seconds; if the sheet is missing, unreachable or unreadable, the menu in menu.ts is served.
 */
export async function getMenu(): Promise<Menu> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 15, expire: 300 });
  const link = process.env.MENU_SHEET_CSV;
  if (!link) return fileMenu;
  try {
    const res = await fetch(csvUrl(link), { signal: AbortSignal.timeout(6000) });
    if (!res.ok) return fileMenu;
    return menuFromCsv(await res.text()) ?? fileMenu;
  } catch {
    return fileMenu;
  }
}

/**
 * A share link (…/spreadsheets/d/<id>/edit…) becomes the sheet's live CSV export; a published link
 * (…/spreadsheets/d/e/<key>/pub?output=csv) is already CSV and passes through.
 */
function csvUrl(link: string) {
  const id = link.match(/docs\.google\.com\/spreadsheets\/d\/([\w-]{20,})/)?.[1];
  if (!id) return link;
  const gid = link.match(/[#&?]gid=(\d+)/)?.[1];
  return `https://docs.google.com/spreadsheets/d/${id}/export?format=csv${gid ? `&gid=${gid}` : ""}`;
}

const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Quoted fields, doubled quotes and CRLF, which is everything Google's CSV export produces. */
function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c !== '"') cell += c;
      else if (text[i + 1] === '"') cell += text[i++];
      else quoted = false;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(cell);
      cell = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += c;
  }
  if (cell || row.length) rows.push([...row, cell]);
  return rows.filter((r) => r.some((c) => c.trim()));
}

/** "3.5", "3.50" and "$3.50" all print as $3.50; anything else ("60¢", "2 for $5") prints as typed. */
function price(raw = "") {
  const v = raw.trim();
  if (!v) return undefined;
  const n = v.replace(/^\$\s*/, "");
  return /^\d+(\.\d{1,2})?$/.test(n) ? `$${Number(n).toFixed(2)}` : v;
}

const marked = (raw = "") => /^(y|yes|x|true|1|sold out|out)$/i.test(raw.trim());

export function menuFromCsv(text: string): Menu | null {
  const [head, ...rows] = parseCsv(text);
  if (!head) return null;
  const col = (prefix: string) => head.findIndex((h) => fold(h).startsWith(prefix));
  const at = { section: col("section"), item: col("item"), note: col("desc"), price: col("price"), out: col("sold") };
  if (at.section < 0 || at.item < 0) return null;

  const sections: Section[] = [];
  const flavors: string[] = [];
  for (const r of rows) {
    const title = r[at.section]?.trim();
    const name = r[at.item]?.trim();
    if (!title || !name) continue;
    const soldOut = at.out >= 0 && marked(r[at.out]);
    const key = fold(title);
    if (/flavo|gusti/.test(key)) {
      if (!soldOut) flavors.push(name);
      continue;
    }
    let sec = sections.find((s) => fold(s.title) === key || s.id === key);
    if (!sec) {
      // known sections keep their id (the page's anchors) and intro; new ones get a slug and no intro
      const known = fileSections.find((s) => fold(s.title) === key || s.id === key);
      sec = { id: known?.id ?? key.replace(/ /g, "-"), title: known?.title ?? title, intro: known?.intro ?? "", extra: known?.extra, items: [] };
      sections.push(sec);
    }
    sec.items.push({ name, note: r[at.note]?.trim() || undefined, price: price(r[at.price]), soldOut: soldOut || undefined });
  }
  if (!sections.length) return null;
  return composeMenu(sections, flavors.length ? flavors : seenFlavors, flavors.length > 0);
}
