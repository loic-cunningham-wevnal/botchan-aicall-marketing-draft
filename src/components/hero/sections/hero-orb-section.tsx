"use client";

import { Download } from "lucide-react";
import { motion } from "motion/react";
import GradualBlur from "~/components/gradual-blur/gradual-blur";
import { LocaleToggle } from "~/components/locale-toggle";
import Orb from "~/components/orb/orb";
import { ThemeToggle } from "~/components/theme-toggle";
import { WevnalLogo } from "~/components/wevnal-logo";
import { WordmarkInner } from "./wordmark-inner";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroOrbSection() {
	return (
		<section className="relative isolate h-dvh w-full overflow-hidden bg-[var(--canvas)] text-[var(--ink)]">
			{/* Orb — primary visual */}
			<motion.div
				animate={{ opacity: 1 }}
				className="absolute top-1/2 left-1/2 z-[1] aspect-square w-[min(85vh,90vw)] -translate-x-1/2 -translate-y-1/2"
				initial={{ opacity: 0 }}
				transition={{ duration: 1.4, ease }}
			>
				<Orb
					backgroundColor="#000000"
					forceHoverState={false}
					hoverIntensity={0.45}
					hue={0}
					rotateOnHover
				/>
			</motion.div>

			{/* WORDMARK + supporting copy + CTAs */}
			<div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 sm:gap-4">
				<WordmarkInner glow />

				<motion.p
					animate={{ opacity: 1, y: 0 }}
					className="-mt-1 max-w-[44ch] text-center font-light text-[var(--ink)]/85 text-base leading-[1.4] sm:text-[max(1rem,1.05vmax)]"
					initial={{ opacity: 0, y: 12 }}
					transition={{ duration: 0.9, ease, delay: 0.7 }}
				>
					インバウンドコールを24時間365日、Goodオペレーターの品質で自動化。
				</motion.p>

				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="pointer-events-auto mt-1 flex flex-wrap items-center justify-center gap-[max(0.6rem,0.8vmax)]"
					initial={{ opacity: 0, y: 16 }}
					transition={{ duration: 0.8, ease, delay: 0.85 }}
				>
					<motion.a
						className="btn-brand rounded-sm px-[max(1.6rem,2.2vmax)] py-[max(0.7rem,0.85vmax)] font-medium text-[max(0.7rem,0.78vmax)] uppercase tracking-[0.18em]"
						href="#contact"
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.97 }}
					>
						無料のデモを予約
					</motion.a>
					<motion.a
						className="inline-flex items-center gap-2 rounded-sm border border-[var(--rule)] bg-[var(--canvas)]/40 px-[max(1.6rem,2.2vmax)] py-[max(0.7rem,0.85vmax)] font-medium text-[max(0.7rem,0.78vmax)] text-[var(--ink)] uppercase tracking-[0.18em] backdrop-blur-md transition-colors duration-200 hover:bg-[var(--haze)]"
						href="#contact"
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.97 }}
					>
						<Download className="h-3.5 w-3.5" />
						資料をダウンロード
					</motion.a>
				</motion.div>

				<motion.p
					animate={{ opacity: 1, y: 0 }}
					className="font-mono text-[10px] text-[var(--ink)]/65 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.78vmax)]"
					initial={{ opacity: 0, y: 12 }}
					transition={{ duration: 0.8, ease, delay: 0.95 }}
				>
					30分のご相談 · 5営業日以内に導入プランをご提案
				</motion.p>
			</div>

			{/* Top bar — brand + locale/theme toggles */}
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="absolute top-0 right-0 left-0 z-30 flex items-start justify-between px-[6vmax] py-[4vmax]"
				initial={{ opacity: 0, y: -8 }}
				transition={{ duration: 0.7, ease, delay: 0.2 }}
			>
				<div className="flex flex-col gap-3">
					<WevnalLogo className="h-[max(1.6rem,2vmax)] text-[var(--ink)]" />
					<span className="font-mono text-[max(0.7rem,0.85vmax)] text-[var(--ink)]/80 uppercase leading-[1.6] tracking-[0.22em]">
						電話AIエージェント
						<br />
						BOTCHAN AICALL
					</span>
				</div>
				<div className="flex items-center gap-1">
					<LocaleToggle />
					<ThemeToggle />
				</div>
			</motion.div>

			{/* Gradual blur fading the orb into the next section */}
			<GradualBlur
				animated="scroll"
				curve="bezier"
				divCount={6}
				height="9rem"
				opacity={0.95}
				position="bottom"
				strength={1.6}
				target="parent"
				zIndex={5}
			/>
		</section>
	);
}
