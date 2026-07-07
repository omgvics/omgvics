import type { ReactNode } from "react";

/**
 * Responsive switch between the absolutely-positioned desktop Stage and the
 * stacked mobile layout, replicating the .desktop-only/.mobile-only media
 * query (breakpoint 1024px) from the original pages. Both trees are always
 * rendered; only one is ever displayed, matching the original's approach of
 * toggling via CSS rather than conditionally rendering per viewport.
 */
export function PageShell({ desktop, mobile }: { desktop: ReactNode; mobile: ReactNode }) {
  return (
    <div className="relative h-screen overflow-hidden max-lg:h-auto max-lg:min-h-screen max-lg:overflow-x-hidden max-lg:overflow-y-auto">
      <div className="hidden lg:block">{desktop}</div>
      <div className="lg:hidden">{mobile}</div>
    </div>
  );
}
