"use client";

import { motion } from "motion/react";

const socials = [
  {
    key: "x",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    key: "ig",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "yt",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 0 0 .5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 0 0 2.1 2.1C4.5 20 12 20 12 20s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.5.5-5.5s0-3.6-.5-5.5zM9.6 15.6V8.4l6.4 3.6z" />
      </svg>
    ),
  },
  {
    key: "li",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zm7 0h3.8v1.7h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.78 2.66 4.78 6.12V21h-4v-5.5c0-1.3-.02-3-1.83-3s-2.11 1.43-2.11 2.9V21h-4z" />
      </svg>
    ),
  },
];

const cols = [
  {
    title: "Research",
    links: ["Global Restriction Database", "Peer-Reviewed Studies", "Governance Frameworks"],
  },
  {
    title: "Engagement",
    links: ["ECOSOC", "HLPF", "UN Major Group for Children & Youth"],
  },
  {
    title: "Organisation",
    links: [
      { label: "About DTC" },
      { label: "Join the Lab", badge: "we're hiring" },
    ],
  },
] as const;

export default function Footer8() {
  return (
    <footer className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 overflow-hidden bg-white dark:bg-black">
      <div className="relative max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            <p className="text-sm sm:text-base text-neutral-900 dark:text-white leading-relaxed max-w-xs">
              A premier, fully teen-led research organization dedicated to digital rights and the formal governance of AI and social media.
            </p>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href="#"
                  className="w-9 h-9 rounded-md border border-neutral-300 dark:border-white/30 text-neutral-700 dark:text-white/80 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {cols.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 + ci * 0.05 }}
              className="flex flex-col gap-2 lg:border-t lg:border-neutral-200 dark:lg:border-white/15 lg:pt-5"
            >
              <h4 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-1">
                {col.links.map((link) => {
                  const label = typeof link === "string" ? link : link.label;
                  const badge =
                    typeof link === "string" || !("badge" in link)
                      ? undefined
                      : link.badge;
                  return (
                    <li key={label} className="flex items-center gap-2">
                      <a
                        href="#"
                        className="text-sm sm:text-base text-neutral-700 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      >
                        {label}
                      </a>
                      {badge && (
                        <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-white/80 text-[10px] tracking-wide uppercase">
                          {badge}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>

        <div
          className="relative mt-20 w-full"
          aria-hidden="true"
          style={{
            fontSize: "min(14.2vw, 210px)",
            height: "0.74em",
            maskImage: "linear-gradient(to bottom, #000 50%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 50%, transparent 95%)",
          }}
        >
          <div
            className="absolute inset-0 flex justify-center font-bold uppercase leading-none whitespace-nowrap text-white dark:hidden"
            style={{
              fontSize: "inherit",
              letterSpacing: "0.15em",
              paddingLeft: "0.15em",
              textShadow:
                "0 -1.5px 0 rgba(115,115,115,0.7), 1.5px 0 0 rgba(115,115,115,0.7), 0 1.5px 0 rgba(115,115,115,0.7), -1.5px 0 0 rgba(115,115,115,0.7), 1px 1px 0 rgba(115,115,115,0.7), -1px -1px 0 rgba(115,115,115,0.7), 1px -1px 0 rgba(115,115,115,0.7), -1px 1px 0 rgba(115,115,115,0.7)",
            }}
          >
            DTC Policy Lab
          </div>
          <div
            className="absolute inset-0 hidden dark:flex justify-center font-bold uppercase leading-none whitespace-nowrap text-black"
            style={{
              fontSize: "inherit",
              letterSpacing: "0.15em",
              paddingLeft: "0.15em",
              textShadow:
                "0 -1.5px 0 rgba(163,163,163,0.55), 1.5px 0 0 rgba(163,163,163,0.55), 0 1.5px 0 rgba(163,163,163,0.55), -1.5px 0 0 rgba(163,163,163,0.55), 1px 1px 0 rgba(163,163,163,0.55), -1px -1px 0 rgba(163,163,163,0.55), 1px -1px 0 rgba(163,163,163,0.55), -1px 1px 0 rgba(163,163,163,0.55)",
            }}
          >
            DTC
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-neutral-500 dark:text-white/60">
          <p>© 2026 DTC Policy Lab / Teen-led. Research-driven. Impossible to ignore.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Security
            </a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Terms of service
            </a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Privacy policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
