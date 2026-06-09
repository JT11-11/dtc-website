import Link from "next/link";
import { Highlight } from "@/components/ui/highlight";
import { RestrictionDatabaseLotties } from "@/components/blocks/restriction-database-lotties";

export function RestrictionDatabaseFeature() {
  return (
    <section className="px-6 sm:px-8 lg:px-12 py-12 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <Link
          href="/work/database"
          className="group grid w-full overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-[var(--un-blue)]/40 lg:grid-cols-[1fr_1.05fr]"
        >
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

          <RestrictionDatabaseLotties />
        </Link>
      </div>
    </section>
  );
}
