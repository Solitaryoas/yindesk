import { source } from "@/lib/source";

/** 文档 URL 转成 og 图的 id，如 /docs/notes/workbuddy-proxy -> notes-workbuddy-proxy */
export function docOgId(url: string) {
  return url.replace(/^\/docs\/?/, "").split("/").join("-") || "index";
}

export function getDocPages() {
  return source.getPages();
}
