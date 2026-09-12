import { type NextRequest, NextResponse } from "next/server";
import {
  loadRestrictions,
  type RestrictionsPayload,
} from "@/lib/restrictions";
import type { RestrictionStatus } from "@/lib/country-iso";

export const revalidate = 3600;

const VALID_STATUSES: RestrictionStatus[] = ["Passed", "Pending", "Proposed"];

/**
 * GET /api/restrictions
 * Canonical, server-validated read path for the Global Teen Restriction
 * Database. Query params:
 *   ?status=Passed|Pending|Proposed  (repeatable)
 *   ?q=france                        (matches country / law / description)
 */
export async function GET(request: NextRequest) {
  const { measures, unmapped, totalMeasures } = await loadRestrictions();
  const params = request.nextUrl.searchParams;

  const wanted = params
    .getAll("status")
    .filter((s): s is RestrictionStatus =>
      (VALID_STATUSES as string[]).includes(s),
    );
  const q = (params.get("q") ?? "").trim().toLowerCase();

  let filtered = measures;
  if (wanted.length > 0) {
    const set = new Set(wanted);
    filtered = filtered.filter((m) => set.has(m.status));
  }
  if (q.length > 0) {
    filtered = filtered.filter((m) =>
      `${m.country} ${m.law} ${m.description}`.toLowerCase().includes(q),
    );
  }

  const payload: RestrictionsPayload = {
    measures: filtered,
    unmapped,
    totalMeasures,
    filteredMeasures: filtered.length,
  };

  return NextResponse.json(payload, {
    headers: {
      // Edge/CDN cache for an hour, serve stale for a day while revalidating.
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
