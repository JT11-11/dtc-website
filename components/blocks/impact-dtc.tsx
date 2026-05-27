"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  );
}

export function ImpactDtc() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="impact" className="bg-background py-24 lg:py-32">
      <div className="px-6 sm:px-12 lg:px-24 max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
        <div ref={headerRef} className="flex items-center justify-between mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium tracking-tight text-foreground">
            Our Global Impact
          </h2>
          <Link
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium transition-opacity hover:opacity-80"
          >
            Partner with us
          </Link>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:grid-rows-[minmax(220px,auto)_minmax(220px,auto)_minmax(180px,auto)]">
          <div className="row-span-2 flex flex-col gap-4">
            <div className="relative flex-1 w-full overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop"
                alt="Research data analysis"
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative flex-1 w-full overflow-hidden rounded-full">
              <Image
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop"
                alt="Collaborative meeting"
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-2 row-span-2 bg-muted/50 rounded-2xl p-8 flex flex-col">
            <div>
              <QuoteIcon className="w-10 h-10 text-foreground/20 mb-6" />
              <blockquote className="text-2xl lg:text-3xl font-medium leading-snug text-foreground">
                DTC&apos;s research helped us understand the global landscape for teen digital rights, directly informing our policy advocacy.
              </blockquote>
              <div className="mt-6">
                <p className="font-semibold text-foreground">Partner Organization</p>
                <p className="text-sm text-foreground/60">Digital Rights Advocate</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-auto pt-8">
              <span className="text-xl font-semibold text-foreground">Impact Report</span>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              >
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-muted/50 rounded-2xl p-6 flex flex-col">
            <div className="flex-1">
              <p className="text-3xl font-semibold text-foreground">40+</p>
              <p className="text-sm text-foreground/60 mt-1">Countries monitored</p>
            </div>
            <div className="flex items-center justify-between mt-auto pt-4">
              <span className="text-sm font-medium text-foreground">Global Reach</span>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              >
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-muted/50 rounded-2xl p-6 flex flex-col">
            <div className="flex-1">
              <p className="text-3xl font-semibold text-foreground">12</p>
              <p className="text-sm text-foreground/60 mt-1">Studies published or under peer review</p>
            </div>
            <div className="flex items-center justify-between mt-auto pt-4">
              <span className="text-sm font-medium text-foreground">Research Output</span>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              >
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-muted/50 rounded-2xl p-8 flex flex-col">
            <div className="flex-1">
              <p className="text-3xl lg:text-4xl font-semibold text-foreground">100%</p>
              <p className="text-foreground/60 mt-2">
                Teen-Led
              </p>
            </div>
            <div className="mt-auto pt-6">
              <p className="text-sm font-medium text-foreground">By youth, for youth</p>
            </div>
          </div>

          <div className="lg:col-span-3 bg-muted/50 rounded-2xl p-8 flex flex-col">
            <p className="text-xl lg:text-2xl font-medium leading-relaxed text-foreground max-w-3xl flex-1">
              Our database informs policymakers and digital rights advocates across 3 continents, ensuring policies reflect the actual experiences of youth.
            </p>
            <div className="flex items-center justify-between mt-auto pt-6">
              <span className="text-xl font-semibold text-foreground">Learn More</span>
              <Link
                href="#research"
                className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              >
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
