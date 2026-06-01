"use client";

/* eslint-disable */

import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { useOverlay } from "@/lib/overlay-context";
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
  AnimatePresence,
} from "motion/react";
import { WaterRipple } from "@/components/water-ripple";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function BlobCursor({ isVisible }: { isVisible: boolean }) {
  const blobRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 400, mass: 0.2 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 400, mass: 0.2 });
  const velocityX = useVelocity(smoothX);
  const velocityY = useVelocity(smoothY);

  const speed = useTransform(() => Math.sqrt(velocityX.get() ** 2 + velocityY.get() ** 2));
  const scaleAlongMotion = useTransform(speed, [0, 800, 2000], [1, 1.3, 1.6]);
  const scalePerp = useTransform(speed, [0, 800, 2000], [1, 0.8, 0.65]);
  const rotate = useTransform(() => Math.atan2(velocityY.get(), velocityX.get()) * (180 / Math.PI));

  useEffect(() => {
    let rafId: number | null = null;
    let lastX = 0, lastY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          mouseX.set(lastX);
          mouseY.set(lastY);
          rafId = null;
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={blobRef}
      className="pointer-events-none fixed z-50 flex items-center justify-center"
      style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.3, ease: "easeOut" }, scale: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } }}
    >
      <motion.div style={{ rotate }}>
        <motion.div
          className="flex h-20 w-20 items-center justify-center rounded-full bg-foreground"
          style={{ scaleX: scaleAlongMotion, scaleY: scalePerp }}
        >
          <motion.span
            className="text-sm font-medium uppercase tracking-wide text-background"
            style={{
              rotate: useTransform(rotate, (r) => -r),
              scaleX: useTransform(scaleAlongMotion, (s) => 1 / s),
              scaleY: useTransform(scalePerp, (s) => 1 / s),
            }}
          >
            Open
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
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
  image: string;
  description: string;
}

const projects: Project[] = [
  { id: "1", titleUp: "Global Teen", titleDown: "Restriction Database", image: "/images/un/hlpf.jpg", description: "Mapping internet censorship targeting minors across 40+ countries" },
  { id: "2", titleUp: "LGBTQ+ Youth", titleDown: "Online Safety", image: "/images/un/official-meeting.jpg", description: "Examining digital spaces and platform policies for queer teens" },
  { id: "3", titleUp: "Platform Governance", titleDown: "& Youth Rights", image: "/images/un/ga-hall.jpg", description: "How Big Tech shapes the digital rights of the next generation" },
];

