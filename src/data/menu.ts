/**
 * The menu as far as public evidence goes. Items come from Yelp reviews and from the shop's own signage in
 * customer photos. A price appears only where it was legible on that signage; everything else is "at the
 * counter" until the owner's menu board replaces this file. The case changes daily.
 */

export type Item = { name: string; note?: string; price?: string };
export type Section = { id: string; title: string; intro: string; items: Item[]; extra?: { title: string; lines: string[] }[] };

export const menu: Section[] = [
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
    extra: [
      {
        title: "Flavors seen in the case",
        lines: ["Hazelnut, vanilla, Belgian chocolate, salted caramel, tiramisu, sour cherry, ricotta, cassis, spumoni", "Flavors rotate; today's are in the case"],
      },
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

export const menuNote =
  "The case changes every day. Prices are shown where the shop posts them; for everything else, ask at the counter.";
