"use client";

import Link from "next/link";
import Features6 from "@/components/blocks/features-6";

const DISCORD_INVITE_URL = "https://discord.gg/dtcpolicylab";

export function ContactUsDtc() {
  return (
    <>
      {/* ── EMAIL CTA ────────────────────────────────────────────── */}
      <section className="bg-background py-12 px-6 sm:px-8 lg:px-12 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4">
            Direct Email
          </p>
          <a
            href="mailto:hello@dtcpolicylab.org"
            className="block text-[clamp(1.5rem,5vw,4rem)] font-medium tracking-tight text-foreground hover:text-muted-foreground transition-colors break-all sm:break-normal"
          >
            hello@dtcpolicylab.org
          </a>
        </div>
      </section>

      {/* ── WHO SHOULD REACH OUT ─────────────────────────────────── */}
      <Features6 />

      {/* ── JOIN DISCORD ─────────────────────────────────────────── */}
      <section className="bg-foreground py-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-background mb-4">
                Join the community.
              </h2>
              <p className="text-background/60 text-lg leading-relaxed">
                Our Discord is where the actual work happens — research
                discussions, draft reviews, UN process updates, and the
                occasional argument about governance theory. Teens, researchers,
                and interested adults all welcome.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-background text-foreground text-sm font-semibold hover:bg-background/90 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 127.14 96.36"
                  fill="currentColor"
                  className="shrink-0"
                >
                  <path d="M107.7 8.07A105.15 105.15 0 0081.47 0a72.06 72.06 0 00-3.36 6.83 97.68 97.68 0 00-29.11 0A72.37 72.37 0 0045.64 0a105.89 105.89 0 00-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0032.17 16.15 77.7 77.7 0 006.89-11.11 68.42 68.42 0 01-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0064.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 01-10.87 5.19 77 77 0 006.89 11.1 105.25 105.25 0 0032.19-16.14c2.64-27.38-4.51-51.11-18.9-72.14zM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69z" />
                </svg>
                Join Discord
              </a>
              <Link
                href="/work"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-background/20 text-background text-sm font-medium hover:bg-background/10 transition-colors"
              >
                Read our research
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
