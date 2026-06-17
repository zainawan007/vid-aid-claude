import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/bio-optimizer";
const TITLE = "TikTok Bio Generator — 3 Optimized Profile Bios";
const DESC =
  "Write a TikTok bio that converts profile visits into follows. Get 3 variations (authority, relatable, curiosity) under TikTok's 80-character limit.";

export const Route = createFileRoute("/tools/bio-optimizer")({
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
          name: "TikTok Bio Optimizer",
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
      toolId="bio"
      heading="TikTok Bio Optimizer"
      subheading="3 bios under 80 characters — built to convert profile visits."
      intro={
        <p>
          Authority, relatable, and curiosity-driven variations — each shows identity, social
          proof, and a clear CTA so the right viewer hits Follow on the first visit.
        </p>
      }
    />
  ),
});
