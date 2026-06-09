"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

interface TimelineEntry {
  id: number;
  /** Big era label shown as the giant numeral */
  year: string;
  /** Short rail label */
  short: string;
  title: string;
  /** Word(s) inside the title rendered in the serif gold highlight */
  highlight: string;
  place: string;
  description: string;
  image: string;
}

interface About2Props {
  displayNavigation?: boolean;
}

/**
 * Timeline content is the canonical "OUR HISTORY" arc from the DTC YPL Manifest,
 * enriched with the 2025 Yearly Wrap. Every claim traces to those source docs.
 */
const TIMELINE_DATA: TimelineEntry[] = [
  {
    id: 1,
    year: "2022",
    short: "Founded",
    title: "Founded at the UN IGF",
    highlight: "first teen-led coalition",
    place: "Internet Governance Forum · Ethiopia",
    description:
      "At the invitation of the IGF Secretariat, the Dynamic Teen Coalition was established at the 2022 UN Internet Governance Forum in Ethiopia: the first teen-led coalition at the IGF.",
    image: "/images/un/flag-portrait.jpg",
  },
  {
    id: 2,
    year: "’23–’24",
    short: "Advocacy",
    title: "UN advocacy & the first database",
    highlight: "first systematic database",
    place: "UN events · worldwide",
    description:
      "DTC returned to UN events year after year, challenging blanket social-media bans on the floor and building the first systematic global database of teen online restrictions, country by country, platform by platform.",
    image: "/images/un/group.jpg",
  },
  {
    id: 3,
    year: "2025",
    short: "The Confrontation",
    title: "Oslo: The Confrontation",
    highlight: "became our paper",
    place: "IGF 2025 · Norway",
    description:
      "At IGF 2025 in Norway, DTC confronted Australia’s Ambassador for Cyber Affairs, Brendan Dowling, on the impact of teen bans on marginalised youth. That exchange became our paper. Across the year DTC also engaged the ECOSOC Youth Forum, HLPF, WSIS+20 and UNGA, and ran the first teen-led Dynamic Coalition session at the IGF in twenty years.",
    image: "/images/un/hlpf.jpg",
  },
  {
    id: 4,
    year: "2026",
    short: "Policy Lab",
    title: "The Policy Lab launches",
    highlight: "researchers, not subjects",
    place: "Headquartered in Singapore · now",
    description:
      "DTC evolves into a fully teen-led policy research lab, headquartered in Singapore. Our paper is under review at Taylor & Francis, turning years of presence in the room into rigorous, sourced research, so teens become the researchers, not just the subjects.",
    image: "/images/un/ga-hall.jpg",
  },
];

