# Editing the menu from Google Sheets

The menu on the site (the `/menu` page, the table cards, and the lists on the home page) can come from a Google
Sheet that the shop edits from a phone. Changes appear on the site within a few minutes (Google refreshes a
published sheet every few minutes; the site checks it every minute).

## One-time setup

1. In Google Sheets: **File → Import → Upload** `menu-sheet.csv` (this folder), choose **Replace spreadsheet**.
2. **File → Share → Publish to web**, pick the sheet, choose **Comma-separated values (.csv)**, click **Publish**,
   and copy the link.
3. In Vercel: the project's **Settings → Environment Variables**, add `MENU_SHEET_CSV` with that link, then
   **Redeploy** once.

## Day to day

| Column | What to write |
| --- | --- |
| Section | Caffè, Gelato, Pasticceria, Panini & focaccia, Bread, Drinks, or a new section name |
| Item | The name on the menu |
| Description | Optional, shown under the name |
| Price | `3.5`, `3.50` or `$3.50` all show as $3.50; anything else (`60¢`, `2 for $5`) shows as typed; blank shows "at the counter" |
| Sold out | `yes` or `x` to grey it out as "Sold out today"; clear it to bring the item back |

Rows in the **Gelato flavors** section are today's flavors; mark a flavor sold out and it disappears from the list.
Row order is menu order. If the sheet is ever unreachable, the site falls back to the menu in `src/data/menu.ts`.
