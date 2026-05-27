"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const cards = [
  {
    title: "Countries with social media bans on minors",
    label: "Enacted without youth consultation",
    value: "42",
    source: "Our research",
    href: "/work",
    bg: "#dcd0f5",
    tint: "#6b5aa3",
  },
  {
    title: "Meaningful youth policy input",
    label: "Documented across those 42 countries",
    value: "0%",
    source: "Consultation gap",
    href: "/work",
    bg: "#ffd4b8",
    tint: "#b86535",
  },
  {
    title: "Countries in our restriction database",
    label: "Mapped — world's first systematic index",
    value: "40+",
    source: "Global Teen DB",
    href: "/work",
    bg: "#c7e8d4",
    tint: "#2e7d52",
  },
  {
    title: "Formal governance frameworks",
    label: "Twisted Pair Theorem + Lemma C",
    value: "2",
    source: "DTC Frameworks",
    href: "/work",
    bg: "#fce4ec",
    tint: "#ad3060",
  },
  {
    title: "Pilot study under peer review",
    label: "The Social Science Journal, Taylor & Francis",
    value: "1",
    source: "LGBTQ+ Isolation Study",
    href: "/work",
    bg: "#e3f2fd",
    tint: "#1565c0",
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
    <section className="w-full py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-white dark:bg-neutral-950">
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3">
            The numbers
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white tracking-tight max-w-2xl leading-[1.05]">
            The consultation gap, by the numbers.
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
