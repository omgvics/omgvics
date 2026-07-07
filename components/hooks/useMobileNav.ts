"use client";

import { useCallback, useState } from "react";

/**
 * Open/close state for the mobile slide-out nav panel. The original
 * implementation queried [data-hamburger]/[data-navpanel]/[data-navbackdrop]
 * and mutated their styles directly; here the hook just owns `isOpen` and
 * the consumer binds it to the panel's `right` offset and the backdrop's
 * opacity/pointer-events (e.g. panel: right: isOpen ? '0px' : '-320px').
 */
export function useMobileNav(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
}
