import { cn } from "@/lib/utils";

/**
 * The DTC YPL Brand Kit signature "Highlight" - an emphasized phrase set in
 * Instrument Serif Italic in a brand accent color. This is the recurring tell
 * that ties every heading on the site to the brand (e.g. the gold phrase in
 * "Policy shaped by the people it affects most").
 *
 * Usage: <h1>Teen-led policy work. <Highlight>Not youth-washing.</Highlight></h1>
 */
export function Highlight({
  children,
  color = "gold",
  className,
}: {
  children: React.ReactNode;
  /** Brand accent - gold on light surfaces, blue when more contrast is wanted. */
  color?: "gold" | "blue";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-serif italic font-normal tracking-[0.04em] leading-[1.15] text-[0.97em]",
        color === "gold" ? "text-[var(--sun-gold)]" : "text-[var(--un-blue)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Highlight;
