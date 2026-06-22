import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/storytime-builder";
const TITLE = "TikTok Storytime Builder — Hook, Twist, Payoff Script";
const DESC =
  "Turn any story seed into a 60–90 second TikTok storytime with hook, setup, escalation, twist, payoff, and CTA — beat by beat.";

export const Route = createFileRoute("/tools/storytime-builder")({
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
          name: "TikTok Storytime Builder",
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
      toolId="storytime"
      heading="Storytime Builder"
      subheading="A full story arc with hook, twist, and payoff."
      intro={
        <p>
          Drop the story seed in <strong>Topic</strong>. Get a 60–90 second script broken into
          hook, setup, escalation, twist, payoff, and CTA — ready to film.
        </p>
      }
    />
  ),
});
