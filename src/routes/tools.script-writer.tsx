import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/script-writer";
const TITLE = "TikTok Script Writer — AI Timestamped Video Scripts";
const DESC =
  "Write full TikTok scripts with timestamps, hooks, b-roll cues, and CTAs. Free AI script writer for 15s, 30s, 60s, and 3-minute videos.";

export const Route = createFileRoute("/tools/script-writer")({
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
          name: "TikTok Script Writer",
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
      toolId="script"
      heading="TikTok Script Writer"
      subheading="Full timestamped scripts with hooks, b-roll, and CTAs."
      intro={
        <p>
          Plan the whole video in one shot. Choose a duration and the AI returns a
          shot-by-shot script — hook, beats, on-screen text suggestions, and a CTA — so you
          can hit record without staring at a blank page.
        </p>
      }
    />
  ),
});
