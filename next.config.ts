import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  basePath: '/hands-on-2025',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
