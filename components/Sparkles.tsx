const SPARKLE_CLIP = "polygon(50% 0,60% 40%,100% 50%,60% 60%,50% 100%,40% 60%,0 50%,40% 40%)";

/** The two twinkling pink sparkles repeated at the same stage coordinates on every page. */
export function Sparkles() {
  return (
    <>
      <div
        className="pointer-events-none absolute bg-[#e45e96]"
        style={{
          left: 1288,
          top: 150,
          width: 46,
          height: 46,
          clipPath: SPARKLE_CLIP,
          animation: "twinkle 3.4s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute bg-[#e45e96]"
        style={{
          left: 1326,
          top: 196,
          width: 28,
          height: 28,
          clipPath: SPARKLE_CLIP,
          animation: "twinkle 2.8s ease-in-out infinite 0.6s",
        }}
      />
    </>
  );
}
