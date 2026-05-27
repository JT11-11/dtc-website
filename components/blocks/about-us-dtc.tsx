"use client";

import dynamic from "next/dynamic";
import { motion, useInView } from "motion/react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurHighlight from "@/components/react-bits/blur-highlight";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SilkWaves = dynamic(() => import("@/components/react-bits/silk-waves"), {
  ssr: false,
});

const timeline = [
  {
    year: "2022",
    title: "Born at the UN",
    description:
      "DTC was founded at the UN Internet Governance Forum in Addis Ababa, Ethiopia. We showed up without an invitation and stayed because the conversation needed us.",
  },
  {
    year: "2022",
    title: "Singapore HQ, Global Reach",
    description:
      "Headquartered in Singapore and fiscalised under Hack Club, a US-registered 501(c)(3). From day one, our researchers were based in a dozen countries.",
  },
  {
    year: "2023–24",
    title: "The Restriction Database",
    description:
      "We built the world's first systematic map of age-based internet restrictions — 40+ countries, every law, every platform, every policy instrument. Nothing like it existed before.",
  },
  {
    year: "2025",
    title: "We Left the IGF",
    description:
      "We left the UN Internet Governance Forum — not because we stopped caring, but because the forum stopped working. We're still UN-engaged through ECOSOC and HLPF, where accountability is higher.",
  },
];

const values = [
  {
    label: "Paid researchers",
    body:
      "We pay our high school researchers. Not stipends, not 'experience'. Actual compensation — because serious work deserves serious pay regardless of your age.",
  },
  {
    label: "Rigorous methods",
    body:
      "Our work is peer-reviewed, systematically documented, and built to hold up in policy rooms. We're not producing op-eds — we're building the evidentiary record.",
  },
  {
    label: "Unapologetically specific",
    body:
      "We study platform governance, AI, digital rights, and internet access from the lens of the people who depend on them most — which is not the same lens most policymakers use.",
  },
  {
    label: "UN-engaged, not UN-captured",
    body:
      "We engage with ECOSOC, HLPF, and other multilateral processes on our own terms. We bring evidence. We don't perform youth participation for institutional optics.",
  },
];

function StatCard({
  number,
  label,
  sub,
}: {
  number: string;
  label: string;
  sub?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-[clamp(3.5rem,10vw,8rem)] font-medium leading-none tracking-tight text-background">
        {number}
      </span>
      <span className="text-lg sm:text-xl font-medium text-background/80 max-w-xs">
        {label}
      </span>
      {sub && (
        <span className="text-sm text-background/50 max-w-xs">{sub}</span>
      )}
    </motion.div>
  );
}

