import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Enable dynamic caching and partial prerendering
  experimental: {
    dynamicIO: true,
    ppr: true,
  },
};

export default nextConfig;
