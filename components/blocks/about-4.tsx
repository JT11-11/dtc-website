"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ValueItem {
  id: number;
  title: string;
  heading: string;
  description: string;
}

const VALUES: ValueItem[] = [
  {
    id: 1,
    title: "Serious",
    heading: "Real work. Real stakes.",
    description:
      "DTC researchers do the same work as adult policy professionals: building databases, publishing in peer-reviewed journals, briefing delegates at the UN. We don't treat youth as a footnote.",
  },
  {
    id: 2,
    title: "Rigorous",
    heading: "Peer-reviewed, formally structured, citable.",
    description:
      "Our research goes through formal review processes. We publish in academic journals, build mathematical governance frameworks, and produce databases designed to serve as evidence in policy advocacy, not just talking points.",
  },
  {
    id: 3,
    title: "Specific",
    heading: "We close the consultation gap.",
    description:
      "42 countries enacted social media bans with 0% meaningful youth input. That specific, documented failure is what DTC exists to address, not 'youth inclusion' as a vague aspiration, but the concrete, measurable absence of young voices in decisions about their digital lives.",
  },
  {
    id: 4,
    title: "Grounded",
    heading: "Social media as survival infrastructure.",
    description:
      "For marginalized youth in hostile homes, low-income students without other networks, and teenagers navigating mental health crises, online spaces aren't entertainment. Restricting them isn't protective. Our research is grounded in that reality, not in moral panic.",
  },
];

const CYCLE_DURATION = 6000;

function ValuesList({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2 sm:gap-3 lg:gap-6">
      {VALUES.map((value, index) => (
        <motion.button
          key={value.id}
          type="button"
          onClick={() => onSelect(index)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="text-left"
          aria-current={activeIndex === index ? "true" : undefined}
        >
          <h3
            className={`text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight transition-colors duration-500 ${
              activeIndex === index
                ? "text-foreground"
                : "text-foreground/20 hover:text-foreground/40"
            }`}
          >
            {value.title}
          </h3>
        </motion.button>
      ))}
    </div>
  );
}

function ProgressSection({ progress }: { progress: number }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-sm sm:text-base text-muted-foreground"
      >
        What makes us different
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative h-12 w-12 sm:h-14 sm:w-14"
        aria-hidden
      >
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-border"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-[var(--sun-gold)]"
            strokeDasharray={`${progress * 188} 188`}
          />
        </svg>
      </motion.div>
    </div>
  );
}

function ContentSection({ activeValue }: { activeValue: ValueItem }) {
  return (
    <div className="flex flex-col justify-start gap-4 sm:gap-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeValue.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:mb-6 sm:text-4xl lg:text-5xl">
            {activeValue.heading}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {activeValue.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function About4() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const selectValue = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(elapsed / CYCLE_DURATION, 1);
      setProgress(currentProgress);

      if (elapsed >= CYCLE_DURATION) {
        setActiveIndex((prev) => (prev + 1) % VALUES.length);
      }
    };

    const intervalId = setInterval(updateProgress, 32);

    return () => clearInterval(intervalId);
  }, [activeIndex]);

  const activeValue = VALUES[activeIndex];

  return (
    <section className="w-full bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-[1400px] flex-col items-center justify-center">
        <div className="mx-auto w-full max-w-4xl">
          <div className="flex flex-col gap-8 sm:gap-10 lg:grid lg:grid-cols-[max-content_minmax(0,1fr)] lg:items-start lg:justify-center lg:gap-8 xl:max-w-5xl xl:gap-12">
            <ValuesList activeIndex={activeIndex} onSelect={selectValue} />
            <ContentSection activeValue={activeValue} />
          </div>
        </div>

        <div className="mt-12 flex justify-center sm:mt-16">
          <ProgressSection progress={progress} />
        </div>
      </div>
    </section>
  );
}
