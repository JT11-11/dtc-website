import type { Metadata } from "next";
import Navigation9 from "@/components/blocks/navigation-9";
import { FooterDtc } from "@/components/blocks/footer-dtc";
import { ContactUsDtc } from "@/components/blocks/contact-us-dtc";
import CTA1 from "@/components/blocks/cta-1";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Highlight } from "@/components/ui/highlight";

export const metadata: Metadata = {
  title: "Contact · DTC Youth Policy Lab",
  description:
    "Get in touch with DTC Youth Policy Lab, a youth-led nonprofit think tank. We work with young people, researchers, journalists, educators, and community partners.",
};

export default function ContactPage() {
  return (
    <>
      <Navigation9 />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <main className="lg:relative lg:z-10 flex-1 bg-background">
        {/* Page header */}
        <section className="pt-8 pb-12 px-6 sm:px-8 lg:px-12 bg-background">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)] mb-4">
              Get in Touch
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.0] max-w-4xl">
              Let&apos;s <Highlight>talk.</Highlight>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              We&apos;re a youth-led team doing serious public-interest work.
              We don&apos;t have a PR department. If you email us, an actual
              person from the community will write back.
            </p>
          </div>
        </section>

        <ContactUsDtc />
        <CTA1
          headingLine1="Not ready to email?"
          headingLine2="Join the work."
          description="Apply to work with DTC through our application form, or join the Discord community to meet people, exchange ideas, and hear about opportunities."
          primaryLabel="Apply to Work With Us"
          primaryHref="https://docs.google.com/forms/d/e/1FAIpQLSd4g0qwbKTAwuC0ZDQ5jiJkL4EX8IJD2gjG78amCRCTo5MJug/viewform?usp=sharing&ouid=107113160450238823877"
          secondaryLabel="Join the Community"
          secondaryHref="https://discord.gg/EGg4jpP4Sk"
        />
      </main>
      <FooterDtc />
    </>
  );
}
