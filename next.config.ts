import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Keep Turbopack scoped to this app (avoids picking up a parent lockfile).
    root: path.join(__dirname),
  },
};

export default nextConfig;
