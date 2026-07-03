import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/best-time-to-post";
const TITLE = "Best Time To Post on TikTok — 3 Optimal Windows";
const DESC =
  "Get 3 recommended TikTok posting windows tailored to your niche, timezone, and audience region — each with a short rationale.";

export const Route = createFileRoute("/tools/best-time-to-post")({
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
          name: "Best Time To Post on TikTok",
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
      toolId="bestTime"
      heading="Best Time To Post"
      subheading="3 posting windows tuned to your niche + audience."
      intro={
        <p>
          Put your niche in <strong>Topic</strong>, and your timezone + audience region
          (e.g. <em>EST · US</em>, <em>CET · EU</em>, <em>GMT+8 · Asia</em>, <em>UTC · Global</em>)
          in <strong>Niche</strong>.
        </p>
      }
    />
  ),
});
