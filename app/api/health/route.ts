import { NextResponse } from "next/server";
import { loadRestrictions } from "@/lib/restrictions";
import { workItems } from "@/lib/work";

export const revalidate = 3600;

export async function GET() {
  const { totalMeasures, unmapped } = await loadRestrictions();
  return NextResponse.json({
    ok: true,
    service: "dtcpolicylab",
    time: new Date().toISOString(),
    datasets: {
      restrictionMeasures: totalMeasures,
      unmappedCountries: unmapped.length,
      workItems: workItems.length,
    },
  });
}
