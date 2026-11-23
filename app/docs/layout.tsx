import { DocsShell } from "@/components/docs-sidebar";
import { baseOptions } from "@/lib/layout.shared";
import { getNotes } from "@/lib/notes";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsShell tree={source.getPageTree()} notes={getNotes()} baseProps={baseOptions()}>
      {children}
    </DocsShell>
  );
}
