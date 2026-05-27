"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  country: string;
  image: string;
  bio: string;
  linkedin?: string;
}

const team: TeamMember[] = [
  {
    name: "Miriam T.",
    role: "Founder & Director",
    country: "Singapore",
    image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=600&q=80",
    bio: "Started DTC at the 2022 UN IGF in Addis Ababa after sitting through three youth panels where no teenager was actually consulted. Founded the lab to close the gap between policy rhetoric and youth voice. Now leads strategy, UN engagement, and research direction.",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Aiden K.",
    role: "Lead Researcher — Global Restriction Database",
    country: "Canada",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
    bio: "Built and maintains the world's first systematic map of age-based internet restrictions across 40+ countries. Developed the methodology for categorising legislative instruments, enforcement mechanisms, and implementation outcomes. Currently expanding to 60 countries.",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Sofía R.",
    role: "Policy Researcher — LGBTQ+ Youth & Digital Rights",
    country: "Mexico",
    image: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=600&q=80",
    bio: "Leads the pilot study on social media restrictions and LGBTQ+ youth isolation — currently under peer review at The Social Science Journal. Specialises in qualitative interview methodology and cross-border comparative policy analysis.",
    linkedin: "https://linkedin.com",
  },
  {
    name: "James O.",
    role: "Governance Frameworks",
    country: "Nigeria",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=600&q=80",
    bio: "Developed the Twisted Pair Legitimacy Theorem and Lemma C (Ghost Authority) — DTC's formal governance frameworks. Works at the intersection of political theory and computer science, building mathematical tools for evaluating institutional legitimacy in digital governance.",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Priya N.",
    role: "UN Engagement & Institutional Access",
    country: "India",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
    bio: "Manages DTC's relationships with ECOSOC, HLPF, and other multilateral processes. Led the UN Website Ageism Audit and the opportunity-mapping database project. Responsible for ensuring DTC's research reaches the rooms where decisions actually get made.",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Lena B.",
    role: "Research Associate",
    country: "Germany",
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=600&q=80",
    bio: "Contributes to the Global Teen Restriction Database and supports quantitative analysis across all active studies. Background in data science and comparative policy. Joined DTC to do research that matters — not for the résumé line, but for the policy outcome.",
    linkedin: "https://linkedin.com",
  },
];

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.07 * index }}
        className="flex flex-col gap-3 cursor-pointer group"
        onClick={() => setExpanded(true)}
      >
        <div className="relative aspect-square rounded-2xl bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Hover hint */}
          <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/30 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-xs font-semibold uppercase tracking-widest bg-neutral-900/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
              Read bio
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white leading-snug">
            {member.name}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-snug">
            {member.role}
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-0.5">
            {member.country}
          </p>
        </div>
      </motion.div>

      {/* Expanded bio overlay */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setExpanded(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" />

            {/* Card */}
            <motion.div
              className="relative z-10 w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-2xl flex flex-col gap-6"
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 10, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setExpanded(false)}
                className="absolute top-5 right-5 flex items-center justify-center h-8 w-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-16 w-16 rounded-2xl object-cover shrink-0"
                />
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {member.role}
                  </p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-0.5">
                    {member.country}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                {member.bio}
              </p>

              {/* LinkedIn */}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-xl bg-[#0A66C2] text-white text-sm font-semibold hover:bg-[#0958a8] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-1.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
            Every researcher at DTC is paid for their work. Click any card to read their bio.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
