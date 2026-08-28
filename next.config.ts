import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack ignores unrelated lockfiles in parent folders.
  turbopack: {
    root: __dirname,
  },
  images: {
    // Next 16 only honours quality values that are allowlisted here.
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
