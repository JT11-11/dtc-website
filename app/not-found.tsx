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
              Looks like you&apos;ve wandered off the <Highlight>map.</Highlight>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist, may have been moved, 
              or might never have existed in the first place. Even the best 
              researchers hit a dead end sometimes.
            </p>
            <br />
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Feel free to head back &nbsp;
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
