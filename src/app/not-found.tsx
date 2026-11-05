"use client";

import Navigation9 from "@/components/blocks/navigation-9";
import { FooterDtc } from "@/components/blocks/footer-dtc";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Highlight } from "@/components/ui/highlight";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <>
      <Navigation9 />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "404" }]} />
      <main id="main-content" className="lg:relative lg:z-10 flex-1 bg-background">
        <section className="pt-8 pb-4 px-6 sm:px-8 lg:px-12">
          <div className="max-w-[1400px] mx-auto h-[calc(100vh)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sun-gold)] mb-4">
              404
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.0] max-w-4xl">
              This page <Highlight>isn&apos;t here.</Highlight>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              It may have moved, been deleted, or never existed. Research has
              dead ends; websites do too.
            </p>
            <br />
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Head back &nbsp;
              <Link
                href="/"
                className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                home →
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <FooterDtc />
    </>
  );
}
