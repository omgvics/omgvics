"use client";

import { useEffect, useState } from "react";

const SPRITE_SRCS = [
  "/assets/images/Sprite-blk.png",
  "/assets/images/Sprite-blnde.png",
  "/assets/images/Sprite-pink.png",
  "/assets/images/Sprite-prp.png",
];

export interface SpriteWindowProps {
  imgSize: number;
  fontSize: number;
}

/**
 * The "System Administrator" sprite + credit line, ported from sayhi.html's
 * [data-sprite] click handler: cycles through the 4 hair-color sprites and
 * preloads all of them on mount so cycling never flashes/loads mid-click.
 */
export function SpriteWindow({ imgSize, fontSize }: SpriteWindowProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    SPRITE_SRCS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative self-stretch" style={{ height: 180 }}>
        <img
          src={SPRITE_SRCS[index]}
          alt="Pixel sprite of Product Designer Victoria Lo — click to change hair color"
          title="click to change my hair color!"
          draggable={false}
          onClick={() => setIndex((i) => (i + 1) % SPRITE_SRCS.length)}
          className="absolute bottom-0 right-0 cursor-pointer select-none"
          style={{ width: imgSize, height: imgSize, imageRendering: "pixelated" }}
        />
        <div
          className="font-pixelify absolute left-0 whitespace-nowrap bg-white text-[#000]"
          style={{ top: 6, border: "1.5px solid #212121", padding: "8px 12px", fontSize: 13 }}
        >
          click to change my hair color!
          <span
            className="absolute"
            style={{
              right: 24,
              bottom: -11,
              width: 0,
              height: 0,
              borderLeft: "9px solid transparent",
              borderRight: "9px solid transparent",
              borderTop: "11px solid #212121",
            }}
          />
          <span
            className="absolute"
            style={{
              right: 26,
              bottom: -8,
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: "9px solid #fff",
            }}
          />
        </div>
      </div>
      <div className="font-pixelify self-stretch text-center" style={{ fontWeight: 700, fontSize, color: "#000" }}>
        Sprite Vics made with{" "}
        <a
          href="https://www.avatarsinpixels.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#000", fontWeight: 700, textDecoration: "underline" }}
        >
          avatarsinpixels.com
        </a>
      </div>
    </div>
  );
}
