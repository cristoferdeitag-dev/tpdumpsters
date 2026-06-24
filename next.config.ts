import type { NextConfig } from "next";
import baseConfig from "./69ce853b77911.next.config";

// Cities TP no longer services (removed 2026-06-24). Their landing pages were
// deleted; 301 these old URLs to home so we don't 404 and don't keep claiming
// service we don't offer.
const RETIRED_CITIES = [
  "bethel-island", "discovery-bay", "dixon", "fairfax", "menlo-park",
  "half-moon-bay", "san-jose", "sunnyvale", "mountain-view", "palo-alto",
  "cupertino", "campbell", "los-gatos", "saratoga", "morgan-hill", "gilroy",
];

const config: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  ...baseConfig,
  output: "standalone",
  async redirects() {
    return RETIRED_CITIES.map((slug) => ({
      source: `/${slug}`,
      destination: "/",
      permanent: true,
    }));
  },
};

export default config;