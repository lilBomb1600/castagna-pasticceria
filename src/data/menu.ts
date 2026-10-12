/**
 * The menu as far as public evidence goes. Items come from Yelp reviews and from the shop's own signage in
 * customer photos. A price appears only where it was legible on that signage; everything else is "at the
 * counter" until the owner's menu board replaces this file. The case changes daily.
 *
 * When MENU_SHEET_CSV is set, the owner's published Google Sheet replaces these items (see live-menu.ts and
 * docs/menu-sheet.md); this file stays as the fallback if the sheet is ever unreachable.
 */

export type Item = { name: string; note?: string; price?: string; soldOut?: boolean };
export type Section = { id: string; title: string; intro: string; items: Item[]; extra?: { title: string; lines: string[] }[] };
/** `today` is true when the flavors come from the owner's sheet rather than from photos of past cases. */
export type Menu = { sections: Section[]; flavors: string[]; today: boolean };

export const fileSections: Section[] = [
  {
    id: "caffe",
    title: "Caffè",
    intro: "Espresso drinks pulled at the bar, brought to your table.",
    items: [
      { name: "Espresso" },
      { name: "Cortado" },
      { name: "Latte", note: "Hot or iced" },
      { name: "Affogato", note: "A shot of espresso poured over gelato" },
      { name: "Tea", note: "A selection of hot teas" },
    ],
    extra: [
      { title: "Syrups", lines: ["Vanilla, hazelnut, salted caramel, peppermint, almond, lavender, chocolate", "Sugar-free versions of some"] },
      { title: "Milk", lines: ["Whole, 2%, non-fat, oat, almond, soy"] },
    ],
  },
  {
    id: "gelato",
    title: "Gelato",
    intro: "Ask to taste before you choose; they're happy to let you.",
    items: [
      { name: "Small cup", price: "$4.75" },
      { name: "Medium cup", price: "$6.75" },
      { name: "Large cup", price: "$8.00" },
      { name: "Toppings", price: "60¢" },
    ],
  },
  {
    id: "pasticceria",
    title: "Pasticceria",
    intro: "Baked in the back, a few steps from the counter.",
    items: [
      { name: "Croissant", price: "$3.50" },
      { name: "Chocolate almond croissant" },
      { name: "Bostock", note: "Hazelnut or tropical", price: "$3.50" },
      { name: "Mixed berry scone", price: "$4.75" },
      { name: "Cannoli" },
      { name: "Sfogliatelle" },
      { name: "Brownie" },
      { name: "Cookies" },
    ],
  },
  {
    id: "salato",
    title: "Panini & focaccia",
    intro: "Lunch from the same oven.",
    items: [
      { name: "Panini" },
      { name: "Focaccia sandwiches" },
      { name: "Focaccia pizza", note: "By the slice, from the tray" },
    ],
  },
  {
    id: "pane",
    title: "Bread",
    intro: "Loaves of the day, to take home.",
    items: [{ name: "Sourdough boule" }, { name: "Breads of the day" }],
  },
  {
    id: "bibite",
    title: "Drinks",
    intro: "From the cooler by the gelato case.",
    items: [{ name: "Sanpellegrino", note: "Aranciata rossa, limonata and more" }, { name: "Soft drinks" }],
  },
];

/** Flavors seen in the case in customer photos and reviews. */
export const seenFlavors = ["Hazelnut", "Vanilla", "Belgian chocolate", "Salted caramel", "Tiramisu", "Sour cherry", "Ricotta", "Cassis", "Spumoni"];

/** Attaches the flavor list to the gelato section, worded for whether it is today's or a past record. */
export function composeMenu(sections: Section[], flavors: string[], today: boolean): Menu {
  const box = {
    title: today ? "Today's flavors" : "Flavors seen in the case",
    lines: [flavors.join(", "), today ? "Ask to taste any of them." : "Flavors rotate; today's are in the case"],
  };
  return {
    sections: sections.map((s) => (s.id === "gelato" ? { ...s, extra: [...(s.extra ?? []), box] } : s)),
    flavors,
    today,
  };
}

export const fileMenu = composeMenu(fileSections, seenFlavors, false);

export const menuNote =
  "The case changes every day. Prices are shown where the shop posts them; for everything else, ask at the counter.";
