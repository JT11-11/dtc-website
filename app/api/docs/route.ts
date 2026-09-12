import { NextResponse } from "next/server";

/**
 * GET /api/docs — machine-readable manifest of the site's backend.
 * For humans: docs/VERCEL.md. For future admin UIs: start here.
 */
export async function GET() {
  return NextResponse.json(
    {
      service: "dtcpolicylab",
      endpoints: [
        {
          method: "GET",
          path: "/api/health",
          description: "Liveness + dataset counts.",
        },
        {
          method: "GET",
          path: "/api/restrictions?status=Passed|Pending|Proposed&q=",
          description:
            "Validated Global Teen Restriction Database. status is repeatable.",
        },
        {
          method: "GET",
          path: "/api/work?id=",
          description: "Research catalogue; omit id for the full list.",
        },
        {
          method: "GET",
          path: "/api/search?q=",
          description: "Full-text search across research + measures (q >= 2 chars).",
        },
        {
          method: "POST",
          path: "/api/contact",
          description:
            "Contact submissions. Validated, honeypot-checked, rate-limited. Needs RESEND_API_KEY for delivery.",
        },
        {
          method: "GET",
          path: "/api/contact",
          description:
            "Queued-submission inbox. Requires CONTACT_ADMIN_TOKEN (Bearer or ?token=). 404s when unconfigured.",
        },
        {
          method: "GET",
          path: "/api/docs",
          description: "This manifest.",
        },
        {
          method: "GET",
          path: "/feed.xml",
          description: "RSS feed of research + projects.",
        },
      ],
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      },
    },
  );
}
