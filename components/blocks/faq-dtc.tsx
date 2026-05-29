"use client";

/* eslint-disable */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    question: "What is DTC Policy Lab?",
    answer: "DTC Policy Lab is a premier, fully teen-led research organization dedicated to digital rights and the formal governance of AI. We conduct rigorous research to ensure youth voices are represented in global digital policy discussions.",
  },
  {
    question: "Who can join?",
    answer: "Any passionate teenager who is interested in digital rights, policy, research, or advocacy can apply to join our lab. We welcome members from diverse backgrounds and locations globally.",
  },
  {
    question: "How does the research process work?",
    answer: "Our research process is highly collaborative. Teams of teen researchers identify pressing issues, conduct qualitative and quantitative studies, review policy frameworks, and produce reports that are often submitted for peer review or directly shared with policymakers.",
  },
  {
    question: "Do I need prior experience?",
    answer: "No prior formal research experience is required! We value curiosity, dedication, and a willingness to learn. Experienced members and mentors will guide you through the research methodologies we employ.",
  },
  {
    question: "How does DTC influence real policy?",
    answer: "We actively share our findings with policymakers, digital rights organizations, and tech companies. Our global teen restriction database and various reports provide concrete data that advocates use to shape legislation and platform guidelines.",
  },
];

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 90%",
            end: "top 70%",
            scrub: 1,
          },
        }
      );
    }, itemRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={itemRef}
      className="border border-foreground/10 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
      >
        <span className="text-lg font-medium text-foreground pr-4">{question}</span>
        <span
          className={`relative w-6 h-6 shrink-0 text-foreground transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
        >
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[1.5px] bg-current" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.5px] h-4 bg-current" />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-1fr' : 'grid-rows-0fr'}`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-foreground/70 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqDtc() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background py-24 lg:py-32">
      <div className="px-6 sm:px-12 lg:px-24 max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl lg:text-5xl font-medium tracking-tight text-foreground text-center mb-12 lg:mb-16"
        >
          Frequently Asked
          <br />
          Questions
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
