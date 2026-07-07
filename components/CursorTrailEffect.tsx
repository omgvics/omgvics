"use client";

import { useCursorTrail } from "./hooks/useCursorTrail";

/**
 * Mounts the global pixel-art cursor trail. A no-render client component so
 * the (still-server) root layout can render it without becoming a client
 * component itself.
 */
export function CursorTrailEffect() {
  useCursorTrail();
  return null;
}
