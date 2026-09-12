import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "dtcpolicylab",
    time: new Date().toISOString(),
  });
}
