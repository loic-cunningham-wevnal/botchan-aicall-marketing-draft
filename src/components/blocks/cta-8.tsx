"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const WORDMARK = "BOTCHAN AICALL";

export default function Cta8() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const [mask, setMask] = useState({ x: -9999, y: -9999 });
	const targetRef = useRef({ x: -9999, y: -9999 });
	const currentRef = useRef({ x: -9999, y: -9999 });
	const cursorRef = useRef<{ x: number; y: number } | null>(null);
	const lastMoveRef = useRef(0);

	useEffect(() => {
		const el = sectionRef.current;
		if (!el) return;

		const onMove = (e: MouseEvent) => {
			const h = headingRef.current;
			if (!h) return;
			const rect = h.getBoundingClientRect();
			lastMoveRef.current = performance.now();
			cursorRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
		};
		const onLeave = () => {
			cursorRef.current = null;
		};

		el.addEventListener("mousemove", onMove);
		el.addEventListener("mouseleave", onLeave);
		return () => {
			el.removeEventListener("mousemove", onMove);
			el.removeEventListener("mouseleave", onLeave);
		};
	}, []);

	useEffect(() => {
		let raf = 0;
		const start = performance.now();
		const duration = 11000;

		const tick = (t: number) => {
			const h = headingRef.current;
			if (h) {
				const hRect = h.getBoundingClientRect();
				const idle = t - lastMoveRef.current > 700 || !cursorRef.current;

				if (idle) {
					const elapsed = (t - start) % duration;
					const progress = elapsed / duration;
					const eased = 0.5 - 0.5 * Math.cos(progress * Math.PI * 2);
					targetRef.current = { x: eased * hRect.width, y: hRect.height / 2 };
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

	return (
		<section
			className="@container relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden bg-[var(--canvas)] px-4 pt-16 pb-32 text-[var(--ink)] sm:px-6 sm:pt-20 sm:pb-40 lg:px-8 lg:pt-24 lg:pb-48"
			ref={sectionRef}
		>
			<div className="relative z-10 flex flex-col items-center">
				<motion.a
					className="btn-brand cursor-pointer rounded-sm px-10 py-4 font-medium text-[max(0.7rem,0.78vmax)] text-base uppercase tracking-[0.18em]"
					href="#book"
					initial={{ opacity: 0, y: 12 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					whileHover={{ scale: 1.04 }}
					whileInView={{ opacity: 1, y: 0 }}
					whileTap={{ scale: 0.97 }}
				>
					デモを予約する
				</motion.a>
				<motion.p
					className="mt-5 font-mono text-[10px] text-[var(--ink)]/60 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]"
					initial={{ opacity: 0, y: 8 }}
					transition={{ duration: 0.6, delay: 0.15 }}
					viewport={{ once: true }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					30分のご相談 · 担当CSリードが5営業日以内に導入プランをご提案
				</motion.p>
			</div>

			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-6 z-0 sm:inset-8 lg:inset-10"
			>
				<span className="-top-1.5 -left-1.5 absolute h-px w-3 bg-[var(--rule)]" />
				<span className="-top-1.5 -left-1.5 absolute h-3 w-px bg-[var(--rule)]" />
				<span className="-top-1.5 -right-1.5 absolute h-px w-3 bg-[var(--rule)]" />
				<span className="-top-1.5 -right-1.5 absolute h-3 w-px bg-[var(--rule)]" />
				<span className="-bottom-1.5 -left-1.5 absolute h-px w-3 bg-[var(--rule)]" />
				<span className="-bottom-1.5 -left-1.5 absolute h-3 w-px bg-[var(--rule)]" />
				<span className="-bottom-1.5 -right-1.5 absolute h-px w-3 bg-[var(--rule)]" />
				<span className="-bottom-1.5 -right-1.5 absolute h-3 w-px bg-[var(--rule)]" />
			</div>

			{/* Outline ghost — always visible behind the spotlight twin. */}
			<motion.h2
				aria-hidden="true"
				className="-bottom-2 sm:-bottom-3 lg:-bottom-4 pointer-events-none absolute right-0 left-0 select-none whitespace-nowrap text-center font-display font-black uppercase leading-[0.85]"
				initial={{ opacity: 0, y: 40 }}
				style={{
					fontSize: "clamp(28px, 11cqw, 180px)",
					color: "transparent",
					WebkitTextStroke: "1px rgba(241,237,228,0.18)",
					letterSpacing: "-0.04em",
				}}
				transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
				viewport={{ once: true }}
				whileInView={{ opacity: 1, y: 0 }}
			>
				{WORDMARK}
			</motion.h2>

			{/* Filled twin — masked by the wandering radial spotlight. */}
			<motion.h2
				className="-bottom-2 sm:-bottom-3 lg:-bottom-4 pointer-events-none absolute right-0 left-0 select-none whitespace-nowrap text-center font-display font-black text-[var(--ink)] uppercase leading-[0.85]"
				initial={{ opacity: 0, y: 40 }}
				ref={headingRef}
				style={{
					fontSize: "clamp(28px, 11cqw, 180px)",
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
				{WORDMARK}
			</motion.h2>
		</section>
	);
}
