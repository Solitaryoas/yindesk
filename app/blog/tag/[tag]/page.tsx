import type { Metadata } from "next";
import Link from "next/link";
import { blogSource } from "@/lib/source";

const formatDate = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function generateStaticParams() {
  return [
    ...new Set(blogSource.getPages().flatMap((page) => page.data.tags)),
  ].map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata(
  props: PageProps<"/blog/tag/[tag]">,
): Promise<Metadata> {
  const params = await props.params;
  return {
    title: `#${decodeURIComponent(params.tag)}`,
  };
}

export default async function TagPage(props: PageProps<"/blog/tag/[tag]">) {
  const params = await props.params;
  const tag = decodeURIComponent(params.tag);
  const pages = blogSource
    .getPages()
    .filter((page) => page.data.tags.includes(tag))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
      <h1 className="text-3xl font-bold">#{tag}</h1>
      <p className="mt-2 text-fd-muted-foreground">{pages.length} 篇文章</p>

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
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
