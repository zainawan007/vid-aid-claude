import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/media-kit-builder";
const TITLE = "Creator Media Kit Builder — One-Page PDF-Ready Kit";
const DESC =
  "Turn your creator name, niche, followers, avg views, and past collabs into a clean one-page media kit brands actually read.";

export const Route = createFileRoute("/tools/media-kit-builder")({
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
          name: "Creator Media Kit Builder",
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
      toolId="mediaKit"
      heading="Media Kit Builder"
      subheading="One-page kit — bio, stats, audience, collab history, CTA."
      intro={
        <p>
          Put your <strong>creator name + top 3 past brand collabs</strong> in Topic, and
          <strong> niche + follower count + avg views + engagement rate</strong> in Niche
          (e.g. <em>Fitness · 120K followers · 45K avg views · 6.2% ER</em>).
        </p>
      }
    />
  ),
});
