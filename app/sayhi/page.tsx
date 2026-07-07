import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { DesktopFooter, MobileFooter } from "@/components/PageFooter";
import { DismissibleWindow } from "@/components/DismissibleWindow";
import { MobileCard } from "@/components/MobileCard";
import { MobileNav } from "@/components/MobileNav";
import { PageShell } from "@/components/PageShell";
import { SidebarNav } from "@/components/SidebarNav";
import { Sparkles } from "@/components/Sparkles";
import { SpriteWindow } from "@/components/SpriteWindow";
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

export default function SayHiPage() {
  return (
    <PageShell
      desktop={
        <>
          <Stage>
            <Sparkles />

            <Window
              id="sayhi"
              title="say-hi"
              defaultPosition={{ left: 378, top: 172 }}
              width={1156}
              zIndex={20}
              titlebarStyle={{ height: 58 }}
              titleClassName="text-2xl text-[#000]"
              titlebarActions={<CloseLink size={34} />}
              bodyClassName="flex flex-row items-start gap-8"
              bodyStyle={{ padding: "32px 24px" }}
            >
              <p className="flex-grow" style={{ margin: 0, fontSize: 24, lineHeight: 1.25, color: "#212121" }}>
                Interested in working together?
                <br />
                Or maybe you need some tips on your running form?
                <br />
                <br />
                Either way, I love getting mail so don&apos;t be shy, say hello!
              </p>

              <div
                className="flex flex-shrink-0 flex-col items-end self-stretch"
                style={{ width: 591, minHeight: 447 }}
              >
                <ContactForm variant="desktop" />
              </div>
            </Window>

            <DismissibleWindow
              id="sysadmin"
              title="System Administrator"
              defaultPosition={{ left: 272, top: 470 }}
              width={408}
              zIndex={40}
              titlebarStyle={{ height: 60 }}
              titleClassName="text-2xl text-[#000]"
              bodyClassName="flex flex-col items-center gap-4"
              bodyStyle={{ padding: 32 }}
            >
              <SpriteWindow imgSize={180} fontSize={12} />
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
            <MobileCard title="say-hi" action={<CloseLink size={28} />}>
              <div className="flex flex-col gap-5" style={{ padding: "22px 18px" }}>
                <p style={{ margin: 0, fontSize: 18, lineHeight: 1.35, color: "#212121" }}>
                  Interested in working together?
                  <br />
                  Or maybe you need some tips on your running form?
                  <br />
                  <br />
                  Either way, I love getting mail so don&apos;t be shy, say hello!
                </p>
                <ContactForm variant="mobile" />
              </div>
            </MobileCard>

            <MobileCard title="System Administrator">
              <div className="flex flex-col items-center gap-4" style={{ padding: "24px 20px" }}>
                <SpriteWindow imgSize={180} fontSize={12} />
              </div>
            </MobileCard>

            <MobileFooter />
          </div>
        </>
      }
    />
  );
}
