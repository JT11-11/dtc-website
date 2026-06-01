"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "motion/react";

const backgroundCards = [
  {
    id: 1,
    image:
      "/images/team/aditya.jpg",
    x: "10%",
    y: "12%",
    rotation: -12,
    scale: 1,
    opacity: 0.15,
    intensity: 0.02,
  },
  {
    id: 2,
    image:
      "/images/team/jasper.jpg",
    x: "70%",
    y: "10%",
    rotation: 8,
    scale: 0.9,
    opacity: 0.2,
    intensity: 0.03,
  },
  {
    id: 3,
    image:
      "/images/team/tini.jpg",
    x: "30%",
    y: "40%",
    rotation: 15,
    scale: 1.1,
    opacity: 0.12,
    intensity: 0.04,
  },
  {
    id: 4,
    image:
      "/images/team/tejas.jpg",
    x: "75%",
    y: "67%",
    rotation: -8,
    scale: 0.95,
    opacity: 0.18,
    intensity: 0.02,
  },
  {
    id: 5,
    image:
      "/images/team/ahaan.jpg",
    x: "55%",
    y: "37%",
    rotation: -12,
    scale: 1,
    opacity: 0.1,
    intensity: 0.03,
  },
  {
    id: 6,
    image:
      "/images/un/unga.jpg",
    x: "8%",
    y: "67%",
    rotation: -15,
    scale: 0.85,
    opacity: 0.15,
    intensity: 0.04,
  },
];

function BackgroundCard({
  card,
  smoothMouseX,
  smoothMouseY,
  index,
}: {
  card: (typeof backgroundCards)[0];
  smoothMouseX: MotionValue<number>;
  smoothMouseY: MotionValue<number>;
  index: number;
}) {
  const parallaxX = useTransform(
    smoothMouseX,
    [-1, 1],
    [-15 * card.intensity * 100, 15 * card.intensity * 100],
  );
  const parallaxY = useTransform(
    smoothMouseY,
    [-1, 1],
    [-10 * card.intensity * 100, 10 * card.intensity * 100],
  );

  return (
    <motion.div
      className="absolute"
      style={{
        left: card.x,
        top: card.y,
        x: parallaxX,
        y: parallaxY,
        rotate: card.rotation,
        scale: card.scale,
        opacity: card.opacity,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: card.opacity, scale: card.scale }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-xl">
        <img
          src={card.image}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}

export interface Cta1Props {
  headingLine1?: string;
  headingLine2?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTA1({
  headingLine1 = "Ready to change",
  headingLine2 = "the rules?",
  description = "Join a community of high schoolers doing serious digital policy research — publishing, briefing delegates, and building the evidence base for youth digital rights.",
  primaryLabel = "Join the Lab",
  primaryHref = "/contact",
  secondaryLabel = "Read our research",
  secondaryHref = "/work",
}: Cta1Props) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Cards Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {backgroundCards.map((card, index) => (
          <BackgroundCard
            key={card.id}
            card={card}
            smoothMouseX={smoothMouseX}
            smoothMouseY={smoothMouseY}
            index={index}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4 sm:mb-6 text-neutral-900 dark:text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {headingLine1}
            {headingLine2 && (
              <>
                <br />
                {headingLine2}
              </>
            )}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href={primaryHref}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:opacity-85 transition-opacity w-full sm:w-auto"
            >
              {primaryLabel}
            </a>
            {secondaryLabel && secondaryHref && (
              <a
                href={secondaryHref}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors w-full sm:w-auto"
              >
                {secondaryLabel}
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
