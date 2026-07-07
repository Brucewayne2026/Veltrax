import type { MetadataRoute } from "next";

// NOTE: update if the production domain differs from veltrax.in
const SITE_URL = "https://veltrax.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}