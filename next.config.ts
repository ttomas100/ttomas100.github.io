import path from "node:path";
import type { NextConfig } from "next";

// Static export for GitHub Pages (https://ttomas100.github.io/).
// GitHub Pages can't set custom headers, so hero media is cache-busted with
// HERO_VERSION in src/components/hero/Hero.tsx instead.
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve(__dirname),
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