function TimelineItem({
  year,
  title,
  description,
  index,
}: {
  year: string;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col sm:flex-row gap-4 sm:gap-12"
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="shrink-0 sm:w-28">
        <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {year}
        </span>
      </div>
      <div className="flex-1 pb-10 border-b border-foreground/10 last:border-0">
        <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function ValueCard({
  label,
  body,
  index,
}: {
  label: string;
  body: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-4 p-8 rounded-2xl bg-muted/40 border border-foreground/5"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        0{index + 1}
      </span>
      <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground">
        {label}
      </h3>
      <p className="text-muted-foreground leading-relaxed">{body}</p>
    </motion.div>
  );
}

export function AboutUsDtc() {
  const survivalRef = useRef<HTMLDivElement>(null);
  const survivalTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!survivalRef.current || !survivalTitleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        survivalTitleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: survivalRef.current,
            start: "top 70%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );
    }, survivalRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen overflow-hidden bg-neutral-950 flex flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0">
          <SilkWaves
            speed={0.5}
            scale={2}
            distortion={0.5}
            brightness={0.5}
            opacity={0.7}
            colors={[
              "#0a0a14",
              "#0f1a2e",
              "#12254a",
              "#153060",
              "#1a3d7a",
              "#1d4a93",
              "#2058aa",
              "#2466c0",
            ]}
            className="w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-transparent to-neutral-950/80 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-4xl">
          <motion.span
            className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/70 backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Founded 2022 · Singapore · Hack Club 501(c)(3)
          </motion.span>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] drop-shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Teen-led policy work.{" "}
            <em className="not-italic text-blue-300">Not youth-washing.</em>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-base sm:text-lg text-white/70 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
          >
            DTC Policy Lab is a fully teen-led research organisation that pays
            high school students to do the global digital policy work adults
            keep promising to include us in.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
          >
            <Link
              href="/work"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-blue-100 transition-colors"
            >
              See Our Research
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── ORIGIN STATEMENT ────────────────────────────────────── */}
      <section className="bg-background py-24 lg:py-40 px-6 sm:px-12 lg:px-24">
        <div className="max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
          <div className="max-w-4xl">
            <BlurHighlight
              highlightedBits={["0% meaningful youth input"]}
              highlightColor="oklch(0.205 0 0)"
              highlightClassName="bg-foreground/10 rounded-sm px-1"
              blurAmount={12}
              blurDuration={0.9}
              highlightDelay={0.8}
            >
              <p className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium leading-[1.3] tracking-tight text-foreground">
                In 2022, 42 countries had already passed social media
                restrictions on minors — with 0% meaningful youth input. The
                people writing those laws had never asked a single teenager what
                those platforms actually meant to them.
              </p>
            </BlurHighlight>
          </div>
          <p className="mt-10 max-w-2xl text-muted-foreground text-lg leading-relaxed">
            We call it the consultation gap. And we built DTC Policy Lab to
            close it — not with youth summits and advisory panels, but with
            peer-reviewed research, formal governance theory, and direct
            engagement with the multilateral processes that actually set the
            rules.
          </p>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────── */}
      <section className="bg-background py-16 lg:py-24 px-6 sm:px-12 lg:px-24 border-t border-foreground/10">
        <div className="max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-12">
            Our Story
          </h2>
          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <TimelineItem key={i} index={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULTATION GAP STATS ───────────────────────────────── */}
      <section className="bg-foreground py-24 lg:py-32 px-6 sm:px-12 lg:px-24">
        <div className="max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
          <h2 className="text-sm font-medium uppercase tracking-widest text-background/50 mb-16">
            The Consultation Gap
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 mb-16">
            <StatCard
              number="42"
              label="countries enacted social media bans on minors"
              sub="before DTC built the first systematic map of those restrictions"
            />
            <StatCard
              number="0%"
              label="meaningful youth input in those decisions"
              sub="the documented rate of substantive consultation across those policy processes"
            />
            <StatCard
              number="40+"
              label="countries now in our restriction database"
              sub="the world's first systematic map of age-based internet restrictions"
            />
          </div>
          <div className="max-w-3xl">
            <p className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium leading-[1.4] text-background/90">
              This isn&apos;t a niche policy debate. For LGBTQ+ youth who rely on
              online community as their only safe space, for low-income students
              who use social media to access jobs and school resources, for
              teenagers navigating mental health crises — these platforms are
              survival infrastructure. Banning them without consultation isn&apos;t
              just bad process. It&apos;s harmful.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY SOCIAL MEDIA IS DIFFERENT ───────────────────────── */}
      <section
        ref={survivalRef}
        className="bg-background py-24 lg:py-32 px-6 sm:px-12 lg:px-24"
      >
        <div className="max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
          <h2
            ref={survivalTitleRef}
            className="text-[clamp(2rem,5vw,4rem)] font-medium tracking-tight text-foreground leading-[1.1] mb-16 max-w-3xl"
          >
            Social media isn&apos;t entertainment.{" "}
            <span className="font-serif italic">It&apos;s infrastructure.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10 rounded-2xl overflow-hidden">
            {[
              {
                group: "LGBTQ+ Youth",
                body:
                  "For queer teenagers in hostile households or conservative communities, online spaces are often the only place to exist openly. Banning those platforms doesn't protect them — it isolates them.",
              },
              {
                group: "Low-Income Students",
                body:
                  "Social media is how students in under-resourced communities find scholarships, internships, tutoring, and social capital. Restricting access isn't neutral — it widens inequality.",
              },
              {
                group: "Youth in Crisis",
                body:
                  "Peer support, crisis resources, and mental health communities exist online. For teenagers who can't afford therapy or don't have adults to turn to, these communities are lifelines.",
              },
            ].map(({ group, body }) => (
              <div
                key={group}
                className="bg-background p-8 sm:p-10 flex flex-col gap-4"
              >
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {group}
                </span>
                <p className="text-foreground text-lg leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────── */}
      <section className="bg-background border-t border-foreground/10 py-24 lg:py-32 px-6 sm:px-12 lg:px-24">
        <div className="max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-16 gap-6">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground max-w-md">
              What makes us different
            </h2>
            <Link
              href="/work"
              className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity"
            >
              See the research
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <ValueCard key={v.label} index={i} {...v} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────────── */}
      <section className="bg-background border-t border-foreground/10 py-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <p className="text-[clamp(1.25rem,3vw,2rem)] font-medium tracking-tight text-foreground max-w-xl">
            If you want to support teen-led policy research — or if you{" "}
            <em className="not-italic text-muted-foreground">are</em> a
            teenager who wants to do this work — we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Contact Us
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-foreground/20 text-foreground text-sm font-medium hover:bg-muted transition-colors"
            >
              Our Research
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
