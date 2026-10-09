import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      // 侧边栏只保留下方文档目录树，去掉顶部的全站导航链接（笔记/收录/独立开发/博客/关于）
      links={[]}
    >
      {children}
    </DocsLayout>
  );
}
