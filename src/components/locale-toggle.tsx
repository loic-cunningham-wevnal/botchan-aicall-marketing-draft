"use client";

import { useLingoContext } from "@lingo.dev/compiler/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const LOCALES = [
	{ code: "ja", label: "JA" },
	{ code: "en", label: "EN" },
] as const;

export function LocaleToggle({ className }: { className?: string }) {
	const { locale, setLocale, isLoading } = useLingoContext();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
	// biome-ignore lint/style/noNonNullAssertion: index is mod LOCALES.length
	const next = LOCALES[(LOCALES.indexOf(current) + 1) % LOCALES.length]!;

	return (
		<Button
			aria-label={`言語を${next.label}に切り替え`}
			className={cn(
				"h-10 px-4 font-mono text-[11px] tracking-[0.18em] uppercase",
				className,
			)}
			disabled={isLoading}
			onClick={() => setLocale(next.code)}
			type="button"
			variant="ghost"
		>
			{mounted ? current.label : "--"}
		</Button>
	);
}
