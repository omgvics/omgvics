"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useDraggable } from "./hooks/useDraggable";
import { useStageContext } from "./Stage";

export interface WindowProps {
  /** Unique id for this window (mirrors the original data-window attribute). */
  id: string;
  title: ReactNode;
  children: ReactNode;
  /** Absolute left/top within the 1920x1080 stage. */
  defaultPosition: { left: number; top: number };
  width?: number | string;
  zIndex?: number;
  draggable?: boolean;
  /** Right-aligned titlebar controls (close/min/expand icons, etc). */
  titlebarActions?: ReactNode;
  titleClassName?: string;
  titlebarClassName?: string;
  titlebarStyle?: CSSProperties;
  bodyClassName?: string;
  bodyStyle?: CSSProperties;
  className?: string;
  style?: CSSProperties;
}

/**
 * Reusable window-chrome frame: border + titlebar + content area, draggable
 * by its titlebar and z-index-aware via the shared <Stage> context. Visual
 * defaults (border, titlebar/body colors, Pixelify Sans title) match the
 * original vanilla window styling; override per-instance via the className/
 * style props where a page's window differs (e.g. misc.html's white,
 * internally-scrolling body).
 */
export function Window({
  id,
  title,
  children,
  defaultPosition,
  width,
  zIndex = 20,
  draggable = true,
  titlebarActions,
  titleClassName = "",
  titlebarClassName = "",
  titlebarStyle,
  bodyClassName = "",
  bodyStyle,
  className = "",
  style,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const { scale, bringToFront, bounds } = useStageContext();

  useDraggable(windowRef, handleRef, {
    bounds,
    scale,
    onPickUp: bringToFront,
    disabled: !draggable,
  });

  return (
    <div
      ref={windowRef}
      data-window={id}
      className={`absolute border-2 border-[#212121] ${className}`}
      style={{
        left: defaultPosition.left,
        top: defaultPosition.top,
        width,
        zIndex,
        boxShadow: "0 16px 40px rgba(40,25,70,0.28)",
        ...style,
      }}
    >
      <div
        ref={handleRef}
        className={`flex h-14 items-center justify-between gap-3 border-b-2 border-[#212121] bg-[#b586bc] px-3 select-none ${titlebarClassName}`}
        style={titlebarStyle}
      >
        <span className={`font-pixelify whitespace-nowrap text-2xl text-[#212121] ${titleClassName}`}>
          {title}
        </span>
        {titlebarActions ? <div className="flex items-center gap-2">{titlebarActions}</div> : null}
      </div>
      <div className={`bg-[#fbd0ca] p-8 ${bodyClassName}`} style={bodyStyle}>
        {children}
      </div>
    </div>
  );
}
