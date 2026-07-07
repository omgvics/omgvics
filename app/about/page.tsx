import type { CSSProperties } from "react";
import Link from "next/link";
import { DesktopFooter, MobileFooter } from "@/components/PageFooter";
import { MobileCard } from "@/components/MobileCard";
import { MobileNav } from "@/components/MobileNav";
import { PageShell } from "@/components/PageShell";
import { SidebarNav } from "@/components/SidebarNav";
import { Sparkles } from "@/components/Sparkles";
import { Stage } from "@/components/Stage";
import { Window } from "@/components/Window";

const extLink: CSSProperties = { color: "#212121", fontWeight: 700, textDecoration: "underline" };

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

/** The four bio paragraphs, identical on desktop and mobile aside from font size. */
function BioParagraphs({ fontSize }: { fontSize: number }) {
  return (
    <>
      <p style={{ margin: 0, fontSize }}>
        <strong>I&apos;m currently a Product Design Manager at Accenture/Avanade.</strong> What
        exactly does that mean? Well, the TL;DR is that I am both a manager of designers / design
        teams as well as an individual contributor (meaning I still get my hands dirty in
        mockups, prototyping, shipping and delivering stuff with other designers, engineers and
        product managers). In previous roles, I&apos;ve pitched and won contracts at design
        agencies and I&apos;ve also been in-house (aka &ldquo;client-side&rdquo;) working on new
        features and services for B2B and B2C companies.
      </p>
      <p style={{ margin: 0, fontSize }}>
        <strong>My love for design started early,</strong> with reading source code on geocities
        and angelfire websites and furiously building webpages by hand with notepad and a{" "}
        <em>lot</em> of caffeine.
      </p>
      <p style={{ margin: 0, fontSize }}>
        <strong>I&apos;m also an illustrator and an avid long distance runner.</strong> I&apos;ve
        been fortunate enough to meet many amazing people and built community through running,
        most notably with{" "}
        <a href="http://www.chinatownrunners.com" target="_blank" rel="noopener" style={extLink}>
          Chinatown Runners
        </a>{" "}
        which I began in 2021 during the peak of COVID-19 (fun fact: I am an{" "}
        <a href="https://www.rrca.org/" target="_blank" rel="noopener" style={extLink}>
          RRCA Level-1
        </a>{" "}
        certified running coach, and I often work with Nike in NYC during the summertime to help
        new marathon runners train for the New York City Marathon).
      </p>
      <p style={{ margin: 0, fontSize }}>
        <strong>Curious about my pedigree?</strong> Download my CV to learn all the nitty gritty
        deets.
      </p>
    </>
  );
}

function PhotoCredit({ marginTop }: { marginTop?: number }) {
  return (
    <div className="font-pixelify" style={{ fontWeight: 700, fontSize: 12, lineHeight: 1.5, color: "#000", marginTop }}>
      Above: Running the Chicago Marathon in 2023
      <br />
      photo credit:{" "}
      <a href="https://www.davidjaewonoh.com/" target="_blank" rel="noopener" style={extLink}>
        David Jaewon Oh
      </a>
    </div>
  );
}

function DownloadCv({ padding, fontSize }: { padding: string; fontSize: number }) {
  return (
    <a
      href="/assets/images/OMGVICS-CV.pdf"
      target="_blank"
      rel="noopener"
      className="self-start font-pixelify"
      style={{
        textDecoration: "none",
        background: "#fbd0ca",
        border: "1.5px solid #000",
        padding,
        fontSize,
        color: "#000",
        whiteSpace: "nowrap",
      }}
    >
      Download CV
    </a>
  );
}

export default function AboutPage() {
  return (
    <PageShell
      desktop={
        <>
          <Stage>
            <Sparkles />

            <Window
              id="about"
              title="about"
              defaultPosition={{ left: 321, top: 61 }}
              width={1277}
              zIndex={20}
              titleClassName="text-2xl text-[#000]"
              titlebarActions={<CloseLink size={32} />}
              bodyClassName="flex flex-col gap-6"
              bodyStyle={{ padding: 32 }}
            >
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 400, lineHeight: 1.25, color: "#212121" }}>
                My name is Victoria, but most people call me Vics. I&apos;ve been working in the
                creative industry in some shape or form since 2006 (yes, before I graduated from
                university!) and I&apos;m a true child of the internet that grew up playing both
                Oregon Trail and DOOM late at night on my dad&apos;s computer.
              </h1>

              <div className="flex flex-row items-start gap-10">
                <div className="flex w-[317px] flex-shrink-0 flex-col gap-2">
                  <img
                    src="/assets/images/vics-chicago-marathon.jpg"
                    alt="Product Designer Victoria Lo running the Chicago Marathon in 2023"
                    draggable={false}
                    className="block select-none"
                    style={{ width: 317, height: 562, objectFit: "cover", objectPosition: "40% 100%" }}
                  />
                  <PhotoCredit />
                </div>

                <div className="flex flex-grow flex-col gap-6" style={{ fontSize: 16, lineHeight: 1.5, color: "#000" }}>
                  <div className="flex flex-col gap-4">
                    <BioParagraphs fontSize={16} />
                  </div>
                  <DownloadCv padding="8px 16px" fontSize={18} />
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
            <MobileCard title="about" action={<CloseLink size={28} />}>
              <div className="flex flex-col gap-[22px]" style={{ padding: "22px 18px", fontSize: 15, lineHeight: 1.5, color: "#212121" }}>
                <h1 style={{ margin: 0, fontSize: 18, fontWeight: 400, lineHeight: 1.35, color: "#212121" }}>
                  My name is Victoria, but most people call me Vics. I&apos;ve been working in the
                  creative industry in some shape or form since 2006 (yes, before I graduated from
                  university!) and I&apos;m a true child of the internet that grew up playing both
                  Oregon Trail and DOOM late at night on my dad&apos;s computer.
                </h1>
                <img
                  src="/assets/images/vics-chicago-marathon.jpg"
                  alt="Product Designer Victoria Lo running the Chicago Marathon in 2023"
                  className="block h-auto w-full"
                />
                <PhotoCredit marginTop={-12} />
                <BioParagraphs fontSize={15} />
                <DownloadCv padding="9px 18px" fontSize={18} />
              </div>
            </MobileCard>

            <MobileFooter />
          </div>
        </>
      }
    />
  );
}
