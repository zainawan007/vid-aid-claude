import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
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
} from "lucide-react";
import { toast } from "sonner";
import { AdBanner } from "@/components/AdBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TikTok Creator Toolkit" },
      { name: "description", content: "AI-powered tools for TikTok creators." },
      { property: "og:title", content: "TikTok Creator Toolkit" },
      { property: "og:description", content: "AI-powered tools for TikTok creators." },
    ],
  }),
  component: TikTokToolkit,
});

const TOOLS = [
  {
    id: "hooks",
    label: "Hook Generator",
    icon: Zap,
    description: "Scroll-stopping opening lines",
  },
  {
    id: "script",
    label: "Script Writer",
    icon: FileText,
    description: "Full timestamped scripts",
  },
  {
    id: "hashtags",
    label: "Hashtag Pack",
    icon: Hash,
    description: "Hashtags + trending sounds",
  },
  {
    id: "captions",
    label: "Caption Crafter",
    icon: MessageSquareQuote,
    description: "3 caption variations",
  },
] as const;

const TONES = [
  "Hype",
  "Funny",
  "Educational",
  "Aesthetic",
  "Storytelling",
] as const;

const DURATIONS = ["15s", "30s", "60s", "3min"] as const;

type ToolId = (typeof TOOLS)[number]["id"];

function TikTokToolkit() {
  const [activeTab, setActiveTab] = useState<ToolId>("hooks");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<(typeof TONES)[number]>("Hype");
  const [niche, setNiche] = useState("");
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>("30s");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic first.");
      return;
    }
    setLoading(true);
    setResult("");
    setError("");
    try {
      let res: { result: string };
      switch (activeTab) {
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
        default:
          throw new Error("Unknown tool");
      }
      setResult(res.result);
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
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
            <span className="tiktok-gradient-text">TikTok Creator Toolkit</span>
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Generate hooks, scripts, hashtags, and captions in seconds.
          </p>
        </div>
        {/* Decorative gradient orbs */}
        <div className="pointer-events-none absolute -left-20 top-0 h-40 w-40 rounded-full bg-tiktok-cyan/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-40 w-40 rounded-full bg-tiktok-pink/10 blur-3xl" />
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ToolId)}>
          {/* Tool Cards */}
          <TabsList className="mb-6 grid h-auto w-full grid-cols-2 gap-2 bg-transparent p-0 sm:grid-cols-4">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTab === tool.id;
              return (
                <TabsTrigger
                  key={tool.id}
                  value={tool.id}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-surface-raised px-3 py-4 text-sm font-medium text-muted-foreground transition-all data-[state=active]:border-tiktok-pink/50 data-[state=active]:bg-surface-elevated data-[state=active]:text-foreground data-[state=active]:shadow-[0_0_15px_oklch(0.63_0.22_20/0.15)] hover:bg-surface-elevated"
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
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Shared Input Area */}
          <div className="rounded-2xl border border-border/50 bg-surface-raised p-5 sm:p-6">
            <div className="space-y-5">
              {/* Topic */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Topic
                </label>
                <Textarea
                  placeholder="What is your video about? e.g., morning routine, productivity hacks, crypto tips..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="min-h-[80px] resize-none border-border/60 bg-background text-foreground placeholder:text-muted-foreground/60"
                />
              </div>

              {/* Tone + Niche row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Tone
                  </label>
                  <Select value={tone} onValueChange={(v) => setTone(v as typeof tone)}>
                    <SelectTrigger className="border-border/60 bg-background text-foreground">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent className="border-border bg-surface-elevated text-foreground">
                      {TONES.map((t) => (
                        <SelectItem
                          key={t}
                          value={t}
                          className="text-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Niche
                  </label>
                  <Input
                    placeholder="e.g., Fitness, Finance, Comedy"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="border-border/60 bg-background text-foreground placeholder:text-muted-foreground/60"
                  />
                </div>
              </div>

              {/* Duration - only for Script Writer */}
              {activeTab === "script" && (
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

              {/* Generate Button */}
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
                    Generate {TOOLS.find((t) => t.id === activeTab)?.label}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Output */}
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
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 py-6 text-center text-xs text-muted-foreground">
        Powered by Lovable AI
      </footer>
    </div>
  );
}
