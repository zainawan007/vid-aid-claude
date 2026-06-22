import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/photo-carousel";
const TITLE = "TikTok Photo Carousel Builder — 7-Slide Slideshow Script";
const DESC =
  "Build a 7-slide TikTok photo carousel: on-image text, visual direction, slide roles, suggested sound vibe, and a 200-character post caption.";

export const Route = createFileRoute("/tools/photo-carousel")({
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
          name: "TikTok Photo Carousel Builder",
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
      toolId="carousel"
      heading="Photo Carousel Builder"
      subheading="7 slides ready to shoot — text, visuals, sound, caption."
      intro={
        <p>
          Drop your idea in <strong>Topic</strong>. Get a 7-slide slideshow plan with
          on-image text, visual direction for each slide, a sound vibe, and the post caption.
        </p>
      }
    />
  ),
});
