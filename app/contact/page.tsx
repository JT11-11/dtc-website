import type { Metadata } from "next";
import Navigation9 from "@/components/blocks/navigation-9";
import { FooterDtc } from "@/components/blocks/footer-dtc";
import { ContactUsDtc } from "@/components/blocks/contact-us-dtc";
import CTA1 from "@/components/blocks/cta-1";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Contact — DTC Policy Lab",
  description:
    "Get in touch with DTC Policy Lab. We work with researchers, journalists, policymakers, and teenagers who want to do this work. Email us at hello@dtcpolicylab.org.",
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
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
              Get in Touch
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.0] max-w-4xl">
              Let&apos;s talk.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
              We&apos;re a team of high schoolers doing serious policy research.
              We don&apos;t have a PR department. If you email us, an actual
              researcher will write back.
            </p>
          </div>
        </section>

        <ContactUsDtc />
        <CTA1
          headingLine1="Not ready to email?"
          headingLine2="Start in Discord."
          description="Our Discord is where the actual work happens — research discussions, draft reviews, UN process updates. Teens, researchers, and interested adults all welcome."
          primaryLabel="Join Discord"
          primaryHref="https://discord.gg/dtcpolicylab"
          secondaryLabel="Read our research"
          secondaryHref="/work"
        />
      </main>
      <FooterDtc />
    </>
  );
}
