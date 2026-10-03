# YinDesk — 个人博客与知识库

基于 **Next.js 16（App Router）+ [Fumadocs](https://fumadocs.dev) + Tailwind CSS 4** 搭建的个人站点，内容全部为仓库内的 Markdown/MDX 文件。

## 常用命令

```bash
npm run dev      # 本地开发，http://localhost:3000
npm run build    # 生产构建（构建时校验 frontmatter）
npm run lint     # ESLint 检查
```

## 内容怎么写

### 博客文章（按时间组织）

在 `content/blog/` 新建 `.mdx` 文件：

```mdx
---
title: 文章标题
description: 一句话摘要（列表页展示）
date: 2026-10-01
tags:
  - 标签A
---

正文支持 Markdown，也支持 <Card />、<Callout />、<Tabs /> 等组件。
```

保存后文章自动出现在博客列表、标签页、RSS 和 sitemap。

### 知识库笔记（按主题组织）

放在 `content/docs/` 下，目录结构决定侧边栏树。顶层文件夹的 `meta.json` 加 `"root": true` 会成为顶部标签页（如"笔记 / 收录 / 独立开发"）。

### 常用组件

MDX 里可直接使用 Fumadocs 提供的组件：`Card`、`CardGroup`、`Callout`、`Steps`、`Tabs`、`Files` 等，写法见 `content/docs/` 下的示例。

## 个人信息在哪改

集中在 `lib/config.ts`：站名、描述、域名、邮箱、社交链接。导航链接在 `lib/layout.shared.tsx`。

## 搜索

`⌘K` / `Ctrl+K` 全文搜索：构建时把索引生成为静态文件（`app/api/search/route.ts`），浏览器端检索，无需任何服务器。

## 部署（GitHub Pages）

站点为纯静态导出（`next.config.ts` 中 `output: "export"`），由 `.github/workflows/deploy.yml` 在每次 push 到 `main` 后自动构建并部署。

域名 `yindesk.online` 的 DNS 记录：

- `@` → A 记录 → `185.199.108.153` / `185.199.109.153` / `185.199.110.153` / `185.199.111.153`
- `www` → CNAME → `Solitaryoas.github.io`

域名在仓库 Settings → Pages → Custom domain 中绑定，HTTPS 证书由 GitHub 自动签发。

`lib/config.ts` 中的 `url` 需与实际域名一致（RSS 和 sitemap 使用它）。
