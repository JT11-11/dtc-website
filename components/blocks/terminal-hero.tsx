"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";

const FaultyTerminal = dynamic(
  () => import("@/components/react-bits/faulty-terminal"),
  { ssr: false },
);

export function TerminalHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Terminal background - tinted to UN Blue */}
      <div className="absolute inset-0">
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.8}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint="#009edb"
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={true}
          brightness={0.42}
        />
      </div>

      {/* Gradient vignette so text pops */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.6)_0%,transparent_100%)] pointer-events-none" />

      {/* Centred overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-5 text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)] drop-shadow"
        >
          Dynamic Teen Coalition · Youth-led Think Tank
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.04] max-w-4xl [text-shadow:_0_2px_14px_rgb(0_0_0_/_75%)]"
        >
          Young people shaping{" "}
          <span className="text-[var(--un-blue)]">what comes next.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 max-w-xl text-base sm:text-lg text-white/85 leading-relaxed font-medium drop-shadow-md"
        >
          A youth-led nonprofit think tank turning lived experience into
          research, public conversation, and practical change across policy work
          and public-interest issues.{" "}
          <span className="font-serif italic font-normal text-white/95">
            At the table, not just on the agenda.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd4g0qwbKTAwuC0ZDQ5jiJkL4EX8IJD2gjG78amCRCTo5MJug/viewform?usp=sharing&ouid=107113160450238823877"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[var(--sun-gold)] px-7 py-3 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.03] hover:shadow-[0_8px_30px_-8px_rgba(168,116,42,0.45)]"
          >
            Apply to Work With Us
          </a>
          <a
            href="#research"
            className="rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
          >
            Our Research
          </a>
        </motion.div>
      </div>
    </section>
  );
}
