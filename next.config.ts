import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow HMR from local network IP (fixes "Blocked cross-origin request" warning)
  allowedDevOrigins: ["10.6.0.12"],
};

export default nextConfig;