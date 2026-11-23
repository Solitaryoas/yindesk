import { source } from "@/lib/source";
import type { NoteItem } from "./notes-shared";

const NOTES_PREFIX = "/docs/notes/";

/** 取全部笔记，按最后更新时间倒序 */
export function getNotes(): NoteItem[] {
  return source
    .getPages()
    .filter((page) => page.url.startsWith(NOTES_PREFIX))
    .map((page) => ({
      url: page.url,
      title: page.data.title,
      description: page.data.description ?? "",
      topics: [...page.data.topics].sort((a, b) => a.localeCompare(b, "zh-CN")),
      date: page.data.lastModified?.toISOString(),
    }))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}
