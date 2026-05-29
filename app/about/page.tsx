import type { Metadata } from "next";
import Navigation9 from "@/components/blocks/navigation-9";
import Stats11 from "@/components/blocks/stats-11";
import About7 from "@/components/blocks/about-7";
import About2 from "@/components/blocks/about-2";
import About4 from "@/components/blocks/about-4";
import CTA1 from "@/components/blocks/cta-1";
import { FooterDtc } from "@/components/blocks/footer-dtc";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "About Us — DTC Policy Lab",
  description:
    "DTC Policy Lab is a fully teen-led research organisation paying high school students to lead global digital policy work. Founded at the 2022 UN IGF in Ethiopia, headquartered in Singapore.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation9 />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />

      <main className="lg:relative lg:z-10 flex-1 bg-white dark:bg-neutral-950">
        {/* Page intro — sits below the fixed nav */}
        <section className="pt-8 pb-4 px-6 sm:px-8 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
              About DTC Policy Lab
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.0] max-w-4xl">
              Teen-led policy work.{" "}
              <span className="text-neutral-400 dark:text-neutral-600">
                Not youth-washing.
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
              We pay high school researchers to do the global digital policy
              work adults keep promising to include us in. Founded at the 2022
              UN IGF. Headquartered in Singapore. Fiscalised under Hack Club
              501(c)(3).
            </p>
          </div>
        </section>

        {/* Stats */}
        <Stats11 />

        {/* Timeline */}
        <About2 displayNavigation={true} />

        {/* What makes us different */}
        <About4 />

        {/* Team */}
        <About7 />

        {/* CTA */}
        <CTA1
          headingLine1="Join the people"
          headingLine2="closing the gap."
          description="We're looking for high schoolers who want to do rigorous research — and get paid for it. Policymakers, researchers, and journalists: we'd love to talk."
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
