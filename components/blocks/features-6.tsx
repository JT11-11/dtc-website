"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Search, Landmark, GraduationCap, Users, ArrowRight } from "lucide-react";

const audiences = [
  {
    title: "Researcher or journalist",
    desc: "Want to use our restriction database, cite our work, or collaborate on a study? Email us and we'll respond within a week. Our data is built to be used.",
    blob: "rgba(56,189,248,0.85)",
    href: "mailto:hello@dtcpolicylab.org",
  },
  {
    title: "Policymaker or institutional partner",
    desc: "We engage with governance bodies, digital rights organisations, and academic institutions. We're happy to brief, collaborate, or provide evidence for specific policy processes.",
    blob: "rgba(168,139,250,0.85)",
    href: "mailto:hello@dtcpolicylab.org",
  },
  {
    title: "Teenager who wants to do this work",
    desc: "We pay our researchers. If you're a high schooler interested in digital policy research — not a summer programme, not a certificate — join our community and see what we're building.",
    blob: "rgba(52,211,153,0.85)",
    href: "https://discord.gg/dtcpolicylab",
  },
  {
    title: "Digital rights or civil society",
    desc: "Working on platform governance, youth rights, or internet freedom? We're actively looking for partners who want evidence behind their advocacy. Let's talk.",
    blob: "rgba(251,191,36,0.85)",
    href: "mailto:hello@dtcpolicylab.org",
  },
];

const icons = [Search, Landmark, GraduationCap, Users];

export default function Features6() {
  return (
    <section className="w-full py-12 sm:py-16 px-6 sm:px-8 lg:px-12 bg-background">
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl font-medium text-foreground tracking-tight leading-[1.15] max-w-3xl mb-10 sm:mb-14"
        >
          Who should reach out?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map((v, i) => (
            <Card key={i} audience={v} index={i} Icon={icons[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Audience = (typeof audiences)[number];

function Card({
  audience,
  index,
  Icon,
}: {
  audience: Audience;
  index: number;
  Icon: (typeof icons)[number];
}) {
  const [hovered, setHovered] = useState(false);
  const words = audience.desc.split(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl bg-neutral-100 dark:bg-neutral-900 p-6 min-h-[360px] flex flex-col overflow-hidden"
    >
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 0.7 : 0, scale: hovered ? 1 : 0.75 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute left-1/2 -bottom-24 w-64 h-64 rounded-full pointer-events-none blur-md"
        style={{
          background: `radial-gradient(circle, ${audience.blob} 0%, rgba(255,255,255,0) 70%)`,
          x: "-50%",
        }}
      />

      <Icon className="relative w-5 h-5 text-neutral-900 dark:text-neutral-200" />

      <p className="relative mt-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-[220px]">
        {words.map((w, wi) => (
          <motion.span
            key={wi}
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 4,
              filter: hovered ? "blur(0px)" : "blur(3px)",
            }}
            transition={{
              duration: 0.3,
              delay: hovered ? wi * 0.03 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block mr-[0.25em]"
          >
            {w}
          </motion.span>
        ))}
      </p>

      <div className="relative mt-auto flex items-center justify-between pt-8">
        <span className="text-base sm:text-lg text-foreground">
          {audience.title}
        </span>
        <a
          href={audience.href}
          target={audience.href.startsWith("http") ? "_blank" : undefined}
          rel={audience.href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={`Contact us — ${audience.title}`}
        >
          <motion.span
            initial={false}
            animate={{
              backgroundColor: hovered ? audience.blob : "rgb(229 229 229)",
              color: hovered ? "#ffffff" : "rgb(64 64 64)",
            }}
            transition={{ duration: 0.3 }}
            className="w-10 h-10 rounded-full flex items-center justify-center dark:bg-neutral-800 dark:text-neutral-300"
          >
            <motion.span
              animate={{ x: hovered ? 2 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.span>
        </a>
      </div>
    </motion.div>
  );
}
