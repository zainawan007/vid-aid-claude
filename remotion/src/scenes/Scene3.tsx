import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { bebas, inter, C } from "../fonts";

const TOOLS = [
  "HOOK GENERATOR",
  "SCRIPT WRITER",
  "HASHTAG PACK",
  "CAPTION CRAFTER",
  "RETENTION DOCTOR",
  "TREND ANGLES",
];

const ToolCard: React.FC<{ text: string; color: string; align: "left" | "right"; y: number }> = ({ text, color, align, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 200 } });
  const exit = interpolate(frame, [18, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const x = interpolate(enter, [0, 1], [align === "left" ? -900 : 900, 0]) + interpolate(exit, [0, 1], [0, align === "left" ? 900 : -900]);

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: 40,
        right: 40,
        transform: `translateX(${x}px)`,
        display: "flex",
        justifyContent: align === "left" ? "flex-start" : "flex-end",
      }}
    >
      <div
        style={{
          background: color,
          color: C.ink,
          fontFamily: bebas,
          fontSize: 120,
          padding: "24px 48px",
          letterSpacing: 2,
          lineHeight: 1,
          boxShadow: `12px 12px 0 ${C.cream}`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const flash = frame % 4 < 2 ? C.cyan : C.pink;
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 80,
          fontFamily: inter,
          fontWeight: 800,
          color: flash,
          fontSize: 44,
          letterSpacing: 6,
        }}
      >
        ► BUILT TO SHIP
      </div>

      {TOOLS.map((t, i) => (
        <Sequence key={t} from={i * 15} durationInFrames={40}>
          <ToolCard
            text={t}
            color={i % 2 === 0 ? C.cyan : C.pink}
            align={i % 2 === 0 ? "left" : "right"}
            y={280 + i * 220}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
