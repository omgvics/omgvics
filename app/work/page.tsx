import type { ReactNode } from "react";
import Link from "next/link";
import { DesktopFooter, MobileFooter } from "@/components/PageFooter";
import { DismissibleWindow } from "@/components/DismissibleWindow";
import { MobileCard } from "@/components/MobileCard";
import { MobileNav } from "@/components/MobileNav";
import { PageShell } from "@/components/PageShell";
import { SidebarNav } from "@/components/SidebarNav";
import { Sparkles } from "@/components/Sparkles";
import { Stage } from "@/components/Stage";
import { Window } from "@/components/Window";

function CloseLink({ size }: { size: number }) {
  return (
    <Link href="/" className="flex">
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

function DesktopWorkItem({ href, src, alt, caption }: { href?: string; src: string; alt: string; caption: ReactNode }) {
  const inner = (
    <>
      <div style={{ width: 360, height: 240, overflow: "hidden", boxShadow: "inset 0 0 0 1px #212121" }}>
        <img src={src} alt={alt} draggable={false} className="block h-full w-full select-none object-cover" />
      </div>
      <h3 style={{ margin: 0, fontWeight: 600, fontSize: 18, textAlign: "center", lineHeight: 1.25, color: "#212121" }}>
        {caption}
      </h3>
    </>
  );
  return href ? (
    <Link href={href} className="flex w-[360px] flex-col items-center gap-3 no-underline">
      {inner}
    </Link>
  ) : (
    <div className="flex w-[360px] flex-col items-center gap-3">{inner}</div>
  );
}

function MobileWorkItem({ href, src, alt, caption }: { href?: string; src: string; alt: string; caption: ReactNode }) {
  const inner = (
    <>
      <div style={{ width: "100%", aspectRatio: "3 / 2", overflow: "hidden", boxShadow: "inset 0 0 0 1px #212121" }}>
        <img src={src} alt={alt} className="block h-full w-full object-cover" />
      </div>
      <h3 style={{ margin: 0, fontWeight: 600, fontSize: 16, textAlign: "center", lineHeight: 1.25, color: "#212121" }}>
        {caption}
      </h3>
    </>
  );
  return href ? (
    <Link href={href} className="flex flex-col items-center gap-2.5 no-underline">
      {inner}
    </Link>
  ) : (
    <div className="flex flex-col items-center gap-2.5">{inner}</div>
  );
}

function NoteBody({ imgWidth, imgHeight, fontSize }: { imgWidth: number; imgHeight: number; fontSize: number }) {
  return (
    <div className="flex items-start gap-[18px]">
      <img
        src="/assets/images/lock.png"
        alt=""
        draggable={false}
        className="flex-shrink-0 select-none object-contain"
        style={{ width: imgWidth, height: imgHeight }}
      />
      <div style={{ fontSize, lineHeight: 1.4, color: "#212121" }}>
        <div style={{ fontWeight: 700, marginBottom: 2 }}>Quick Note!</div>
        <div>
          The fictional company name <strong>Oltiva</strong> is leveraged here to protect client
          NDAs.
        </div>
      </div>
    </div>
  );
}

export default function WorkPage() {
  return (
    <PageShell
      desktop={
        <>
          <Stage>
            <Sparkles />

            <Window
              id="work"
              title="work"
              defaultPosition={{ left: 120, top: 100 }}
              width={1536}
              zIndex={20}
              titleClassName="text-[23px] text-[#000]"
              titlebarActions={<CloseLink size={32} />}
              bodyClassName="flex flex-col items-center gap-14"
              bodyStyle={{ padding: "96px 80px 80px" }}
            >
              <div className="flex flex-row items-start gap-24">
                <DesktopWorkItem
                  src="/assets/work/oltiva1.jpg"
                  alt="UX/UI design for Oltiva AI Agentic Platform by Product Designer Victoria Lo"
                  caption={
                    <>
                      [Global IT Consulting Firm]
                      <br />
                      AI Agentic Platform
                    </>
                  }
                />
                <DesktopWorkItem
                  src="/assets/work/oltvia2.jpg"
                  alt="UX/UI design for Oltiva Cash Management System by Product Designer Victoria Lo"
                  caption={
                    <>
                      [Global Tier-1 Commercial Bank]
                      <br />
                      Cash Management System
                    </>
                  }
                />
                <DesktopWorkItem
                  src="/assets/work/sharepoint.jpg"
                  alt="Employee Intranet design system and UX/UI by Product Designer Victoria Lo"
                  caption={
                    <>
                      [Legacy Omnichannel Retailer]
                      <br />
                      Employee Intranet
                    </>
                  }
                />
              </div>

              <div className="flex flex-row items-start justify-center gap-24">
                <DesktopWorkItem
                  src="/assets/work/retailROI.jpg"
                  alt="Product design for the RetailROI Cost of Social Worker Turnover Calculator by Product Designer Victoria Lo"
                  caption={
                    <>
                      [Retail Orphan Initiative]
                      <br />
                      Cost of Social Worker Turnover
                      <br />
                      Online Calculator
                    </>
                  }
                />
                <DesktopWorkItem
                  href="/misc"
                  src="/assets/work/misc.jpg"
                  alt="Miscellaneous brand, print and illustration work by Product Designer Victoria Lo"
                  caption={
                    <>
                      [Miscellaneous Work]
                      <br />
                      Additional brand, print and illustration
                    </>
                  }
                />
              </div>
            </Window>

            <DismissibleWindow
              id="note"
              title="System Administrator"
              defaultPosition={{ left: 96, top: 64 }}
              width={452}
              zIndex={50}
              closeIconSize={30}
              titleClassName="text-xl text-[#000]"
              bodyStyle={{ padding: "24px 26px" }}
            >
              <NoteBody imgWidth={46} imgHeight={63} fontSize={17} />
            </DismissibleWindow>

            <SidebarNav />
          </Stage>
          <DesktopFooter />
        </>
      }
      mobile={
        <>
          <MobileNav />
          <div className="relative z-10 flex flex-col gap-5 px-4 pb-7 pt-20">
            <MobileCard title="System Administrator">
              <div className="p-[18px]">
                <NoteBody imgWidth={36} imgHeight={49} fontSize={15} />
              </div>
            </MobileCard>

            <MobileCard title="work" action={<CloseLink size={28} />}>
              <div className="flex flex-col gap-8" style={{ padding: "26px 18px" }}>
                <MobileWorkItem
                  src="/assets/work/oltiva1.jpg"
                  alt="UX/UI design for Oltiva AI Agentic Platform by Product Designer Victoria Lo"
                  caption={
                    <>
                      [Global IT Consulting Firm]
                      <br />
                      AI Agentic Platform
                    </>
                  }
                />
                <MobileWorkItem
                  src="/assets/work/oltvia2.jpg"
                  alt="UX/UI design for Oltiva Cash Management System by Product Designer Victoria Lo"
                  caption={
                    <>
                      [Global Tier-1 Commercial Bank]
                      <br />
                      Cash Management System
                    </>
                  }
                />
                <MobileWorkItem
                  src="/assets/work/sharepoint.jpg"
                  alt="Employee Intranet design system and UX/UI by Product Designer Victoria Lo"
                  caption={
                    <>
                      [Legacy Omnichannel Retailer]
                      <br />
                      Employee Intranet
                    </>
                  }
                />
                <MobileWorkItem
                  src="/assets/work/retailROI.jpg"
                  alt="Product design for the RetailROI Cost of Social Worker Turnover Calculator by Product Designer Victoria Lo"
                  caption={
                    <>
                      [Retail Orphan Initiative]
                      <br />
                      Cost of Social Worker Turnover Online Calculator
                    </>
                  }
                />
                <MobileWorkItem
                  href="/misc"
                  src="/assets/work/misc.jpg"
                  alt="Miscellaneous brand, print and illustration work by Product Designer Victoria Lo"
                  caption={
                    <>
                      [Miscellaneous Work]
                      <br />
                      Additional brand, print and illustration
                    </>
                  }
                />
              </div>
            </MobileCard>

            <MobileFooter />
          </div>
        </>
      }
    />
  );
}
