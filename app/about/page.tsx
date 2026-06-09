import type { Metadata } from "next";
import Navigation9 from "@/components/blocks/navigation-9";
import Stats11 from "@/components/blocks/stats-11";
import About7 from "@/components/blocks/about-7";
import About2 from "@/components/blocks/about-2";
import About4 from "@/components/blocks/about-4";
import CTA1 from "@/components/blocks/cta-1";
import { FooterDtc } from "@/components/blocks/footer-dtc";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AboutField } from "@/components/blocks/about-field";
import { OutreachVideos } from "@/components/blocks/outreach-videos";
import { Highlight } from "@/components/ui/highlight";
import { Heart, AlertTriangle, GraduationCap, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us · DTC Youth Policy Lab",
  description:
    "DTC Youth Policy Lab is a fully teen-led research organisation putting high school students at the centre of global digital-policy work. Founded at the 2022 UN IGF in Ethiopia, headquartered in Singapore.",
};

const hurtMost = [
  {
    icon: Heart,
    title: "LGBTQ+ Youth",
    body: "For many queer teens, social media is their only access to community, affirmation, and crisis resources, particularly in unsupportive homes or conservative regions.",
  },
  {
    icon: AlertTriangle,
    title: "Youth in Crisis",
    body: "Teenagers who use platforms to process trauma and navigate mental-health crises lose a vital means of expression and support.",
  },
  {
    icon: GraduationCap,
    title: "Low-Income Students",
    body: "Platforms are the primary education and networking infrastructure for youth without access to elite institutions or paid opportunities.",
  },
  {
    icon: Globe,
    title: "Youth in All Contexts",
    body: "From Australia to the UK to sub-Saharan Africa, restrictions play out differently, but the exclusion of youth voices from the process is universal.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navigation9 />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />

      <main className="lg:relative lg:z-10 flex-1 bg-background">
        {/* Page intro - sits below the fixed nav */}
        <section className="pt-8 pb-4 px-6 sm:px-8 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)] mb-4">
              About DTC Youth Policy Lab
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.0] max-w-4xl">
              Teen-led policy work.{" "}
              <Highlight>Not youth-washing.</Highlight>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              A fully teen-led research lab putting young people into the global
              digital-policy pipeline: as the researchers, not just the
              subjects. Founded at the 2022 UN IGF in Ethiopia. Headquartered in
              Singapore.
            </p>
          </div>
        </section>

        {/* Stats */}
        <Stats11 />

        {/* Who blanket restrictions hurt most (the human stakes behind the numbers) */}
        <section className="px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)] mb-4">
              Who blanket restrictions hurt most
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground max-w-3xl">
              The teens who depend on these spaces{" "}
              <Highlight>most.</Highlight>
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {hurtMost.map((h) => {
                const Icon = h.icon;
                return (
                  <div
                    key={h.title}
                    className="rounded-2xl border border-border bg-card p-7"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--sun-gold)]/15 text-[var(--bronze)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-lg font-bold text-foreground">
                        {h.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                      {h.body}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="mt-8 max-w-3xl text-lg text-muted-foreground">
              These groups need more online access, not less. That documented
              failure, not a vague aspiration toward &ldquo;youth inclusion,&rdquo;
              is what DTC exists to address.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <About2 displayNavigation={true} />

        {/* What makes us different */}
        <About4 />

        {/* Team */}
        <About7 />

        {/* UN photos */}
        <AboutField />

        {/* Outreach videos */}
        <OutreachVideos />

        {/* CTA */}
        <CTA1
          headingLine1="Join the people"
          headingLine2="closing the gap."
          description="We're looking for high schoolers who want to do rigorous research. Policymakers, researchers, and journalists: we'd love to talk."
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