function ProjectOverlay({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const isComingSoon = project?.id === "2";

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="fixed inset-0 z-[100]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.image} alt={`${project.titleUp} ${project.titleDown}`} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            {isComingSoon && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-center"
                >
                  <p className="text-white text-xl sm:text-2xl md:text-3xl font-light">Coming Soon</p>
                </motion.div>
              </div>
            )}
          </motion.div>
          <motion.div
            className="absolute left-4 top-4 z-10 sm:left-6 sm:top-6 md:left-12 md:top-12 lg:left-16 lg:top-16"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-[clamp(2rem,8vw,6rem)] font-medium leading-[0.95] tracking-tight text-white">
              <span className="block">{project.titleUp}</span>
              <span className="block font-serif italic">{project.titleDown}</span>
            </h2>
          </motion.div>
          <motion.div
            className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6 md:right-12 md:top-12 lg:right-16 lg:top-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <button
              onClick={onClose}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110 active:scale-95 md:h-14 md:w-14"
              aria-label="Close overlay"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectItem({ project, index, onHover, onClick }: { project: Project; index: number; onHover: (isHovering: boolean) => void; onClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [maskRadius, setMaskRadius] = useState(0);
  const isEven = index % 2 === 0;

  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);
  const scaleXTo = useRef<gsap.QuickToFunc | null>(null);
  const scaleYTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (!canvasWrapperRef.current) return;
    xTo.current = gsap.quickTo(canvasWrapperRef.current, "x", { duration: 0.8, ease: "power3.out" });
    yTo.current = gsap.quickTo(canvasWrapperRef.current, "y", { duration: 0.8, ease: "power3.out" });
    scaleXTo.current = gsap.quickTo(canvasWrapperRef.current, "scaleX", { duration: 0.6, ease: "power2.out" });
    scaleYTo.current = gsap.quickTo(canvasWrapperRef.current, "scaleY", { duration: 0.6, ease: "power2.out" });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imageContainerRef.current?.getBoundingClientRect();
    if (!rect || !xTo.current || !yTo.current) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    xTo.current(-x * 30);
    yTo.current(-y * 30);
  };

  const setImageScale = (value: number) => {
    scaleXTo.current?.(value);
    scaleYTo.current?.(value);
  };

  const handleMouseEnter = () => { onHover(true); setImageScale(1.22); };
  const handleMouseLeave = () => { onHover(false); xTo.current?.(0); yTo.current?.(0); setImageScale(1.15); };

  useEffect(() => {
    if (!containerRef.current) return;
    const title = titleRef.current, desc = descRef.current;
    gsap.set(title, { y: 60, opacity: 0 });
    gsap.set(desc, { y: 40, opacity: 0 });

    const maskTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "top -20%",
        scrub: 1.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => setMaskRadius(self.progress * 1200),
        onLeaveBack: () => setMaskRadius(0),
      },
    });
    maskTl.to({}, { duration: 1 });

    const textTl = gsap.timeline({
      scrollTrigger: { trigger: containerRef.current, start: "top 50%", toggleActions: "play none none reverse" },
    });
    textTl.to(title, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .to(desc, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6");

    return () => { maskTl.kill(); textTl.kill(); };
  }, []);

  return (
    <div
      ref={containerRef}
      className="group cursor-pointer py-16 md:py-24"
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="mx-auto max-w-360 px-6 sm:px-12 lg:px-24 2xl:max-w-450 3xl:max-w-550">
        <div className={`flex flex-col gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"} md:items-center md:gap-16`}>
          <div
            ref={imageContainerRef}
            className="relative aspect-4/3 w-full overflow-hidden rounded-full md:w-3/5"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={canvasWrapperRef}
              className="absolute inset-0 w-full h-full preserve-3d-scale"
            >
              <WaterRipple src={project.image} maskRadius={maskRadius} />
            </div>
          </div>
          <div className={`flex flex-col md:w-2/5 ${isEven ? "" : "md:text-right"}`}>
            <span className="text-base font-medium uppercase tracking-widest text-muted-foreground mb-6">0{index + 1}</span>
            <h3 ref={titleRef} className="text-[clamp(2.5rem,6vw,6rem)] leading-[1.05] tracking-tight text-foreground mb-8">
              <span className="font-medium">{project.titleUp}</span><br />
              <span className="font-serif italic">{project.titleDown}</span>
            </h3>
            <p ref={descRef} className={`text-muted-foreground text-xl leading-relaxed ${isEven ? "max-w-lg" : "max-w-lg md:ml-auto"}`}>
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResearchDtc() {
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { setIsOverlayOpen } = useOverlay();

  const handleProjectClick = (project: Project) => {
    setIsCursorVisible(false);
    setSelectedProject(project);
    setIsOverlayOpen(true);
  };

  const handleClose = () => {
    setSelectedProject(null);
    setIsOverlayOpen(false);
  };

  return (
    <section id="research" className="projects bg-background relative py-24">
      <BlobCursor isVisible={isCursorVisible} />
      <ProjectOverlay project={selectedProject} onClose={handleClose} />
      <div className="pb-16">
        <VelocityText baseVelocity={80} className="text-[clamp(4rem,12vw,14rem)] font-medium italic tracking-tight text-foreground uppercase px-8">
          Research <span className="font-serif font-thin">& Policy</span>&nbsp;
        </VelocityText>
      </div>
      <div className="flex flex-col">
        {projects.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} onHover={setIsCursorVisible} onClick={() => handleProjectClick(project)} />
        ))}
      </div>
    </section>
  );
}
