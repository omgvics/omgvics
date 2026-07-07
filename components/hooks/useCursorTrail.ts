"use client";

import { useEffect } from "react";

// Three 5x5 pixel-art patterns: cross, diamond, X
const DEFAULT_PATTERNS: number[][][] = [
  [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  [
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
];

const DEFAULT_COLORS = ["#e45e96", "#b586bc", "#fbd0ca", "#ffffff"];

export interface UseCursorTrailOptions {
  colors?: string[];
  patterns?: number[][][];
  /** Minimum ms between spawned particles — throttles canvas generation. */
  throttleMs?: number;
  minSize?: number;
  maxSize?: number;
  /** Fade/shrink duration in ms, also drives removal timing. */
  fadeMs?: number;
  disabled?: boolean;
}

/**
 * Renders a trail of small pixel-art canvases that follow the mouse and
 * fade out. Particle creation is throttled (default one every 16ms, i.e.
 * ~60fps) so fast mouse movement can't flood the DOM with canvases.
 */
export function useCursorTrail(options: UseCursorTrailOptions = {}) {
  const {
    colors = DEFAULT_COLORS,
    patterns = DEFAULT_PATTERNS,
    throttleMs = 16,
    minSize = 12,
    maxSize = 24,
    fadeMs = 700,
    disabled = false,
  } = options;

  useEffect(() => {
    if (disabled) return;

    let lastSpawn = 0;

    const handleMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastSpawn < throttleMs) return; // throttle: skip this frame
      lastSpawn = now;

      const color = colors[Math.floor(Math.random() * colors.length)];
      const pattern = patterns[Math.floor(Math.random() * patterns.length)];
      const size = Math.round(minSize + Math.random() * (maxSize - minSize));

      const canvas = document.createElement("canvas");
      canvas.width = 5;
      canvas.height = 5;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = color;
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          if (pattern[row][col]) ctx.fillRect(col, row, 1, 1);
        }
      }

      canvas.style.position = "fixed";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "99999";
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      canvas.style.left = `${e.clientX - size / 2}px`;
      canvas.style.top = `${e.clientY - size / 2}px`;
      canvas.style.imageRendering = "pixelated";
      canvas.style.filter = `drop-shadow(0 0 1px rgba(33,33,33,0.35)) drop-shadow(0 0 2px ${color})`;
      canvas.style.transition = "opacity 0.7s ease, transform 0.7s ease";
      canvas.style.transform = "scale(1)";
      canvas.style.opacity = "1";

      document.body.appendChild(canvas);
      requestAnimationFrame(() => {
        canvas.style.opacity = "0";
        canvas.style.transform = "scale(0.1)";
      });
      window.setTimeout(() => canvas.remove(), fadeMs + 50);
    };

    document.addEventListener("mousemove", handleMove);
    return () => document.removeEventListener("mousemove", handleMove);
  }, [colors, patterns, throttleMs, minSize, maxSize, fadeMs, disabled]);
}
