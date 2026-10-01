import type { Metadata } from "next";
import Link from "next/link";
import { blogSource } from "@/lib/source";

export const metadata: Metadata = {
  title: "博客",
};

const formatDate = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function BlogIndex() {
  const pages = blogSource
    .getPages()
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const tags = [...new Set(pages.flatMap((page) => page.data.tags))];

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">博客</h1>
          <p className="mt-2 text-fd-muted-foreground">随笔、教程与折腾记录</p>
        </div>
        <Link
          href="/rss.xml"
          className="text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
        >
          RSS 订阅 →
        </Link>
      </div>

      {tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${encodeURIComponent(tag)}`}
              className="rounded-full border px-3 py-1 text-xs text-fd-muted-foreground transition-colors hover:text-fd-foreground"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      <ul className="mt-10 flex flex-col divide-y">
        {pages.map((page) => (
          <li key={page.url} className="py-6">
            <Link href={page.url} className="group flex flex-col gap-2">
              <time className="text-sm text-fd-muted-foreground">
                {formatDate.format(page.data.date)}
              </time>
              <h2 className="text-xl font-semibold transition-colors group-hover:text-fd-primary">
                {page.data.title}
              </h2>
              {page.data.description && (
                <p className="text-fd-muted-foreground">{page.data.description}</p>
              )}
              {page.data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {page.data.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-fd-muted px-2.5 py-0.5 text-xs text-fd-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
