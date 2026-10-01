import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="border-t py-8 text-sm text-fd-muted-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex gap-5">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-fd-foreground"
          >
            GitHub
          </a>
          <Link href="/rss.xml" className="transition-colors hover:text-fd-foreground">
            RSS
          </Link>
          <Link href="/sitemap.xml" className="transition-colors hover:text-fd-foreground">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
