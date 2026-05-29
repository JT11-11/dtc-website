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
  cta?: { label: string; href: string };
}

const workItems: WorkItem[] = [
  {
    id: "lgbtq-isolation",
    number: "01",
    title: "Social Media Restrictions &",
    titleItalic: "LGBTQ+ Youth Isolation",
    type: "Empirical Pilot Study",
    status: "Under peer review — The Social Science Journal, Taylor & Francis",
    summary:
      "The first systematic study linking social media age-restriction policies to documented increases in isolation among LGBTQ+ youth populations. Drawing on survey data and qualitative interviews across multiple countries, we establish a statistically significant relationship between platform access restrictions and self-reported loss of community, support networks, and identity resources among queer teenagers.",
    whyItMatters:
      "Policymakers enacting social media bans have consistently cited child safety — but our data shows those bans fall hardest on the teenagers most dependent on online spaces for their safety. For LGBTQ+ youth in hostile households or conservative communities, restricting social media doesn't protect them. It removes their only safe social infrastructure. This study puts evidence behind a claim advocates have been making for years.",
  },
  {
    id: "restriction-database",
    number: "02",
    title: "The Global Teen",
    titleItalic: "Restriction Database",
    type: "Systematic Database",
    status: "Active — ongoing data collection and updates",
    summary:
      "The world's first systematic map of age-based internet restrictions. The database documents every formal legislative instrument, executive order, and platform policy that restricts minors' access to social media, messaging platforms, or general internet services across 40+ countries — including the type of restriction, legal basis, enforcement mechanisms, and reported implementation outcomes.",
    whyItMatters:
      "Before this project, no comprehensive picture of the global restriction landscape existed. Policymakers in one country had no systematic way to learn from outcomes in another. Advocates lacked the evidentiary base to challenge restrictions in court or in policy rooms. We built the map that should have existed before anyone started legislating.",
  },
  {
    id: "un-ageism-audit",
    number: "03",
    title: "UN Website",
    titleItalic: "Ageism Audit",
    type: "Institutional Audit",
    status: "Completed",
    summary:
      "A systematic audit examining how youth are framed across UN agency websites — whether young people appear as subjects of policy (things to be managed) or as agents (participants who shape decisions). We also assessed whether the websites themselves were navigable and accessible for young people seeking to engage with UN processes, including language complexity, navigation structure, and availability of entry-point information.",
    whyItMatters:
      "Institutions that claim to include youth but design their public-facing presence to exclude them are performing participation, not practicing it. This audit produced a concrete, citable record of that gap — and a baseline against which future improvements can be measured.",
  },
  {
    id: "opportunity-mapping",
    number: "04",
    title: "Youth Access Barriers in",
    titleItalic: "Global Governance",
    type: "Opportunity-Mapping Database",
    status: "Active — Phase 2 in progress",
    summary:
      "A database mapping the structural barriers youth face when attempting to participate in major international governance processes — the UN system, the ITU, the WTO, regional bodies, and others. We document accreditation requirements, age restrictions, language barriers, financial barriers (travel costs, registration fees), and the structural design choices that effectively exclude young people from the rooms where decisions get made.",
    whyItMatters:
      "Youth participation is only as real as the actual mechanisms that enable it. This database turns vague claims about 'youth inclusion' into auditable, specific claims about access — and identifies which processes have the lowest and highest barriers to meaningful engagement.",
  },
  {
    id: "twisted-pair",
    number: "05",
    title: "Twisted Pair",
    titleItalic: "Legitimacy Theorem",
    type: "Formal Governance Framework",
    status: "Published — DTC Working Paper",
    summary:
      "A formal governance framework establishing that institutional legitimacy requires two mutually reinforcing sources — procedural legitimacy (the process was followed correctly) and representational legitimacy (the affected stakeholders were genuinely included). The theorem proves that either source alone is insufficient: an institution that follows correct procedure but excludes affected parties is not legitimate, and an institution with broad participation but no procedural integrity is not legitimate either. Both conditions must be met, and they reinforce each other.",
    whyItMatters:
      "Most arguments for youth inclusion in policy rest on normative or rhetorical grounds. This theorem provides a formal structure for that argument — one that can be cited in governance reform proposals, applied to specific institutional critiques, and tested against concrete cases. It's the theoretical foundation for much of DTC's policy advocacy.",
  },
  {
    id: "lemma-c",
    number: "06",
    title: "Lemma C:",
    titleItalic: "Ghost Authority",
    type: "Formal Governance Framework",
    status: "Published — DTC Working Paper",
    summary:
      "A formal derivation from the Twisted Pair Legitimacy Theorem establishing that institutions which claim authority over a population without genuine inclusion of that population's stakeholders become 'ghost authorities' — structurally present and procedurally active, but substantively illegitimate. Ghost authorities can enact rules, enforce compliance, and produce outputs, but they do so without the foundational condition that makes governance binding rather than merely coercive.",
    whyItMatters:
      "This framework gives precise language to a problem that advocates have described only loosely. When a government bans social media for teenagers without consulting teenagers, it isn't just bad practice — Lemma C establishes it as a formal exercise of ghost authority. That distinction matters for how legal challenges, reform proposals, and advocacy strategies are framed.",
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
              <span className="inline-block rounded-full border border-background/20 px-4 py-1 text-xs font-medium uppercase tracking-widest text-background/60">
                {item.type}
              </span>
              <span className="inline-block rounded-full bg-background/10 px-4 py-1 text-xs font-medium text-background/60">
                {item.status}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[1.0] tracking-tight text-background mb-12">
              <span className="block">{item.title}</span>
              <span className="block font-serif italic">{item.titleItalic}</span>
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
            <span className="text-[clamp(1.25rem,3.5vw,3rem)] font-light tracking-tight text-foreground leading-tight">
              {item.title}{" "}
              <span className="font-serif italic">{item.titleItalic}</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
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
            <span className="text-[clamp(1.25rem,3.5vw,3rem)] font-light tracking-tight text-background leading-tight">
              {item.title}{" "}
              <span className="font-serif italic">{item.titleItalic}</span>
            </span>
          </div>
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

      {/* Instruction note */}
      <div className="px-6 sm:px-8 lg:px-12 py-8 max-w-[1400px] mx-auto">
        <p className="text-sm text-muted-foreground">
          Click any entry to read the full research summary and why it matters.
        </p>
      </div>

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
