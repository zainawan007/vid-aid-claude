import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/trend-lifecycle-checker";
const TITLE = "TikTok Trend Lifecycle Checker — Emerging or Saturated?";
const DESC =
  "Check whether a TikTok sound, hashtag, or format is emerging, peaking, saturated, or declining — with a clear recommendation.";

export const Route = createFileRoute("/tools/trend-lifecycle-checker")({
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
          name: "TikTok Trend Lifecycle Checker",
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
      toolId="trendLifecycle"
      heading="Trend Lifecycle Checker"
      subheading="Jump on it now, twist it, or skip it — with reasoning."
      intro={
        <p>
          Type a sound name, hashtag, or format in <strong>Topic</strong>. You'll get a status
          badge (Emerging / Peaking / Saturated / Declining) plus a clear next-move.
        </p>
      }
    />
  ),
});
