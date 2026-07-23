import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // A stray lockfile exists in a parent directory on this machine;
    // pin the workspace root so builds resolve from the project itself.
    root: __dirname,
  },
};

export default nextConfig;
