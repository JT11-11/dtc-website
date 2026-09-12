import type { Metadata } from "next";
import Navigation9 from "@/components/blocks/navigation-9";
import { FooterDtc } from "@/components/blocks/footer-dtc";
import { RestrictionMap } from "@/components/blocks/restriction-map";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Highlight } from "@/components/ui/highlight";
import { EXTERNAL_AUDIT_URL } from "@/lib/site";
import { loadRestrictions } from "@/lib/restrictions";

export const metadata: Metadata = {
  title: "Restriction Database · DTC Youth Policy Lab",
  description:
    "The systematic map of age-based internet restrictions affecting teenagers worldwide — every law, its status, who it affects, and the primary source.",
};

export default async function DatabasePage() {
  // Server-preloaded count for the header; the interactive map hydrates
  // from /api/restrictions on the client (same validated rows).
  const { totalMeasures } = await loadRestrictions();

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
        <section className="pt-8 pb-12 px-6 sm:px-8 lg:px-12 bg-background">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)] mb-4">
              Systematic Database · {totalMeasures} measures
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.0] max-w-4xl">
              Every teen internet restriction, <Highlight>mapped.</Highlight>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              The map is the visual layer — the table below it is canonical
              and fully accessible. Prefer a globe view? Our community-built{" "}
              <a
                href={EXTERNAL_AUDIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground"
              >
                ADCI Restriction Audit
              </a>{" "}
              reads from this same dataset.
            </p>
          </div>
        </section>

        <section className="px-6 sm:px-8 lg:px-12 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <RestrictionMap />
          </div>
        </section>
      </main>
      <FooterDtc />
    </>
  );
}
