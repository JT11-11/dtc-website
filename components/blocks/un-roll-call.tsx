"use client";

import { motion, useReducedMotion } from "motion/react";
import { Highlight } from "@/components/ui/highlight";

/**
 * UN Roll-Call - a "session called to order" scroll of DTC's verified UN
 * footprint. Every entry traces to the DTC YPL Manifest and the 2025 Yearly
 * Wrap. Do not add unverified venues or claims here.
 */
interface RollCallEntry {
  year: string;
  venue: string;
  place: string;
  note: string;
}

const ENTRIES: RollCallEntry[] = [
  {
    year: "2022",
    venue: "Internet Governance Forum",
    place: "Kyoto",
    note: "The UN IGF Secretariat invited us to establish the Dynamic Teen Coalition, the first teen-led coalition at the Internet Governance Forum.",
  },
  {
    year: "’23–’24",
    venue: "UN advocacy & the first database",
    place: "UN events · worldwide",
    note: "We kept returning to UN events, challenged blanket social-media bans, and began a global database of teen online restrictions.",
  },
  {
    year: "2025",
    venue: "IGF Oslo: IGF 2025",
    place: "Norway",
    note: "We questioned the Australian government about how teen bans affect marginalised youth. The exchange became our paper.",
  },
  {
    year: "2025",
    venue: "ECOSOC YF · HLPF · WSIS+20 · UNGA · IYC",
    place: "via UN MGCY",
    note: "Through the UN Major Group for Children & Youth, DTC joined delegations, made oral interventions, and ran side events beyond the IGF.",
  },
  {
    year: "2026",
    venue: "Youth Policy Lab",
    place: "USA-based · international and remote",
    note: "DTC became a USA-based, remote-first youth-led nonprofit think tank, carrying years of participation into sourced research.",
  },
];

export function UnRollCall() {
  const reduce = useReducedMotion();

  return (
    <section
      id="roll-call"
      className="dark bg-background text-foreground px-6 sm:px-12 lg:px-24 py-20 sm:py-28"
    >
      <div className="max-w-[1400px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)] mb-4">
          Where we&apos;ve been
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.05] max-w-3xl">
          We&apos;ve spent years{" "}
          <Highlight>showing up.</Highlight>
        </h2>
        <p className="mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          A record of our work in global policy and governance, from Kyoto to
          New York.
        </p>

        <ol className="mt-14 space-y-0">
          {ENTRIES.map((e, i) => (
            <li
              key={`${e.year}-${e.venue}`}
              className="group grid grid-cols-1 gap-4 border-t border-border py-8 sm:grid-cols-[minmax(0,9rem)_1fr] sm:gap-10 last:border-b"
            >
              {/* Year numeral */}
              <div className="text-4xl sm:text-5xl font-bold tracking-tighter text-foreground/25 transition-colors duration-300 group-hover:text-[var(--un-blue)]">
                {e.year}
              </div>

              {/* Entry */}
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    {e.venue}
                  </h3>

                  <span className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {e.place}
                  </span>
                </div>

                <p className="mt-2 max-w-2xl text-base text-muted-foreground leading-relaxed">
                  {e.note}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default UnRollCall;
