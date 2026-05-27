"use client";

import Navigation9 from "@/components/blocks/navigation-9";
import { TerminalHero } from "@/components/blocks/terminal-hero";
import { Hero3 } from "@/components/blocks/hero-3";
import { ResearchDtc } from "@/components/blocks/research-dtc";
import { ServicesDtc } from "@/components/blocks/services-dtc";
import { AboutDtc } from "@/components/blocks/about-dtc";
import { ImpactDtc } from "@/components/blocks/impact-dtc";
import { FaqDtc } from "@/components/blocks/faq-dtc";
import { FooterDtc } from "@/components/blocks/footer-dtc";

export default function LandingPage() {
  return (
    <>
      <Navigation9 />
      <main id="main-content" className="lg:relative lg:z-10 flex-1 bg-background">
        <TerminalHero />
        <Hero3 />
        <ResearchDtc />
        <ServicesDtc />
        <AboutDtc />
        <ImpactDtc />
        <FaqDtc />
      </main>
      <FooterDtc />
    </>
  );
}
