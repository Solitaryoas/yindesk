import { getNotes } from "@/lib/notes";
import { NotesFilter } from "./notes-filter";

/**
 * 笔记目录的筛选视图：服务端取出笔记数据，
 * 交给客户端组件做按主题/按时间筛选。
 */
export function NotesExplorer() {
  return <NotesFilter items={getNotes()} />;
}
