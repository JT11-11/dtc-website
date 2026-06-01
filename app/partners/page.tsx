import type { Metadata } from "next";
import Navigation9 from "@/components/blocks/navigation-9";
import { FooterDtc } from "@/components/blocks/footer-dtc";
import { PartnersPage } from "@/components/blocks/partners-page";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import CTA1 from "@/components/blocks/cta-1";

export const metadata: Metadata = {
  title: "Partners — DTC Policy Lab",
  description:
    "Organizations DTC Policy Lab collaborates with on research, outreach, and policy engagement — including the Swayam Initiative and PERME.",
};

export default function Partners() {
  return (
    <>
      <Navigation9 />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Partners" }]} />
      <main className="lg:relative lg:z-10 flex-1 bg-background">
        <PartnersPage />
        <CTA1
          headingLine1="Want to work"
          headingLine2="with us?"
          description="We are always looking for organizations that share our belief that young people belong in the policy conversation, not just as subjects of it. Get in touch and let's figure out what we can build together."
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
