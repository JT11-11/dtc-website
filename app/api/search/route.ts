import { type NextRequest, NextResponse } from "next/server";
import { loadRestrictions } from "@/lib/restrictions";
import { workItems } from "@/lib/work";

/**
 * GET /api/search?q=teen
 * Lightweight full-text search across research entries + restriction
 * measures. No external service, no DB required. Rate-limit friendly:
 * responses are short and cacheable.
 */
export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get("q") ?? "").trim().toLowerCase();
  if (q.length < 2) {
    return NextResponse.json(
      { error: "Provide ?q= with at least 2 characters." },
      { status: 400 },
    );
  }

  const { measures } = await loadRestrictions();

  const work = workItems
    .filter((w) =>
      `${w.title} ${w.titleItalic} ${w.type} ${w.summary} ${w.whyItMatters}`
        .toLowerCase()
        .includes(q),
    )
    .slice(0, 10)
    .map((w) => ({ id: w.id, title: `${w.title} ${w.titleItalic}`, type: w.type }));

  const restrictions = measures
    .filter((m) =>
      `${m.country} ${m.law} ${m.description}`.toLowerCase().includes(q),
    )
    .slice(0, 20)
    .map((m) => ({ country: m.country, law: m.law, status: m.status }));

  return NextResponse.json(
    { q, work, restrictions },
    {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
      },
    },
  );
}
