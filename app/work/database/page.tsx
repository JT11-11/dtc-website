import type { Metadata } from "next";
import Navigation9 from "@/components/blocks/navigation-9";
import { FooterDtc } from "@/components/blocks/footer-dtc";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { RestrictionGlobe } from "@/components/blocks/restriction-globe";

export const metadata: Metadata = {
  title: "Global Teen Restriction Database · DTC Youth Policy Lab",
  description:
    "Explore country-level policies and proposals affecting young people's access to social media.",
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
        <section className="px-6 pb-8 pt-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--sun-gold)]">
              Global Teen Restriction Database
            </p>
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <h1 className="max-w-3xl text-4xl leading-tight text-foreground sm:text-5xl">
                  Policy, placed in context.
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  A country-by-country view of social media age restrictions,
                  legislation, and proposals.
                </p>
              </div>
              <p className="shrink-0 text-sm text-muted-foreground">
                Export year: 2023–2026
              </p>
            </div>
          </div>
        </section>
        <section className="px-6 pb-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <RestrictionGlobe />
          </div>
        </section>
      </main>
      <FooterDtc />
    </>
  );
}