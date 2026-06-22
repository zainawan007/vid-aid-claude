import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/niche-finder";
const TITLE = "TikTok Niche Finder — 5 Micro-Niches You Can Own";
const DESC =
  "Discover 5 underserved TikTok micro-niches within your topic, with target viewer, content angle, competition level, and monetization path for each.";

export const Route = createFileRoute("/tools/niche-finder")({
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
          name: "TikTok Niche Finder",
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
      toolId="niches"
      heading="Niche Finder"
      subheading="Find 5 micro-niches you can actually dominate."
      intro={
        <p>
          Drop a broad topic in <strong>Topic</strong>. Get 5 underserved micro-niches with
          target viewer, content angle, competition level, and a monetization path for each.
        </p>
      }
    />
  ),
});
