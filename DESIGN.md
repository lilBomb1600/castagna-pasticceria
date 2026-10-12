---
name: Castagna Pasticceria
description: Pastry from the oven, gelato from the case, espresso at your table, on Plaza Way in Lafayette.
colors:
  cup: "#c41e2b"
  cup-deep: "#9c1621"
  crema: "#c98a4b"
  paper: "#f7f2ea"
  paper-2: "#efe7db"
  window-white: "#fbf7f0"
  white: "#ffffff"
  ink: "#211913"
  ink-2: "#5b4c40"
  ink-3: "#8a7a6c"
typography:
  hero:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "clamp(34px, 5.6vw, 84px)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  display:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "clamp(38px, 5.2vw, 72px)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "30px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.02em"
  quote:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.35
  body:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.625
  list:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15.5px"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "tnum"
  ui:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14.5px"
    fontWeight: 600
    lineHeight: 1.2
  caption:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
  script:
    fontFamily: "Italianno, cursive"
    fontSize: "1em"
    fontWeight: 400
    lineHeight: 1
rounded:
  print: "3px"
  card: "6px"
  sheet: "28px"
  pill: "999px"
spacing:
  gutter: "20px"
  gutter-sm: "32px"
  gutter-lg: "48px"
  section: "96px"
  section-lg: "128px"
  container: "1320px"
components:
  button-cup:
    backgroundColor: "{colors.cup}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "13.6px 22.4px"
  button-cup-hover:
    backgroundColor: "{colors.cup-deep}"
  button-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "13.6px 22.4px"
  button-line:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "13.6px 22.4px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  chip:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  card:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "28px"
---

# Design System: Castagna Pasticceria

## Overview

**Creative North Star: "The Case Behind the Glass"**

The category standard set by Blue Bottle and Tartine, executed with Castagna's own things: the food carries the page,
and everything around it is warm paper, espresso-dark ink and the red of the shop's cups. The site behaves like
standing at the counter. A full-bleed film of espresso poured over gelato opens it, the real pastry case with its
handwritten tags comes next, then the gelato, the table card, the reviews and the way there. Nothing on the page
competes with a photograph of something to eat.

Type does the decorating. Bodoni Moda carries every heading, with its Italian italic for the second half of a line
("Gelato, *a taste first.*"), and the shop's window lettering is redrawn once as the lockup: CASTAGNA set on an arc
over "Pasticceria" in script. Lists are ruled like a printed menu with a single hairline, prices sit in tabular
figures, and where the shop posts no price the line says so plainly instead of inventing one.

The density is a café menu, not a landing page: generous sections, one idea per section, long lines of real items.
Motion is slow and liquid (a pour, a sheet rising, a film settling in) and always optional.

**Key Characteristics:**
- Warm paper ground with espresso ink; cup red is the only accent.
- Bodoni Moda headings that turn italic mid-line; Hanken Grotesk for everything read.
- Hairline-ruled lists with tabular prices, like the printed menu board.
- Real photographs and films at nearly square corners; cards barely rounded.
- Pill buttons in cup red, paper, or a hairline outline.

## Colors

A three-part palette taken from the shop itself: the paper of the menu, the dark of espresso, and the red of the cups.

### Primary
- **Cup Red** (cup): the red ribbed cups and saucers. Primary buttons, the open-now and "Today" markers, the review
  card, focus rings and text selection.
- **Deep Cup** (cup-deep): hover state of the red button and the shadow tint under it. Never a fill on its own.

### Tertiary
- **Crema** (crema): the colour of espresso foam. Used only inside the illustrations (the cortado loader and the
  affogato pour), never in interface chrome.

### Neutral
- **Menu Paper** (paper): the page ground, the menu sheet, cards on tinted sections, and the light button.
- **Counter Paper** (paper-2): alternating section ground (gelato, visit), cards on the paper ground, inactive chips,
  image placeholders.
- **Window White** (window-white): the lockup when it sits over film or ink.
- **White** (white): lettering on the red button and review card, and the paper button's hover.
- **Espresso Ink** (ink): body text, headings, the dark table-menu section and footer, the active chip.
- **Roast** (ink-2): secondary text, intros and descriptions.
- **Steamed** (ink-3): captions, "at the counter", credits and notes.

### Named Rules
**The One Red Rule.** Cup red is the only accent colour. It marks the one action or status that matters in a view;
two red buttons side by side means one of them is wrong.

**The Hairline Rule.** Every list and table is ruled with ink at 14% (`color-mix(in oklab, ink 14%, transparent)`),
one line between items, never boxes around them.

## Typography

**Display Font:** Bodoni Moda (with Bodoni 72, Didot, serif), optical sizing on
**Body Font:** Hanken Grotesk (with ui-sans-serif, system-ui)
**Script:** Italianno, for the word "Pasticceria" in the lockup only

**Character:** a high-contrast Italian modern serif against a plain, friendly grotesk. The serif is the voice of the
shop window; the grotesk is the waiter reading you the menu.

### Hierarchy
- **Hero** (500, clamp(34px, 5.6vw, 84px), 0.95): the opening headline over the film, capped at 16ch.
- **Display** (500, clamp(38px, 5.2vw, 72px), 1): section headings; the second clause set in italic at weight 400.
- **Title** (500 italic, 30px, 1): list group headings ("Pasticceria", "Caffè") and card titles; 34px on the phone menu.
- **Quote** (400, 22px, 1.35): review quotes and the flavor names, in Bodoni (flavors in italic).
- **Body** (400, 17px, 1.625): section intros, capped at 44 to 48ch.
- **List** (400, 15.5px; 18px semibold on the phone menu): menu items, with prices in tabular figures, semibold.
- **UI** (600, 14.5px): chips and nav links.
- **Caption** (400, 13.5px): photo captions and section notes, in Steamed.
- **Label** (400, 13px): "at the counter", sold-out tags and credits, in Steamed.

