import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/hook-rewriter";
const TITLE = "TikTok Hook Rewriter — Fix a Weak Hook 5 Ways";
const DESC =
  "Paste an underperforming TikTok hook and get 5 rewrites with a 1-line explanation of what changed and why.";

export const Route = createFileRoute("/tools/hook-rewriter")({
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
          name: "TikTok Hook Rewriter",
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
      toolId="hookRewrite"
      heading="Hook Rewriter"
      subheading="Turn a weak hook into 5 stronger versions — with reasons."
      intro={
        <p>
          Paste your existing hook (max ~200 chars) in <strong>Topic</strong>. Get 5 rewrites,
          each with a 1-line note on what changed and why.
        </p>
      }
    />
  ),
});
