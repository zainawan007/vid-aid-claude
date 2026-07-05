import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { bebas, inter, C } from "../fonts";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stopIn = spring({ frame: frame - 4, fps, config: { damping: 12, stiffness: 180 } });
  const scrollIn = spring({ frame: frame - 22, fps, config: { damping: 14, stiffness: 160 } });
  const startIn = spring({ frame: frame - 44, fps, config: { damping: 12, stiffness: 180 } });
  const postIn = spring({ frame: frame - 60, fps, config: { damping: 14, stiffness: 160 } });

  const strike = interpolate(frame, [30, 46], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const bgShift = interpolate(frame, [0, 90], [0, 40]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(1200px 900px at ${20 + bgShift}% ${30 + bgShift / 2}%, ${C.pink}22, transparent 60%), ${C.bg}`,
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 80,
          width: interpolate(frame, [0, 30], [0, 260], { extrapolateRight: "clamp" }),
          height: 12,
          background: C.cyan,
        }}
      />
      <div style={{ position: "absolute", top: 240, left: 80, color: C.cyan, fontFamily: inter, fontWeight: 800, letterSpacing: 4, fontSize: 36, opacity: interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" }) }}>
        FOR CREATORS ⚡
      </div>

      <div style={{ position: "absolute", top: 380, left: 80, right: 80 }}>
        <div style={{ position: "relative", display: "inline-block", transform: `translateX(${interpolate(stopIn, [0, 1], [-80, 0])}px) skewX(${interpolate(stopIn, [0, 1], [-8, 0])}deg)`, opacity: stopIn }}>
          <div style={{ fontFamily: bebas, color: C.cream, fontSize: 340, lineHeight: 0.85, letterSpacing: -2 }}>STOP</div>
          <div style={{ position: "absolute", top: "45%", left: -20, right: -20, height: 22, background: C.pink, transform: `scaleX(${strike})`, transformOrigin: "left" }} />
        </div>
        <div style={{ fontFamily: bebas, color: C.cream, fontSize: 200, lineHeight: 0.9, transform: `translateX(${interpolate(scrollIn, [0, 1], [80, 0])}px)`, opacity: scrollIn }}>
          scrolling.
        </div>
        <div style={{ height: 40 }} />
        <div style={{ fontFamily: bebas, color: C.pink, fontSize: 280, lineHeight: 0.85, transform: `translateX(${interpolate(startIn, [0, 1], [-60, 0])}px)`, opacity: startIn }}>
          START
        </div>
        <div style={{ fontFamily: bebas, color: C.cyan, fontSize: 280, lineHeight: 0.85, transform: `translateX(${interpolate(postIn, [0, 1], [60, 0])}px)`, opacity: postIn }}>
          POSTING.
        </div>
      </div>
    </AbsoluteFill>
  );
};
