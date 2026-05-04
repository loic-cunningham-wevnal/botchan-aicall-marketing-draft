"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Big stroked wordmark with a cursor-following spotlight that fills the
 * letters wherever the radial mask passes — mirrors the CTA-8 design.
 * Tracks the closest section/footer for cursor input so the effect works
 * across the whole containing block.
 */
export function SpotlightWordmark({
	text,
	fontSize = "clamp(28px, 9cqw, 150px)",
	fill = "currentColor",
	stroke = "rgba(255,255,255,0.18)",
	className,
}: {
	text: string;
	fontSize?: string;
	fill?: string;
	stroke?: string;
	className?: string;
}) {
	const headingRef = useRef<HTMLHeadingElement>(null);
	const [mask, setMask] = useState({ x: -9999, y: -9999 });
	const targetRef = useRef({ x: -9999, y: -9999 });
	const currentRef = useRef({ x: -9999, y: -9999 });
	const cursorRef = useRef<{ x: number; y: number } | null>(null);
	const lastMoveRef = useRef(0);

	useEffect(() => {
		const h = headingRef.current;
		if (!h) return;
		const host = h.closest("section, footer") ?? h.parentElement;
		if (!host) return;

		const onMove = (e: Event) => {
			const me = e as MouseEvent;
			const rect = h.getBoundingClientRect();
			lastMoveRef.current = performance.now();
			cursorRef.current = {
				x: me.clientX - rect.left,
				y: me.clientY - rect.top,
			};
		};
		const onLeave = () => {
			cursorRef.current = null;
		};

		host.addEventListener("mousemove", onMove);
		host.addEventListener("mouseleave", onLeave);
		return () => {
			host.removeEventListener("mousemove", onMove);
			host.removeEventListener("mouseleave", onLeave);
		};
	}, []);

	useEffect(() => {
		let raf = 0;
		const start = performance.now();
		const duration = 11000;
		const tick = (t: number) => {
			const h = headingRef.current;
			if (h) {
				const rect = h.getBoundingClientRect();
				const idle = t - lastMoveRef.current > 700 || !cursorRef.current;
				if (idle) {
					const elapsed = (t - start) % duration;
					const progress = elapsed / duration;
					const eased = 0.5 - 0.5 * Math.cos(progress * Math.PI * 2);
					targetRef.current = { x: eased * rect.width, y: rect.height / 2 };
				} else if (cursorRef.current) {
					targetRef.current = cursorRef.current;
				}
				if (currentRef.current.x === -9999) {
					currentRef.current = { ...targetRef.current };
				} else {
					const lerp = 0.08;
					currentRef.current = {
						x:
							currentRef.current.x +
							(targetRef.current.x - currentRef.current.x) * lerp,
						y:
							currentRef.current.y +
							(targetRef.current.y - currentRef.current.y) * lerp,
					};
				}
				setMask({ ...currentRef.current });
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, []);

	const maskImage = `radial-gradient(circle 460px at ${mask.x}px ${mask.y}px, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.55) 20%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.08) 80%, transparent 100%)`;

	const wordmarkClass =
		"pointer-events-none absolute right-0 left-0 select-none whitespace-nowrap text-center font-display font-black uppercase leading-[0.85]";

	return (
		<>
			{/* Outline ghost — always visible. */}
			<motion.h2
				aria-hidden="true"
				className={`${wordmarkClass} ${className ?? ""}`}
				initial={{ opacity: 0, y: 40 }}
				style={{
					fontSize,
					color: "transparent",
					WebkitTextStroke: `1px ${stroke}`,
					letterSpacing: "-0.04em",
				}}
				transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
				viewport={{ once: true }}
				whileInView={{ opacity: 1, y: 0 }}
			>
				{text}
			</motion.h2>

			{/* Filled twin — masked by the wandering radial spotlight. */}
			<motion.h2
				className={`${wordmarkClass} ${className ?? ""}`}
				initial={{ opacity: 0, y: 40 }}
				ref={headingRef}
				style={{
					fontSize,
					color: fill,
					letterSpacing: "-0.04em",
					WebkitMaskImage: maskImage,
					maskImage,
					WebkitMaskRepeat: "no-repeat",
					maskRepeat: "no-repeat",
				}}
				transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
				viewport={{ once: true }}
				whileInView={{ opacity: 1, y: 0 }}
			>
				{text}
			</motion.h2>
		</>
	);
}
