import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { bebas, inter, C } from "../fonts";

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const count = Math.round(interpolate(frame, [0, 35], [0, 30], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }));
  const numPop = spring({ frame, fps, config: { damping: 10, stiffness: 200 } });
  const plusIn = spring({ frame: frame - 32, fps, config: { damping: 8 } });
  const labelIn = spring({ frame: frame - 20, fps, config: { damping: 18 } });
  const subIn = spring({ frame: frame - 55, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ background: C.pink, overflow: "hidden" }}>
      {/* diagonal stripes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const y = i * 260 - (frame * 4) % 260;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: -200,
              top: y,
              width: 1600,
              height: 40,
              background: C.cream,
              opacity: 0.08,
              transform: "rotate(-18deg)",
            }}
          />
        );
      })}

      <div style={{ position: "absolute", top: 300, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontFamily: inter, fontWeight: 800, letterSpacing: 6, color: C.cream, fontSize: 44, opacity: labelIn }}>
          THE TOOLKIT PACKS
        </div>
      </div>

      <div style={{ position: "absolute", top: 500, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "flex-start", justifyContent: "center", transform: `scale(${interpolate(numPop, [0, 1], [0.4, 1])})` }}>
          <span style={{ fontFamily: bebas, color: C.cream, fontSize: 620, lineHeight: 0.85, letterSpacing: -8 }}>
            {count}
          </span>
          <span style={{ fontFamily: bebas, color: C.cyan, fontSize: 320, lineHeight: 0.9, transform: `scale(${plusIn}) rotate(${interpolate(plusIn, [0, 1], [-40, 0])}deg)`, marginTop: 40 }}>
            +
          </span>
        </div>
      </div>

      <div style={{ position: "absolute", top: 1250, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontFamily: bebas, color: C.cream, fontSize: 200, lineHeight: 0.9, letterSpacing: 2, opacity: subIn }}>
          AI TOOLS.
        </div>
        <div style={{ fontFamily: bebas, color: C.ink, fontSize: 140, lineHeight: 0.9, letterSpacing: 2, opacity: subIn }}>
          ONE PLACE.
        </div>
      </div>
    </AbsoluteFill>
  );
};
