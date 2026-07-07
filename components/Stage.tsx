"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode, type RefObject } from "react";
import { useZIndexStack } from "./hooks/useDraggable";

const STAGE_WIDTH = 1920;
const STAGE_HEIGHT = 1080;

interface StageContextValue {
  scale: RefObject<number>;
  bringToFront: (element: HTMLElement) => void;
  bounds: { width: number; height: number };
}

const StageContext = createContext<StageContextValue | null>(null);

export function useStageContext() {
  const ctx = useContext(StageContext);
  if (!ctx) {
    throw new Error("<Window> must be rendered inside a <Stage>");
  }
  return ctx;
}

export interface StageProps {
  children: ReactNode;
  /** Starting z-index for the shared window stack (default 40, matches the original). */
  initialZ?: number;
}

/**
 * The 1920x1080 "desktop" canvas that absolutely-positioned <Window>s live
 * on, scaled to fit the viewport width (never upscaled past 1x) — ported
 * from DCLogic's fit()/componentDidMount resize handling. Also owns the
 * shared z-index stack so sibling windows stack in pick-up order.
 */
export function Stage({ children, initialZ = 40 }: StageProps) {
  const scale = useRef(1);
  const sizerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { bringToFront } = useZIndexStack(initialZ);

  useEffect(() => {
    const fit = () => {
      const s = Math.min(window.innerWidth / STAGE_WIDTH, 1);
      scale.current = s;
      if (stageRef.current) {
        stageRef.current.style.transform = `scale(${s})`;
      }
      if (sizerRef.current) {
        sizerRef.current.style.width = `${STAGE_WIDTH * s}px`;
        sizerRef.current.style.height = `${STAGE_HEIGHT * s}px`;
      }
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <StageContext.Provider
      value={{ scale, bringToFront, bounds: { width: STAGE_WIDTH, height: STAGE_HEIGHT } }}
    >
      <div className="absolute inset-0 z-[2] flex overflow-auto">
        <div ref={sizerRef} className="relative flex-none m-auto">
          <div
            ref={stageRef}
            className="relative"
            style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT, transformOrigin: "top left" }}
          >
            {children}
          </div>
        </div>
      </div>
    </StageContext.Provider>
  );
}
