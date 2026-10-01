import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "关于",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
      <h1 className="text-3xl font-bold">关于</h1>

      <h2 className="mt-10 text-xl font-semibold">关于我</h2>
      <div className="mt-4 flex flex-col gap-3 text-fd-muted-foreground">
        <p>
          你好，我是 {siteConfig.author}，一名开发者。我相信 AI
          正在改变软件的构建方式，把模型接进工具、数据和真实的工作流，是当下最值得投入的方向。
        </p>
        <p>
          这个站是我的赛博工位：写代码之余，我把学到的东西整理成笔记放在
          <Link href="/docs/notes" className="text-fd-primary underline underline-offset-4">
            笔记库
          </Link>
          ，零散的想法发在
          <Link href="/blog" className="text-fd-primary underline underline-offset-4">
            博客
          </Link>
          ，顺手把好用的东西收进
          <Link href="/docs/curations" className="text-fd-primary underline underline-offset-4">
            收录
          </Link>
          。
        </p>
      </div>

      <h2 className="mt-10 text-xl font-semibold">联系方式</h2>
      <ul className="mt-4 flex flex-col gap-2 text-fd-muted-foreground">
        <li>
          GitHub：
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fd-primary underline underline-offset-4"
          >
            {siteConfig.links.github.replace("https://", "")}
          </a>
        </li>
        <li>
          X（Twitter）：
          <a
            href={siteConfig.links.x}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fd-primary underline underline-offset-4"
          >
            {siteConfig.links.x.replace("https://", "")}
          </a>
        </li>
        <li>
          知乎：
          <a
            href={siteConfig.links.zhihu}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fd-primary underline underline-offset-4"
          >
            {siteConfig.links.zhihu.replace("https://", "")}
          </a>
        </li>
        <li>邮箱：{siteConfig.email}</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold">技术栈</h2>
      <div className="mt-4 flex flex-col gap-4 text-fd-muted-foreground">
        <div>
          <p className="font-medium text-fd-foreground">语言</p>
          <p>TypeScript / Python / SQL</p>
        </div>
        <div>
          <p className="font-medium text-fd-foreground">Web 与工具开发</p>
          <p>Next.js / React / Tailwind CSS / Node.js / 浏览器扩展</p>
        </div>
        <div>
          <p className="font-medium text-fd-foreground">AI 与 Agent</p>
          <p>Claude Code / Skills / Subagent / MCP / Prompt Engineering</p>
        </div>
        <div>
          <p className="font-medium text-fd-foreground">基础设施</p>
          <p>Vercel / Docker / PostgreSQL / Redis</p>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">正在折腾</h2>
      <pre className="mt-4 overflow-x-auto rounded-xl border bg-fd-muted p-4 font-mono text-sm leading-7">
        <code>{`import random

idea = random.choice([
    "给博客加个 AI 摘要",
    "写一个命令行小工具",
    "把笔记库整理成电子书",
])

print(f"本周折腾目标：{idea}")`}</code>
      </pre>
    </main>
  );
}
