import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Allow any external image URL
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // wildcard to allow all domains
        pathname: "**", // allow any path
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
