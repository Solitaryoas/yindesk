"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type NoteItem = {
  url: string;
  title: string;
  description: string;
  topics: string[];
  /** 最后更新时间，ISO 字符串 */
  date?: string;
};

type View = "topic" | "time";

const ALL_TOPICS = "全部";

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function formatDate(date?: string) {
  return date ? dateFormatter.format(new Date(date)) : "";
}

function TopicBadges({ topics }: { topics: string[] }) {
  return (
    <span className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <span
          key={topic}
          className="rounded-full bg-fd-muted px-2.5 py-0.5 text-xs text-fd-muted-foreground"
        >
          {topic}
        </span>
      ))}
    </span>
  );
}

export function NotesFilter({ items }: { items: NoteItem[] }) {
  const [view, setView] = useState<View>("topic");
  const [activeTopic, setActiveTopic] = useState(ALL_TOPICS);

  // 主题按文章数从多到少排，数量相同的按名称排
  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      for (const topic of item.topics) {
        counts.set(topic, (counts.get(topic) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh-CN"))
      .map(([topic]) => topic);
  }, [items]);

  const visibleItems =
    view === "topic" && activeTopic !== ALL_TOPICS
      ? items.filter((item) => item.topics.includes(activeTopic))
      : items;

  return (
    <div className="not-prose mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="笔记筛选方式"
          className="inline-flex rounded-full border p-1 text-sm"
        >
          <button
            type="button"
            role="tab"
            aria-selected={view === "topic"}
            onClick={() => setView("topic")}
            className={`rounded-full px-4 py-1.5 transition-colors ${
              view === "topic"
                ? "bg-fd-primary text-fd-primary-foreground"
                : "text-fd-muted-foreground hover:text-fd-foreground"
            }`}
          >
            按主题
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === "time"}
            onClick={() => setView("time")}
            className={`rounded-full px-4 py-1.5 transition-colors ${
              view === "time"
                ? "bg-fd-primary text-fd-primary-foreground"
                : "text-fd-muted-foreground hover:text-fd-foreground"
            }`}
          >
            按时间
          </button>
        </div>
        <p className="text-sm text-fd-muted-foreground">共 {visibleItems.length} 篇</p>
      </div>

      {view === "topic" && (
        <div className="mt-4 flex flex-wrap gap-2">
          {[ALL_TOPICS, ...topics].map((topic) => (
            <button
              key={topic}
              type="button"
              aria-pressed={activeTopic === topic}
              onClick={() => setActiveTopic(topic)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                activeTopic === topic
                  ? "border-transparent bg-fd-primary text-fd-primary-foreground"
                  : "text-fd-muted-foreground hover:text-fd-foreground"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      )}

      {view === "topic" ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {visibleItems.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className="flex flex-col gap-2 rounded-lg border p-4 text-sm transition-colors hover:bg-fd-muted"
            >
              <span className="font-semibold">{item.title}</span>
              {item.description && (
                <span className="text-fd-muted-foreground">{item.description}</span>
              )}
              <span className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                <TopicBadges topics={item.topics} />
                {item.date && (
                  <time
                    dateTime={item.date}
                    className="ml-auto text-xs text-fd-muted-foreground"
                  >
                    更新于 {formatDate(item.date)}
                  </time>
                )}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <ul className="mt-6 flex flex-col divide-y">
          {visibleItems.map((item) => (
            <li key={item.url} className="py-5">
              <Link
                href={item.url}
                className="group flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <time
                  dateTime={item.date}
                  className="shrink-0 font-mono text-sm text-fd-muted-foreground sm:w-28"
                >
                  {formatDate(item.date)}
                </time>
                <span className="flex flex-col gap-2">
                  <span className="text-lg font-semibold transition-colors group-hover:text-fd-primary">
                    {item.title}
                  </span>
                  {item.description && (
                    <span className="text-sm text-fd-muted-foreground">{item.description}</span>
                  )}
                  <TopicBadges topics={item.topics} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
