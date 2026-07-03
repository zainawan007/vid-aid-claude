import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";

const URL = "https://vid-aid-claude.lovable.app/tools/rate-card-calculator";
const TITLE = "Creator Rate Card Calculator — Sponsored Content Pricing";
const DESC =
  "Estimate a sponsored-content price range from your followers, avg views, engagement rate, and content type — with the benchmark logic explained.";

export const Route = createFileRoute("/tools/rate-card-calculator")({
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
          name: "Creator Rate Card Calculator",
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
      toolId="rateCard"
      heading="Rate Card Calculator"
      subheading="Know your number — with the industry math to back it up."
      intro={
        <p>
          Enter your stats (<em>e.g. 120K followers · 45K avg views · 6% ER</em>) in
          <strong> Topic</strong>. Put the content type in <strong>Niche</strong>:
          <em> single video</em>, <em>series</em>, <em>UGC</em>, or <em>whitelisting</em>.
        </p>
      }
    />
  ),
});
