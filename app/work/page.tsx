import type { Metadata } from "next";
import Navigation9 from "@/components/blocks/navigation-9";
import { FooterDtc } from "@/components/blocks/footer-dtc";
import { WorkDtc } from "@/components/blocks/work-dtc";
import CTA1 from "@/components/blocks/cta-1";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Highlight } from "@/components/ui/highlight";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Work — DTC Youth Policy Lab",
  description:
    "Peer-reviewed research and systematic databases from DTC Youth Policy Lab — including the Global Teen Restriction Database and original research on how blanket restrictions affect marginalised youth, under review at Taylor & Francis.",
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
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.0] max-w-4xl">
              What we{" "}
              <Highlight>actually build.</Highlight>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Not position papers. Not youth summits. Peer-reviewed research and
              systematic databases built to stand up in policy rooms.
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

        {/* Featured: the Restriction Database (dedicated interactive page) */}
        <section className="px-6 sm:px-8 lg:px-12 py-12 bg-background">
          <div className="max-w-[1400px] mx-auto">
            <Link
              href="/work/database"
              className="group block overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-[var(--un-blue)]/40"
            >
              <div className="grid gap-6 p-8 sm:p-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)] mb-3">
                    Interactive · Featured
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                    The Global Teen{" "}
                    <Highlight>Restriction Database.</Highlight>
                  </h2>
                  <p className="mt-4 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                    The first systematic effort to map social-media bans and
                    blanket restrictions affecting teenagers — 42 countries, 48
                    measures, every entry sourced. Explore it on an interactive
                    world map.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--sun-gold)] px-6 py-3 text-sm font-semibold text-black transition-transform duration-200 group-hover:scale-[1.03]">
                    Open the database
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border">
                  {[
                    { n: "42", l: "countries" },
                    { n: "0%", l: "consulted youth" },
                    { n: "100%", l: "of teens subject" },
                  ].map((s) => (
                    <div key={s.l} className="bg-card px-3 py-5 text-center">
                      <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--un-blue)]">
                        {s.n}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground leading-snug">
                        {s.l}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
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
