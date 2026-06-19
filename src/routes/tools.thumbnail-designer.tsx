import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/thumbnail-designer";
const TITLE = "TikTok Thumbnail Design Generator — Layout, Colors, Fonts & Props";
const DESC =
  "Get a full AI thumbnail design spec for TikTok and Shorts: layout, color palette with hex codes, fonts, props, lighting, and exact text placement. Free.";

export const Route = createFileRoute("/tools/thumbnail-designer")({
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
          name: "TikTok Thumbnail Design Generator",
          url: URL,
          applicationCategory: "DesignApplication",
          operatingSystem: "Any",
          description: DESC,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
    ],
  }),
  component: () => (
    <ToolWorkspace
      toolId="thumbDesign"
      heading="Thumbnail Design Generator"
      subheading="A complete design spec — not just text."
      intro={
        <p>
          Get a production-ready thumbnail brief: layout & composition, a 4-color palette with hex
          codes, font pairings, subject pose, props, lighting, exact text placement with safe-zone
          notes, and the reasoning behind every choice.
        </p>
      }
    />
  ),
});
