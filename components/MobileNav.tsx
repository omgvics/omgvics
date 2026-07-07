"use client";

import Link from "next/link";
import { useMobileNav } from "./hooks/useMobileNav";

const NAV_ITEMS = [
  { href: "/", icon: "/assets/images/home.png", label: "Home", w: 48, h: 53 },
  { href: "/work", icon: "/assets/images/folder.png", label: "Work", w: 58, h: 46 },
  { href: "/about", icon: "/assets/images/document.png", label: "About", w: 44, h: 55 },
  { href: "/sayhi", icon: "/assets/images/email.png", label: "Say Hi", w: 58, h: 38 },
];

/** Mobile top bar + slide-out nav panel, ported 1:1 from the [data-hamburger]/[data-navpanel] markup. */
export function MobileNav() {
  const { isOpen, open, close } = useMobileNav();

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[90] flex h-[60px] items-center justify-between border-b-2 border-[#212121] bg-[#b586bc] px-4">
        <Link
          href="/"
          className="font-pixelify text-2xl text-[#212121] no-underline"
          style={{ letterSpacing: "0.5px" }}
        >
          OMGVICS
        </Link>
        <button
          type="button"
          aria-label="Open menu"
          onClick={open}
          className="flex h-11 w-11 flex-col justify-center gap-[5px] border-2 border-[#212121] bg-[#fbd0ca] p-[10px]"
        >
          <span className="block h-[3px] bg-[#212121]" />
          <span className="block h-[3px] bg-[#212121]" />
          <span className="block h-[3px] bg-[#212121]" />
        </button>
      </div>

      <div
        onClick={close}
        className="fixed inset-0 z-[95] bg-[rgba(33,33,33,0.45)]"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity .3s ease",
        }}
      />
      <div
        className="fixed top-0 bottom-0 z-[100] flex w-[280px] max-w-[84vw] flex-col gap-[30px] overflow-y-auto border-l-2 border-[#212121] bg-[#fbd0ca] px-[22px] py-[18px]"
        style={{ right: isOpen ? "0px" : "-320px", transition: "right .32s cubic-bezier(.4,0,.2,1)" }}
      >
        <div className="flex justify-end">
          <img
            src="/assets/images/close.png"
            alt="Close menu"
            onClick={close}
            className="h-[34px] w-[34px] cursor-pointer"
          />
        </div>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={close}
            className="flex items-center gap-[18px] no-underline"
          >
            <img
              src={item.icon}
              alt=""
              className="object-contain"
              style={{ width: item.w, height: item.h }}
            />
            <span className="font-pixelify text-xl text-[#212121]">{item.label}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
