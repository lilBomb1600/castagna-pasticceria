/**
 * Castagna Pasticceria, from its Yelp listing (unclaimed, checked October 2026), its reviews and the signage in
 * customer photos. No phone, email or website is published anywhere, so none appears here.
 */

export const shop = {
  name: "Castagna",
  kind: "Pasticceria",
  street: "3531 Plaza Way",
  city: "Lafayette, CA 94549",
  oneLine: "3531 Plaza Way, Lafayette, CA 94549",
  directions: "https://www.google.com/maps/dir/?api=1&destination=3531+Plaza+Way+Lafayette+CA+94549",
  yelp: "https://www.yelp.com/biz/castagna-pasticceria-lafayette",
  review: "https://www.yelp.com/writeareview/biz/UQmPkSxEbMG9AJ-aWmnOVQ",
  rating: { stars: 4.6, count: 13, checked: "October 2026" },
  amenities: ["Validated parking", "Dogs welcome", "Patio and indoor seating", "We bring your order to your table"],
};

/** 0 = Sunday. Times are minutes after midnight, Pacific time. */
export const hours: { day: string; open?: number; close?: number }[] = [
  { day: "Sunday", open: 9 * 60, close: 15 * 60 },
  { day: "Monday" },
  { day: "Tuesday", open: 9 * 60, close: 15 * 60 },
  { day: "Wednesday", open: 9 * 60, close: 15 * 60 },
  { day: "Thursday", open: 9 * 60, close: 15 * 60 },
  { day: "Friday", open: 8 * 60 + 30, close: 16 * 60 },
  { day: "Saturday", open: 8 * 60 + 30, close: 16 * 60 },
];

export const clock = (m: number) => {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}${mm ? `:${String(mm).padStart(2, "0")}` : ""} ${h < 12 ? "AM" : "PM"}`;
};

/** Open-now line in Pacific time; call on the client only. */
export function status(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.find((p) => p.type === "weekday")!.value);
  const mins = Number(parts.find((p) => p.type === "hour")!.value) * 60 + Number(parts.find((p) => p.type === "minute")!.value);
  const today = hours[wd];
  if (today.open !== undefined && today.close !== undefined && mins >= today.open && mins < today.close) {
    return { open: true, today: wd, label: `Open now, until ${clock(today.close)}` };
  }
  for (let i = 0; i < 7; i++) {
    const d = (wd + i) % 7;
    const h = hours[d];
    if (h.open === undefined) continue;
    if (i === 0 && mins < h.open) return { open: false, today: wd, label: `Opens today at ${clock(h.open)}` };
    if (i === 1) return { open: false, today: wd, label: `Opens tomorrow at ${clock(h.open)}` };
    if (i > 1) return { open: false, today: wd, label: `Opens ${h.day} at ${clock(h.open)}` };
  }
  return { open: false, today: wd, label: "Closed" };
}
