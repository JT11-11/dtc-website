// Contact submission validation + abuse protection.
//
// Zero-dependency on purpose: no zod/Upstash required to build or run.
// If those are added later, swap validateContact() / checkRateLimit()
// internals — the route handler contract stays the same.
export const CONTACT_TOPICS = [
  "general",
  "press",
  "research",
  "partnership",
  "apply",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export interface ContactInput {
  name: string;
  email: string;
  topic: ContactTopic;
  message: string;
  /** Honeypot — real users leave it empty, bots fill it. */
  website?: string;
}

export interface ContactError {
  field: "name" | "email" | "topic" | "message";
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: unknown): {
  ok: boolean;
  value?: ContactInput;
  errors?: ContactError[];
} {
  const errors: ContactError[] = [];
  const raw = (input ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const name = str(raw.name).slice(0, 120);
  const email = str(raw.email).slice(0, 200);
  const topic = str(raw.topic);
  const message =
    typeof raw.message === "string" ? raw.message.trim().slice(0, 6000) : "";
  const website = str(raw.website);

  if (name.length < 2) {
    errors.push({ field: "name", message: "Please tell us your name." });
  }
  if (!EMAIL_RE.test(email)) {
    errors.push({ field: "email", message: "That email address looks invalid." });
  }
  if (!(CONTACT_TOPICS as readonly string[]).includes(topic)) {
    errors.push({ field: "topic", message: "Pick a valid topic." });
  }
  if (message.length < 10) {
    errors.push({
      field: "message",
      message: "Give us a little more detail (10+ characters).",
    });
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, value: { name, email, topic: topic as ContactTopic, message, website } };
}

import { tmpdir } from "node:os";
import path from "node:path";

// --- Rate limiting ----------------------------------------------------------
// Shared limiter when Upstash Redis REST credentials are present (works
// across serverless instances, zero new dependencies — plain fetch),
// per-instance in-memory sliding window otherwise.
const WINDOW_S = 60 * 60;
const WINDOW_MS = WINDOW_S * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

async function upstashLimit(key: string): Promise<{
  allowed: boolean;
  retryAfterSeconds: number;
} | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const headers = { Authorization: `Bearer ${token}` };
  const redisKey = `contact-rl:${encodeURIComponent(key)}`;
  try {
    const incr = await fetch(`${url}/incr/${redisKey}`, { headers });
    if (!incr.ok) return null;
    const count = Number(( (await incr.json()) as { result: unknown }).result);
    if (Number.isNaN(count)) return null;
    if (count === 1) {
      await fetch(`${url}/expire/${redisKey}/${WINDOW_S}`, { headers }).catch(
        () => {},
      );
      return { allowed: true, retryAfterSeconds: 0 };
    }
    if (count <= MAX_PER_WINDOW) return { allowed: true, retryAfterSeconds: 0 };
    const ttlRes = await fetch(`${url}/ttl/${redisKey}`, { headers });
    const ttl = ttlRes.ok
      ? Number(((await ttlRes.json()) as { result: unknown }).result)
      : WINDOW_S;
    return {
      allowed: false,
      retryAfterSeconds: Number.isFinite(ttl) && ttl > 0 ? ttl : WINDOW_S,
    };
  } catch {
    return null; // Redis hiccup — fall through to memory limiter, stay up.
  }
}

function memoryLimit(key: string): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((recent[0] + WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }
  recent.push(now);
  hits.set(key, recent);
  return { allowed: true, retryAfterSeconds: 0 };
}

export async function checkRateLimit(key: string): Promise<{
  allowed: boolean;
  retryAfterSeconds: number;
}> {
  return (await upstashLimit(key)) ?? memoryLimit(key);
}

// --- Local submission queue -------------------------------------------------
// Crash buffer for when no mail provider is configured. Vercel functions
// have a read-only filesystem outside /tmp, so queue there on Vercel
// (still ephemeral — set RESEND_API_KEY in production, see docs/VERCEL.md).
export function contactQueueDir(): string {
  if (process.env.VERCEL) return path.join(tmpdir(), "dtc-contact-queue");
  return path.join(process.cwd(), "data", "contact-queue");
}
