import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", icon: "/assets/images/home.png", label: "Home", w: 70, h: 77 },
  { href: "/work", icon: "/assets/images/folder.png", label: "Work", w: 85, h: 68 },
  { href: "/about", icon: "/assets/images/document.png", label: "About", w: 64, h: 80 },
  { href: "/sayhi", icon: "/assets/images/email.png", label: "Say Hi", w: 85, h: 55 },
];

/** Desktop right-side icon nav, ported from the repeated sidebar markup in every page. */
export function SidebarNav() {
  return (
    <div
      className="absolute z-[60] flex flex-col items-center gap-[30px]"
      style={{ left: 1770, top: 60, width: 108 }}
    >
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex flex-col items-center gap-2 no-underline"
        >
          <img
            src={item.icon}
            alt=""
            draggable={false}
            className="select-none object-contain"
            style={{ width: item.w, height: item.h }}
          />
          <span className="whitespace-nowrap border-2 border-[#212121] bg-[#fbd0ca] px-[14px] py-[7px] font-pixelify text-lg leading-none text-[#212121]">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
