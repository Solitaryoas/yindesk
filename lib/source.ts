import { loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { pageSchema } from "fumadocs-core/source/schema";
import { defineCollections, defineDocs } from "fumadocs-mdx/macro";
import { z } from "zod";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    lastModified: true,
    schema: pageSchema.extend({
      // 笔记的主题标签，用于笔记目录的按主题筛选
      topics: z.array(z.string()).default([]),
    }),
  },
});

export const blogCollection = defineCollections({
  type: "doc",
  dir: "content/blog",
  lastModified: true,
  schema: pageSchema.extend({
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const blogSource = loader({
  baseUrl: "/blog",
  source: blogCollection.toFumadocsSource(),
});
