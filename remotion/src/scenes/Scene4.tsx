import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { bebas, inter, C } from "../fonts";

const WORDS = [
  { t: "TAP.", c: C.pink },
  { t: "TYPE.", c: C.cyan },
  { t: "POST.", c: C.cream },
  { t: "REPEAT.", c: C.pink },
];

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: C.ink, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", top: 200, fontFamily: inter, fontWeight: 800, color: C.cyan, letterSpacing: 6, fontSize: 40 }}>
        THE WORKFLOW —
      </div>
      <div style={{ textAlign: "center" }}>
        {WORDS.map((w, i) => {
          const s = spring({ frame: frame - i * 18, fps, config: { damping: 10, stiffness: 180 } });
          const wob = Math.sin((frame - i * 8) / 6) * 6;
          return (
            <div
              key={w.t}
              style={{
                fontFamily: bebas,
                fontSize: 300,
                color: w.c,
                lineHeight: 0.9,
                letterSpacing: -2,
                transform: `translateY(${interpolate(s, [0, 1], [120, wob])}px) scale(${interpolate(s, [0, 1], [0.6, 1])})`,
                opacity: s,
              }}
            >
              {w.t}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
