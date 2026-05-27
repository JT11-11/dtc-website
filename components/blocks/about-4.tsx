"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ValueItem {
  id: number;
  title: string;
  heading: string;
  description: string;
  image: string;
}

const VALUES: ValueItem[] = [
  {
    id: 1,
    title: "Paid",
    heading: "We pay our researchers.",
    description:
      "Every DTC researcher is compensated — not with 'experience' or 'exposure', but with actual money. Serious work at the level we do it deserves serious pay, regardless of what grade you're in.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  },
  {
    id: 2,
    title: "Rigorous",
    heading: "Peer-reviewed, formally structured, citable.",
    description:
      "Our research goes through formal review processes. We publish in academic journals, build mathematical governance frameworks, and produce databases designed to serve as evidence in policy advocacy — not just talking points.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80",
  },
  {
    id: 3,
    title: "Specific",
    heading: "We close the consultation gap.",
    description:
      "42 countries enacted social media bans with 0% meaningful youth input. That specific, documented failure is what DTC exists to address — not 'youth inclusion' as a vague aspiration, but the concrete, measurable absence of young voices in decisions about their digital lives.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
  },
  {
    id: 4,
    title: "Grounded",
    heading: "Social media as survival infrastructure.",
    description:
      "For LGBTQ+ youth in hostile homes, low-income students without other networks, and teenagers navigating mental health crises — online spaces aren't entertainment. Restricting them isn't protective. Our research is grounded in that reality, not in moral panic.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
  },
];

const CYCLE_DURATION = 6000;

function ValuesList({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="flex flex-col gap-2 sm:gap-2 lg:gap-8">
      {VALUES.map((value, index) => (
        <motion.div
          key={value.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <h3
            className={`text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-light tracking-tight transition-colors duration-500 ${activeIndex === index
              ? "text-neutral-900 dark:text-white"
              : "text-neutral-300 dark:text-neutral-700"
              }`}
          >
            {value.title}
          </h3>
        </motion.div>
      ))}
    </div>
  );
}

function ImageSection({
  activeValue,
  progress,
  showProgress = false,
}: {
  activeValue: ValueItem;
  progress: number;
  showProgress?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-full lg:max-w-sm mx-auto aspect-3/2 lg:aspect-3/4 lg:rounded-none overflow-hidden shadow-2xl"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeValue.id}
            src={activeValue.image}
            alt={activeValue.title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Progress overlay for mobile */}
        {showProgress && (
          <div className="absolute inset-0 flex items-end justify-center pb-8 sm:pb-12 px-6 sm:px-8">
            <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-black/20 to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between w-full">
              <p className="text-sm text-white/90 font-light">
                What makes us different
              </p>
              <div className="relative w-12 h-12">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-white/30"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="text-white"
                    strokeDasharray={`${progress * 188} 188`}
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function ProgressSection({ progress }: { progress: number }) {
  return (
    <div className="flex flex-col items-center">
      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400"
      >
        What makes us different
      </motion.p>

      {/* Progress Circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative w-12 h-12 sm:w-14 sm:h-14"
      >
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-neutral-200 dark:text-neutral-800"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-neutral-900 dark:text-white"
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900 dark:text-white mb-4 sm:mb-6">
            {activeValue.heading}
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
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
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("safari") !== -1 && ua.indexOf("chrome") === -1) {
      setIsSafari(true);
    }
  }, []);

  return (
    <section className="w-full flex items-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Mobile/Tablet: Stack vertically with progress overlaid on image */}
        <div className="flex flex-col gap-12 sm:gap-16 lg:hidden">
          <ImageSection
            activeValue={activeValue}
            progress={progress}
            showProgress={true}
          />
          <ValuesList activeIndex={activeIndex} />
          <ContentSection activeValue={activeValue} />
        </div>

        {/* Desktop: 3-column grid with progress below */}
        <div className="hidden lg:flex lg:flex-col gap-12">
          {/* Top Row: 3 columns */}
          <div className="grid grid-cols-3 gap-12 xl:gap-16 items-center">
            {/* Left Column: Values List */}
            <div className="flex items-center justify-center">
              <ValuesList activeIndex={activeIndex} />
            </div>

            {/* Center Column: Image */}
            <div className="flex items-center justify-center">
              <ImageSection activeValue={activeValue} progress={progress} />
            </div>

            {/* Right Column: Content */}
            <div className="flex items-center justify-center">
              <ContentSection activeValue={activeValue} />
            </div>
          </div>

          {/* Bottom Row: Progress Section */}
          <div className={`flex justify-center ${isSafari ? "mt-8" : ""}`}>
            <ProgressSection progress={progress} />
          </div>
        </div>
      </div>
    </section>
  );
}
