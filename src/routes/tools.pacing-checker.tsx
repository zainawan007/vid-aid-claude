import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/pacing-checker";
const TITLE = "TikTok Pacing Checker — Will Your Script Fit in 30 / 60 Seconds?";
const DESC =
  "Paste your script and target seconds. Get word count, estimated speaking time, dense sentences over 20 words, and a clear verdict: too short, good fit, or too long.";

export const Route = createFileRoute("/tools/pacing-checker")({
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
          name: "TikTok Pacing Checker",
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
      toolId="pacing"
      heading="Pacing Checker"
      subheading="Make sure your script actually fits the runtime."
      intro={
        <p>
          Paste your script in <strong>Topic</strong> and put the target length (e.g. "30") in
          <strong> Niche</strong>. You'll get word count, estimated speaking time, a verdict, and
          every dense sentence over 20 words flagged for tightening.
        </p>
      }
    />
  ),
});
