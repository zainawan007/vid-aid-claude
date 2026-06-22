import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/pinned-comment";
const TITLE = "TikTok Pinned Comment Generator — Pump Replies & Algorithm";
const DESC =
  "Generate 5 pinned-comment ideas creators can drop on their own video to spark replies and boost algorithm reach — questions, hot takes, and teasers.";

export const Route = createFileRoute("/tools/pinned-comment")({
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
          name: "TikTok Pinned Comment Generator",
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
      toolId="pinned"
      heading="Pinned Comment Generator"
      subheading="5 self-pinned comments that pump replies."
      intro={
        <p>
          Describe the video in <strong>Topic</strong>. Get 5 pinned-comment options — a
          question, a hot take, a tell-me-yours, an admission, and a tease for part 2.
        </p>
      }
    />
  ),
});
