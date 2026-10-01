import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "media.geeksforgeeks.org" },
      { protocol: "https", hostname: "decentro.tech" },
      { protocol: "https", hostname: "example.com" },
    ],
  },
};

export default nextConfig;
