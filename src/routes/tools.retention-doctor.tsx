import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/retention-doctor";
const TITLE = "TikTok Retention Doctor — Find Drop-Off Points in Your Script";
const DESC =
  "Paste your TikTok script and get the 3 most likely viewer drop-off points, why they happen, and one concrete fix for each. Free AI retention analysis.";

export const Route = createFileRoute("/tools/retention-doctor")({
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
          name: "TikTok Retention Doctor",
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
      toolId="retention"
      heading="Retention Doctor"
      subheading="Diagnose the moments viewers swipe away — and fix them."
      intro={
        <p>
          Paste your full script into the Topic field. The AI flags the 3 most likely drop-off
          moments, explains why each one loses viewers, and gives you a concrete rewrite to keep
          them watching.
        </p>
      }
    />
  ),
});
