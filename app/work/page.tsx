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
    "Peer-reviewed research and systematic databases from DTC Youth Policy Lab, including the Global Teen Restriction Database and original research on how blanket restrictions affect marginalised youth, under review at Taylor & Francis.",
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
              Research &amp; Output
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.0] lg:whitespace-nowrap">
              What we <Highlight>actually build.</Highlight>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Not position papers. Not youth summits. Peer-reviewed research and
              systematic databases built to stand up in policy rooms.
            </p>
            <p className="mt-4 text-base text-muted-foreground">
              Core infrastructure built with{" "}
              <a
                href="https://3primitives.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-foreground/40 hover:decoration-foreground transition-colors"
              >
                3 Primitives
              </a>
              .
            </p>
          </div>
        </section>

        <RestrictionDatabaseFeature />

        <WorkDtc />
        <CTA1
          headingLine1="Use our data."
          headingLine2="Build better policy."
          description="Our research is built to be used by journalists, advocates, academics, and policymakers. Get in touch if you want to cite our work, collaborate on a study, or access the database."
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
