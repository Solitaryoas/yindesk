import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { DocsBody } from "fumadocs-ui/layouts/docs/page";
import { getMDXComponents } from "@/components/mdx";
import { blogSource } from "@/lib/source";

const formatDate = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default async function Page(props: PageProps<"/blog/[...slug]">) {
  const params = await props.params;
  const page = blogSource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
      <header className="mb-10 flex flex-col gap-4 border-b pb-10">
        <div className="flex flex-wrap items-center gap-3 text-sm text-fd-muted-foreground">
          <time dateTime={page.data.date.toISOString()}>
            {formatDate.format(page.data.date)}
          </time>
          {page.data.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-fd-muted px-2.5 py-0.5 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {page.data.title}
        </h1>
        {page.data.description && (
          <p className="text-lg text-fd-muted-foreground">{page.data.description}</p>
        )}
      </header>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(blogSource, page),
          })}
        />
      </DocsBody>
    </main>
  );
}

export function generateStaticParams() {
  return blogSource.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/blog/[...slug]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = blogSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      type: "article",
      publishedTime: page.data.date.toISOString(),
    },
  };
}
