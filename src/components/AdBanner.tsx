import { useEffect, useRef } from "react";

/**
 * Renders the Adsterra / EffectiveCPMNetwork ad units.
 * Injects both the container-based invoke.js ad and the standalone script ad.
 */
export function AdBanner() {
  const containerHostRef = useRef<HTMLDivElement>(null);
  const standaloneHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Container-based ad (invoke.js + #container-<key>)
    if (containerHostRef.current && containerHostRef.current.childElementCount === 0) {
      const container = document.createElement("div");
      container.id = "container-5b728944ba8052fc0dfe10895c3f6bed";
      containerHostRef.current.appendChild(container);

      const invoke = document.createElement("script");
      invoke.async = true;
      invoke.setAttribute("data-cfasync", "false");
      invoke.src =
        "https://pl29735583.effectivecpmnetwork.com/5b728944ba8052fc0dfe10895c3f6bed/invoke.js";
      containerHostRef.current.appendChild(invoke);
    }

    // Standalone script ad
    if (standaloneHostRef.current && standaloneHostRef.current.childElementCount === 0) {
      const s = document.createElement("script");
      s.src =
        "https://pl29735556.effectivecpmnetwork.com/b1/c5/81/b1c5815f5060806c4a494926fdc50c21.js";
      standaloneHostRef.current.appendChild(s);
    }
  }, []);

  return (
    <div className="my-6 flex flex-col items-center gap-4">
      <div ref={containerHostRef} className="w-full flex justify-center" />
      <div ref={standaloneHostRef} className="w-full flex justify-center" />
    </div>
  );
}
