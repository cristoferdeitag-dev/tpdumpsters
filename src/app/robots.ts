import type { MetadataRoute } from "next";

const disallowedPaths = [
  "/dashboard",
  "/driver",
  "/internal",
  "/booking/success",
  "/thank-you",
  "/quote",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: [
          "ChatGPT-User",
          "OAI-SearchBot",
          "GPTBot",
          "Google-Extended",
          "Googlebot",
          "Bingbot",
          "Applebot",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Bytespider",
          "CCBot",
          "YouBot",
        ],
        allow: "/",
        disallow: disallowedPaths,
      },
    ],
    sitemap: "https://tpdumpsters.com/sitemap.xml",
  };
}
