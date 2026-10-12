import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Castagna Pasticceria",
    short_name: "Castagna",
    description: "Pastry, gelato and espresso on Plaza Way, Lafayette.",
    start_url: "/",
    display: "browser",
    background_color: "#f7f2ea",
    theme_color: "#f7f2ea",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
