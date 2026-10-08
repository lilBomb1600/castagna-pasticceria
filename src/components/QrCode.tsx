"use client";

import clsx from "clsx";
import QR from "qrcode";
import { useEffect, useState } from "react";

/**
 * A scannable QR code drawn as SVG. `path` is resolved against the site's own address at runtime, so the code
 * always points at whatever domain the site is served from; `href` is used as-is for outside links.
 */
export function QrCode({ path, href, label, className, onDark = false }: { path?: string; href?: string; label: string; className?: string; onDark?: boolean }) {
  const [svg, setSvg] = useState<string | null>(null);
  const [url, setUrl] = useState<string>(href ?? "");

  useEffect(() => {
    const target = href ?? `${window.location.origin}${path ?? "/"}`;
    setUrl(target);
    QR.toString(target, {
      type: "svg",
      margin: 0,
      errorCorrectionLevel: "M",
      color: { dark: onDark ? "#fbf7f0" : "#211913", light: "#00000000" },
    }).then(setSvg);
  }, [href, path, onDark]);

  return (
    <div className={clsx("aspect-square", className)} role="img" aria-label={`${label}: ${url}`}>
      {svg ? (
        <div className="h-full w-full [&>svg]:h-full [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <div className="h-full w-full animate-pulse rounded-md bg-ink/5" />
      )}
    </div>
  );
}
