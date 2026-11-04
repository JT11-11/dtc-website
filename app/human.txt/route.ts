import { execFileSync } from "node:child_process";

export function GET() {
	const commits = execFileSync("git", ["log", "--all", "--format=%aN%x09%aE"], {
		cwd: process.cwd(),
		encoding: "utf8",
	});

	const contributors = new Map<string, { name: string; email: string }>();

	for (const entry of commits.split("\n").filter(Boolean)) {
		const [name, email] = entry.split("\t");
		const key = email.toLowerCase();
		const existing = contributors.get(key);

		if (!existing || name.length > existing.name.length) {
			contributors.set(key, { name, email });
		}
	}

	return new Response(
		[...contributors.values()].map(({ name, email }) => `${name} ${email}...`).join("\n"),
		{
		headers: { "Content-Type": "text/plain; charset=utf-8" },
		},
	);
}