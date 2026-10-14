import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Served at mohibali.com/omid through the portfolio's rewrite; local dev stays at the root.
  // Keep in step with BASE_PATH in src/lib/base-path.ts.
  basePath: process.env.NODE_ENV === "production" ? "/omid" : "",
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
