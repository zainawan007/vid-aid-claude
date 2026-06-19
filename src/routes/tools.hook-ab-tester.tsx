import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/hook-ab-tester";
const TITLE = "TikTok Hook A/B Tester — Split-Test 5 Opening Variations";
const DESC =
  "Generate 5 alternate TikTok hook variations for one topic, each using a different psychological lever. Free AI tool to split-test which opening line drives the most views.";

export const Route = createFileRoute("/tools/hook-ab-tester")({
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
          name: "TikTok Hook A/B Tester",
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
      toolId="hookAB"
      heading="Hook A/B Tester"
      subheading="Five alternate openings, five different psychological levers."
      intro={
        <p>
          One topic, five different opening hooks — each pulling a different lever (curiosity,
          contrarian, bold claim, question, pattern interrupt). Post them, measure retention,
          and double down on the winner.
        </p>
      }
    />
  ),
});
