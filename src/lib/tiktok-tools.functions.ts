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
    return { result: text };
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

export const generateRetention = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok retention doctor. Given a script (provided as the Topic field), identify the 3 most likely viewer drop-off points and fix each. Output exactly 3 numbered sections: 1) TIMESTAMP (approx second mark), 2) ISSUE (what makes viewers swipe — pacing, weak hook, confusing line, dead air), 3) FIX (concrete rewrite or edit). End with OVERALL RETENTION SCORE: x/10 and BIGGEST RISK: <1 sentence>.",
      prompt: `Script (Topic):\n${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nDiagnose drop-offs and fixes.`,
    });
    return { result: text };
  });

export const generateLoopCTA = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok endings specialist. Generate 3 video endings, each under 15 words. Mix LOOP endings (line that flows back into the opening so the video replays seamlessly) and CTA endings (drive comments, follows, saves, or shares). For each: TYPE (loop/cta), TEXT (the actual line), WHY IT WORKS (1 sentence). Number 1-3.",
      prompt: `Video topic: ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nWrite 3 loop + CTA endings under 15 words each.`,
    });
    return { result: text };
  });

export const generateNiches = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok niche strategist. Suggest 5 underserved micro-niches a creator can own within a broader topic. For each: NICHE NAME, TARGET VIEWER (1 sentence), CONTENT ANGLE (what type of videos), COMPETITION (low/med/high), MONETIZATION PATH (brand fit/products/affiliate). Number 1-5.",
      prompt: `Broad topic: ${data.topic}\nTone: ${data.tone}\nCurrent niche: ${data.niche}\n\nFind 5 micro-niches to own.`,
    });
    return { result: text };
  });

export const generateStorytime = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok storytime architect. Turn a topic into a 60-90 second story script using this arc: 1) HOOK (cliffhanger first line under 12 words), 2) SETUP (who/where/stakes, 2-3 short sentences), 3) ESCALATION (the build, 2-3 sentences), 4) TWIST (the unexpected turn), 5) PAYOFF (resolution + emotion), 6) CTA (invite a reaction). Label each beat. Keep voice conversational, sentences punchy.",
      prompt: `Story seed: ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nBuild the storytime arc.`,
    });
    return { result: text };
  });

export const generatePinnedComment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok engagement strategist. Generate 5 pinned-comment ideas the creator can drop on their own video to spark replies and pump the algorithm. Mix: 1) provocative question, 2) hot take, 3) 'tell me your X', 4) admission/vulnerability, 5) tease part 2. Each under 100 chars. For each: TYPE, COMMENT, WHY IT WORKS.",
      prompt: `Video topic: ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nWrite 5 pinned-comment options.`,
    });
    return { result: text };
  });

export const generateCarousel = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok photo-carousel/slideshow expert. Build a 7-slide carousel post. For each slide output: SLIDE #, ON-IMAGE TEXT (2-8 words, scroll-stopping), VISUAL DESCRIPTION (what to photograph/screenshot), CAPTION ROLE (hook / build / payoff / cta). Slide 1 must be the curiosity hook, slide 7 must be the CTA. End with a SUGGESTED SOUND vibe and a 200-char post caption.",
      prompt: `Topic: ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nBuild a 7-slide TikTok photo carousel.`,
    });
    return { result: text };
  });

export const generateSEODescription = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok SEO specialist. Write a search-optimized video description under 300 chars that front-loads 2-3 high-intent keywords a viewer would actually type into TikTok search. Output 3 sections clearly labeled: 1) PRIMARY KEYWORDS (3 phrases people search), 2) SEO DESCRIPTION (the actual caption, keywords in first sentence, natural voice — not stuffed), 3) ALT-TEXT/ON-SCREEN KEYWORD (1 phrase to also say out loud in the first 3 seconds for TikTok's auto-transcribe).",
      prompt: `Video topic: ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nWrite the SEO description.`,
    });
    return { result: text };
  });

