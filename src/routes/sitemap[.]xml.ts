import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://vid-aid-claude.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "daily" | "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/tools/hook-generator", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/script-writer", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/hashtag-pack", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/caption-crafter", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/video-ideas", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/content-calendar", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/trend-angles", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/bio-optimizer", changefreq: "weekly", priority: "0.9" },
        ];
        const urls = entries
          .map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
