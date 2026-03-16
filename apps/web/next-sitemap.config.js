/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://creatoraitools.tools",
  generateRobotsTxt: true,
  exclude: ["/api/*", "/api/internal/*", "/title-generator", "/bio-generator"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/api/internal/"] },
    ],
    additionalSitemaps: [],
  },
}
