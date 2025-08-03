/** @type {import('next').NextConfig} */
const nextConfig = {
  serverActions: {
    bodySizeLimit: "20mb",
  },
  reactStrictMode: false,
};

module.exports = nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   serverActions: {
//     bodySizeLimit: "20mb",
//   },
//   reactStrictMode: false,
// };

// export default nextConfig;
