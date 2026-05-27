"use client";

import { motion } from "motion/react";

const chartData = [
  {
    label: "Transformative",
    percentage: 43,
    color: "bg-blue-300",
  },
  {
    label: "Helpful",
    percentage: 42,
    color: "bg-blue-200",
  },
  {
    label: "Minimal",
    percentage: 15,
    color: "bg-blue-100 dark:bg-blue-100",
  },
];

export default function Stats1() {
  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column - Title and CTA */}
          <div className="flex flex-col gap-8 sm:gap-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl tracking-tight font-medium text-neutral-900 dark:text-white leading-tight"
            >
              92% of developers report AI copilot boosted their productivity
              significantly
            </motion.h1>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="px-8 py-4 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-semibold text-base sm:text-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-200 w-fit"
            >
              Start free trial
            </motion.button>
          </div>

          {/* Right Column - Stacked Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="shadow-lg flex flex-col p-6 rounded-3xl gap-6 border border-neutral-200 dark:border-neutral-800"
          >
            {/* Chart Title */}
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-neutral-900 dark:text-white">
              Developer Impact
            </h3>

            {/* Stacked Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col rounded-md overflow-hidden h-[400px] sm:h-[500px] lg:h-[600px]"
            >
              {chartData.map((item, index) => (
                <div
                  key={index}
                  className={`${item.color} flex items-start justify-between px-6 sm:px-8 md:px-10 py-6`}
                  style={{ flexGrow: item.percentage }}
                >
                  <span className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-900">
                    {item.label}
                  </span>
                  <span className="tracking-tighter text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-900">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
