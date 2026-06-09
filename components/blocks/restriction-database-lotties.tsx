"use client";

import { useRef } from "react";
import { DotLottiePlayer } from "@/components/blocks/dotlottie-player";

export function RestrictionDatabaseLotties() {
  const columnRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={columnRef}
      className="relative min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] border-t lg:border-t-0 lg:border-l border-border/70 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#f5ebe8] via-background to-[#e8edf5]"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(228, 225, 216, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(228, 225, 216, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-0 overflow-visible">
        <DotLottiePlayer
          src="/logo/687bbaa2-1168-11ee-8e93-67339d0d3bae.lottie"
          scrollSpeed={1.0}
          scrollMeasureRef={columnRef}
          className="absolute left-1/2 top-1/2 h-[180%] w-[200%] -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div className="relative z-10 flex h-full min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] items-center justify-center p-8 sm:p-10 lg:p-12 pointer-events-none">
        <div className="pointer-events-auto aspect-square w-full max-w-[420px] rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden p-6 sm:p-8">
          <DotLottiePlayer
            src="/b3ec7600-116f-11ee-8494-3bb557282823.lottie"
            scrollSpeed={1.0}
            scrollMeasureRef={columnRef}
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
