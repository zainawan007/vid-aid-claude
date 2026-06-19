import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/repurposing-assistant";
const TITLE = "TikTok Repurposing Assistant — Rewrite for Reels & YouTube Shorts";
const DESC =
  "Turn one TikTok idea into three platform-native scripts: TikTok, Instagram Reels, and YouTube Shorts. Free AI tool that adjusts tone, length, and CTA per platform.";

export const Route = createFileRoute("/tools/repurposing-assistant")({
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
          name: "TikTok Repurposing Assistant",
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
      toolId="repurpose"
      heading="Repurposing Assistant"
      subheading="One idea, three platforms, three native rewrites."
      intro={
        <p>
          Drop in a TikTok idea or script and get platform-tuned rewrites for Instagram Reels
          and YouTube Shorts — adjusted tone, length, and CTA so each version feels native, not
          cross-posted.
        </p>
      }
    />
  ),
});
