"use client";

import { motion, useReducedMotion } from "motion/react";
import { Highlight } from "@/components/ui/highlight";

const conferences = [
  {
    context: "ECOSOC Youth Forum 2026",
    title: "ITU-hosted side event",
    detail: "In person · New York City",
  },
  {
    context: "HLPF 2026 · Side Event",
    title: "From Digital Margins to Systems Change",
    detail: "Science and Policy Youth Leadership",
  },
  {
    context: "HLPF 2026 · Side Event",
    title: "From Digital Shadows to Structural Power",
    detail: "Youth-Led AI Governance",
  },
  {
    context: "Tenth South and South-West Asia Subregional Forum on Sustainable Development",
    title: "SDG17 Partnership for the Goals",
    detail: "Virtual multistakeholder consultation",
  },
  {
    context: "Tenth South and South-West Asia Subregional Forum on Sustainable Development",
    title: "SDG10 Reduced Inequalities",
    detail: "Virtual multistakeholder consultation",
  },
  {
    context: "UNDP Crisis Academy",
    title: "Open House: Youth Leading the HDP Nexus",
    detail: "",
  },
  {
    context: "United Nations General Assembly",
    title: "UNGA Youth Blast",
    detail: "",
  },
  {
    context: "Climate Crisis in the Cryosphere",
    title: "Mountain Youth Championing Environmental Resilience Against Escalating Himalayan Disasters",
    detail: "",
  },
];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export function ConferencesDtc() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="conferences"
      className="w-full bg-muted px-6 py-16 sm:px-12 sm:py-20 lg:px-24"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-3xl">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)]">
              Participation
            </p>
            <h2 className="max-w-xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Conferences &amp; <Highlight>UN engagements.</Highlight>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              Forums, side events, and consultations where DTC has participated.
            </p>
            <p className="mt-8 flex items-baseline gap-3 border-t border-border pt-4">
              <span className="font-display text-5xl text-[var(--un-blue)]">08</span>
              <span className="text-sm font-medium text-muted-foreground">
                recorded engagements
              </span>
            </p>
          </div>

        </div>

        <motion.ul
          className="mt-8 grid gap-x-12 sm:mt-10 sm:grid-cols-2"
          variants={listVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.12 }}
        >
          {conferences.map((conference, index) => (
            <motion.li
              key={conference.title}
              variants={itemVariants}
              className="group grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 border-t border-border py-5 transition-colors duration-300 hover:border-[var(--sun-gold)] sm:py-6"
            >
              <span className="pt-0.5 font-display text-2xl text-[var(--un-blue)]/55 transition-colors group-hover:text-[var(--sun-gold)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase leading-relaxed tracking-[0.12em] text-muted-foreground">
                  {conference.context}
                </p>
                <h3 className="mt-1 text-lg font-semibold leading-snug text-foreground">
                  {conference.title}
                </h3>
                {conference.detail && (
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {conference.detail}
                  </p>
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}