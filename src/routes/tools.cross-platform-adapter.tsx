import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/cross-platform-adapter";
const TITLE = "Cross-Platform Adapter — TikTok → Reels, Shorts, X Thread";
const DESC =
  "Paste a TikTok script and get it adapted for Instagram Reels, YouTube Shorts, and a Twitter/X thread — each with platform-specific notes.";

export const Route = createFileRoute("/tools/cross-platform-adapter")({
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
          name: "Cross-Platform Adapter",
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
      toolId="crossPlatform"
      heading="Cross-Platform Adapter"
      subheading="One script → Reels, Shorts, and an X thread."
      intro={
        <p>
          Paste your TikTok script in <strong>Topic</strong>. You'll get 3 platform-adapted
          versions with tone, pacing, and formatting notes for each.
        </p>
      }
    />
  ),
});
