import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/b-roll-suggester";
const TITLE = "TikTok B-Roll Suggester — Line-by-Line Visual Ideas";
const DESC =
  "Paste your video script and get 1-2 b-roll or visual cutaway ideas for every line, laid out as a clean table.";

export const Route = createFileRoute("/tools/b-roll-suggester")({
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
          name: "TikTok B-Roll Suggester",
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
      toolId="bRoll"
      heading="B-Roll Suggester"
      subheading="Every script line gets 1-2 shootable visuals."
      intro={
        <p>
          Paste your full video script in <strong>Topic</strong>. You'll get a two-column table
          (Script Line · Suggested Visual) you can hand to your editor.
        </p>
      }
    />
  ),
});
