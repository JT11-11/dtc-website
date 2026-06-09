"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Highlight } from "@/components/ui/highlight";

const cards = [
  {
    value: 42,
    suffix: "",
    label: "Countries with social media bans on minors",
    sub: "None consulted youth",
    source: "Restriction Database",
    href: "/work/database",
    bg: "var(--un-blue)",
    fg: "#ffffff",
  },
  {
    value: 0,
    suffix: "%",
    label: "Meaningful youth policy input",
    source: "Consultation gap",
    href: "/work/database",
    bg: "var(--sun-gold)",
    fg: "#1a1400",
  },
  {
    value: 48,
    suffix: "",
    label: "Measures tracked in our database",
    sub: "Every entry sourced",
    source: "Global Teen DB",
    href: "/work/database",
    bg: "var(--sky-blue)",
    fg: "#07252e",
  },
  {
    value: 2,
    suffix: "",
    label: "Governance frameworks we've authored",
    sub: "Twisted Pair Theorem + Lemma C",
    source: "3 Primitives",
    href: "https://3primitives.io/",
    bg: "var(--bronze)",
    fg: "#ffffff",
  },
  {
    value: 1,
    suffix: "",
    label: "Peer-reviewed studies in progress",
    source: "Marginalized Youth Study",
    href: "/work",
    bg: "var(--ink)",
    fg: "var(--paper)",
  },
];

function useCountUp(target: number, duration = 1400, active: boolean) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    if (target === 0) { setCount(0); return; }
    started.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return count;
}

function StatCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(card.value, 1200 + index * 100, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 overflow-hidden min-h-[220px] sm:min-h-[260px] cursor-default"
      style={{ backgroundColor: card.bg, color: card.fg }}
    >
      {/* Top label */}
      <p className="text-sm sm:text-base font-semibold leading-snug max-w-[14ch] opacity-80">
        {card.label}
      </p>

      {/* Bottom section */}
      <div className="flex flex-col gap-1 mt-6">
        {card.sub && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-50 mb-1">
            {card.sub}
          </p>
        )}

        {/* Count-up number */}
        <span className="text-6xl sm:text-7xl font-bold tracking-tight tabular-nums leading-none">
          {count}{card.suffix}
        </span>

        <a
          href={card.href}
          target={card.href.startsWith("http") ? "_blank" : undefined}
          rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="mt-3 inline-flex items-center gap-1 text-xs font-bold opacity-60 hover:opacity-100 transition-opacity w-fit"
          style={{ color: card.fg }}
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
          {card.source}
        </a>
      </div>

      {/* Subtle corner glow on hover */}
      <div
        className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
        style={{ backgroundColor: card.fg }}
      />
    </motion.div>
  );
}

export default function Stats11() {
  return (
    <section className="w-full py-16 sm:py-24 px-6 sm:px-8 lg:px-12 bg-background">
      <div className="max-w-[1400px] mx-auto w-full">

        {/* Header */}
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

        {/* Color-blocked stat cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cards.map((card, i) => (
            <StatCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
