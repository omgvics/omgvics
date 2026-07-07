import type { ReactNode } from "react";

export interface MobileCardProps {
  title: ReactNode;
  /** Right-aligned titlebar action (close link/icon), if any. */
  action?: ReactNode;
  children: ReactNode;
  background?: string;
  className?: string;
}

/** The non-draggable bordered card used for every window in the stacked mobile layout. */
export function MobileCard({ title, action, children, background = "#fbd0ca", className = "" }: MobileCardProps) {
  return (
    <div
      className={`border-2 border-[#212121] ${className}`}
      style={{ background, boxShadow: "0 10px 26px rgba(40,25,70,0.26)" }}
    >
      <div className="flex h-[46px] items-center justify-between border-b-2 border-[#212121] bg-[#b586bc] px-3">
        <span className="whitespace-nowrap font-pixelify text-lg text-[#212121]">{title}</span>
        {action}
      </div>
      {children}
    </div>
  );
}
