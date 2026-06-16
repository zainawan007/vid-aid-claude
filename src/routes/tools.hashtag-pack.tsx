import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/hashtag-pack";
const TITLE = "TikTok Hashtag Generator — Trending Hashtag & Sound Packs";
const DESC =
  "Generate niche-targeted TikTok hashtag packs plus trending sound suggestions. Free AI hashtag generator that mixes broad, niche, and micro tags for max reach.";

export const Route = createFileRoute("/tools/hashtag-pack")({
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
          name: "TikTok Hashtag Pack Generator",
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
      toolId="hashtags"
      heading="TikTok Hashtag Pack"
      subheading="Balanced hashtag mixes plus trending sound suggestions."
      intro={
        <p>
          Stop guessing tags. Get a balanced pack of broad, niche, and micro hashtags tuned to
          your topic, with trending sound ideas so your post lands in the right For You feeds.
        </p>
      }
    />
  ),
});
