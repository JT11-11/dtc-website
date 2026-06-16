import type { Metadata } from "next";
import Navigation9 from "@/components/blocks/navigation-9";
import Stats11 from "@/components/blocks/stats-11";
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

export const metadata: Metadata = {
  title: "About Us · DTC Youth Policy Lab",
  description:
    "DTC Youth Policy Lab is a fully teen-led research organisation putting high school students at the centre of global digital-policy work. Founded at the 2022 UN IGF in Ethiopia, headquartered in Singapore.",
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
              Teen-led policy work.{" "}
              <Highlight>Not youth-washing.</Highlight>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              A fully teen-led research lab putting young people into the global
              digital-policy pipeline: as the researchers, not just the
              subjects. Founded at the 2022 UN IGF in Ethiopia. Headquartered in
              Singapore.
            </p>
          </div>
        </section>

        {/* Stats */}
        <Stats11 />

        <Features5 />

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
          description="We're looking for high schoolers who want to do rigorous research. Policymakers, researchers, and journalists: we'd love to talk."
          primaryLabel="Join the Lab"
          primaryHref="/contact"
          secondaryLabel="Read our research"
          secondaryHref="/work"
        />
      </main>

      <FooterDtc />
    </>
  );
}
