import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { bebas, inter, C } from "../fonts";

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const badge = spring({ frame, fps, config: { damping: 12, stiffness: 200 } });
  const line1 = spring({ frame: frame - 12, fps, config: { damping: 14 } });
  const line2 = spring({ frame: frame - 26, fps, config: { damping: 14 } });
  const url = spring({ frame: frame - 60, fps, config: { damping: 20 } });
  const pulse = 1 + Math.sin(frame / 4) * 0.02;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(900px 900px at 50% 40%, ${C.pink}55, ${C.bg} 70%), ${C.bg}`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          transform: `scale(${badge * pulse})`,
          background: C.cyan,
          color: C.ink,
          fontFamily: inter,
          fontWeight: 800,
          fontSize: 34,
          letterSpacing: 6,
          padding: "16px 36px",
          marginBottom: 40,
        }}
      >
        FREE · NO SIGN-UP
      </div>

      <div
        style={{
          fontFamily: bebas,
          color: C.cream,
          fontSize: 220,
          lineHeight: 0.85,
          letterSpacing: 2,
          textAlign: "center",
          transform: `translateY(${interpolate(line1, [0, 1], [60, 0])}px)`,
          opacity: line1,
        }}
      >
        TIKTOK
      </div>
      <div
        style={{
          fontFamily: bebas,
          color: C.pink,
          fontSize: 220,
          lineHeight: 0.85,
          letterSpacing: 2,
          textAlign: "center",
          transform: `translateY(${interpolate(line2, [0, 1], [60, 0])}px)`,
          opacity: line2,
        }}
      >
        CREATOR
      </div>
      <div
        style={{
          fontFamily: bebas,
          color: C.cream,
          fontSize: 220,
          lineHeight: 0.85,
          letterSpacing: 2,
          textAlign: "center",
          transform: `translateY(${interpolate(line2, [0, 1], [80, 0])}px)`,
          opacity: line2,
        }}
      >
        TOOLKIT
      </div>

      <div
        style={{
          marginTop: 80,
          fontFamily: inter,
          fontWeight: 800,
          color: C.cyan,
          fontSize: 42,
          letterSpacing: 4,
          opacity: url,
          transform: `translateY(${interpolate(url, [0, 1], [20, 0])}px)`,
        }}
      >
        vid-aid-claude.lovable.app
      </div>
    </AbsoluteFill>
  );
};
