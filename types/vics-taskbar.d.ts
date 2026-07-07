import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "vics-taskbar": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          "audio-src"?: string;
          "hint-size"?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};
