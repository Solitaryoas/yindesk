"use client";

import type * as PageTree from "fumadocs-core/page-tree";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { usePathname } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import { ALL_TOPICS, getNoteTopics, type NoteItem } from "@/lib/notes-shared";

type View = "topic" | "time";

const NOTES_PATH_PREFIX = "/docs/notes";

/**
 * 按主题/按时间调整笔记在目录树里的展示：
 * 主题模式过滤掉不匹配的笔记，时间模式按最后更新时间倒序。
 */
function filterNotesTree(
  tree: PageTree.Root,
  notes: NoteItem[],
  view: View,
  topic: string,
): PageTree.Root {
  if (view === "topic" && topic === ALL_TOPICS) return tree;

  const byUrl = new Map(notes.map((note) => [note.url, note]));
  const isNoteItem = (node: PageTree.Node): node is PageTree.Item =>
    node.type === "page" && byUrl.has(node.url);

  const transform = (nodes: PageTree.Node[]): PageTree.Node[] => {
    const mapped = nodes.map((node) =>
      node.type === "folder" ? { ...node, children: transform(node.children) } : node,
    );

    if (!nodes.some(isNoteItem)) return mapped;

    const others = mapped.filter((node) => !isNoteItem(node));
    let noteItems = mapped.filter(isNoteItem);

    if (view === "topic") {
      noteItems = noteItems.filter((item) => byUrl.get(item.url)!.topics.includes(topic));
    } else {
      noteItems = [...noteItems].sort((a, b) =>
        (byUrl.get(b.url)?.date ?? "").localeCompare(byUrl.get(a.url)?.date ?? ""),
      );
    }

    return [...others, ...noteItems];
  };

  // fumadocs 的 TreeContext 只按根节点的 $id 做 memo，
  // 这里换一个随筛选条件变化的 id，过滤/重排后的树才会真正生效
  return {
    ...tree,
    $id: `${tree.$id ?? "notes"}:${view}:${topic}`,
    children: transform(tree.children),
  };
}

function SidebarNotesFilter({
  view,
  topic,
  topics,
  onViewChange,
  onTopicChange,
}: {
  view: View;
  topic: string;
  topics: string[];
  onViewChange: (view: View) => void;
  onTopicChange: (topic: string) => void;
}) {
  return (
    <div className="mb-3 flex flex-col gap-2.5 border-b pb-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-fd-muted-foreground">筛选笔记</span>
        <div
          role="tablist"
          aria-label="笔记筛选方式"
          className="inline-flex rounded-full border p-0.5 text-xs"
        >
          {(
            [
              ["topic", "按主题"],
              ["time", "按时间"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={view === value}
              onClick={() => onViewChange(value)}
              className={`rounded-full px-2.5 py-1 transition-colors ${
                view === value
                  ? "bg-fd-primary text-fd-primary-foreground"
                  : "text-fd-muted-foreground hover:text-fd-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {view === "topic" && (
        <div className="flex flex-wrap gap-1.5">
          {[ALL_TOPICS, ...topics].map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={topic === item}
              onClick={() => onTopicChange(item)}
              className={`rounded-full border px-2 py-0.5 text-xs transition-colors ${
                topic === item
                  ? "border-transparent bg-fd-primary text-fd-primary-foreground"
                  : "text-fd-muted-foreground hover:text-fd-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function DocsShell({
  tree,
  notes,
  baseProps,
  children,
}: {
  tree: PageTree.Root;
  notes: NoteItem[];
  baseProps: BaseLayoutProps;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [view, setView] = useState<View>("topic");
  const [topic, setTopic] = useState(ALL_TOPICS);
  const onNotes = pathname.startsWith(NOTES_PATH_PREFIX);

  // 离开笔记目录时不展示筛选，目录树也恢复原样
  const effectiveView: View = onNotes ? view : "topic";
  const effectiveTopic = onNotes ? topic : ALL_TOPICS;

  const filteredTree = useMemo(
    () => filterNotesTree(tree, notes, effectiveView, effectiveTopic),
    [tree, notes, effectiveView, effectiveTopic],
  );
  const topics = useMemo(() => getNoteTopics(notes), [notes]);

  return (
    <DocsLayout
      tree={filteredTree}
      {...baseProps}
      // 侧边栏只保留下方文档目录树，去掉顶部的全站导航链接（笔记/工程实践/收录/博客/关于）
      links={[]}
      sidebar={{
        banner: onNotes ? (
          <SidebarNotesFilter
            view={view}
            topic={topic}
            topics={topics}
            onViewChange={setView}
            onTopicChange={setTopic}
          />
        ) : undefined,
      }}
    >
      {children}
    </DocsLayout>
  );
}
