import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_SHA: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'dev',
    BUILD_TIME: new Date().toISOString(),
  },
  async redirects() {
    return [
      // Redirect *.vercel.app to custom domain to avoid duplicate content
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<host>.*\\.vercel\\.app)" }],
        destination: "https://creatoraitools.tools/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
