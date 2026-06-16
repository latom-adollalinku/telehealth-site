import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/protocols", "/protocols/"],
      },
    ],
    sitemap: "https://latomwellness.com/sitemap.xml",
  };
}
