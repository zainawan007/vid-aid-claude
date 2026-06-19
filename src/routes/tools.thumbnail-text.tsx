import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/thumbnail-text";
const TITLE = "TikTok Title & Thumbnail Text Generator — Punchy On-Screen Overlays";
const DESC =
  "Generate 6 short, punchy on-screen text overlays optimized for TikTok thumbnails and the first 3 seconds of your video. Free AI tool for scroll-stopping titles.";

export const Route = createFileRoute("/tools/thumbnail-text")({
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
          name: "TikTok Title & Thumbnail Text Generator",
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
      toolId="thumbnail"
      heading="Title & Thumbnail Text Generator"
      subheading="2-5 word overlays that earn the tap."
      intro={
        <p>
          Thumbnails sell the click. Get 6 short, high-contrast on-screen text options optimized
          for thumbnails and the first 3 seconds — with placement notes and why each one stops
          the scroll.
        </p>
      }
    />
  ),
});
