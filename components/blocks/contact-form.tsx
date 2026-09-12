"use client";

import { useState } from "react";
import { CONTACT_TOPICS, type ContactTopic } from "@/lib/contact";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

const TOPIC_LABELS: Record<ContactTopic, string> = {
  general: "General",
  press: "Press / media",
  research: "Research collaboration",
  partnership: "Partnership",
  apply: "Apply to work with us",
};

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<ContactTopic>("general");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic, message, website }),
      });
      const data = (await res.json().catch(() => null)) as {
        error?: string;
        errors?: { field: string; message: string }[];
      } | null;
      if (!res.ok) {
        const detail = data?.errors?.[0]?.message ?? data?.error;
        setStatus({
          kind: "error",
          message:
            res.status === 429
              ? "Too many messages from this address. Please try again later."
              : (detail ?? "Something went wrong. Please email us directly."),
        });
        return;
      }
      setStatus({ kind: "sent" });
    } catch {
      setStatus({
        kind: "error",
        message: "Could not reach the server. Check your connection and retry.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <section
        aria-live="polite"
        className="bg-background py-12 px-6 sm:px-8 lg:px-12 border-b border-foreground/10"
      >
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Message received.
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            Thanks for writing — an actual person from the community will get
            back to you, not a mail bot.
          </p>
        </div>
      </section>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[var(--un-blue)]";

  return (
    <section className="bg-background py-12 px-6 sm:px-8 lg:px-12 border-b border-foreground/10">
      <div className="max-w-[1400px] mx-auto grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4">
            Send a message
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Goes to the team, not a void.
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Prefer email? You can still write to us directly — this form just
            lands in the same inbox with a topic label so it gets routed
            faster.
          </p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
              Name
              <input
                className={inputCls}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                placeholder="Your name"
                required
                minLength={2}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
              Email
              <input
                className={inputCls}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="you@example.org"
                required
              />
            </label>
          </div>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
            Topic
            <select
              className={inputCls}
              value={topic}
              onChange={(e) => setTopic(e.target.value as ContactTopic)}
            >
              {CONTACT_TOPICS.map((t) => (
                <option key={t} value={t}>
                  {TOPIC_LABELS[t]}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
            Message
            <textarea
              className={`${inputCls} min-h-36 resize-y`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What should we know?"
              required
              minLength={10}
            />
          </label>
          {/* Honeypot: hidden from humans, bots fill it. */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          {status.kind === "error" && (
            <p role="alert" className="text-sm text-red-500">
              {status.message}
            </p>
          )}
          <button
            type="submit"
            disabled={status.kind === "sending"}
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status.kind === "sending" ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}
