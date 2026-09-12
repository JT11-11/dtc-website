import { type NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { CONTACT_EMAIL } from "@/lib/site";
import { checkRateLimit, validateContact } from "@/lib/contact";

/**
 * POST /api/contact
 * Body: { name, email, topic, message, website? (honeypot) }
 *
 * Pipeline: honeypot → validation → rate limit → deliver.
 * Delivery today: Resend when RESEND_API_KEY (+ CONTACT_TO_EMAIL) is set,
 * otherwise the submission is appended to a gitignored local queue
 * (data/contact-queue/) for self-hosted/dev triage. Either way the client
 * gets the same 200 response — never leak which path was taken.
 */
export async function POST(request: NextRequest) {
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
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const limit = checkRateLimit(`${ip}:${input.email.toLowerCase()}`);
  if (!limit.allowed) {
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
        from: process.env.CONTACT_FROM_EMAIL ?? `DTC Site <site@${new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://dtcpolicylab.org").hostname}>`,
        to: [to],
        reply_to: input.email,
        subject: `[dtcpolicylab.org/${input.topic}] message from ${input.name}`,
        text: `From: ${input.name} <${input.email}>\nTopic: ${input.topic}\n\n${input.message}`,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend delivery failed:", await res.text());
      await queueLocally(record);
    }
  } else {
    await queueLocally(record);
  }

  return NextResponse.json({ ok: true });
}

async function queueLocally(record: Record<string, unknown>) {
  try {
    const dir = path.join(process.cwd(), "data", "contact-queue");
    await fs.mkdir(dir, { recursive: true });
    const file = path.join(
      dir,
      `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.json`,
    );
    await fs.writeFile(file, JSON.stringify(record, null, 2), "utf-8");
  } catch (err) {
    console.error("[contact] local queue write failed", err);
  }
  console.log(
    `[contact] ${record.receivedAt} topic=${record.topic} from=${record.email}`,
  );
}
