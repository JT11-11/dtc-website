"use client";

/* eslint-disable */

import { useState, useCallback, useEffect, useRef } from "react";
import { useOverlay } from "@/lib/overlay-context";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WorkItem {
  id: string;
  number: string;
  title: string;
  titleItalic: string;
  type: string;
  status: string;
  summary: string;
  whyItMatters: string;
  workInProgress?: boolean;
  cta?: { label: string; href: string };
}

const workItems: WorkItem[] = [
  {
    id: "marginalized-youth-isolation",
    number: "01",
    title: "Social Media Restrictions &",
    titleItalic: "Marginalized Youth Isolation",
    type: "Empirical Pilot Study",
    status: "Under peer review · Taylor & Francis (Social Sciences)",
    summary:
      "A study of how blanket, age-based platform restrictions affect marginalised youth. Using survey data and qualitative interviews, it examines how restrictions limit access to community, support networks, and identity resources for young people who depend on these spaces.",
    whyItMatters:
      "Policymakers often cite child safety when introducing social-media bans. Our data examines how those bans fall on teenagers who rely on online spaces for safety, community, and information. For marginalised youth in hostile households or conservative communities, restricting social media can remove their only safe social infrastructure.",
  },
  {
    id: "restriction-database",
    number: "02",
    title: "The Global Teen",
    titleItalic: "Restriction Database",
    type: "Systematic Database",
    status: "Active · ongoing data collection and updates",
    summary:
      "A systematic map of age-based internet restrictions. The database documents formal legislative instruments, executive orders, and platform policies restricting minors' access to social media, messaging platforms, or general internet services across 40+ countries, including restriction type, legal basis, enforcement, and reported outcomes.",
    whyItMatters:
      "Policymakers in one country often have no systematic way to learn from outcomes in another. Advocates need evidence to challenge restrictions in court or in policy rooms. This database makes the record easier to find and compare.",
  },
  {
    id: "un-ageism-audit",
    number: "03",
    title: "UN Website",
    titleItalic: "Ageism Audit",
    type: "Institutional Audit",
    status: "Completed",
    summary:
      "A systematic audit of how UN agency websites frame youth: as policy subjects or participants in decisions. We also assessed whether young people can navigate the sites and find a way into UN processes, including language complexity, navigation, and entry-point information.",
    whyItMatters:
      "An institution can claim to include youth while making participation hard to find. This audit provides a citable record of that gap and a baseline for measuring improvement.",
  },
  {
    id: "opportunity-mapping",
    number: "04",
    title: "Youth Access Barriers in",
    titleItalic: "Global Governance",
    type: "Opportunity-Mapping Database",
    status: "Active · Phase 2 in progress",
    summary:
      "A database mapping the barriers young people face when trying to participate in major international governance processes, including the UN system, ITU, WTO, and regional bodies. We document accreditation requirements, age restrictions, language barriers, travel costs, registration fees, and other design choices that keep young people out of decision-making rooms.",
    whyItMatters:
      "Participation depends on the mechanisms that make it possible. This database turns broad claims about youth inclusion into auditable claims about access and shows which processes have the highest and lowest barriers.",
  },
  {
    id: "adci-audit",
    number: "05",
    title: "ADCI Restriction",
    titleItalic: "Audit",
    type: "Community Tool",
    status: "Live · by Aditya",
    summary:
      "An interactive globe tool for exploring ADCI restriction data, built by Executive Director Aditya using DTC's open dataset.",
    whyItMatters:
      "The ADCI Audit shows how DTC's restriction dataset can support independent researchers and builders working on accountability tools.",
    cta: { label: "Open the Audit", href: "https://adciaudit.base44.app/GlobeView" },
  },
  {
    id: "digital-trade-hack-2026",
    number: "06",
    title: "Digital Trade",
    titleItalic: "Hack 2026",
    type: "Hackathon Entry · KMITL",
    status: "Completed · 2026",
    summary:
      "DTC's entry to the Digital Trade Hack 2026 at King Mongkut's Institute of Technology Ladkrabang (KMITL): a working prototype that applies DTC's digital-governance research to a regtech challenge, with a YouTube demo and project documentation.",
    whyItMatters:
      "The Digital Trade Hack took DTC's policy research to engineering and regulatory-technology audiences through a working prototype.",
    cta: { label: "Watch Demo", href: "https://www.youtube.com/watch?v=7NsyYwT0-E4" },
  },
  {
    id: "tfgbv-article",
    number: "07",
    title: "Technology-Facilitated",
    titleItalic: "Gender-Based Violence",
    type: "Op-Ed",
    status: "Work in progress",
    workInProgress: true,
    summary:
      "An op-ed on Technology-Facilitated Gender-Based Violence (TFGBV) and its policy dimensions. It's in development.",
    whyItMatters:
      "Platform-enabled gender-based violence is a rapidly escalating harm in digital policy. DTC's article brings youth-researcher analysis to a field where most published work comes from outside the generation most affected.",
  },
  {
    id: "tfgbv-4p-commentary",
    number: "08",
    title: "TFGBV",
    titleItalic: "4P Commentary",
    type: "Commentary",
    status: "Completed",
    summary:
      "A commentary applying the 4P framework to Technology-Facilitated Gender-Based Violence (TFGBV), asking how it maps to platform-mediated harm and where it needs adapting for the digital context.",
    whyItMatters:
      "Policy frameworks often travel faster than the evidence base. This commentary maps a standard tool to a newer harm type and flags structural gaps that may require a new framework.",
    cta: {
      label: "Read the Commentary",
      href: "https://docs.google.com/document/d/1hXdePXGfxR-1x1_eRtlfgBHP_tDF2hA_V2DDEkJ7PJg/edit?usp=sharing",
    },
  },
  {
    id: "social-media-policy-paper",
    number: "09",
    title: "The Case for Statutory Regulation as the",
    titleItalic: "Preferred Governance Model for Social Media Platforms",
    type: "Policy Paper · Preprint",
    status: "Preprint · Under review at Taylor & Francis (Social Sciences)",
    summary:
      "A 10-page preprint by Hisham Jamali, Hunthavi Vipassana, and Tejas Karusala, posted on SSRN on August 7, 2026 and written July 28, 2026. It argues for statutory regulation as the preferred model for governing social-media platforms: one that fits a free market, prevents unlawful censorship, and provides a unified framework. Keywords: Social Media, Internet Policy, Digital Governance, Statutory Regulation.",
    whyItMatters:
      "The paper recommends strong roles for intergovernmental institutions and international law, an international court of arbitration, and a digital-rights statutory court for disputes among users, platforms, and governments. It condemns blanket social-media bans and extremely strong regulation while proposing principles for policy design.",
    cta: { label: "Read the Preprint", href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7198900" },
  },
  {
    id: "icc-prosecutorial-patterns",
    number: "10",
    title: "Prosecutorial Patterns at the ICC:",
    titleItalic: "Trigger Mechanisms, Geography, and Case Outcomes",
    type: "Research Paper",
    status: "Completed · SSRN preprint",
    summary:
      "A 23-page study by Aditya Majumdar, posted on SSRN on August 15, 2026 and written August 12, 2026. It analyses all 75 defendant proceedings involving 74 people indicted by the International Criminal Court between 2005 and 2026, covering geography, trigger mechanisms, alleged crimes, and outcomes. It uses web-scraped data cross-verified with official court records to examine African cases and accusations of anti-African bias. Keywords: International Law, International Criminal Court, Selective Justice, Geopolitics, African Bias in ICC.",
    whyItMatters:
      "The study finds that 78.7% of proceedings originate from African states; the largest number of African cases were initiated through state referrals, tied with UN Security Council referrals. A chi-square analysis finds a statistically significant relationship between how a case reaches the ICC and its outcome (χ² = 38.42, p < 0.001, Cramer's V = 0.41). It also finds that 40% of defendants remain at large, rising to 87.5% for non-African cases.",
    cta: { label: "Read the Paper", href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7274078" },
  },
];

function WorkOverlay({
  item,
  onClose,
}: {
  item: WorkItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = item ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) =>
      e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] bg-foreground overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="min-h-full px-6 sm:px-12 lg:px-24 py-24 max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="fixed top-6 right-6 sm:top-10 sm:right-10 flex h-12 w-12 items-center justify-center rounded-full bg-background/10 text-background backdrop-blur-sm transition-all hover:bg-background/20 hover:scale-110 active:scale-95"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Type + status */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              {item.workInProgress ? (
                <span className="inline-block rounded-full border border-background/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-background/60">
                  Work in Progress
                </span>
              ) : (
                <>
                  <span className="inline-block rounded-full border border-background/20 px-4 py-1 text-xs font-medium uppercase tracking-widest text-background/60">
                    {item.type}
                  </span>
                  <span className="inline-block rounded-full bg-background/10 px-4 py-1 text-xs font-medium text-background/60">
                    {item.status}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.0] tracking-tight text-background mb-12">
              <span className="block">{item.title}</span>
              <span className="block font-serif italic font-normal">{item.titleItalic}</span>
            </h2>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h3 className="text-xs font-medium uppercase tracking-widest text-background/40 mb-4">
                  Summary
                </h3>
                <p className="text-background/80 text-lg leading-relaxed">
                  {item.summary}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-medium uppercase tracking-widest text-background/40 mb-4">
                  Why It Matters
                </h3>
                <p className="text-background/80 text-lg leading-relaxed">
                  {item.whyItMatters}
                </p>
                {item.cta && (
                  <a
                    href={item.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-background text-foreground text-sm font-medium hover:bg-background/80 transition-colors"
                  >
                    {item.cta.label}
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 17L17 7M17 7H7M17 7V17"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WorkItemRow({
  item,
  onClick,
}: {
  item: WorkItem;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            end: "top 70%",
            scrub: 1,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): "top" | "bottom" => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist =
      Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || !overlayRef.current || !overlayInnerRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );
    gsap.timeline({ defaults: { duration: 0.6, ease: "expo" } })
      .set(overlayRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(overlayInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
      .to([overlayRef.current, overlayInnerRef.current], { y: "0%" }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || !overlayRef.current || !overlayInnerRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );
    gsap.timeline({ defaults: { duration: 0.6, ease: "expo" } })
      .to(overlayRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(overlayInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);
  };

  return (
    <div ref={ref} className="relative overflow-hidden border-t border-foreground/10">
      <button
        className="w-full flex items-start sm:items-center justify-between gap-6 cursor-pointer px-6 py-8 sm:px-12 md:py-10 lg:px-24 text-left"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        <div className="flex items-start sm:items-center gap-6 sm:gap-10 flex-1 min-w-0">
          <span className="shrink-0 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {item.number}
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 min-w-0">
            <span className="text-[clamp(1.25rem,3.5vw,3rem)] font-bold tracking-tight text-foreground leading-tight">
              {item.title}{" "}
              <span className="font-serif italic font-normal">{item.titleItalic}</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          {item.workInProgress ? (
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Work in Progress
            </span>
          ) : (
            <>
              <span className="hidden sm:block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {item.type}
              </span>
              <svg
                className="w-6 h-6 text-foreground/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 17L17 7M17 7H7M17 7V17"
                />
              </svg>
            </>
          )}
        </div>
      </button>

      {/* Hover overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 overflow-hidden pointer-events-none bg-foreground"
        style={{ transform: "translateY(101%)" }}
      >
        <div
          ref={overlayInnerRef}
          className="flex items-start sm:items-center justify-between h-full gap-6 px-6 sm:px-12 lg:px-24 py-8 md:py-0"
          style={{ transform: "translateY(-101%)" }}
        >
          <div className="flex items-start sm:items-center gap-6 sm:gap-10 flex-1 min-w-0">
            <span className="shrink-0 text-sm font-medium uppercase tracking-widest text-background/40">
              {item.number}
            </span>
            <span className="text-[clamp(1.25rem,3.5vw,3rem)] font-bold tracking-tight text-background leading-tight">
              {item.title}{" "}
              <span className="font-serif italic font-normal">{item.titleItalic}</span>
            </span>
          </div>
          {item.workInProgress ? (
            <span className="shrink-0 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-background/50">
              Work in Progress
            </span>
          ) : (
            <svg
              className="w-8 h-8 md:w-12 md:h-12 shrink-0 text-background"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

export function WorkDtc() {
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const { setIsOverlayOpen } = useOverlay();

  const handleOpen = useCallback(
    (item: WorkItem) => {
      setSelectedItem(item);
      setIsOverlayOpen(true);
    },
    [setIsOverlayOpen]
  );

  const handleClose = useCallback(() => {
    setSelectedItem(null);
    setIsOverlayOpen(false);
  }, [setIsOverlayOpen]);

  return (
    <section id="work" className="bg-background relative">
      <WorkOverlay item={selectedItem} onClose={handleClose} />

      {/* Work items list */}
      <div className="w-full border-t border-foreground/10">
        {workItems.map((item) => (
          <WorkItemRow
            key={item.id}
            item={item}
            onClick={() => handleOpen(item)}
          />
        ))}
        <div className="border-t border-foreground/10" />
      </div>
    </section>
  );
}
