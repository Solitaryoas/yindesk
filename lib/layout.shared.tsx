import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { siteConfig } from "./config";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <img
            src={siteConfig.avatarUrl}
            alt="Avatar"
            width={24}
            height={24}
            className="size-6 rounded-full"
          />
          {siteConfig.name}
        </>
      ),
    },
    links: [
      { text: "笔记", url: "/docs/notes" },
      { text: "收录", url: "/docs/curations" },
      { text: "独立开发", url: "/docs/indie-dev" },
      { text: "博客", url: "/blog" },
      { text: "关于", url: "/about" },
    ],
    githubUrl: siteConfig.links.github,
  };
}
