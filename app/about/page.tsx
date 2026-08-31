import type { Metadata } from "next";
import Navigation9 from "@/components/blocks/navigation-9";
import About7 from "@/components/blocks/about-7";
import About2 from "@/components/blocks/about-2";
import About4 from "@/components/blocks/about-4";
import CTA1 from "@/components/blocks/cta-1";
import { FooterDtc } from "@/components/blocks/footer-dtc";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AboutField } from "@/components/blocks/about-field";
import { OutreachVideos } from "@/components/blocks/outreach-videos";
import { Highlight } from "@/components/ui/highlight";
import { Features5 } from "@/components/blocks/features-5";
import { AboutFounders } from "@/components/blocks/about-founders";
import { YearlyReports } from "@/components/blocks/yearly-reports";

export const metadata: Metadata = {
  title: "About Us · DTC Youth Policy Lab",
  description:
    "DTC Youth Policy Lab is a USA-based, remote-first youth-led nonprofit think tank working internationally. Young people lead research, public-interest projects, and policy work that responds to the issues affecting their lives.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation9 />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />

      <main className="lg:relative lg:z-10 flex-1 bg-background">
        {/* Page intro - sits below the fixed nav */}
        <section className="pt-8 pb-4 px-6 sm:px-8 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)] mb-4">
              About DTC Youth Policy Lab
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.0] max-w-4xl">
              Young people doing the work.{" "}
              <Highlight>Not just being consulted.</Highlight>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              A youth-led nonprofit think tank working across the issues shaping
              young people&apos;s lives through policy research, public conversation,
              and practical action. We build useful public knowledge and help turn
              ideas into action. Founded in 2023 in Ethiopia, working
              internationally and remotely.
            </p>
          </div>
        </section>

        <Features5 />

        {/* Yearly reports */}
        <YearlyReports />

        {/* Timeline */}
        <About2 displayNavigation={true} />

        {/* What makes us different */}
        <About4 />

        {/* Founders */}
        <AboutFounders />

        {/* Team */}
        <About7 />

        {/* UN photos */}
        <AboutField />

        {/* Outreach videos */}
        <OutreachVideos />

        {/* CTA */}
        <CTA1
          headingLine1="Join the people"
          headingLine2="closing the gap."
          description="We're looking for young people who want to research, create, and contribute to work that matters. Researchers, educators, journalists, and community partners: we'd love to talk."
          primaryLabel="Apply to Work With Us"
          primaryHref="https://docs.google.com/forms/d/e/1FAIpQLSd4g0qwbKTAwuC0ZDQ5jiJkL4EX8IJD2gjG78amCRCTo5MJug/viewform?usp=sharing&ouid=107113160450238823877"
          secondaryLabel="Read our research"
          secondaryHref="/work"
        />
      </main>

      <FooterDtc />
    </>
  );
}
