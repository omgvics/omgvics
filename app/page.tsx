import { DesktopFooter, MobileFooter } from "@/components/PageFooter";
import { MobileCard } from "@/components/MobileCard";
import { MobileNav } from "@/components/MobileNav";
import { PageShell } from "@/components/PageShell";
import { SidebarNav } from "@/components/SidebarNav";
import { Sparkles } from "@/components/Sparkles";
import { Stage } from "@/components/Stage";
import { Window } from "@/components/Window";

function DecorativeButton({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      data-btn
      src={src}
      alt={alt}
      draggable={false}
      className="h-[34px] w-[34px] cursor-pointer select-none"
    />
  );
}

const BIO_BODY = (
  <>
    <h1 style={{ margin: "0 0 32px", fontSize: 32, fontWeight: 400, lineHeight: 1.5 }}>
      <strong style={{ fontWeight: 700 }}>Victoria Lo</strong> is a Brooklyn-based design lead who
      loves long distance running and solving complex, ambiguous (sometimes scary!) product
      problems.
    </h1>
    <p style={{ margin: 0, fontSize: 22 }}>
      By day, she&apos;s a{" "}
      <a
        href="https://www.avanade.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#212121", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 4 }}
      >
        Product Design Manager
      </a>{" "}
      building and shipping products with a lot of very talented folks. Offline, she&apos;s the
      founder of{" "}
      <a
        href="https://www.chinatownrunners.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#212121", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 4 }}
      >
        Chinatown Runners
      </a>
      , established in 2021 to support and celebrate the Asian-American diaspora in the United
      States.
    </p>
  </>
);

export default function Home() {
  return (
    <PageShell
      desktop={
        <>
          <Stage>
            <Sparkles />

            <Window
              id="about"
              title=""
              defaultPosition={{ left: 258, top: 242 }}
              width={1041}
              zIndex={20}
              titlebarClassName="justify-end"
              titlebarActions={
                <>
                  <DecorativeButton src="/assets/images/min.png" alt="minimize" />
                  <DecorativeButton src="/assets/images/expand.png" alt="expand" />
                  <DecorativeButton src="/assets/images/close.png" alt="close" />
                </>
              }
              bodyStyle={{ padding: "59px 40px 44px", fontSize: 32, lineHeight: 1.5, color: "#212121" }}
            >
              {BIO_BODY}
            </Window>

            <Window
              id="index"
              title="index"
              defaultPosition={{ left: 230, top: 98 }}
              width={367}
              zIndex={30}
              titlebarActions={<DecorativeButton src="/assets/images/close.png" alt="close" />}
              bodyStyle={{ padding: "32px 24px", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <img
                src="/assets/images/oh-em-gee.png"
                alt="OMGVICS logo — portfolio of Product Designer Victoria Lo"
                draggable={false}
                className="block h-auto w-full select-none"
              />
            </Window>

            <Window
              id="banana"
              title="banana-phone.png"
              defaultPosition={{ left: 1103, top: 655 }}
              width={405}
              zIndex={40}
              titlebarActions={<DecorativeButton src="/assets/images/close.png" alt="close" />}
              bodyStyle={{ padding: 8 }}
            >
              <img
                src="/assets/images/photo-1782678318225.png"
                alt="Product Designer Victoria Lo holding a banana like a phone"
                draggable={false}
                className="block select-none object-cover"
                style={{ width: 389, height: 211 }}
              />
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
            <MobileCard title="index">
              <div className="flex items-center justify-center px-5 py-6">
                <img
                  src="/assets/images/oh-em-gee.png"
                  alt="OMGVICS logo — portfolio of Product Designer Victoria Lo"
                  className="block h-auto w-full max-w-[340px]"
                />
              </div>
            </MobileCard>

            <MobileCard
              title=""
              action={
                <div className="flex items-center gap-1.5">
                  <img src="/assets/images/min.png" alt="" className="h-[26px] w-[26px]" />
                  <img src="/assets/images/expand.png" alt="" className="h-[26px] w-[26px]" />
                  <img src="/assets/images/close.png" alt="" className="h-[26px] w-[26px]" />
                </div>
              }
            >
              <div style={{ padding: "24px 20px", fontSize: 18, lineHeight: 1.5, color: "#212121" }}>
                <h1 style={{ margin: "0 0 18px", fontSize: 18, fontWeight: 400, lineHeight: 1.5 }}>
                  <strong style={{ fontWeight: 700 }}>Victoria Lo</strong> is a Brooklyn-based
                  design lead who loves long distance running and solving complex, ambiguous
                  (sometimes scary!) product problems.
                </h1>
                <p style={{ margin: 0, fontSize: 15 }}>
                  By day, she&apos;s a{" "}
                  <a
                    href="https://www.avanade.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#212121", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}
                  >
                    Product Design Manager
                  </a>{" "}
                  building and shipping products with a lot of very talented folks. Offline,
                  she&apos;s the founder of{" "}
                  <a
                    href="https://www.chinatownrunners.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#212121", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}
                  >
                    Chinatown Runners
                  </a>
                  , established in 2021 to support and celebrate the Asian-American diaspora in
                  the United States.
                </p>
              </div>
            </MobileCard>

            <MobileCard
              title="banana-phone.png"
              action={<img src="/assets/images/close.png" alt="" className="h-7 w-7" />}
            >
              <div className="p-2">
                <img
                  src="/assets/images/photo-1782678318225.png"
                  alt="Product Designer Victoria Lo holding a banana like a phone"
                  className="block h-auto w-full object-cover"
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
