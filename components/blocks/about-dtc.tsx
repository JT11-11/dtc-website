"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutDtc() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            end: "top 70%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="mission" className="bg-background pb-24 lg:pb-32">
      <div className="px-6 sm:px-12 lg:px-24 flex flex-col items-center max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
        <div ref={imageRef} className="relative aspect-21/9 lg:aspect-3/1 w-full overflow-hidden rounded-full mb-16">
          <Image
            src="/images/un/flags-duo.jpg"
            alt="DTC members at the United Nations flag row in New York"
            fill
            sizes="(min-width: 1024px) calc(100vw - 12rem), (min-width: 640px) calc(100vw - 6rem), calc(100vw - 3rem)"
            className="object-cover object-[50%_35%]"
          />
        </div>

        <h2 ref={headingRef} className="text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.2] tracking-tight text-center mx-auto text-foreground max-w-4xl">
          At DTC Policy Lab, we believe teen voices shouldn&apos;t be an afterthought in digital policy — they should lead it.
        </h2>

        <Link
          ref={ctaRef}
          href="/about"
          className="inline-flex items-center justify-center mt-8 px-6 py-3 rounded-full bg-foreground text-background text-lg tracking-tight font-medium transition-opacity hover:opacity-80"
        >
          About Us
        </Link>
      </div>
    </section>
  );
}
