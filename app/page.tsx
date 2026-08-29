"use client";

import Navigation9 from "@/components/blocks/navigation-9";
import { TerminalHero } from "@/components/blocks/terminal-hero";
import { AboutDtc } from "@/components/blocks/about-dtc";
import { UnRollCall } from "@/components/blocks/un-roll-call";
import { ImpactDtc } from "@/components/blocks/impact-dtc";
import { FaqDtc } from "@/components/blocks/faq-dtc";
import { FooterDtc } from "@/components/blocks/footer-dtc";

export default function LandingPage() {
  return (
    <>
      <Navigation9 />
      <main id="main-content" className="lg:relative lg:z-10 flex-1 bg-background">
        <TerminalHero />
        <div className="px-6 sm:px-12 lg:px-24"><div className="border-t border-border max-w-[1400px] mx-auto" /></div>
        <AboutDtc />
        <div className="px-6 sm:px-12 lg:px-24"><div className="border-t border-border max-w-[1400px] mx-auto" /></div>
        <UnRollCall />
        <div className="px-6 sm:px-12 lg:px-24"><div className="border-t border-border max-w-[1400px] mx-auto" /></div>
        <ImpactDtc />
        <div className="px-6 sm:px-12 lg:px-24"><div className="border-t border-border max-w-[1400px] mx-auto" /></div>
        <FaqDtc />
      </main>
      <FooterDtc />
    </>
  );
}
