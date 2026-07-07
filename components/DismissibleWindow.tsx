"use client";

import { useState } from "react";
import { Window, type WindowProps } from "./Window";

export type DismissibleWindowProps = Omit<WindowProps, "titlebarActions"> & {
  closeIconSize?: number;
};

/**
 * A <Window> whose close icon hides it (ported from [data-closehide]).
 * The close button and its handler live entirely inside this client
 * component — a Server Component can pass this element's `children` (plain
 * rendered content) but can't pass a click handler as a prop, so the
 * dismiss wiring can't live in the page itself.
 */
export function DismissibleWindow({ closeIconSize = 32, children, ...windowProps }: DismissibleWindowProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <Window
      {...windowProps}
      titlebarActions={
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="border-0 bg-transparent p-0"
          aria-label="Close"
        >
          <img
            src="/assets/images/close.png"
            alt="close"
            draggable={false}
            style={{ width: closeIconSize, height: closeIconSize }}
            className="cursor-pointer select-none"
          />
        </button>
      }
    >
      {children}
    </Window>
  );
}
