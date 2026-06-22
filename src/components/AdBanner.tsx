import { useEffect, useRef, useState } from "react";

/**
 * Renders the Adsterra / EffectiveCPMNetwork ad units.
 * Lazy-loads via IntersectionObserver so heavy 3rd-party scripts
 * never block first paint or interaction.
 */
export function AdBanner() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerHostRef = useRef<HTMLDivElement>(null);
  const standaloneHostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Observe visibility — only inject scripts when the slot enters viewport.
  useEffect(() => {
    if (!wrapperRef.current || visible) return;
    const el = wrapperRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    if (containerHostRef.current && containerHostRef.current.childElementCount === 0) {
      const container = document.createElement("div");
      container.id = "container-5b728944ba8052fc0dfe10895c3f6bed";
      containerHostRef.current.appendChild(container);

      const invoke = document.createElement("script");
      invoke.async = true;
      invoke.defer = true;
      invoke.setAttribute("data-cfasync", "false");
      invoke.src =
        "https://pl29735583.effectivecpmnetwork.com/5b728944ba8052fc0dfe10895c3f6bed/invoke.js";
      containerHostRef.current.appendChild(invoke);
    }

    if (standaloneHostRef.current && standaloneHostRef.current.childElementCount === 0) {
      const s = document.createElement("script");
      s.async = true;
      s.defer = true;
      s.src =
        "https://pl29735556.effectivecpmnetwork.com/b1/c5/81/b1c5815f5060806c4a494926fdc50c21.js";
      standaloneHostRef.current.appendChild(s);
    }
  }, [visible]);

  return (
    <div
      ref={wrapperRef}
      className="my-6 flex flex-col items-center gap-4"
      style={{ minHeight: 90 }}
    >
      <div ref={containerHostRef} className="w-full flex justify-center" />
      <div ref={standaloneHostRef} className="w-full flex justify-center" />
    </div>
  );
}
