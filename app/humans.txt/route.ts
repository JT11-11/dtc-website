export const dynamic = "force-static";

import { readFileSync } from "node:fs";

let contribs = readFileSync("contributors.txt", "utf8").split("\n");
contribs = contribs.slice(2);

export function GET() {
	return new Response(contribs.join("\n"), {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
}