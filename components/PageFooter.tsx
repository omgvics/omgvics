const COPYRIGHT = "© 2026 Victoria Lo. All Rights Reserved.";

/** Fixed copyright bar shown in the desktop stage (scoped inside its hidden/shown wrapper). */
export function DesktopFooter() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[80] text-center font-sans text-sm text-[#212121]">
      {COPYRIGHT}
    </div>
  );
}

/** Inline copyright line at the bottom of the mobile stacked content column. */
export function MobileFooter() {
  return (
    <div className="pt-1.5 text-center font-sans text-sm text-[#212121]">{COPYRIGHT}</div>
  );
}
