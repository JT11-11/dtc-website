"use client";

import { motion } from "motion/react";
import { Play } from "lucide-react";

const stories = [
  {
    name: "Mara on the trail",
    meta: "Boulder, long-distance runner",
    quote:
      "I finally have a training plan that respects rest days as much as mileage, and my knees are thanking me for it.",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Devon in the studio",
    meta: "Lisbon, independent producer",
    quote:
      "It's the first tool that actually feels built for the way I work at 2am, not the way a manager thinks I should.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function SocialProof12() {
  return (
    <section className="w-full min-h-screen flex items-start py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950">
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white tracking-tight">
              Members, in their own words
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              Real stories from the people building a calmer practice with us.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="self-start sm:self-auto px-5 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Watch more stories
          </motion.button>
        </motion.div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {stories.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl overflow-hidden bg-neutral-900 aspect-3/4 sm:aspect-4/3 cursor-pointer"
            >
              <img
                src={s.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/30 to-black/60" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent" />

              <div className="relative h-full flex flex-col justify-between p-5 sm:p-7">
                <div className="flex flex-col gap-0.5 [text-shadow:0_1px_12px_rgb(0_0_0/0.6)]">
                  <span className="text-lg sm:text-2xl font-semibold text-white">
                    {s.name}
                  </span>
                  <span className="text-[11px] sm:text-xs text-white/85">{s.meta}</span>
                </div>

                <div className="flex items-end justify-between gap-3">
                  <p className="text-sm sm:text-lg font-medium text-white leading-snug max-w-sm [text-shadow:0_1px_12px_rgb(0_0_0/0.7)]">
                    &ldquo;{s.quote}&rdquo;
                  </p>
                  <span className="shrink-0 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg transition-colors group-hover:bg-white group-hover:border-white">
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-white transition-colors group-hover:text-neutral-900 group-hover:fill-neutral-900" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
