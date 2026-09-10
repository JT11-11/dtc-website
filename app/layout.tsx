import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { AppOverlays } from "@/components/app-overlays";
import { OverlayProvider } from "@/lib/overlay-context";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dtcpolicylab.org"),
  applicationName: "DTC Youth Policy Lab",
  title: {
    default: "DTC Youth Policy Lab",
    template: "%s · DTC Youth Policy Lab",
  },
  description:
    "A youth-led nonprofit think tank working across issues that matter to young people, from technology and media to governance, rights, and policy work.",
  keywords: [
    "DTC Youth Policy Lab",
    "youth policy",
    "digital rights",
    "technology policy",
    "young people",
    "public interest",
    "global advocacy",
  ],
  icons: {
    icon: [{ url: "/images/brand/youth-policy-lab-emblem.png", type: "image/png" }],
    apple: [{ url: "/images/brand/youth-policy-lab-emblem.png", type: "image/png" }],
  },
  openGraph: {
    title: "DTC Youth Policy Lab",
    description:
      "A youth-led nonprofit think tank working across technology, media, governance, rights, and policy.",
    url: "https://dtcpolicylab.org",
    siteName: "DTC Youth Policy Lab",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DTC Youth Policy Lab",
    description:
      "A youth-led nonprofit think tank working across issues that matter to young people.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans text-foreground bg-background"
        suppressHydrationWarning
      >
        <OverlayProvider>
          <AppOverlays />
          {children}
        </OverlayProvider>
      </body>
    </html>
  );
}
