import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/collab-finder";
const TITLE = "TikTok Collab Finder — 5 Creator Archetypes To Pair With";
const DESC =
  "Get 5 creator archetypes ideal for collabs based on your niche, follower range, and goal — plus a concrete collab format for each.";

export const Route = createFileRoute("/tools/collab-finder")({
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
          name: "TikTok Collab Finder",
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
      toolId="collab"
      heading="Collab Finder"
      subheading="5 creator archetypes + a concrete collab format for each."
      intro={
        <p>
          Put your niche in <strong>Topic</strong>, and your follower range + collab goal
          in <strong>Niche</strong> (e.g. <em>10K-50K · joint series</em>, <em>100K+ · duet challenge</em>).
        </p>
      }
    />
  ),
});
