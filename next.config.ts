import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverActions: {
    bodySizeLimit: "20mb",
  },
  reactStrictMode: false,
};

export default nextConfig;
