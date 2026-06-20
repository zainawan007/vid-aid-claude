import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/loop-cta-builder";
const TITLE = "TikTok Loop & CTA Builder — 3 Endings Under 15 Words";
const DESC =
  "Generate 3 punchy TikTok video endings — loops that replay seamlessly and CTAs that drive comments, follows, and shares. Each under 15 words.";

export const Route = createFileRoute("/tools/loop-cta-builder")({
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
          name: "TikTok Loop & CTA Builder",
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
      toolId="loopCTA"
      heading="Loop & CTA Builder"
      subheading="End strong. Loop the view, or drive the action."
      intro={
        <p>
          Three ready-to-use video endings under 15 words each — a mix of seamless loops (that
          bounce the viewer back to the hook for double watch time) and direct CTAs (that push
          comments, follows, and shares).
        </p>
      }
    />
  ),
});
