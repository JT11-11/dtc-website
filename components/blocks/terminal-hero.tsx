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
      {/* Terminal background */}
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
          tint="#4ade80"
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={true}
          brightness={0.4}
        />
      </div>

      {/* Gradient vignette so text pops */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.6)_0%,transparent_100%)] pointer-events-none" />

      {/* Centred overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] max-w-4xl drop-shadow-xl [text-shadow:_0_2px_10px_rgb(0_0_0_/_80%)]"
        >
          Policy shaped by the{" "}
          <em className="not-italic text-green-400 drop-shadow-lg">
            people it affects most.
          </em>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-6 max-w-xl text-base sm:text-lg text-white/80 leading-relaxed font-medium drop-shadow-md"
        >
          A fully teen-led research organisation embedding youth directly
          into the global digital policy pipeline.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="/contact"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-green-300 transition-colors duration-200"
          >
            Join the Lab
          </a>
          <a
            href="#research"
            className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
          >
            Our Research
          </a>
        </motion.div>
      </div>
    </section>
  );
}
