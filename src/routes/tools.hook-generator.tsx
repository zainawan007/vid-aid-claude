import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/hook-generator";
const TITLE = "TikTok Hook Generator — AI Scroll-Stopping Opening Lines";
const DESC =
  "Generate scroll-stopping TikTok hooks in seconds. Free AI hook generator built for creators who need viral openings that grab attention in the first 3 seconds.";

export const Route = createFileRoute("/tools/hook-generator")({
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
          name: "TikTok Hook Generator",
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
      toolId="hooks"
      heading="TikTok Hook Generator"
      subheading="Scroll-stopping opening lines that earn the first 3 seconds."
      intro={
        <p>
          The first 3 seconds make or break a TikTok. Drop in your topic, pick a tone, and get
          ten viral-style hooks tailored to your niche — pattern interrupts, curiosity gaps,
          bold claims, and POV openers.
        </p>
      }
    />
  ),
});
