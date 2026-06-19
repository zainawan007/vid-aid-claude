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

export const generateIdeas = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok content strategist. Generate 20 distinct video ideas grouped into 4 proven formats: LISTICLE (e.g. '5 things...'), TUTORIAL/HOW-TO, STORYTIME/POV, and HOT TAKE/CONTROVERSY. Each idea is 1 punchy sentence the creator could film today. Number them 1-20 and label the format for each.",
      prompt: `Topic: ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nGive me 20 ready-to-film TikTok video ideas across 4 formats.`,
    });
    return { result: text };
  });

export const generateCalendar = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok content planner. Produce a 7-day posting calendar (Mon-Sun). For each day include: Day, Best post time (EST), Format (e.g. Listicle, Tutorial, POV, Trend, Q&A, Behind-the-scenes, CTA), Hook line, and 1-sentence content brief. Mix evergreen and trend-driven content. Keep it scannable.",
      prompt: `Topic/Brand: ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nBuild a 7-day TikTok content calendar.`,
    });
    return { result: text };
  });

export const generateTrends = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok trend strategist. Given a topic and niche, generate 5 angle ideas to ride evergreen TikTok trend formats (e.g. 'tell me you're X without telling me', 'POV:', 'green screen reaction', 'day in the life', 'before vs after', 'CapCut template remix'). For each: TREND FORMAT, NICHE ANGLE, HOOK, and WHY IT WORKS. Number 1-5.",
      prompt: `Topic: ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nGive 5 trend-ride angles.`,
    });
    return { result: text };
  });

export const generateBio = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok profile optimizer. Write 3 bio variations (max 80 characters each, TikTok's limit). Each bio: line 1 = identity/promise, line 2 = social proof or hook, line 3 = CTA with emoji arrow to link. Variations: AUTHORITY (expert), RELATABLE (friend-next-door), CURIOSITY (mystery/intrigue). Label each clearly and show character count.",
      prompt: `Creator topic: ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nWrite 3 optimized TikTok bios.`,
    });
    return { result: text };
  });

export const generateHookAB = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok A/B testing expert. For ONE topic, write 5 alternate opening hook variations that each use a DIFFERENT psychological lever (curiosity gap, bold claim, contrarian take, question, pattern interrupt). Each hook: under 12 words. After each, add LEVER: <name> and TEST HYPOTHESIS: <1-sentence what you're testing>. Number 1-5.",
      prompt: `Topic: ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nGenerate 5 A/B hook variations to split-test.`,
    });
    return { result: text };
  });

export const generateCommentReplies = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok engagement coach. Generate 5 witty, on-brand reply templates a creator can use to respond to common comment types. Cover: 1) genuine question, 2) hate/troll, 3) compliment, 4) skeptical/doubt, 5) tag-a-friend request. Each reply: under 120 chars, designed to boost engagement (invite more replies, defuse hate, build community). Label each by comment type.",
      prompt: `Creator topic: ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nWrite 5 comment reply templates.`,
    });
    return { result: text };
  });

export const generateThumbnailText = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok thumbnail and on-screen text expert. Generate 6 short, punchy text overlays optimized for thumbnails and the first 3 seconds of a video. Rules: 2-5 words each, ALL CAPS friendly, high-contrast curiosity. For each: TEXT, PLACEMENT (top/center/bottom), and WHY IT STOPS THE SCROLL. Number 1-6.",
      prompt: `Topic: ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nGenerate 6 thumbnail + on-screen title overlays.`,
    });
    return { result: text };
  });

export const generateRepurpose = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a short-form repurposing strategist. Take a TikTok script/idea and rewrite it for two other platforms. Output 3 sections clearly labeled: 1) TIKTOK (original-style, 30-45s, native CTA), 2) INSTAGRAM REELS (slightly more polished, aesthetic CTA, suggest 5 hashtags), 3) YOUTUBE SHORTS (clearer value framing, retention-optimized opener, end-screen CTA to subscribe). For each: HOOK, BODY, CTA, and 1 platform-specific note.",
      prompt: `Original TikTok topic/script: ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nRewrite for TikTok, Instagram Reels, and YouTube Shorts.`,
    });
    return { result: text };
  });

export const generateThumbnailDesign = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a senior TikTok/YouTube thumbnail designer. Output a complete, production-ready thumbnail design spec a creator can hand to a designer or recreate in Canva. Use this exact structure with clear section headers:\n\n1) CONCEPT — 1-sentence visual idea + the emotion it triggers.\n2) LAYOUT — composition rule (rule of thirds / center subject / split-screen / before-after), focal point placement, and visual hierarchy order.\n3) COLOR PALETTE — 4 hex codes with role labels (background, primary, accent, text). High-contrast, scroll-stopping. Note dominant temperature (warm/cool).\n4) TYPOGRAPHY — exact font family suggestions (1 display + 1 supporting, name real free fonts e.g. Anton, Bebas Neue, Inter, Montserrat), weight, approx px size, letter-spacing, and text effect (stroke px+color, drop shadow, highlight bar).\n5) TEXT PLACEMENT — exact overlay copy (2-5 words, ALL CAPS friendly), position (top-left/center/bottom-right etc.), and safe-zone notes so it isn't cropped by the TikTok UI (avoid bottom 20% and right 15%).\n6) SUBJECT & POSE — who/what is in frame, facial expression, gaze direction, body language.\n7) PROPS & BACKGROUND — 2-4 specific props, background type (solid, gradient, location, blurred), lighting style (ring light, golden hour, neon).\n8) EFFECTS & DETAILS — arrows, circles, emoji overlays, glow, grain, sticker callouts (if any).\n9) WHY IT WORKS — 2-3 bullets tying the design to curiosity, contrast, and the niche.\n\nBe specific and opinionated. No fluff. Keep total under ~450 words.",
      prompt: `Video topic: ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nProduce a full thumbnail design spec.`,
  });

const ImagePromptInput = z.object({
  spec: z.string().min(10).max(8000),
  topic: z.string().min(1).max(500),
  niche: z.string().min(1).max(200),
});

export const generateImagePrompt = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ImagePromptInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You convert a thumbnail design spec into ready-to-paste prompts for popular AI image generators. Output EXACTLY these 4 labeled sections, each as a single dense paragraph the user can copy verbatim — no preamble, no bullets, no markdown headers other than the labels shown:\n\n=== MIDJOURNEY ===\n<one paragraph prompt, comma-separated descriptors, ends with --ar 9:16 --style raw --v 6>\n\n=== DALL·E / ChatGPT ===\n<one natural-language paragraph, 9:16 vertical, explicit about subject pose, lighting, color hex codes, on-image text in quotes with placement, font style>\n\n=== STABLE DIFFUSION / FLUX ===\n<positive prompt as comma-separated tags, then a new line starting with `Negative prompt:` listing: blurry, low contrast, extra fingers, distorted text, watermark, cluttered>\n\n=== NANO BANANA / GEMINI ===\n<one paragraph, plainspoken, explicit 9:16 vertical thumbnail, restate exact on-image text in quotes with placement and font, palette hex codes, safe-zone reminder>\n\nRules: bake in the exact hex colors, the exact on-image text (in quotes), font style, subject, pose, props, lighting, and 9:16 vertical thumbnail framing from the spec. If the spec includes text overlay, every prompt must instruct the model to render that text legibly with the specified placement. Keep each prompt under 120 words.",
      prompt: `Video topic: ${data.topic}\nNiche: ${data.niche}\n\nDesign spec to convert:\n\n${data.spec}`,
    });
    return { result: text };
  });

    return { result: text };
  });
