import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/comment-reply-generator";
const TITLE = "TikTok Comment Reply Generator — Witty Templates That Boost Engagement";
const DESC =
  "Generate 5 witty, on-brand TikTok comment reply templates for questions, hate, compliments, and more. Free AI tool to boost engagement and grow your community.";

export const Route = createFileRoute("/tools/comment-reply-generator")({
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
          name: "TikTok Comment Reply Generator",
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
      toolId="replies"
      heading="Comment Reply Generator"
      subheading="Witty, on-brand replies for every comment type."
      intro={
        <p>
          Replying to comments is rocket fuel for TikTok's algorithm. Get 5 reply templates
          covering questions, hate, compliments, skeptics, and tag-a-friend requests — each
          tuned to spark more comments and grow your community.
        </p>
      }
    />
  ),
});
