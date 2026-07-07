import type { ReactNode } from "react";
import Link from "next/link";
import { DesktopFooter, MobileFooter } from "@/components/PageFooter";
import { MobileCard } from "@/components/MobileCard";
import { MobileNav } from "@/components/MobileNav";
import { PageShell } from "@/components/PageShell";
import { SidebarNav } from "@/components/SidebarNav";
import { Sparkles } from "@/components/Sparkles";
import { Stage } from "@/components/Stage";
import { Window } from "@/components/Window";

function CloseLink({ size }: { size: number }) {
  return (
    <Link href="/work" className="flex">
      <img
        src="/assets/images/close.png"
        alt="close"
        draggable={false}
        style={{ width: size, height: size }}
        className="cursor-pointer select-none"
      />
    </Link>
  );
}

const Crumb = ({ fontSize }: { fontSize: number }) => (
  <span style={{ fontSize, color: "#000" }} className="whitespace-nowrap">
    <Link href="/work" className="crumb">
      work
    </Link>{" "}
    / miscellaneous work
  </span>
);

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row items-center gap-2 self-stretch">
      <h2 style={{ margin: 0, fontSize: 23, fontWeight: 400, color: "#000", whiteSpace: "nowrap" }}>
        {children}
      </h2>
      <div className="h-0.5 flex-1 bg-[#e45e96]" />
    </div>
  );
}

function MobileSectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row items-center gap-2">
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 400, color: "#000", whiteSpace: "nowrap" }}>
        {children}
      </h2>
      <div className="h-0.5 flex-1 bg-[#e45e96]" />
    </div>
  );
}

export default function MiscPage() {
  return (
    <PageShell
      desktop={
        <>
          <Stage>
            <Sparkles />

            <Window
              id="misc"
              draggable={false}
              title={<Crumb fontSize={23} />}
              defaultPosition={{ left: 60, top: 60 }}
              width={1638}
              zIndex={20}
              titlebarActions={<CloseLink size={32} />}
              bodyClassName="scrollbody flex flex-col items-start gap-4"
              bodyStyle={{ height: 864, overflowY: "auto", overflowX: "hidden", background: "#ffffff", padding: 32 }}
            >
              <div className="flex flex-col gap-2 self-stretch px-2">
                <SectionHeading>Sling TV — Print Design</SectionHeading>
                <div className="flex flex-row items-center justify-between gap-6" style={{ height: 472.557 }}>
                  <div className="flex h-full flex-1 items-center justify-center">
                    <img
                      src="/assets/images/sling-1.png"
                      alt="Sling TV direct-mail postcards — print design by Product Designer Victoria Lo"
                      draggable={false}
                      className="max-h-full max-w-full select-none object-contain"
                    />
                  </div>
                  <div className="flex h-full flex-1 flex-col items-center justify-between">
                    <div className="flex w-full items-center justify-center" style={{ height: 237.478 }}>
                      <img
                        src="/assets/images/sling-2.jpg"
                        alt="Sling TV trifold Get 30 Live Channels — print design by Product Designer Victoria Lo"
                        draggable={false}
                        className="max-h-full max-w-full select-none object-contain"
                      />
                    </div>
                    <div className="flex w-full items-center justify-center" style={{ height: 174.265 }}>
                      <img
                        src="/assets/images/sling-3.png"
                        alt="Sling TV trifold A Limited-Time Offer — print design by Product Designer Victoria Lo"
                        draggable={false}
                        className="max-h-full max-w-full select-none object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex h-full flex-1 items-center justify-center">
                    <img
                      src="/assets/images/sling-4.png"
                      alt="Sling TV brochure Introducing A La Carte TV — print design by Product Designer Victoria Lo"
                      draggable={false}
                      className="max-h-full max-w-full select-none object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 self-stretch px-2">
                <SectionHeading>Illustration Work</SectionHeading>
                <div className="flex flex-row items-stretch gap-4" style={{ height: 343.305 }}>
                  {[
                    ["/assets/images/illo-isometric.jpg"],
                    ["/assets/images/illo-platform.jpg"],
                    ["/assets/images/illo-osr.jpg"],
                    ["/assets/images/illo-rabbit.jpg"],
                  ].map(([src]) => (
                    <div
                      key={src}
                      className="h-full flex-1"
                      style={{ background: `url('${src}') center / cover no-repeat` }}
                    />
                  ))}
                </div>
              </div>
            </Window>

            <SidebarNav />
          </Stage>
          <DesktopFooter />
        </>
      }
      mobile={
        <>
          <MobileNav />
          <div className="relative z-10 flex flex-col gap-5 px-4 pb-7 pt-20">
            <MobileCard title={<Crumb fontSize={16} />} action={<CloseLink size={28} />} background="#ffffff">
              <div className="flex flex-col gap-7" style={{ padding: "20px 16px" }}>
                <div className="flex flex-col gap-3">
                  <MobileSectionHeading>Sling TV — Print Design</MobileSectionHeading>
                  <img src="/assets/images/sling-1.png" alt="Sling TV direct-mail postcards — print design by Product Designer Victoria Lo" className="block h-auto w-full" />
                  <img src="/assets/images/sling-2.jpg" alt="Sling TV trifold Get 30 Live Channels — print design by Product Designer Victoria Lo" className="block h-auto w-full" />
                  <img src="/assets/images/sling-3.png" alt="Sling TV trifold A Limited-Time Offer — print design by Product Designer Victoria Lo" className="block h-auto w-full" />
                  <img src="/assets/images/sling-4.png" alt="Sling TV brochure Introducing A La Carte TV — print design by Product Designer Victoria Lo" className="block h-auto w-full" />
                </div>

                <div className="flex flex-col gap-3">
                  <MobileSectionHeading>Illustration Work</MobileSectionHeading>
                  <img src="/assets/images/illo-isometric.jpg" alt="Isometric data platform illustration by Product Designer Victoria Lo" className="block h-auto w-full" />
                  <img src="/assets/images/illo-platform.jpg" alt="MMXX Platform illustration by Product Designer Victoria Lo" className="block h-auto w-full" />
                  <img src="/assets/images/illo-osr.jpg" alt="OSR floral typographic illustration by Product Designer Victoria Lo" className="block h-auto w-full" />
                  <img src="/assets/images/illo-rabbit.jpg" alt="Chinatown Runners Year of the Rabbit illustration by Product Designer Victoria Lo" className="block h-auto w-full" />
                </div>
              </div>
            </MobileCard>

            <MobileFooter />
          </div>
        </>
      }
    />
  );
}
