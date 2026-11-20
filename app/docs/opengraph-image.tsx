import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";
import { docOgId, getDocPages } from "@/lib/og";

const size = { width: 1200, height: 630 };

// satori 只支持 ttf/otf/woff，不支持 woff2；字体随仓库提供，避免构建期从 CDN 拉 8MB 文件超时
const FONT_PATH = path.join(process.cwd(), "app/docs/_fonts/NotoSansSC-Regular.ttf");

let fontCache: Buffer | null | undefined;

async function loadFont() {
  if (fontCache !== undefined) return fontCache;
  try {
    fontCache = await readFile(FONT_PATH);
  } catch {
    fontCache = null;
  }
  return fontCache;
}

export function generateImageMetadata() {
  return getDocPages().map((page) => ({
    id: docOgId(page.url),
    alt: page.data.title,
    size,
    contentType: "image/png",
  }));
}

export default async function Image({ id }: { id: Promise<string> }) {
  const ogId = await id;
  const pages = getDocPages();
  const page = pages.find((item) => docOgId(item.url) === ogId) ?? pages[0];
  const title = page?.data.title ?? siteConfig.name;
  const description = page?.data.description ?? siteConfig.description;
  const fontData = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0b0b0f 0%, #12122a 55%, #1b1233 100%)",
          color: "#f5f5f7",
          position: "relative",
          ...(fontData ? { fontFamily: "Noto Sans SC" } : {}),
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-140px",
            width: "640px",
            height: "640px",
            borderRadius: "50%",
            background: "rgba(59,130,246,0.18)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-260px",
            left: "-160px",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background: "rgba(139,92,246,0.16)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "26px",
            color: "#a1a1aa",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "46px",
              height: "46px",
              borderRadius: "12px",
              background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
              color: "#ffffff",
              fontSize: "22px",
            }}
          >
            Y
          </div>
          <div style={{ display: "flex" }}>{siteConfig.name}</div>
          <div style={{ display: "flex", color: "#52525b" }}>/</div>
          <div style={{ display: "flex" }}>笔记</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 22 ? "48px" : "62px",
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              lineHeight: 1.5,
              color: "#a1a1aa",
              maxWidth: "900px",
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "28px",
            fontSize: "24px",
            color: "#71717a",
          }}
        >
          <div style={{ display: "flex" }}>{siteConfig.url.replace("https://", "")}</div>
          <div style={{ display: "flex" }}>{siteConfig.author}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: "Noto Sans SC",
              data: new Uint8Array(fontData).buffer,
              style: "normal",
              weight: 400,
            },
          ]
        : [],
    },
  );
}
