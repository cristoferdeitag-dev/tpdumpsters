import type { NextConfig } from "next";
import baseConfig from "./69ce853b77911.next.config";

const config: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  ...baseConfig,
  output: "standalone",
};

export default config;