"use client";

import { motion } from "motion/react";

interface TeamMember {
  name: string;
  role: string;
  country: string;
  image: string;
  contribution: string;
}

// Real DTC members. Names, roles, countries and contributions are drawn from
// the Dynamic Teen Coalition 2025 Yearly Wrap — no invented bios.
const team: TeamMember[] = [
  {
    name: "Aditya Majumdar",
    role: "Research Lead — Social Media Bans",
    country: "United States",
    image: "/images/team/aditya.jpg",
    contribution:
      "Built the world's first global database documenting social media bans affecting teens, and led IGF advocacy challenging blanket teen bans with national representatives.",
  },
  {
    name: "Jasper Tay",
    role: "Research & Web",
    country: "Singapore",
    image: "/images/team/jasper.jpg",
    contribution:
      "Authored the first comprehensive study of ageism across the IGF's National and Regional Initiatives (NRIs), and led DTC's website development.",
  },
  {
    name: "Ahaan Nigam",
    role: "Research & Data",
    country: "United States",
    image: "/images/team/ahaan.jpg",
    contribution:
      "Discrimination case-finding and data structuring across DTC's restriction and ageism research.",
  },
  {
    name: "Tejas Karusala",
    role: "Technical & Infrastructure",
    country: "United States",
    image: "/images/team/tejas.jpg",
    contribution:
      "Technical testing and applied work, plus website functionality and improvements.",
  },
  {
    name: "Lương Long Giang",
    role: "Community & Creative",
    country: "United States / Vietnam",
    image: "/images/team/tini.jpg",
    contribution:
      "Community discussion leadership, and composed DTC's 2026 theme music.",
  },
];

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.07 * index }}
      className="flex flex-col gap-3"
    >
      <div className="relative aspect-square rounded-2xl bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white leading-snug">
          {member.name}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 leading-snug">
          {member.role}
        </p>
        <p className="text-xs text-neutral-400 dark:text-neutral-600">
          {member.country}
        </p>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {member.contribution}
        </p>
      </div>
    </motion.div>
  );
}

export default function About7() {
  return (
    <section className="w-full py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-white dark:bg-neutral-950 overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3 max-w-2xl mb-12 sm:mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
            The team
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight leading-tight">
            High schoolers doing the work adults keep promising to include us in.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
            A small, globally distributed team that founded the lab in 2026 —
            building on the Dynamic Teen Coalition's work at the UN since 2022.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
