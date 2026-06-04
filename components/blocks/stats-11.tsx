"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Highlight } from "@/components/ui/highlight";

// Brand-tinted stat cards (light tints of the DTC YPL palette).
const cards = [
  {
    title: "Countries with social media bans on minors",
    label: "Enacted without youth consultation",
    value: "42",
    source: "Restriction Database",
    href: "/work/database",
    bg: "#dbeefb",
    tint: "#0b6f9c",
  },
  {
    title: "Meaningful youth policy input",
    label: "Documented across those 42 countries",
    value: "0%",
    source: "Consultation gap",
    href: "/work/database",
    bg: "#fbeccb",
    tint: "#8a6a1f",
  },
  {
    title: "Measures tracked in our database",
    label: "World's first systematic index, every entry sourced",
    value: "48",
    source: "Global Teen DB",
    href: "/work/database",
    bg: "#dff0f4",
    tint: "#2c7a8c",
  },
  {
    title: "Foundational governance frameworks",
    label: "Twisted Pair Theorem + Lemma C",
    value: "2",
    source: "3 Primitives",
    href: "https://3primitives.io/",
    bg: "#efe7d4",
    tint: "#7c6326",
  },
  {
    title: "Pilot study under peer review",
    label: "Taylor & Francis (Social Sciences)",
    value: "1",
    source: "Marginalized Youth Study",
    href: "/work",
    bg: "#e9f4fb",
    tint: "#0b6f9c",
  },
];

const SHORT = 340;
const TALL = 430;
const CYCLE_MS = 2400;

export default function Stats11() {
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % cards.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [isDesktop]);

  return (
    <section className="w-full py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-background">
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)] mb-3">
            The numbers
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight max-w-2xl leading-[1.05]">
            The consultation gap,{" "}
            <Highlight>by the numbers.</Highlight>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          {cards.map((c, i) => (
            <div key={i} className="md:h-[430px] flex items-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={
                  isDesktop
                    ? {
                        height: active === i ? TALL : SHORT,
                        color: active === i ? "#171717" : c.tint,
                      }
                    : { height: "auto", color: "#171717" }
                }
                transition={{
                  opacity: { duration: 0.5, delay: 0.08 * i },
                  y: { duration: 0.5, delay: 0.08 * i },
                  height: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                  color: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                }}
                style={{ backgroundColor: c.bg }}
                className="w-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-6 overflow-hidden"
              >
                <span className="text-sm sm:text-base font-medium leading-snug">
                  {c.title}
                </span>
                <div className="flex flex-col gap-1.5">
                  {c.label && (
                    <span className="text-xs sm:text-sm font-medium opacity-70 leading-snug">
                      {c.label}
                    </span>
                  )}
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    {c.value}
                  </span>
                  <a
                    href={c.href}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold hover:underline w-fit"
                  >
                    <ArrowUpRight className="w-3 h-3" />
                    {c.source}
                  </a>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
