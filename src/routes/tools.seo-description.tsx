import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/seo-description";
const TITLE = "TikTok SEO Description Writer — Searchable Captions";
const DESC =
  "Write a search-optimized TikTok description with 3 high-intent keywords, a natural-voice caption under 300 chars, and an on-screen keyword to say out loud.";

export const Route = createFileRoute("/tools/seo-description")({
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
          name: "TikTok SEO Description Writer",
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
      toolId="seo"
      heading="SEO Description Writer"
      subheading="Get found in TikTok search — keywords + natural caption."
      intro={
        <p>
          Describe the video in <strong>Topic</strong>. Get 3 high-intent search keywords, a
          search-optimized caption under 300 chars, and a phrase to say out loud for
          auto-transcribe.
        </p>
      }
    />
  ),
});
