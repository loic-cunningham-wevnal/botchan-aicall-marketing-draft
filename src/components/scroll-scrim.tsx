"use client";

import { useEffect, useState } from "react";
import GradualBlur from "~/components/gradual-blur/gradual-blur";

/**
 * Page-level bottom scrim that follows the viewport while any of the given
 * section IDs is intersecting, then fades out. Lets the blur "follow along"
 * through tasteful, visually rich sections without sitting on the page
 * permanently.
 */
export function ScrollScrim({ sectionIds }: { sectionIds: string[] }) {
	const [active, setActive] = useState(false);

	useEffect(() => {
		const targets = sectionIds
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => Boolean(el));
		if (targets.length === 0) return;

		const visible = new Set<Element>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) visible.add(entry.target);
					else visible.delete(entry.target);
				}
				setActive(visible.size > 0);
			},
			// Trigger as soon as ~5% of the section is in view; keep active
			// until it has fully scrolled past.
			{ threshold: 0.05, rootMargin: "0px 0px -10% 0px" },
		);
		for (const t of targets) observer.observe(t);
		return () => observer.disconnect();
	}, [sectionIds]);

	return (
		<GradualBlur
			curve="ease-out"
			divCount={6}
			height="8rem"
			opacity={1}
			position="bottom"
			strength={2}
			style={{
				opacity: active ? 1 : 0,
				transition: "opacity 600ms ease-out",
				zIndex: 30,
			}}
			target="page"
		/>
	);
}
