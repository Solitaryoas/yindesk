import type { MetadataRoute } from "next";
import { blogSource, source } from "@/lib/source";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const docPages = source.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = blogSource.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    lastModified: page.data.date,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/about`, changeFrequency: "yearly", priority: 0.5 },
    ...docPages,
    ...blogPages,
  ];
}
