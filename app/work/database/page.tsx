import type { Metadata } from "next";
import Navigation9 from "@/components/blocks/navigation-9";
import { FooterDtc } from "@/components/blocks/footer-dtc";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Highlight } from "@/components/ui/highlight";
import { RestrictionMap } from "@/components/blocks/restriction-map";
import CTA1 from "@/components/blocks/cta-1";

export const metadata: Metadata = {
  title: "Restriction Database — DTC Youth Policy Lab",
  description:
    "The Global Teen Restriction Database: the first systematic effort to map social-media bans and blanket restrictions affecting teenagers, country by country. Every entry is sourced.",
};

export default function DatabasePage() {
  return (
    <>
      <Navigation9 />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Our Work", href: "/work" },
          { label: "Restriction Database" },
        ]}
      />
      <main className="lg:relative lg:z-10 flex-1 bg-background">
        {/* Header */}
        <section className="pt-8 pb-10 px-6 sm:px-8 lg:px-12 bg-background">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)] mb-4">
              Global Teen Restriction Database
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.0] max-w-4xl">
              The laws written{" "}
              <Highlight>without us.</Highlight>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              The first systematic effort to map social-media bans and blanket
              restrictions affecting teenagers — country by country, law by law.
              Every entry traces to a primary source. Built by DTC researchers
              for policy and advocacy use.
            </p>
          </div>
        </section>

        {/* The interactive database */}
        <section className="px-6 sm:px-8 lg:px-12 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <RestrictionMap />
          </div>
        </section>

        <CTA1
          headingLine1="Use the data."
          headingLine2="Build better policy."
          description="This database is built to be used — by journalists, advocates, academics, and policymakers. Get in touch to cite it, collaborate on a study, or tell us about a law we're missing."
          primaryLabel="Get in Touch"
          primaryHref="/contact"
          secondaryLabel="About DTC"
          secondaryHref="/about"
        />
      </main>
      <FooterDtc />
    </>
  );
}
