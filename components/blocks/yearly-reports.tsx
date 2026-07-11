"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Highlight } from "@/components/ui/highlight";

export interface YearlyReport {
  year: string;
  description: string;
  /** Google Drive link — replace when available */
  href: string;
  image: string;
  imagePosition?: string;
}

// Update href values when Drive links are ready.
export const yearlyReports: YearlyReport[] = [
  {
    year: "2025",
    description: "Global expansion, UN briefings, and the release of the Global Teen Restriction Database.",
    href: "https://drive.google.com/file/d/1YFORMClMFQcPXVIfR0WmGsIrE667TXy3/view?usp=sharing",
    image: "/images/un/group.jpg",
    imagePosition: "50% 40%",
  },
  {
    year: "2024",
    description: "Auditing international governance bodies and mapping digital rights.",
    href: "",
    image: "/images/un/ga-hall.jpg",
    imagePosition: "50% 35%",
  },
  {
    year: "2023",
    description: "Inaugural launch and foundational policy frameworks from IGF Kyoto.",
    href: "",
    image: "/images/un/hlpf.jpg",
    imagePosition: "58% 32%",
  },
];

function ReportCard({ report, index }: { report: YearlyReport; index: number }) {
  const isAvailable = Boolean(report.href);

  const content = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={report.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        style={
          report.imagePosition
            ? { objectPosition: report.imagePosition }
            : undefined
        }
      />
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/75 via-foreground/35 to-[var(--un-blue)]/50" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
        <div className="flex flex-col gap-1 [text-shadow:0_1px_12px_rgb(0_0_0/0.6)]">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
            Annual Report
          </span>
          <span className="font-serif text-5xl sm:text-6xl font-normal italic leading-none text-white">
            {report.year}
          </span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <p className="max-w-[240px] text-xs font-medium leading-relaxed text-white/90 [text-shadow:0_1px_12px_rgb(0_0_0/0.8)] sm:text-sm">
            {report.description}
          </p>
          <span
            className={`flex size-10 shrink-0 items-center justify-center rounded-full border backdrop-blur-md transition-colors sm:size-12 ${
              isAvailable
                ? "border-white/40 bg-white/15 group-hover:border-white group-hover:bg-white"
                : "border-white/10 bg-white/5 opacity-50"
            }`}
          >
            <ExternalLink
              className={`size-4 transition-colors ${
                isAvailable
                  ? "text-white group-hover:text-foreground"
                  : "text-white/40"
              }`}
            />
          </span>
        </div>
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={isAvailable ? { y: -4 } : undefined}
      className={`group relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted sm:aspect-[4/3] ${
        isAvailable ? "cursor-pointer" : "cursor-default opacity-90"
      }`}
    >
      {isAvailable ? (
        <a
          href={report.href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
          aria-label={`Open ${report.year} annual report`}
        >
          {content}
        </a>
      ) : (
        <div className="absolute inset-0" aria-label={`${report.year} annual report — link coming soon`}>
          {content}
        </div>
      )}
    </motion.div>
  );
}

export function YearlyReports() {
  return (
    <section className="w-full bg-background px-6 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="flex max-w-2xl flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)]">
              Annual Briefings
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The record of <Highlight>our impact.</Highlight>
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Detailed institutional briefs tracking our empirical research, global
              audits, and youth-led policy interventions.
            </p>
          </div>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
          {yearlyReports.map((report, i) => (
            <ReportCard key={report.year} report={report} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
