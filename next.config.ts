import type { NextConfig } from "next";

const isTauri = process.env.TAURI_ENV === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: isTauri ? "export" : undefined,
  images: {
    unoptimized: isTauri,
  },
  distDir: "dist",
};

export default nextConfig;