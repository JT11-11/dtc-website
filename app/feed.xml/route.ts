import { SITE_URL, SITE_NAME } from "@/lib/site";
import { workItems } from "@/lib/work";

function esc(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * GET /feed.xml — RSS 2.0 feed of DTC research + projects.
 * Lets journalists/researchers subscribe instead of polling the site.
 */
export async function GET() {
  const items = workItems
    .map((w) => {
      const link = w.cta?.href ?? `${SITE_URL}/work#${w.id}`;
      return [
        "    <item>",
        `      <title>${esc(`${w.title} ${w.titleItalic}`)}</title>`,
        `      <link>${esc(link)}</link>`,
        `      <guid isPermaLink="false">${esc(`dtc-work-${w.id}`)}</guid>`,
        `      <description>${esc(`${w.type} — ${w.status}. ${w.summary}`)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    `    <title>${esc(SITE_NAME)} — Research</title>`,
    `    <link>${esc(`${SITE_URL}/work`)}</link>`,
    `    <description>${esc("Research, databases, and public-interest projects from DTC Youth Policy Lab.")}</description>`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
