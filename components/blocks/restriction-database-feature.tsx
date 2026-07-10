"use client";

import { useState } from "react";
import Link from "next/link";
import { Highlight } from "@/components/ui/highlight";
import { RestrictionDatabaseLotties } from "@/components/blocks/restriction-database-lotties";

export function RestrictionDatabaseFeature() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="px-6 sm:px-8 lg:px-12 py-12 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="group grid w-full overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-[var(--un-blue)]/40 lg:grid-cols-[1fr_1.05fr]">
          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12 relative">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-[1.1]">
              The Global Teen{" "}
              <Highlight>Restriction Database.</Highlight>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              The first systematic effort to map social-media bans and blanket
              restrictions affecting teenagers
            </p>
            
            <div className="mt-8 relative inline-block">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/40 group-hover:decoration-foreground transition-colors hover:text-[var(--un-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--un-blue)] focus:ring-offset-2 focus:ring-offset-background rounded-sm"
                aria-expanded={isOpen}
                aria-haspopup="menu"
                type="button"
              >
                Open the database
              </button>
              
              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                  />
                  <div className="absolute z-20 mt-2 w-64 origin-top-right rounded-lg border border-border bg-popover py-1.5 shadow-lg animate-in fade-in-0 zoom-in-95 duration-150">
                    <Link
                      href="https://adciaudit.base44.app/GlobeView"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors"
                    >
                      <span className="font-medium">ADCI Restriction Audit</span>
                      <span className="text-xs text-muted-foreground">Interactive globe view</span>
                    </Link>
                    <Link
                      href="https://docs.google.com/spreadsheets/d/1zHiw7h_BNnXkTRnvXF-Ov8QYzRTmdVR-j0HwA5AWBos/edit?gid=0#gid=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors"
                    >
                      <span className="font-medium">Full Database</span>
                      <span className="text-xs text-muted-foreground">Google Sheets</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          <RestrictionDatabaseLotties />
        </div>
      </div>
    </section>
  );
}
