import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/caption-crafter";
const TITLE = "TikTok Caption Generator — 3 AI Caption Variations";
const DESC =
  "Craft three TikTok caption variations in seconds — curiosity, value, and CTA styles. Free AI caption generator tuned for engagement and comment-bait.";

export const Route = createFileRoute("/tools/caption-crafter")({
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
          name: "TikTok Caption Crafter",
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
      toolId="captions"
      heading="TikTok Caption Crafter"
      subheading="Three caption angles built to drive comments and saves."
      intro={
        <p>
          Get three caption variations per topic — a curiosity hook, a value-led line, and a
          comment-bait CTA — so you can pick the angle that fits the video without rewriting.
        </p>
      }
    />
  ),
});
