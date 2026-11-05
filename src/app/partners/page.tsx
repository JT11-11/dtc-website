import type { Metadata } from "next";
import Navigation9 from "@/components/blocks/navigation-9";
import { FooterDtc } from "@/components/blocks/footer-dtc";
import { PartnersPage } from "@/components/blocks/partners-page";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import CTA1 from "@/components/blocks/cta-1";

export const metadata: Metadata = {
  title: "Partners · DTC Youth Policy Lab",
  description:
    "Organizations DTC Youth Policy Lab collaborates with on research, outreach, and policy work.",
};

export default function Partners() {
  return (
    <>
      <Navigation9 />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Partners" }]} />
      <main className="lg:relative lg:z-10 flex-1 bg-background">
        <PartnersPage />
        <CTA1
          headingLine1="Got a project"
          headingLine2="we should discuss?"
          description="We work with organizations that want young people involved in policy decisions. Get in touch and we&apos;ll see whether there&apos;s a useful project to build."
          primaryLabel="Get in Touch"
          primaryHref="/contact"
          secondaryLabel="See Our Research"
          secondaryHref="/work"
        />
      </main>
      <FooterDtc />
    </>
  );
}
