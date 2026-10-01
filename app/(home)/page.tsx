import Link from "next/link";
import { BookMarked, Compass, PenLine } from "lucide-react";

const sections = [
  {
    icon: BookMarked,
    title: "笔记库",
    description: "成体系的学习笔记：AI 编程、Agent 工作流与工程实践。",
    href: "/docs/notes",
  },
  {
    icon: PenLine,
    title: "博客",
    description: "随笔、教程与折腾记录，想到什么写什么。",
    href: "/blog",
  },
  {
    icon: Compass,
    title: "收录",
    description: "收藏的好工具、好文章与好项目，附一句推荐语。",
    href: "/docs/curations",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 py-20 text-center md:py-28">
        <p className="rounded-full border px-4 py-1.5 text-sm text-fd-muted-foreground">
          记录 · 思考 · 折腾
        </p>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
          把想法做成产品，把过程写成文字
        </h1>
        <p className="max-w-xl text-lg text-fd-muted-foreground">
          这是我的个人知识库与博客：沉淀 AI 编程、Web
          开发与独立开发的实践笔记，也收录路上遇到的好东西。
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/docs/notes"
            className="rounded-full bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
          >
            浏览笔记
          </Link>
          <Link
            href="/blog"
            className="rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-fd-muted"
          >
            看看博客
          </Link>
        </div>
        <div className="mt-6 w-full max-w-2xl overflow-hidden rounded-xl border bg-zinc-950 text-left shadow-lg dark:border-zinc-800">
          <div className="flex items-center gap-1.5 border-b border-zinc-800 px-4 py-3">
            <span className="size-3 rounded-full bg-zinc-700" />
            <span className="size-3 rounded-full bg-zinc-700" />
            <span className="size-3 rounded-full bg-zinc-700" />
            <span className="ml-2 font-mono text-xs text-zinc-500">yindesk — zsh</span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-sm leading-7 text-zinc-300">
            <code>
              <span className="text-emerald-400">~</span> % whoami{"\n"}
              builder —— 用代码把想法变成现实{"\n"}
              <span className="text-emerald-400">~</span> % ls ~/writing{"\n"}
              <span className="text-sky-400">notes/</span> <span className="text-sky-400">blog/</span>{" "}
              <span className="text-sky-400">curations/</span>{"\n"}
              <span className="text-emerald-400">~</span> % echo $motto{"\n"}
              先跑起来，再优化它
            </code>
          </pre>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 pb-20 md:grid-cols-3">
        {sections.map(({ icon: Icon, title, description, href }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col gap-3 rounded-xl border p-6 transition-colors hover:bg-fd-muted"
          >
            <Icon className="size-6 text-fd-primary" />
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-fd-muted-foreground">{description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