export const generateSponsorshipPitch = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a creator-side brand outreach writer. Write a sponsorship pitch under 150 words. Output: 1) SUBJECT LINE (under 60 chars, specific, not generic), 2) PITCH (warm, confident, mentions a concrete collab idea tailored to the brand, includes a soft proof point and clear next step), 3) FOLLOW-UP TIP (1 sentence on when/how to nudge). No fake stats. Keep it human, not corporate.",
      prompt: `Creator niche/brand: ${data.topic}\nTone: ${data.tone}\nTarget niche/brand to pitch: ${data.niche}\n\nWrite the outreach email.`,
    });
    return { result: text };
  });

export const generateSeriesNames = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok series naming expert. Generate 8 series names that creators can use as a recurring on-screen title. Mix 4 styles evenly (2 each): PUNNY (wordplay), LITERAL (clear what it is), NUMBERED (e.g. '60-Second X', 'Day 1 of...'), BRANDED (signature creator-owned phrase). For each: NAME, STYLE label, 1-sentence WHY. Number 1-8.",
      prompt: `Niche: ${data.niche}\nTone: ${data.tone}\nFormat description (Topic): ${data.topic}\n\nName the series 8 ways.`,
    });
    return { result: text };
  });

export const generatePacing = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok pacing checker. The Topic field IS the script. The Niche field is the target seconds (parse the first number). Use 2.5-3 words/sec for natural speech. Output exactly: WORD COUNT, TARGET SECONDS, ESTIMATED SPEAKING SECONDS (range low-high), VERDICT (too short / good fit / too long), DENSE SENTENCES (list every sentence over 20 words verbatim, or 'None'). End with 1 concrete tightening suggestion if too long, or 1 padding suggestion if too short.",
      prompt: `Script (Topic):\n${data.topic}\nTarget seconds (Niche): ${data.niche}\nTone: ${data.tone}\n\nRun the pacing check.`,
    });
    return { result: text };
  });

export const generateDuetStitch = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok duet/stitch strategist. Given a trending video description, generate 5 response angles that add value, humor, or a contrarian take — never lazy reaction-face content. Mix duets and stitches. For each: TYPE (duet/stitch), ANGLE (1-sentence concept), HOOK (the first line you'd say), WHY IT WORKS. Number 1-5.",
      prompt: `Trending video (Topic): ${data.topic}\nTone: ${data.tone}\nYour niche: ${data.niche}\n\nGive 5 duet/stitch angles.`,
    });
    return { result: text };
  });

export const generateHookRewrite = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok hook doctor. Given an underperforming hook (in the Topic field), rewrite it 5 different ways. Each rewrite must be under 12 words. For each: NEW HOOK, WHAT CHANGED (1 line — e.g. 'Added curiosity gap in first 3 words', 'Front-loaded the payoff', 'Switched to contrarian frame'). Number 1-5.",
      prompt: `Original hook (Topic): ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nRewrite this hook 5 ways with explanations.`,
    });
    return { result: text };
  });

export const generateBestTime = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok posting-time strategist. Topic = niche description, Tone = tone, Niche = 'timezone + audience region (US/EU/Asia/Global)'. Recommend 3 posting windows. For each: DAY, TIME WINDOW (in the given timezone), RATIONALE (2 sentences tying to niche audience behavior — commute, lunch, wind-down, weekend scroll). Rank strongest first. End with 1 line on what NOT to do.",
      prompt: `Niche (Topic): ${data.topic}\nTone: ${data.tone}\nTimezone + audience region (Niche): ${data.niche}\n\nRecommend 3 posting windows.`,
    });
    return { result: text };
  });

export const generateBRoll = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok b-roll director. The Topic field IS the full script. Break it into script lines/beats (1 sentence each). For each, suggest 1-2 concrete b-roll or visual cutaway ideas. Output a clean markdown table with exactly two columns: | Script Line | Suggested Visual |. Keep visuals specific and shootable (props, angles, screen recordings, stock cues). No preamble.",
      prompt: `Script (Topic):\n${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nGenerate the b-roll breakdown table.`,
    });
    return { result: text };
  });

