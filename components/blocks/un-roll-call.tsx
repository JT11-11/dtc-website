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
    year: "2023",
    venue: "Internet Governance Forum",
    place: "Kyoto",
    note: "Invited by the UN IGF Secretariat to establish the Dynamic Teen Coalition, the first teen-led coalition at the Internet Governance Forum.",
  },
  {
    year: "’23–’24",
    venue: "UN advocacy & the first database",
    place: "UN events · worldwide",
    note: "Returned to UN events year after year, challenging blanket social-media bans and building the first systematic global database of teen online restrictions.",
  },
  {
    year: "2025",
    venue: "IGF Oslo: IGF 2025",
    place: "Norway",
    note: "Questioned the Australian government on their position on the impact of teen bans on marginalised youth, the exchange that became our paper.",
  },
  {
    year: "2025",
    venue: "ECOSOC YF · HLPF · WSIS+20 · UNGA · IYC",
    place: "via UN MGCY",
    note: "Beyond the IGF, DTC engaged UN-adjacent processes through the UN Major Group for Children & Youth: delegations, oral interventions, and side events.",
  },
  {
    year: "2026",
    venue: "Youth Policy Lab",
    place: "Headquartered in Singapore",
    note: "DTC evolves into a teen-led policy research lab, turning years of presence in the room into rigorous, sourced research.",
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
          Roll Call
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.05] max-w-3xl">
          Years of being{" "}
          <Highlight>in the room.</Highlight>
        </h2>
        <p className="mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          A record of where teenagers showed up in global digital-policy
          processes, and what happened when they did.
        </p>

        <ol className="mt-14 space-y-0">
          {ENTRIES.map((e, i) => (
            <motion.li
              key={`${e.year}-${e.venue}`}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: reduce ? 0 : Math.min(i * 0.06, 0.3),
              }}
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
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default UnRollCall;
