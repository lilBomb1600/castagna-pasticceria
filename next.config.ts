import type { NextConfig } from "next";
import { headersFor } from "./security-headers.mjs";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // No "X-Powered-By: Next.js" header (LAUNCH-STANDARD.md D).
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Security headers on every response, plus X-Robots-Tag noindex while it's an unpaid preview (security-headers.mjs).
  // The baseline CSP has no script-src/connect-src, so Vercel Analytics (/_vercel/insights) keeps working.
  async headers() {
    return [{ source: "/:path*", headers: headersFor() }];
  },
};

export default nextConfig;
