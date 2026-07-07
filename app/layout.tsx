import type { Metadata } from "next";
import { Montserrat, Pixelify_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pixelify",
  display: "swap",
});

const SITE_URL = "https://www.omgvics.com";
const OG_IMAGE = `${SITE_URL}/assets/images/oh-em-gee.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "OMGVICS • Victoria Lo",
  description:
    "Portfolio of Victoria Lo (OMGVICS), a Brooklyn-based Product Design Manager specializing in complex product problems, UX/UI, and design systems.",
  keywords: [
    "Victoria Lo",
    "OMGVICS",
    "product design manager",
    "lead designer",
    "UX/UI designer",
    "Brooklyn designer",
    "design systems",
    "enterprise software design",
    "Chinatown Runners",
  ],
  icons: {
    icon: "/assets/images/banana.png",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Victoria Lo | Product Design Manager",
    description:
      "Portfolio of Victoria Lo, a Brooklyn-based Product Design Manager solving complex, ambiguous product problems.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Victoria Lo | Product Design Manager",
    description:
      "Portfolio of Victoria Lo, a Brooklyn-based Product Design Manager solving complex, ambiguous product problems.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${pixelifySans.variable}`}>
      <body
        className="relative min-h-screen w-full overflow-x-hidden font-sans text-[#212121] antialiased"
        style={{
          background:
            "linear-gradient(-15.354deg, rgb(255,162,149) -15.1%, rgb(91,72,147) 83.6%)",
        }}
      >
        {/* flying toasters video (black knocked out via screen blend against the gradient) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="pointer-events-none fixed inset-0 z-[1] h-screen w-screen object-cover mix-blend-screen"
          src="/assets/images/pd2ty6yko3i71.mp4"
        />

        <Script src="/taskbar.js" strategy="afterInteractive" />
        <vics-taskbar
          audio-src="/assets/images/mondamusic-synthwave-retro-pop-80s-491693.mp3"
          hint-size="100%,44px"
        />

        <div className="relative z-[2]">{children}</div>
      </body>
    </html>
  );
}
