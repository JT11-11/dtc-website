import type { Metadata } from "next";
import { Inter, Inria_Serif } from "next/font/google";
import "./globals.css";
import { OverlayProvider } from "@/lib/overlay-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Brand Kit highlight face — used for italic "Highlight" accents (Inria Serif Bold Italic).
const inriaSerif = Inria_Serif({
  variable: "--font-inria",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "DTC Youth Policy Lab",
  description:
    "A fully teen-led digital youth policy research lab. Putting teens at the table — not just on the agenda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${inriaSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans text-foreground bg-background"
        suppressHydrationWarning
      >
        <OverlayProvider>
          {children}
        </OverlayProvider>
      </body>
    </html>
  );
}