### Named Rules
**The Turn to Italic Rule.** A display heading is one sentence that turns italic for its second half. The italic is
the emphasis; never bold, never colour.

**The One Script Rule.** Italianno appears only inside the lockup. It never sets a heading or a button.

## Layout

A 1320px container with 20px gutters on phones, 32px from 640px and 48px from 1024px. Sections breathe at 96px top
and bottom, 128px from 1024px, and alternate between Menu Paper and Counter Paper (with Espresso Ink for the table
menu and footer) so each one reads as its own counter.

Desktop sections are asymmetric two-column grids: photograph 7 parts to lists 5 (the case), film 1.15 to cards 1
(gelato). Everything stacks to a single column below 1024px. Flavor names run in a ruled two-column grid, three
from 640px. Reviews are masonry columns, two from 640px and three from 1024px.

The hero is the whole first screen (100svh, minimum 620px). On portrait phones (aspect ratio at or below 4:5) the film
holds the top 62% and fades into ink, and the headline sits below it so the pour stays visible; elsewhere the film is
full-bleed under the text.

## Elevation & Depth

Flat by default. Depth comes from alternating paper tones and from photography, not from shadows. The few shadows
that exist belong to objects that physically lift: the red button, the phone menu sheet sliding over its photo, and
the phone mockup.

### Shadow Vocabulary
- **Cup glow** (`box-shadow: 0 8px 24px -10px rgb(156 22 33 / 0.6)`): under the red button only.
- **Sheet lift** (`box-shadow: 0 -20px 40px -20px rgb(0 0 0 / 0.5)`): the phone menu sheet's top edge.
- **Device drop** (`box-shadow: 0 40px 80px -30px rgb(0 0 0 / 0.8)`): the phone mockup on the dark table section.

### Named Rules
**The Paper Doesn't Float Rule.** Cards and photographs sit flat on the page. A shadow means the thing moves.

## Shapes

Photographs and films are cut nearly square (3px), like prints laid on the counter. Cards are barely rounded (6px).
Buttons and chips are full pills. The phone menu is the one exception: it is an app-like surface, so its sheet
rounds 28px at the top and its boxes 16px. The lockup's arc is a true circular arc.

## Components

### Buttons
- **Shape:** full pill (999px), 15px semibold Hanken, icon gap 8px.
- **Primary (cup):** Cup Red on white text with the cup glow; Deep Cup on hover.
- **Paper:** Menu Paper with ink text, for the second action over film or dark grounds; white on hover.
- **Line:** a 1px inset hairline at 30% ink; fills with ink and turns paper on hover.
- **Press:** every button scales to 0.97 while pressed; colour transitions run 250ms on ease-out-quart.

### Chips
- **Style:** pill, 14.5px semibold. Inactive in Counter Paper with Roast text; active in Espresso Ink with paper text.
- **Behavior:** on the phone menu they stay pinned under a blurred paper bar, follow the reading position, and scroll
  only their own row to keep the active chip centred.

### Cards / Containers
- **Corner Style:** 6px.
- **Background:** Counter Paper on paper sections, Menu Paper on Counter Paper sections, Cup Red for the review card.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Internal Padding:** 28px, 36px from 640px.

### Navigation
- **Style:** fixed 68px bar. Clear over the hero film with white links; after 70% of the first screen it settles onto
  92% Menu Paper with a backdrop blur and a hairline, and the small lockup fades in (it waits, because the hero
  already carries the big one). Links are 14.5px medium pills that tint on hover; the red Menu button stays visible
  on every width, and the section links hide below 768px.

### Ruled menu list (signature)
Item name left, price right in tabular semibold figures, one hairline between rows. Where the shop posts no price the
row says "at the counter" in Steamed; a sold-out item is struck through and greyed with "Sold out today" in place of
the price. The same list appears on the home page, the phone menu and the phone mockup.

### Lockup (signature)
CASTAGNA in Bodoni Moda 500, tracked out, on a circular arc, over "Pasticceria" in Italianno, redrawn from the
window lettering. Ink on paper, Window White over film and ink. Sized in em so it scales with its font size.

### Pour illustrations (signature)
Hand-drawn SVG: a cortado filling on a red saucer (the loader, tracking the film's buffer) and an affogato poured
from a pitcher that pivots at its spout. The cup rim is drawn as a back arc behind the scoop and a front arc before
it, so nothing white ever crosses the gelato. Both rest on a finished frame and replay on request; reduced motion
shows the finished frame.

## Do's and Don'ts

### Do:
- **Do** let a real photograph or film of the food lead each section, at 3px corners.
- **Do** set section headings as one Bodoni sentence that turns italic halfway.
- **Do** rule lists with the 14% ink hairline and put prices in tabular figures.
- **Do** write "at the counter" where the shop posts no price, and credit customer photos in a caption or the footer.
- **Do** keep motion slow and liquid on ease-out-expo (cubic-bezier(0.16, 1, 0.3, 1)), and give every animation a
  finished resting frame for reduced motion.

### Don't:
- **Don't** add a second accent colour; cup red is the only one.
- **Don't** use Italianno outside the lockup.
- **Don't** put shadows on cards or photographs.
- **Don't** use latte-art stock photography or generic "artisan" copy; the page shows this shop's case, cups and prices.
- **Don't** round photographs like app tiles; 3px is the print edge.
