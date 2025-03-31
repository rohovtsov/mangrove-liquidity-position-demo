import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'etherscan.io',
      },
    ],
  },
};

export default nextConfig;
