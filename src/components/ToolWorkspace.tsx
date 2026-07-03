import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  generateHooks,
  generateScript,
  generateHashtags,
  generateCaptions,
  generateIdeas,
  generateCalendar,
  generateTrends,
  generateBio,
  generateHookAB,
  generateCommentReplies,
  generateThumbnailText,
  generateRepurpose,
  generateThumbnailDesign,
  generateImagePrompt,
  generateRetention,
  generateLoopCTA,
  generateSponsorshipPitch,
  generateSeriesNames,
  generatePacing,
  generateDuetStitch,
  generateNiches,
  generateStorytime,
  generatePinnedComment,
  generateCarousel,
  generateSEODescription,
  generateHookRewrite,
  generateBestTime,
  generateBRoll,
  generateMediaKit,
  generateRateCard,
  generateTrendLifecycle,
  generateCrossPlatform,
  generateCollabIdeas,
} from "@/lib/tiktok-tools.functions";
import {
  Zap,
  FileText,
  Hash,
  MessageSquareQuote,
  Copy,
  Check,
  Loader2,
  Sparkles,
  Music,
  Lightbulb,
  CalendarDays,
  TrendingUp,
  UserCircle,
  FlaskConical,
  MessagesSquare,
  Image as ImageIcon,
  Repeat,
  Palette,
  Wand2,
  Stethoscope,
  RotateCcw,
  Handshake,
  ListOrdered,
  Timer,
  Users,
  Compass,
  BookOpen,
  Pin,
  GalleryHorizontal,
  Search,
  RefreshCw,
  Clock,
  Film,
  IdCard,
  DollarSign,
  Activity,
  Shuffle,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import { AdBanner } from "@/components/AdBanner";

export const TOOLS = [
  { id: "hooks", label: "Hook Generator", icon: Zap, description: "Scroll-stopping opening lines", path: "/tools/hook-generator" },
  { id: "script", label: "Script Writer", icon: FileText, description: "Full timestamped scripts", path: "/tools/script-writer" },
  { id: "hashtags", label: "Hashtag Pack", icon: Hash, description: "Hashtags + trending sounds", path: "/tools/hashtag-pack" },
  { id: "captions", label: "Caption Crafter", icon: MessageSquareQuote, description: "3 caption variations", path: "/tools/caption-crafter" },
  { id: "ideas", label: "Video Ideas", icon: Lightbulb, description: "20 ready-to-film ideas", path: "/tools/video-ideas" },
  { id: "calendar", label: "Content Calendar", icon: CalendarDays, description: "7-day posting plan", path: "/tools/content-calendar" },
  { id: "trends", label: "Trend Angles", icon: TrendingUp, description: "Ride viral formats", path: "/tools/trend-angles" },
  { id: "bio", label: "Bio Optimizer", icon: UserCircle, description: "3 profile bios", path: "/tools/bio-optimizer" },
  { id: "hookAB", label: "Hook A/B Tester", icon: FlaskConical, description: "5 hooks to split-test", path: "/tools/hook-ab-tester" },
  { id: "replies", label: "Comment Replies", icon: MessagesSquare, description: "Witty reply templates", path: "/tools/comment-reply-generator" },
  { id: "thumbnail", label: "Title & Thumbnail Text", icon: ImageIcon, description: "Punchy on-screen overlays", path: "/tools/thumbnail-text" },
  { id: "repurpose", label: "Repurposing Assistant", icon: Repeat, description: "Reels + Shorts rewrites", path: "/tools/repurposing-assistant" },
  { id: "thumbDesign", label: "Thumbnail Design", icon: Palette, description: "Full thumbnail design spec", path: "/tools/thumbnail-designer" },
  { id: "retention", label: "Retention Doctor", icon: Stethoscope, description: "Find 3 drop-off points", path: "/tools/retention-doctor" },
  { id: "loopCTA", label: "Loop & CTA Builder", icon: RotateCcw, description: "3 endings under 15 words", path: "/tools/loop-cta-builder" },
  { id: "pitch", label: "Sponsorship Pitch", icon: Handshake, description: "Brand outreach email", path: "/tools/sponsorship-pitch" },
  { id: "seriesNames", label: "Series Namer", icon: ListOrdered, description: "8 recurring series names", path: "/tools/series-namer" },
  { id: "pacing", label: "Pacing Checker", icon: Timer, description: "Script length vs seconds", path: "/tools/pacing-checker" },
  { id: "duetStitch", label: "Duet & Stitch Finder", icon: Users, description: "5 response angles", path: "/tools/duet-stitch-finder" },
  { id: "niches", label: "Niche Finder", icon: Compass, description: "5 micro-niches to own", path: "/tools/niche-finder" },
  { id: "storytime", label: "Storytime Builder", icon: BookOpen, description: "Hook → twist → payoff arc", path: "/tools/storytime-builder" },
  { id: "pinned", label: "Pinned Comment", icon: Pin, description: "Pump replies + algo", path: "/tools/pinned-comment" },
  { id: "carousel", label: "Photo Carousel", icon: GalleryHorizontal, description: "7-slide slideshow post", path: "/tools/photo-carousel" },
  { id: "seo", label: "SEO Description", icon: Search, description: "Searchable TikTok caption", path: "/tools/seo-description" },
  { id: "hookRewrite", label: "Hook Rewriter", icon: RefreshCw, description: "Fix a weak hook 5 ways", path: "/tools/hook-rewriter" },
  { id: "bestTime", label: "Best Time To Post", icon: Clock, description: "3 optimal posting windows", path: "/tools/best-time-to-post" },
  { id: "bRoll", label: "B-Roll Suggester", icon: Film, description: "Line-by-line visuals", path: "/tools/b-roll-suggester" },
  { id: "mediaKit", label: "Media Kit Builder", icon: IdCard, description: "One-page media kit", path: "/tools/media-kit-builder" },
  { id: "rateCard", label: "Rate Card Calculator", icon: DollarSign, description: "Estimate your price", path: "/tools/rate-card-calculator" },
  { id: "trendLifecycle", label: "Trend Lifecycle", icon: Activity, description: "Emerging or saturated?", path: "/tools/trend-lifecycle-checker" },
  { id: "crossPlatform", label: "Cross-Platform Adapter", icon: Shuffle, description: "Reels, Shorts, X thread", path: "/tools/cross-platform-adapter" },
  { id: "collab", label: "Collab Finder", icon: UserPlus, description: "5 creator archetypes", path: "/tools/collab-finder" },
] as const;

const TONES = ["Hype", "Funny", "Educational", "Aesthetic", "Storytelling"] as const;
const DURATIONS = ["15s", "30s", "60s", "3min"] as const;

export type ToolId = (typeof TOOLS)[number]["id"];

interface ToolWorkspaceProps {
  toolId: ToolId;
  heading: string;
  subheading: string;
  intro?: React.ReactNode;
}

export function ToolWorkspace({ toolId, heading, subheading, intro }: ToolWorkspaceProps) {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<(typeof TONES)[number]>("Hype");
  const [niche, setNiche] = useState("");
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>("30s");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [imageCopied, setImageCopied] = useState(false);
  const [imageError, setImageError] = useState("");

  const activeTool = TOOLS.find((t) => t.id === toolId)!;

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic first.");
      return;
    }
    setLoading(true);
    setResult("");
    setError("");
    setImagePrompt("");
    setImageError("");
    try {
      let res: { result: string };
      switch (toolId) {
        case "hooks":
          res = await generateHooks({ data: { topic, tone, niche } });
          break;
        case "script":
          res = await generateScript({ data: { topic, tone, niche, duration } });
          break;
        case "hashtags":
          res = await generateHashtags({ data: { topic, tone, niche } });
          break;
        case "captions":
          res = await generateCaptions({ data: { topic, tone, niche } });
          break;
        case "ideas":
          res = await generateIdeas({ data: { topic, tone, niche } });
          break;
        case "calendar":
          res = await generateCalendar({ data: { topic, tone, niche } });
          break;
        case "trends":
          res = await generateTrends({ data: { topic, tone, niche } });
          break;
        case "bio":
          res = await generateBio({ data: { topic, tone, niche } });
          break;
        case "hookAB":
          res = await generateHookAB({ data: { topic, tone, niche } });
          break;
        case "replies":
          res = await generateCommentReplies({ data: { topic, tone, niche } });
          break;
        case "thumbnail":
          res = await generateThumbnailText({ data: { topic, tone, niche } });
          break;
        case "repurpose":
          res = await generateRepurpose({ data: { topic, tone, niche } });
          break;
        case "thumbDesign":
          res = await generateThumbnailDesign({ data: { topic, tone, niche } });
          break;
        case "retention":
          res = await generateRetention({ data: { topic, tone, niche } });
          break;
        case "loopCTA":
          res = await generateLoopCTA({ data: { topic, tone, niche } });
          break;
        case "pitch":
          res = await generateSponsorshipPitch({ data: { topic, tone, niche } });
          break;
        case "seriesNames":
          res = await generateSeriesNames({ data: { topic, tone, niche } });
          break;
        case "pacing":
          res = await generatePacing({ data: { topic, tone, niche } });
          break;
        case "duetStitch":
          res = await generateDuetStitch({ data: { topic, tone, niche } });
          break;
        case "niches":
          res = await generateNiches({ data: { topic, tone, niche } });
          break;
        case "storytime":
          res = await generateStorytime({ data: { topic, tone, niche } });
          break;
        case "pinned":
          res = await generatePinnedComment({ data: { topic, tone, niche } });
          break;
        case "carousel":
          res = await generateCarousel({ data: { topic, tone, niche } });
          break;
        case "seo":
          res = await generateSEODescription({ data: { topic, tone, niche } });
          break;
      }
      setResult(res!.result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      if (msg.includes("402") || msg.includes("credits")) {
        setError("AI credits exhausted. Please add credits to your workspace.");
      } else if (msg.includes("429") || msg.includes("rate")) {
        setError("Rate limit exceeded. Please wait a moment and try again.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy.");
    }
  };

  const handleGenerateImagePrompt = async () => {
    if (!result) return;
    setImageLoading(true);
    setImagePrompt("");
    setImageError("");
    try {
      const res = await generateImagePrompt({
        data: { spec: result, topic, niche: niche || "general" },
      });
      setImagePrompt(res.result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      if (msg.includes("402") || msg.includes("credits")) {
        setImageError("AI credits exhausted. Please add credits to your workspace.");
      } else if (msg.includes("429") || msg.includes("rate")) {
        setImageError("Rate limit exceeded. Please wait a moment and try again.");
      } else {
        setImageError(msg);
      }
    } finally {
      setImageLoading(false);
    }
  };

  const handleCopyImagePrompt = async () => {
    if (!imagePrompt) return;
    try {
      await navigator.clipboard.writeText(imagePrompt);
      setImageCopied(true);
      toast.success("Image prompt copied!");
      setTimeout(() => setImageCopied(false), 2000);
    } catch {
      toast.error("Failed to copy.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="relative overflow-hidden border-b border-border/40">
        <div className="mx-auto max-w-3xl px-4 py-10 text-center sm:py-14">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-tiktok-cyan" />
            <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              AI-Powered
            </span>
            <Sparkles className="h-6 w-6 text-tiktok-pink" />
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            <span className="tiktok-gradient-text">{heading}</span>
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">{subheading}</p>
          <div className="mt-4">
            <Link to="/" className="text-sm text-muted-foreground underline hover:text-foreground">
              ← All tools
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -left-20 top-0 h-40 w-40 rounded-full bg-tiktok-cyan/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-40 w-40 rounded-full bg-tiktok-pink/10 blur-3xl" />
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <AdBanner />

        {/* Tool nav */}
        <nav className="mb-6 grid h-auto w-full grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-4">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isActive = tool.id === toolId;
            return (
              <Link
                key={tool.id}
                to={tool.path}
                className={`group flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-sm font-medium transition-all ${
                  isActive
                    ? "border-tiktok-pink/50 bg-surface-elevated text-foreground shadow-[0_0_15px_oklch(0.63_0.22_20/0.15)]"
                    : "border-border/50 bg-surface-raised text-muted-foreground hover:bg-surface-elevated"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                    isActive
                      ? "bg-gradient-to-br from-tiktok-cyan/20 to-tiktok-pink/20"
                      : "bg-muted/50"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${isActive ? "text-tiktok-pink" : "text-muted-foreground"}`}
                  />
                </div>
                <div className="text-center">
                  <div className="font-semibold">{tool.label}</div>
                  <div className="text-xs opacity-60">{tool.description}</div>
                </div>
              </Link>
            );
          })}
        </nav>

        {intro && (
          <section className="mb-6 rounded-2xl border border-border/50 bg-surface-raised p-5 text-sm leading-relaxed text-muted-foreground sm:p-6">
            {intro}
          </section>
        )}

        <div className="rounded-2xl border border-border/50 bg-surface-raised p-5 sm:p-6">
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Topic</label>
              <Textarea
                placeholder="What is your video about? e.g., morning routine, productivity hacks, crypto tips..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="min-h-[80px] resize-none border-border/60 bg-background text-foreground placeholder:text-muted-foreground/60"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Tone</label>
                <Select value={tone} onValueChange={(v) => setTone(v as typeof tone)}>
                  <SelectTrigger className="border-border/60 bg-background text-foreground">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-surface-elevated text-foreground">
                    {TONES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Niche</label>
                <Input
                  placeholder="e.g., Fitness, Finance, Comedy"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="border-border/60 bg-background text-foreground placeholder:text-muted-foreground/60"
                />
              </div>
            </div>

            {toolId === "script" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Duration
                </label>
                <div className="flex flex-wrap gap-2">
                  {DURATIONS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                        duration === d
                          ? "border-tiktok-pink/50 bg-tiktok-pink/10 text-tiktok-pink"
                          : "border-border/60 bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-tiktok-cyan to-tiktok-pink font-bold text-accent-foreground hover:opacity-90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate {activeTool.label}
                </>
              )}
            </Button>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {result && !error && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-border/50 bg-surface-raised">
            <div className="flex items-center justify-between border-b border-border/40 px-5 py-3">
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4 text-tiktok-pink" />
                <span className="text-sm font-semibold text-foreground">Result</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <div className="max-h-[600px] overflow-y-auto p-5">
              <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground">
                {result}
              </pre>
            </div>
          </div>
        )}

        {result && !error && toolId === "thumbDesign" && (
          <div className="mt-6 rounded-2xl border border-tiktok-cyan/30 bg-surface-raised p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4 text-tiktok-cyan" />
                  <h2 className="text-base font-semibold text-foreground">Image AI Prompt</h2>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Convert this design spec into ready-to-paste prompts for Midjourney, DALL·E,
                  Stable Diffusion / Flux, and Nano Banana / Gemini.
                </p>
              </div>
              <Button
                onClick={handleGenerateImagePrompt}
                disabled={imageLoading}
                className="bg-gradient-to-r from-tiktok-cyan to-tiktok-pink font-bold text-accent-foreground hover:opacity-90"
              >
                {imageLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    {imagePrompt ? "Regenerate Prompt" : "Generate Image Prompt"}
                  </>
                )}
              </Button>
            </div>

            {imageError && (
              <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                {imageError}
              </div>
            )}

            {imagePrompt && !imageError && (
              <div className="mt-4 overflow-hidden rounded-xl border border-border/50 bg-background">
                <div className="flex items-center justify-between border-b border-border/40 px-4 py-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Ready-to-paste prompts
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyImagePrompt}
                    className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    {imageCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy all
                      </>
                    )}
                  </Button>
                </div>
                <div className="max-h-[500px] overflow-y-auto p-4">
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground">
                    {imagePrompt}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        <AdBanner />

      </main>

      <footer className="border-t border-border/30 py-6 text-center text-xs text-muted-foreground">
        Powered by Lovable AI
      </footer>
    </div>
  );
}
