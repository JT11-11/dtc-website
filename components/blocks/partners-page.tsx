"use client";

import { ArrowUpRight } from "lucide-react";

const partners = [
  {
    name: "Swayam Initiative",
    region: "MENA Region",
    description:
      "Swayam Initiative works to build policy literacy and civic engagement across the Middle East and North Africa. We connected through shared goals around youth voice in governance, and have been collaborating on how young people can shape the digital policy landscape in their communities.",
    link: "https://policy-mena-path.base44.app/",
    linkLabel: "Visit Swayam Initiative",
  },
  {
    name: "PERME",
    region: "Research Partner",
    description:
      "PERME shares our commitment to rigorous, data-driven policy research. Our collaboration has focused on building shared research infrastructure and databases that both organizations can use to inform advocacy and policy recommendations at regional and international levels.",
    databases: [
      {
        label: "Policy Database",
        href: "https://docs.google.com/spreadsheets/d/1bn4IupxTEsWR9vetTepZzZMIQtCdziZ6UdgLi9a0O_Q/edit?gid=939924722#gid=939924722",
      },
      {
        label: "Research Tracker",
        href: "https://docs.google.com/spreadsheets/d/1zHiw7h_BNnXkTRnvXF-Ov8QYzRTmdVR-j0HwA5AWBos/edit?gid=0#gid=0",
      },
    ],
  },
];

export function PartnersPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
        Partnerships
      </p>
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.0] max-w-4xl">
        Who we work with.
      </h1>
      <p className="mt-6 text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
        Good policy research doesn&apos;t happen in isolation. These are the
        organizations we collaborate with on research, outreach, and building a
        fairer internet for young people.
      </p>

      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="bg-neutral-50 dark:bg-neutral-900 rounded-3xl p-8 sm:p-10 flex flex-col gap-6"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
                {partner.region}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                {partner.name}
              </h2>
            </div>

            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1">
              {partner.description}
            </p>

            <div className="flex flex-wrap gap-3 mt-auto">
              {partner.link && (
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:opacity-80 transition-opacity"
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  {db.label}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 border-t border-neutral-200 dark:border-neutral-800 pt-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
          Also in Partnership With
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
            Core research and infrastructure built in collaboration with 3
            Primitives, advancing the foundation of our policy work.
          </p>
        </div>
      </div>
    </div>
  );
}
