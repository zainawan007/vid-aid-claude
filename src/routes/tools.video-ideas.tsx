import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/video-ideas";
const TITLE = "TikTok Video Idea Generator — 20 Ready-to-Film Ideas";
const DESC =
  "Beat creator's block. Generate 20 TikTok video ideas across listicle, tutorial, storytime, and hot take formats — tailored to your niche in seconds.";

export const Route = createFileRoute("/tools/video-ideas")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "TikTok Video Idea Generator",
          url: URL,
          applicationCategory: "MultimediaApplication",
          operatingSystem: "Any",
          description: DESC,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
    ],
  }),
  component: () => (
    <ToolWorkspace
      toolId="ideas"
      heading="TikTok Video Ideas"
      subheading="20 ready-to-film ideas across the formats that consistently pop."
      intro={
        <p>
          Every idea is bucketed into a proven format — listicle, tutorial, storytime/POV, or
          hot take — so you know exactly how to shoot it. Refill your content backlog in one
          click.
        </p>
      }
    />
  ),
});
