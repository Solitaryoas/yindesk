import { source } from "@/lib/source";
import { NotesFilter, type NoteItem } from "./notes-filter";

const NOTES_PREFIX = "/docs/notes/";

/**
 * 笔记目录的筛选视图数据源：从文档集合里取出笔记页，
 * 按最后更新时间倒序交给客户端筛选组件。
 */
export function NotesExplorer() {
  const items = source
    .getPages()
    .filter((page) => page.url.startsWith(NOTES_PREFIX))
    .map<NoteItem>((page) => ({
      url: page.url,
      title: page.data.title,
      description: page.data.description ?? "",
      topics: [...page.data.topics].sort((a, b) => a.localeCompare(b, "zh-CN")),
      date: page.data.lastModified?.toISOString(),
    }))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  return <NotesFilter items={items} />;
}
