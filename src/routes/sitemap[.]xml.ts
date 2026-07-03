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
          { path: "/tools/hook-ab-tester", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/comment-reply-generator", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/thumbnail-text", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/repurposing-assistant", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/thumbnail-designer", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/retention-doctor", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/loop-cta-builder", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/sponsorship-pitch", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/series-namer", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/pacing-checker", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/duet-stitch-finder", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/niche-finder", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/storytime-builder", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/pinned-comment", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/photo-carousel", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/seo-description", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/hook-rewriter", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/best-time-to-post", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/b-roll-suggester", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/media-kit-builder", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/rate-card-calculator", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/trend-lifecycle-checker", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/cross-platform-adapter", changefreq: "weekly", priority: "0.9" },
          { path: "/tools/collab-finder", changefreq: "weekly", priority: "0.9" },
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
