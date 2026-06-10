import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const BaseInput = z.object({
  topic: z.string().min(1).max(500),
  tone: z.enum(["Hype", "Funny", "Educational", "Aesthetic", "Storytelling"]),
  niche: z.string().min(1).max(200),
});

const DurationInput = z.enum(["15s", "30s", "60s", "3min"]);

function getGateway() {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  return createLovableAiGatewayProvider(key);
}

const MODEL = "google/gemini-3-flash-preview";

export const generateHooks = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a viral TikTok content strategist. Your job is to write scroll-stopping opening hooks. Each hook must be 1 short sentence (under 12 words), punchy, and designed to make someone stop scrolling. After each hook, provide a 1-sentence explanation of why it works psychologically. Output exactly 5 hooks numbered 1-5.",
      prompt: `Topic: ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nGenerate 5 scroll-stopping TikTok opening hooks with brief explanations.`,
    });
    return { result: text };
  });

export const generateScript = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    BaseInput.extend({ duration: DurationInput }).parse(data)
  )
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a professional TikTok scriptwriter. Write complete, timestamped scripts with [HOOK], [BODY], and [CTA] sections. Include stage directions in brackets. The script should feel natural when spoken aloud. Use concise, punchy sentences.",
      prompt: `Topic: ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\nDuration: ${data.duration}\n\nWrite a full timestamped TikTok script with stage directions, a strong hook, engaging body, and a clear call-to-action. Format with timestamps and section headers.`,
    });
    return { result: text };
  });

export const generateHashtags = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok growth expert. Generate hashtags in three tiers: MEGA (broad, 1B+ views), MID (medium, 10M-500M views), and NICHE (hyper-targeted, under 10M views). For each hashtag, include an estimated view count range. Also suggest one trending sound style that would pair well with this content. Format cleanly with clear headers.",
      prompt: `Topic: ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nGenerate a hashtag pack with mega, mid, and niche tiers plus view estimates. Suggest one trending sound style.`,
    });
    return { result: text };
  });

export const generateCaptions = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok caption specialist. Write 3 caption variations for the same video: one comment-driving (asks a question or invites debate), one FOMO (makes viewers feel they might miss out), and one funny/relatable (casual, meme-y, voice-driven). Keep each caption under 150 characters. Label each variation clearly.",
      prompt: `Topic: ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nWrite 3 TikTok caption variations: comment-driving, FOMO, and funny/relatable.`,
    });
    return { result: text };
  });