export default function About2({ displayNavigation = true }: About2Props = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  // The progress fill must end exactly at the active dot. Because the dots sit
  // at the start of each grid column (not at evenly-spaced 0/33/66/100%),
  // we measure the active dot's center rather than using a width percentage,
  // which would overshoot past the dot.
  const railRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [fillWidth, setFillWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      const rail = railRef.current;
      const dot = dotRefs.current[activeIndex];
      if (!rail || !dot) return;
      const railRect = rail.getBoundingClientRect();
      const dotRect = dot.getBoundingClientRect();
      setFillWidth(dotRect.left + dotRect.width / 2 - railRect.left);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TIMELINE_DATA.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [resetKey]);

  const go = useCallback((index: number) => {
    const clamped = (index + TIMELINE_DATA.length) % TIMELINE_DATA.length;
    setActiveIndex(clamped);
    setResetKey((k) => k + 1);
  }, []);

  const entry = TIMELINE_DATA[activeIndex];

  return (
    <section className="w-full bg-background py-20 sm:py-28 px-6 sm:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[var(--un-blue)]">
            Our history
          </p>
          <h2 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.04] max-w-3xl">
            From a teen-led coalition to a{" "}
            <span className="font-serif italic font-normal text-[var(--bronze)]">
              policy lab.
            </span>
          </h2>
        </motion.div>

        {/* Stage */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-stretch">
          {/* Left: giant year + copy */}
          <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-card p-7 sm:p-10">
            {/* Ghost numeral backdrop */}
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`ghost-${entry.id}`}
                aria-hidden
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute -right-4 -top-10 select-none font-bold tracking-tighter text-[28vw] leading-none text-[var(--un-blue)]/[0.06] lg:text-[16rem]"
              >
                {entry.year.replace("’", "")}
              </motion.span>
            </AnimatePresence>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${entry.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--un-blue)]/30 bg-[var(--un-blue)]/[0.07] px-3 py-1 text-xs font-medium text-[var(--un-blue)]">
                    <MapPin className="h-3.5 w-3.5" />
                    {entry.place}
                  </span>

                  <div className="mt-5 flex items-baseline gap-4">
                    <span className="font-bold tracking-tighter text-5xl sm:text-6xl text-foreground">
                      {entry.year}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    {entry.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
                    {entry.description}
                  </p>
                  <p className="mt-5 font-serif italic font-normal text-lg text-[var(--bronze)]">
                    {entry.highlight}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative min-h-[260px] sm:min-h-[340px] lg:min-h-0 overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-muted">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={`img-${entry.id}`}
                src={entry.image}
                alt={entry.title}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            {/* gold corner accent */}
            <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-16 bg-[radial-gradient(circle_at_bottom_left,var(--sun-gold)_0%,transparent_70%)] opacity-80" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[var(--radius-2xl)]" />
          </div>
        </div>

        {/* Progress rail */}
        <div className="mt-12 sm:mt-16">
          <div ref={railRef} className="relative">
            {/* track */}
            <div className="absolute top-[7px] left-0 right-0 h-[2px] bg-border" />
            {/* fill - width measured to the active dot's center (no overshoot) */}
            <motion.div
              className="absolute top-[7px] left-0 h-[2px] bg-[var(--un-blue)]"
              initial={false}
              animate={{ width: fillWidth }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            />
            {/* nodes */}
            <div className="relative grid grid-cols-4 gap-3 sm:gap-6">
              {TIMELINE_DATA.map((e, i) => {
                const isActive = i === activeIndex;
                const isPassed = i <= activeIndex;
                return (
                  <button
                    key={e.id}
                    onClick={() => go(i)}
                    className="group flex flex-col items-start text-left"
                    aria-label={`${e.year}: ${e.title}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span
                      ref={(el) => {
                        dotRefs.current[i] = el;
                      }}
                      className="relative flex h-4 w-4 items-center justify-center"
                    >
                      <motion.span
                        className={`block rounded-full border-2 transition-colors duration-200 ${
                          isActive
                            ? "border-[var(--sun-gold)] bg-[var(--sun-gold)]"
                            : isPassed
                              ? "border-[var(--un-blue)] bg-[var(--un-blue)]"
                              : "border-border bg-card"
                        }`}
                        animate={{ scale: isActive ? 1.35 : 1, width: 12, height: 12 }}
                        transition={{ duration: 0.2 }}
                      />
                    </span>
                    <span
                      className={`mt-3 text-sm font-bold tracking-tight transition-colors duration-200 ${
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {e.year}
                    </span>
                    <span
                      className={`text-xs transition-colors duration-200 ${
                        isActive ? "text-[var(--un-blue)]" : "text-muted-foreground/70"
                      }`}
                    >
                      {e.short}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {displayNavigation && (
            <div className="mt-8 flex justify-end gap-2">
              <button
                onClick={() => go(activeIndex - 1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-[var(--un-blue)] hover:text-white hover:border-[var(--un-blue)]"
                aria-label="Previous era"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => go(activeIndex + 1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-[var(--un-blue)] hover:text-white hover:border-[var(--un-blue)]"
                aria-label="Next era"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
