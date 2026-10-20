import { readdir, rename } from "node:fs/promises";
import path from "node:path";

// GitHub Pages 按扩展名推断 Content-Type，无扩展名会被当成 octet-stream，
// 社交平台会拒绝这种 og:image，所以导出后补上 .png
const dir = path.join(process.cwd(), "out", "docs", "opengraph-image");

try {
  for (const name of await readdir(dir)) {
    if (name.endsWith(".png")) continue;
    await rename(path.join(dir, name), path.join(dir, `${name}.png`));
  }
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
