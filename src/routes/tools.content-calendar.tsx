import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/content-calendar";
const TITLE = "TikTok Content Calendar Generator — 7-Day Posting Plan";
const DESC =
  "Build a 7-day TikTok posting plan in seconds. AI-generated calendar with optimal post times, formats, hooks, and briefs for every day of the week.";

export const Route = createFileRoute("/tools/content-calendar")({
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
          name: "TikTok Content Calendar",
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
      toolId="calendar"
      heading="TikTok Content Calendar"
      subheading="A full week of posts — formats, times, hooks, and briefs."
      intro={
        <p>
          Posting cadence beats viral luck. Get a Mon-Sun plan that mixes evergreen formats with
          trend-driven posts so the algorithm sees you show up daily.
        </p>
      }
    />
  ),
});
