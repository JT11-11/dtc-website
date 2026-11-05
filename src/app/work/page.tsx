import type { Metadata } from "next";
import Navigation9 from "@/components/blocks/navigation-9";
import { FooterDtc } from "@/components/blocks/footer-dtc";
import { WorkDtc } from "@/components/blocks/work-dtc";
import CTA1 from "@/components/blocks/cta-1";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Highlight } from "@/components/ui/highlight";
import { RestrictionDatabaseFeature } from "@/components/blocks/restriction-database-feature";

export const metadata: Metadata = {
  title: "Our Work · DTC Youth Policy Lab",
  description:
    "Research, databases, and public-interest projects from DTC Youth Policy Lab. Explore our work on youth participation, public policy, and governance.",
};

export default function WorkPage() {
  return (
    <>
      <Navigation9 />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Our Work" }]} />
      <main className="lg:relative lg:z-10 flex-1 bg-background">
        {/* Page header */}
        <section className="pt-8 pb-12 px-6 sm:px-8 lg:px-12 bg-background">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)] mb-4">
              The work
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.0] lg:whitespace-nowrap">
              What we&apos;ve <Highlight>built so far.</Highlight>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Papers, databases, tools, and projects from young people who
              prefer evidence to hot takes.
            </p>
          </div>
        </section>

        <RestrictionDatabaseFeature />

        <WorkDtc />
        <CTA1
          headingLine1="Put the data"
          headingLine2="to work."
          description="Journalists, advocates, academics, communities, and institutions can use our work. Get in touch to cite it, collaborate, or access the database."
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
