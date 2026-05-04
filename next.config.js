/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import { withLingo } from "@lingo.dev/compiler/next";

/**
 * Lingo.dev workflow
 * ------------------
 * - Translation cache lives at `src/lingo/cache/<locale>.json` and IS committed to git.
 * - Default buildMode is `cache-only`: production / Vercel builds never call the LLM.
 *   This means Vercel does NOT need OPENROUTER_API_KEY set.
 * - To regenerate translations locally after editing source strings, run:
 *     `bun run translate`     (= LINGO_BUILD_MODE=translate next build)
 *   then commit the updated `src/lingo/cache/*.json` files.
 * - `LINGO_BUILD_MODE=translate` env var overrides the default at build time.
 */

/** @type {import("next").NextConfig} */
const config = {};

export default async function () {
	return await withLingo(config, {
		sourceRoot: "./src",
		sourceLocale: "ja",
		targetLocales: ["en"],
		models: {
			"*:*": "openrouter:openai/gpt-5.4-mini",
		},
		pluralization: { enabled: false },
		buildMode: "cache-only",
	});
}
