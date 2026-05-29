import type { Metadata } from "next";
import Navigation9 from "@/components/blocks/navigation-9";
import { FooterDtc } from "@/components/blocks/footer-dtc";
import { WorkDtc } from "@/components/blocks/work-dtc";
import CTA1 from "@/components/blocks/cta-1";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Our Work — DTC Policy Lab",
  description:
    "Peer-reviewed research, systematic databases, and formal governance frameworks from DTC Policy Lab — including the Global Teen Restriction Database, LGBTQ+ youth isolation study, and the Twisted Pair Legitimacy Theorem.",
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
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
              Research &amp; Output
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.0] max-w-4xl">
              What we actually build.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
              Not position papers. Not youth summits. Peer-reviewed research,
              systematic databases, and formal governance frameworks built to
              stand up in policy rooms.
            </p>
          </div>
        </section>

        {/* Partnership section */}
        <section className="px-6 sm:px-8 lg:px-12 py-12 bg-background border-b border-border">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
              In Partnership With
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a
                href="https://3primitives.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="group border-b-2 border-foreground hover:border-muted-foreground"
              >
                <p className="text-xl sm:text-2xl font-medium text-foreground group-hover:text-muted-foreground transition-colors pb-1">
                  3 Primitives
                </p>
              </a>
              <p className="text-muted-foreground text-base max-w-2xl">
                Core research and infrastructure built in collaboration with 3 Primitives, advancing the foundation of our policy work.
              </p>
            </div>
          </div>
        </section>

        <WorkDtc />
        <CTA1
          headingLine1="Use our data."
          headingLine2="Build better policy."
          description="Our research is built to be used — by journalists, advocates, academics, and policymakers. Get in touch if you want to cite our work, collaborate on a study, or access the database."
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
