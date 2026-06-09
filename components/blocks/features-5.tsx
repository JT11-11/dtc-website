"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, AlertTriangle, GraduationCap, Globe } from "lucide-react";
import { Highlight } from "@/components/ui/highlight";

const features = [
  {
    icon: Heart,
    title: "LGBTQ+ Youth",
    description:
      "For many queer teens, social media is their only access to community, affirmation, and crisis resources, particularly in unsupportive homes or conservative regions.",
  },
  {
    icon: AlertTriangle,
    title: "Youth in Crisis",
    description:
      "Teenagers who use platforms to process trauma and navigate mental-health crises lose a vital means of expression and support.",
  },
  {
    icon: GraduationCap,
    title: "Low-Income Students",
    description:
      "Platforms are the primary education and networking infrastructure for youth without access to elite institutions or paid opportunities.",
  },
  {
    icon: Globe,
    title: "Youth in All Contexts",
    description:
      "From Australia to the UK to sub-Saharan Africa, restrictions play out differently, but the exclusion of youth voices from the process is universal.",
  },
];

export function Features5() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 bg-background relative">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)] mb-4"
          >
            Who blanket restrictions hurt most
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-3xl leading-[1.05]"
          >
            The teens who depend on these spaces{" "}
            <Highlight>most.</Highlight>
          </motion.h2>
        </div>

        {/* Premium Horizontal Accordion (Vertical columns side-by-side) */}
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 h-auto md:h-[480px] w-full">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isExpanded = hoveredIndex === index;

            return (
              <div
                key={feature.title}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => setHoveredIndex(index)}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 overflow-hidden bg-black border border-neutral-800/80 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer h-[240px] md:h-full
                  ${isExpanded ? "flex-[2.5] md:flex-[3]" : "flex-1 md:flex-[1]"}
                `}
              >
                {/* Top: Description (Only visible when expanded) */}
                <div className="relative z-10 flex-1 overflow-hidden">
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
                        className="max-w-xl"
                      >
                        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom: Icon & Title */}
                <div className="relative z-10 mt-auto flex flex-col items-start">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-neutral-200/20 flex items-center justify-center text-[var(--bronze)] shrink-0 shadow-md mb-4 transition-transform duration-300">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold tracking-tight text-white">
                    {feature.title}
                  </h3>
                </div>

                {/* Subtle background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80 pointer-events-none" />
              </div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12 max-w-3xl text-lg text-muted-foreground leading-relaxed"
        >
          These groups need more online access, not less. That documented
          failure, not a vague aspiration toward &ldquo;youth inclusion,&rdquo; is
          what DTC exists to address.
        </motion.p>
      </div>
    </section>
  );
}
