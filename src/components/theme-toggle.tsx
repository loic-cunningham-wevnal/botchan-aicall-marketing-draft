"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import { useCallback, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const TRANSITION_DURATION_MS = 450;

export function ThemeToggle({ className }: { className?: string }) {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isDark = mounted ? resolvedTheme === "dark" : true;

	const toggle = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			const next = isDark ? "light" : "dark";
			const button = event.currentTarget;
			const apply = () => setTheme(next);

			// Fallback when the browser doesn't support View Transitions.
			if (
				typeof document === "undefined" ||
				typeof document.startViewTransition !== "function"
			) {
				apply();
				return;
			}

			const viewportWidth =
				window.visualViewport?.width ?? window.innerWidth;
			const viewportHeight =
				window.visualViewport?.height ?? window.innerHeight;
			const { top, left, width, height } = button.getBoundingClientRect();
			const cx = left + width / 2;
			const cy = top + height / 2;
			const maxRadius = Math.hypot(
				Math.max(cx, viewportWidth - cx),
				Math.max(cy, viewportHeight - cy),
			);

			const root = document.documentElement;
			root.dataset.magicuiThemeVt = "active";
			root.style.setProperty(
				"--magicui-theme-toggle-vt-duration",
				`${TRANSITION_DURATION_MS}ms`,
			);
			const cleanup = () => {
				delete root.dataset.magicuiThemeVt;
				root.style.removeProperty("--magicui-theme-toggle-vt-duration");
			};

			const transition = document.startViewTransition(() => {
				flushSync(apply);
			});
			transition.finished.finally(cleanup);

			transition.ready.then(() => {
				root.animate(
					{
						clipPath: [
							`circle(0px at ${cx}px ${cy}px)`,
							`circle(${maxRadius}px at ${cx}px ${cy}px)`,
						],
					},
					{
						duration: TRANSITION_DURATION_MS,
						easing: "ease-in-out",
						fill: "forwards",
						pseudoElement: "::view-transition-new(root)",
					},
				);
			});
		},
		[isDark, setTheme],
	);

	return (
		<Button
			aria-label="テーマを切り替え"
			className={cn("size-10 [&_svg]:size-4", className)}
			onClick={toggle}
			type="button"
			variant="ghost"
		>
			{isDark ? <Moon strokeWidth={1.5} /> : <Sun strokeWidth={1.5} />}
		</Button>
	);
}
