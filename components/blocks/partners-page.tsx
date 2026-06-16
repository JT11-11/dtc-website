"use client";

import { ArrowUpRight } from "lucide-react";
import { Highlight } from "@/components/ui/highlight";

const partners = [
  {
    name: "Swayam Initiative",
    region: "Research Partner",
    description:
      "Swayam Initiative works to build policy literacy and civic engagement across the Middle East and North Africa. We connected through shared goals around youth voice in governance, and have been collaborating on how young people can shape the digital policy landscape in their communities.",
    link: "https://policy-mena-path.base44.app/",
    linkLabel: "Visit Swayam Initiative",
  },
  {
    name: "PERME",
    region: "MENA Region",
    description:
      "PERME shares our commitment to rigorous, data-driven policy research. Our collaboration has focused on building shared research infrastructure and databases that both organizations can use to inform advocacy and policy recommendations at regional and international levels.",
    databases: [
      {
        label: "Research Tracker",
        href: "https://docs.google.com/spreadsheets/d/1zHiw7h_BNnXkTRnvXF-Ov8QYzRTmdVR-j0HwA5AWBos/edit?gid=0#gid=0",
      },
    ],
  },
  {
    name: "3 Primitives",
    region: "Foundational Framework",
    description:
      "Core research and infrastructure built in collaboration with 3 Primitives, advancing the foundation of our policy work — including formal governance frameworks that underpin how we analyse youth exclusion from digital policy.",
    link: "https://3primitives.io/",
    linkLabel: "Visit 3 Primitives",
  },
];

export function PartnersPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)] mb-4">
        Partnerships
      </p>
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.0] max-w-4xl">
        Who we <Highlight>work with.</Highlight>
      </h1>
      <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
        Good policy research doesn&apos;t happen in isolation. These are the
        organizations we collaborate with on research, outreach, and building a
        fairer internet for young people.
      </p>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="bg-muted rounded-3xl p-8 sm:p-10 flex flex-col gap-6"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)] mb-3">
                {partner.region}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                {partner.name}
              </h2>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed flex-1">
              {partner.description}
            </p>

            <div className="flex flex-wrap gap-3 mt-auto">
              {partner.link && (
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--sun-gold)] text-white text-sm font-semibold hover:scale-[1.03] transition-transform"
                >
                  {partner.linkLabel}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {partner.databases?.map((db) => (
                <a
                  key={db.label}
                  href={db.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground text-sm font-medium hover:bg-card transition-colors"
                >
                  {db.label}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
