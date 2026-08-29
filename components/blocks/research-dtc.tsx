"use client";

/* eslint-disable */

import { useEffect, useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const updateWidth = () => ref.current && setWidth(ref.current.offsetWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);
  return width;
}

function VelocityText({ children, baseVelocity = 100, className = "" }: { children: React.ReactNode; baseVelocity?: number; className?: string }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);

  const wrap = (min: number, max: number, v: number) => {
    const range = max - min;
    return ((((v - min) % range) + range) % range) + min;
  };

  const x = useTransform(baseX, (v) => (copyWidth === 0 ? "0px" : `${wrap(-copyWidth, 0, v)}px`));
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="relative overflow-hidden w-full">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {Array.from({ length: 6 }, (_, i) => (
          <span className={`shrink-0 ${className}`} key={i} ref={i === 0 ? copyRef : null}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

interface Project {
  id: string;
  titleUp: string;
  titleDown: string;
  description: string;
}

const projects: Project[] = [
  {
    id: "1",
    titleUp: "Social Media Restrictions &",
    titleDown: "Marginalized Youth Isolation",
    description: "Examining how blanket platform restrictions affect the teenagers who depend on these spaces most",
  },
  {
    id: "2",
    titleUp: "Global Teen",
    titleDown: "Restriction Database",
    description: "Mapping internet censorship targeting minors across 40+ countries",
  },
  {
    id: "3",
    titleUp: "Youth Access Barriers in",
    titleDown: "Global Governance",
    description: "Documenting structural barriers preventing youth participation in international governance",
  },
  {
    id: "4",
    titleUp: "ADCI Restriction",
    titleDown: "Audit",
    description: "Interactive globe-view tool mapping restriction data across jurisdictions",
  },
  {
    id: "5",
    titleUp: "Digital Trade",
    titleDown: "Hack 2026",
    description: "Award-winning prototype applying digital-governance research to regtech challenges",
  },
];

function ProjectItem({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const title = titleRef.current, desc = descRef.current;
    gsap.set(title, { y: 60, opacity: 0 });
    gsap.set(desc, { y: 40, opacity: 0 });

    const textTl = gsap.timeline({
      scrollTrigger: { trigger: containerRef.current, start: "top 50%", toggleActions: "play none none reverse" },
    });
    textTl.to(title, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .to(desc, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6");

    return () => textTl.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      className="border-t border-border py-12 first:border-t-0 md:py-16"
    >
      <div className="mx-auto max-w-360 px-6 sm:px-12 lg:px-24 2xl:max-w-450 3xl:max-w-550">
        <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between md:gap-16">
          <div className="flex flex-col md:w-2/5">
            <h3 ref={titleRef} className="text-[clamp(2.5rem,6vw,6rem)] font-bold leading-[1.05] tracking-tight text-foreground mb-8">
              <span className="block">{project.titleUp}</span>
              <span className="block font-serif italic font-normal">{project.titleDown}</span>
            </h3>
            <p ref={descRef} className="text-muted-foreground text-xl leading-relaxed md:w-3/5">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResearchDtc() {
  return (
    <section id="research" className="projects bg-background relative py-24">
      <div className="pb-16">
        <VelocityText baseVelocity={80} className="text-[clamp(4rem,12vw,14rem)] font-bold tracking-tight text-foreground uppercase px-8">
          Research <span className="font-serif italic font-normal">& Policy</span>&nbsp;
        </VelocityText>
      </div>
      <div className="flex flex-col">
        {projects.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
