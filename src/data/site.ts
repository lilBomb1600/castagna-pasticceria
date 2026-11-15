/**
 * The site's public address, for absolute links (sitemap, schema, link previews). On Vercel this is the
 * production domain, which becomes the custom domain once one is attached; NEXT_PUBLIC_SITE_URL overrides it.
 * Anywhere else (a local production build) it is the preview URL, never localhost: the SEO kit refuses to build a
 * production site whose canonical points at a dev server (LAUNCH-STANDARD.md).
 */
export const PREVIEW_URL = "https://castagna-pasticceria.vercel.app";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : PREVIEW_URL);