export const generateMediaKit = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a creator media-kit writer. Topic = creator name + optional past brand collabs, Tone = content tone, Niche = 'niche + follower count + avg views + engagement rate'. Produce a clean one-page media kit with these labeled sections: NAME & TAGLINE, BIO (3-4 sentences), THE NUMBERS (bullets for followers / avg views / engagement rate), AUDIENCE (1 paragraph on who they are and why brands want them), PAST COLLABS (bullets — use the ones provided or write 'Available on request'), WHY WORK WITH ME (3 punchy bullets), CONTACT (CTA to reply/DM). Feels premium, no fluff.",
      prompt: `Creator + past collabs (Topic): ${data.topic}\nTone: ${data.tone}\nNiche + stats (Niche): ${data.niche}\n\nBuild the media kit.`,
    });
    return { result: text };
  });

export const generateRateCard = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a creator-economy pricing analyst. Topic = 'followers, avg views, engagement rate' (parse the numbers). Tone = content tone. Niche = content type (single video / series / UGC / whitelisting). Output: 1) ESTIMATED PRICE RANGE in USD (low-high) for the selected content type, 2) HOW WE GOT THERE (bullets citing industry benchmarks: CPM per 1k views, engagement multiplier, usage-rights uplift for whitelisting, package discount for series, UGC flat-fee logic), 3) LEVERAGE TIPS (2 bullets on when to charge the high end). Be specific, not wishy-washy.",
      prompt: `Stats (Topic): ${data.topic}\nTone: ${data.tone}\nContent type (Niche): ${data.niche}\n\nCalculate the rate.`,
    });
    return { result: text };
  });

export const generateTrendLifecycle = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok trend lifecycle analyst. Topic = the sound / hashtag / format name to evaluate. Output exactly: STATUS: <EMERGING | PEAKING | SATURATED | DECLINING>, WHY (2-3 sentences describing typical adoption signals for this stage — creator saturation, algo boost, comment sentiment), RECOMMENDATION (one of: 'jump on it now', 'use with a twist', 'avoid, find next trend') with a 1-sentence action, NEXT TREND SIGNAL (1 sentence on what to watch for next). Be decisive.",
      prompt: `Trend to check (Topic): ${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nDiagnose the lifecycle stage.`,
    });
    return { result: text };
  });

export const generateCrossPlatform = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a cross-platform short-form adapter. The Topic field IS the TikTok script. Adapt it for 3 platforms. Output exactly 3 clearly labeled sections in this order:\n\n=== INSTAGRAM REELS ===\n<adapted script + PLATFORM NOTES: tone, pacing, aesthetic, on-screen text style, 5 suggested hashtags>\n\n=== YOUTUBE SHORTS ===\n<adapted script with stronger value framing + PLATFORM NOTES: retention-optimized opener, clearer subscribe CTA, title suggestion>\n\n=== TWITTER / X THREAD ===\n<numbered 5-8 tweet thread, tweet 1 = hook under 240 chars, final tweet = CTA + PLATFORM NOTES: line-break rhythm, no hashtags-in-body>\n\nNo preamble. Keep each platform section self-contained.",
      prompt: `TikTok script (Topic):\n${data.topic}\nTone: ${data.tone}\nNiche: ${data.niche}\n\nAdapt across platforms.`,
    });
    return { result: text };
  });

export const generateCollabIdeas = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BaseInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(MODEL),
      system:
        "You are a TikTok collab matchmaker. Topic = your niche, Tone = content tone, Niche = 'follower range + collab goal (cross-promotion / duet challenge / joint series)'. Suggest 5 creator ARCHETYPES to collab with (describe the type of creator — not real handles). For each: ARCHETYPE (1-line description), WHY THE PAIRING WORKS (audience overlap + contrast), SUGGESTED COLLAB FORMAT (concrete video idea matching the collab goal). Number 1-5.",
      prompt: `Your niche (Topic): ${data.topic}\nTone: ${data.tone}\nFollower range + goal (Niche): ${data.niche}\n\nSuggest 5 collab archetypes.`,
    });
    return { result: text };
  });

