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

// --- Minimal in-memory sliding-window rate limiter --------------------------
// Per server instance. Good enough for a low-traffic site today; for
// multi-instance/serverless production, replace with Upstash Redis or
// Arcjet — same checkRateLimit() signature.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export function checkRateLimit(key: string): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil(
      (recent[0] + WINDOW_MS - now) / 1000,
    );
    return { allowed: false, retryAfterSeconds };
  }
  recent.push(now);
  hits.set(key, recent);
  return { allowed: true, retryAfterSeconds: 0 };
}
