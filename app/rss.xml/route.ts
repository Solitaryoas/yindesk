import { blogSource } from "@/lib/source";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replace(
    /[<>&'"]/g,
    (c) =>
      ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!,
  );
}

export async function GET() {
  const pages = blogSource
    .getPages()
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const items = pages
    .map((page) => {
      const url = `${siteConfig.url}${page.url}`;
      return [
        "<item>",
        `<title>${escapeXml(page.data.title)}</title>`,
        `<link>${url}</link>`,
        `<guid>${url}</guid>`,
        `<pubDate>${page.data.date.toUTCString()}</pubDate>`,
        page.data.description
          ? `<description>${escapeXml(page.data.description)}</description>`
          : "",
        "</item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>zh-CN</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
