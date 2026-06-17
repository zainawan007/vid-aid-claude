import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/trend-angles";
const TITLE = "TikTok Trend Angle Generator — Ride Viral Formats";
const DESC =
  "Turn evergreen TikTok trend formats (POV, green screen, before/after, CapCut templates) into 5 niche-specific angles built for your audience.";

export const Route = createFileRoute("/tools/trend-angles")({
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
          name: "TikTok Trend Angle Generator",
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
      toolId="trends"
      heading="TikTok Trend Angles"
      subheading="5 ways to ride proven viral formats — adapted to your niche."
      intro={
        <p>
          Don't chase trends blindly. Each angle maps a proven format to your niche with a hook
          and a reason it works, so you can film a trend that actually fits your channel.
        </p>
      }
    />
  ),
});
