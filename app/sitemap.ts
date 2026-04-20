import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://latomwellness.com";
  const pages = [
    { path: "", priority: 1.0, changeFreq: "weekly" as const },
    { path: "/services", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/how-it-works", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/calculator", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/about", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/contact", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFreq: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFreq: "yearly" as const },
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }));
}
