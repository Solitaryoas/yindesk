/** 笔记目录条目，内容区与侧边栏筛选共用 */
export type NoteItem = {
  url: string;
  title: string;
  description: string;
  topics: string[];
  /** 最后更新时间，ISO 字符串 */
  date?: string;
};

/** 「全部」主题的占位值 */
export const ALL_TOPICS = "全部";

/** 按文章数从多到少统计主题，数量相同的按名称排序 */
export function getNoteTopics(notes: NoteItem[]): string[] {
  const counts = new Map<string, number>();
  for (const note of notes) {
    for (const topic of note.topics) {
      counts.set(topic, (counts.get(topic) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh-CN"))
    .map(([topic]) => topic);
}
