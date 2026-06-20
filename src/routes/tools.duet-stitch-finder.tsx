import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/duet-stitch-finder";
const TITLE = "TikTok Duet & Stitch Finder — 5 High-Value Response Angles";
const DESC =
  "Get 5 duet and stitch response angles for any trending video — adding value, humor, or a contrarian take. Skip lazy reactions and ride trends the smart way.";

export const Route = createFileRoute("/tools/duet-stitch-finder")({
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
          name: "TikTok Duet & Stitch Finder",
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
      toolId="duetStitch"
      heading="Duet & Stitch Finder"
      subheading="Ride trending videos with angles that actually add something."
      intro={
        <p>
          Describe the trending video in <strong>Topic</strong>. Get 5 duet or stitch angles —
          each with the type, the concept, the opening hook, and why it works. No lazy
          reaction-face content.
        </p>
      }
    />
  ),
});
