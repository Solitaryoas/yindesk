import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { LastUpdated } from "@/components/last-updated";
import { getMDXComponents } from "@/components/mdx";
import { siteConfig } from "@/lib/config";
import { docOgId } from "@/lib/og";
import { source } from "@/lib/source";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  if (!params.slug?.length) {
    redirect("/docs/notes");
  }
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const pageUrl = `${siteConfig.url}${page.url}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.data.title,
    description: page.data.description,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    inLanguage: "zh-CN",
    author: { "@type": "Person", name: siteConfig.author, url: siteConfig.links.github },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="border-b pb-6" />
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
      <div className="flex justify-end">
        <LastUpdated date={page.data.lastModified} />
      </div>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  if (!params.slug?.length) {
    return {};
  }
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: { canonical: page.url },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}${page.url}`,
      title: page.data.title,
      description: page.data.description,
      images: [
        {
          url: `${siteConfig.url}/docs/opengraph-image/${docOgId(page.url)}.png`,
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
      images: [`${siteConfig.url}/docs/opengraph-image/${docOgId(page.url)}.png`],
    },
  };
}
