import { type NextRequest, NextResponse } from "next/server";
import { getWorkItem, workItems } from "@/lib/work";

export const revalidate = 3600;

/**
 * GET /api/work        → all research/project entries
 * GET /api/work?id=icc-prosecutorial-patterns → single entry (404 if unknown)
 */
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    const item = getWorkItem(id);
    if (!item) {
      return NextResponse.json({ error: "Work item not found" }, { status: 404 });
    }
    return NextResponse.json(
      { item },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  }
  return NextResponse.json(
    { items: workItems, total: workItems.length },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
