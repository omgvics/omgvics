"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

/**
 * Shared z-index counter so sibling draggable windows stack in pick-up
 * order (the last one grabbed ends up on top). Create one per group of
 * windows that should compete for front-most position.
 */
export function useZIndexStack(initialZ = 40) {
  const topZ = useRef(initialZ);

  const bringToFront = useCallback((element: HTMLElement) => {
    topZ.current += 1;
    element.style.zIndex = String(topZ.current);
  }, []);

  return { bringToFront };
}

export interface UseDraggableOptions {
  /** Coordinate space the window's left/top are clamped to. */
  bounds?: { width: number; height: number };
  /** Current scale of the stage the window lives in (e.g. from a fit-to-viewport transform). */
  scale?: RefObject<number>;
  /** Called on pointerdown, before the drag starts — use to bump z-index via useZIndexStack. */
  onPickUp?: (element: HTMLElement) => void;
  disabled?: boolean;
}

const DEFAULT_BOUNDS = { width: 1920, height: 1080 };

/**
 * Makes `windowRef` draggable by its `handleRef` (titlebar), clamped to
 * `bounds`. Clicks on interactive children of the handle (links, buttons,
 * [data-btn]) are ignored so window-chrome buttons keep working.
 */
export function useDraggable(
  windowRef: RefObject<HTMLElement | null>,
  handleRef: RefObject<HTMLElement | null>,
  options: UseDraggableOptions = {},
) {
  const { bounds = DEFAULT_BOUNDS, scale, onPickUp, disabled = false } = options;
  const { width: boundsWidth, height: boundsHeight } = bounds;

  useEffect(() => {
    if (disabled) return;
    const win = windowRef.current;
    const handle = handleRef.current;
    if (!win || !handle) return;

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    handle.style.cursor = "grab";

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, [data-btn]")) return;

      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = parseFloat(win.style.left) || 0;
      startTop = parseFloat(win.style.top) || 0;

      onPickUp?.(win);

      handle.style.cursor = "grabbing";
      handle.setPointerCapture(e.pointerId);
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const sc = scale?.current || 1;
      const nextLeft = startLeft + (e.clientX - startX) / sc;
      const nextTop = startTop + (e.clientY - startY) / sc;
      win.style.left = `${Math.max(0, Math.min(boundsWidth - win.offsetWidth, nextLeft))}px`;
      win.style.top = `${Math.max(0, Math.min(boundsHeight - win.offsetHeight, nextTop))}px`;
    };

    const endDrag = () => {
      dragging = false;
      handle.style.cursor = "grab";
    };

    handle.addEventListener("pointerdown", onPointerDown);
    handle.addEventListener("pointermove", onPointerMove);
    handle.addEventListener("pointerup", endDrag);
    handle.addEventListener("pointercancel", endDrag);

    return () => {
      handle.removeEventListener("pointerdown", onPointerDown);
      handle.removeEventListener("pointermove", onPointerMove);
      handle.removeEventListener("pointerup", endDrag);
      handle.removeEventListener("pointercancel", endDrag);
    };
  }, [windowRef, handleRef, boundsWidth, boundsHeight, scale, onPickUp, disabled]);
}
