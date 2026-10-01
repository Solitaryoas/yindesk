import { HomeLayout } from "fumadocs-ui/layouts/home";
import { SiteFooter } from "@/components/site-footer";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/blog">) {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="flex flex-1 flex-col">{children}</div>
      <SiteFooter />
    </HomeLayout>
  );
}
