export const dynamic = "force-static";
import { readdir } from "node:fs/promises";
import path from "node:path";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dynamicteencoalition.org").replace(/\/$/, "");
// Include route handlers (e.g. sitemap.xml/route.ts, humans.txt/route.ts) as well as pages.
const PAGE_FILES = new Set([
	"page.tsx", "page.ts", "page.jsx", "page.js",
	"route.tsx", "route.ts", "route.jsx", "route.js",
]);

async function discoverPages(directory: string, segments: string[] = []): Promise<string[]> {
	let entries;
	try {
		entries = await readdir(directory, { withFileTypes: true });
	} catch {
		return [];
	}

	const routes: string[] = [];
	for (const entry of entries) {
		if (entry.isDirectory()) {
			// Route groups do not appear in URLs; parallel slots are not URL segments.
			if (!entry.name.startsWith("@") && entry.name !== "node_modules") {
				routes.push(...(await discoverPages(path.join(directory, entry.name), [...segments, entry.name])));
			}
		} else if (PAGE_FILES.has(entry.name) && !segments.some((segment) => segment.startsWith("[") || segment.startsWith("@"))) {
			const visibleSegments = segments.filter((segment) => !(segment.startsWith("(") && segment.endsWith(")")));
			routes.push(visibleSegments.length ? `/${visibleSegments.join("/")}` : "/");
		}
	}
	return routes;
}

function escapeXml(value: string): string {
	return value.replace(/[<>&'\"]/g, (character) => ({
		"<": "&lt;",
		">": "&gt;",
		"&": "&amp;",
		"'": "&apos;",
		'"': "&quot;",
	})[character]!);
}

export async function GET() {
	const roots = [path.join(process.cwd(), "app"), path.join(process.cwd(), "src", "app")];
	const found = await Promise.all(roots.map((root) => discoverPages(root)));
	const routes = [...new Set(found.flat())].sort();
	const entries = routes.map((route) => `  <url><loc>${escapeXml(`${SITE_URL}${route === "/" ? "" : route}`)}</loc></url>`).join("\n");
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
}
