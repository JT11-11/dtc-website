import { type NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { CONTACT_EMAIL } from "@/lib/site";
import {
  checkRateLimit,
  contactQueueDir,
  validateContact,
} from "@/lib/contact";

/**
 * POST /api/contact
 * Body: { name, email, topic, message, website? (honeypot) }
 *
 * Pipeline: honeypot → validation → rate limit → deliver.
 * Delivery: Resend when RESEND_API_KEY (+ CONTACT_TO_EMAIL) is set,
 * otherwise the submission lands in the local queue (gitignored
 * data/contact-queue/, /tmp on Vercel) for triage. Either way the client
 * gets the same 200 response — never leak which path was taken.
 *
 * GET /api/contact — queued-submission inbox for triage. Requires
 * CONTACT_ADMIN_TOKEN as `Authorization: Bearer <token>` or `?token=`.
 * Returns 404 (as if nonexistent) when unconfigured or unauthorized.
 */
export async function POST(request: NextRequest) {
  const rid = randomUUID().slice(0, 8);
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const checked = validateContact(body);
  if (!checked.ok || !checked.value) {
    return NextResponse.json(
      { error: "Validation failed.", errors: checked.errors },
      { status: 400 },
    );
  }
  const input = checked.value;

  // Bots fill the honeypot: pretend success, deliver nothing.
  if (input.website) {
    console.log(`[contact:${rid}] honeypot trip, dropped`);
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const limit = await checkRateLimit(`${ip}:${input.email.toLowerCase()}`);
  if (!limit.allowed) {
    console.log(`[contact:${rid}] rate-limited ${ip}`);
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  const record = {
    ...input,
    website: undefined,
    to: CONTACT_EMAIL,
    ip,
    receivedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
  };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? CONTACT_EMAIL;
  if (apiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM_EMAIL ??
          `DTC Site <site@${new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://dtcpolicylab.org").hostname}>`,
        to: [to],
        reply_to: input.email,
        subject: `[dtcpolicylab.org/${input.topic}] message from ${input.name}`,
        text: `From: ${input.name} <${input.email}>\nTopic: ${input.topic}\n\n${input.message}`,
      }),
    });
    if (!res.ok) {
      console.error(
        `[contact:${rid}] Resend delivery failed, queuing:`,
        await res.text(),
      );
      await queueLocally(record);
    } else {
      console.log(
        `[contact:${rid}] delivered topic=${input.topic} from=${input.email}`,
      );
    }
  } else {
    if (process.env.VERCEL) {
      console.warn(
        `[contact:${rid}] no RESEND_API_KEY on Vercel — submission only queued to ephemeral /tmp (see docs/VERCEL.md)`,
      );
    }
    await queueLocally(record);
  }

  return NextResponse.json({ ok: true });
}

export async function GET(request: NextRequest) {
  const token = process.env.CONTACT_ADMIN_TOKEN;
  const auth = request.headers.get("authorization");
  const provided = auth?.startsWith("Bearer ")
    ? auth.slice(7)
    : (request.nextUrl.searchParams.get("token") ?? "");
  if (!token || provided !== token) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  const dir = contactQueueDir();
  let files: string[] = [];
  try {
    files = (await fs.readdir(dir))
      .filter((f) => f.endsWith(".json"))
      .sort()
      .reverse()
      .slice(0, 100);
  } catch {
    return NextResponse.json({ total: 0, items: [] });
  }
  const items: unknown[] = [];
  for (const f of files) {
    try {
      items.push(JSON.parse(await fs.readFile(path.join(dir, f), "utf-8")));
    } catch {
      // Skip unreadable entries rather than failing the whole inbox.
    }
  }
  return NextResponse.json({ total: items.length, items });
}

async function queueLocally(record: Record<string, unknown>) {
  try {
    const dir = contactQueueDir();
    await fs.mkdir(dir, { recursive: true });
    const file = path.join(
      dir,
      `${Date.now()}-${randomUUID().slice(0, 6)}.json`,
    );
    await fs.writeFile(file, JSON.stringify(record, null, 2), "utf-8");
  } catch (err) {
    console.error("[contact] local queue write failed", err);
  }
  console.log(
    `[contact] ${record.receivedAt} topic=${record.topic} from=${record.email}`,
  );
}
