import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/sponsorship-pitch";
const TITLE = "TikTok Sponsorship Pitch Writer — Brand Outreach Emails Under 150 Words";
const DESC =
  "Write a confident, human brand outreach email under 150 words — with a sharp subject line, one tailored collab idea, and a follow-up tip. Free AI tool for creators.";

export const Route = createFileRoute("/tools/sponsorship-pitch")({
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
          name: "TikTok Sponsorship Pitch Writer",
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
      toolId="pitch"
      heading="Sponsorship Pitch"
      subheading="Land brand deals with outreach that sounds human, not corporate."
      intro={
        <p>
          Put your creator brand/angle in <strong>Topic</strong> and the target brand in
          <strong> Niche</strong>. You'll get a subject line, a tailored 150-word pitch with one
          concrete collab idea, and a follow-up tip.
        </p>
      }
    />
  ),
});
