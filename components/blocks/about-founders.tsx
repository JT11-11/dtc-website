"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Highlight } from "@/components/ui/highlight";

interface Founder {
  name: string;
  role: string;
  location: string;
  image: string;
  imagePosition?: string;
}

const founders: Founder[] = [
  {
    name: "Pyrate Ruby Passell",
    role: "DTC Founders",
    location: "Australia / United States",
    image: "/images/team/pyratepic.webp",
  },
  {
    name: "Stacy Gildenston",
    role: "DTC Founders",
    location: "Australia / United States",
    image: "/images/team/stacypic.webp",
    imagePosition: "50% 22%",
  },
];

function FounderPhoto({
  name,
  src,
  imagePosition,
}: {
  name: string;
  src: string;
  imagePosition?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <svg
          className="h-14 w-14 text-muted-foreground/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      style={imagePosition ? { objectPosition: imagePosition } : undefined}
      onError={() => setFailed(true)}
    />
  );
}

function FounderCard({
  founder,
  index,
}: {
  founder: Founder;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.08 * index }}
      className="group flex flex-col gap-4"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
        <FounderPhoto
          name={founder.name}
          src={founder.image}
          imagePosition={founder.imagePosition}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
          {founder.name}
        </h3>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--sun-gold)]">
          {founder.role}
        </p>
        <p className="text-sm text-muted-foreground">{founder.location}</p>
      </div>
    </motion.div>
  );
}

export function AboutFounders() {
  return (
    <section className="w-full border-t border-border bg-background px-6 py-14 sm:px-8 sm:py-16 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex max-w-2xl flex-col gap-3 sm:mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)]">
            The Founders
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl leading-tight">
            The people who <Highlight>started it.</Highlight>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 sm:gap-8 max-w-2xl">
          {founders.map((founder, i) => (
            <FounderCard key={founder.name} founder={founder} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
