/**
 * The site's public address, for absolute links (sitemap, schema, link previews). On Vercel this is the
 * production domain, which becomes the custom domain once one is attached; NEXT_PUBLIC_SITE_URL overrides it.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3015");
