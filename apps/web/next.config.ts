import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
