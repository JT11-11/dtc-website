"use client";

import { motion } from "motion/react";
import { Highlight } from "@/components/ui/highlight";

interface TeamMember {
  name: string;
  role: string;
  country: string;
  image: string;
  contribution: string;
}

// Real DTC members. Names, roles, countries and contributions are drawn from
// the Dynamic Teen Coalition 2025 Yearly Wrap - no invented bios.
const team: TeamMember[] = [
  {
    name: "Aditya Majumdar",
    role: "Executive Director",
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
    role: "Research, Data & Web Design",
    country: "United States",
    image: "/images/team/ahaan.jpg",
    contribution:
      "Discrimination case-finding and data structuring across DTC's restriction and ageism research, plus website UX/UI design.",
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
    role: "Outreach & Community",
    country: "Vietnam / United States",
    image: "/images/team/tini.jpg",
    contribution:
      "Supports DTC's outreach and community engagement with young people and collaborators.",
  },
  {
    name: "Hisham Abdul Hafeez Jamali",
    role: "Publication Head",
    country: "UAE / Pakistan",
    image: "/images/team/image.png",
    contribution:
      "Leads DTC's publication pipeline, preparing research and policy outputs for release.",
  },
  {
    name: "Hunthavi Vipassana",
    role: "Deputy Head of Publications",
    country: "India",
    image: "/images/team/hunthavi.svg",
    contribution:
      "Works with Hisham leading the publications and outputs of the organization.",
  },
];

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.07 * index }}
      className="flex flex-col gap-2"
    >
      <div className="relative aspect-square rounded-xl bg-muted overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-bold text-foreground leading-snug lg:text-[13px] xl:text-sm">
          {member.name}
        </h3>
        <p className="text-[11px] font-medium text-muted-foreground leading-snug lg:text-[10px] xl:text-[11px]">
          {member.role}
        </p>
        <p className="text-[10px] text-muted-foreground/70 lg:text-[9px] xl:text-[10px]">
          {member.country}
        </p>
        <p className="mt-1.5 text-[11px] text-muted-foreground leading-relaxed line-clamp-3 lg:text-[10px] xl:text-[11px]">
          {member.contribution}
        </p>
      </div>
    </motion.div>
  );
}

export default function About7() {
  return (
    <section className="w-full py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-background overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3 max-w-2xl mb-12 sm:mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)]">
            Leadership team
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-tight">
            The people <Highlight>leading the work.</Highlight>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            A globally distributed leadership team building the lab in 2026,
            on top of the Dynamic Teen Coalition&apos;s work at the UN since 2022.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-3">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
