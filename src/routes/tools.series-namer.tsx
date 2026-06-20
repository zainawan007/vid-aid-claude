import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/series-namer";
const TITLE = "TikTok Series Namer — 8 Catchy Recurring Series Names";
const DESC =
  "Generate 8 TikTok series names across punny, literal, numbered, and branded styles — perfect on-screen titles for a recurring format that builds repeat viewers.";

export const Route = createFileRoute("/tools/series-namer")({
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
          name: "TikTok Series Namer",
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
      toolId="seriesNames"
      heading="Series Namer"
      subheading="A recurring on-screen title is the fastest way to build repeat viewers."
      intro={
        <p>
          Describe your format in <strong>Topic</strong> (e.g. "I try a viral kitchen gadget
          every day"). Get 8 series names across punny, literal, numbered, and branded styles —
          with notes on why each works.
        </p>
      }
    />
  ),
});
