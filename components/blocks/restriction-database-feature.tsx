import Link from "next/link";
import { Highlight } from "@/components/ui/highlight";
import { DotLottiePlayer } from "@/components/blocks/dotlottie-player";

export function RestrictionDatabaseFeature() {
  return (
    <section className="px-6 sm:px-8 lg:px-12 py-12 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <Link
          href="/work/database"
          className="group grid w-full overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-[var(--un-blue)]/40 lg:grid-cols-[1fr_1.05fr]"
        >
          {/* Left — copy */}
          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-[1.1]">
              The Global Teen{" "}
              <Highlight>Restriction Database.</Highlight>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              The first systematic effort to map social-media bans and blanket
              restrictions affecting teenagers
            </p>
            <span className="mt-8 inline-block text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/40 group-hover:decoration-foreground transition-colors">
              Open the database
            </span>
          </div>

          {/* Right — lottie frame */}
          <div className="relative min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] border-t lg:border-t-0 lg:border-l border-border/70 overflow-hidden">
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

            <DotLottiePlayer
              src="/b3ec7600-116f-11ee-8494-3bb557282823.lottie"
              scrollSpeed={1.8}
              scrollClassName="relative z-10 flex h-full min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] items-center justify-center p-8 sm:p-10 lg:p-12"
              className="relative aspect-square w-full max-w-[420px] rounded-2xl border border-border/60 bg-card/70 shadow-sm overflow-hidden [&_canvas]:relative [&_canvas]:z-0"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
