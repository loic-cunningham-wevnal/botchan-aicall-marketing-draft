"use client";

import {
	Flower2,
	Hexagon,
	type LucideIcon,
	Plus,
	Radio,
	Triangle,
	Waves,
} from "lucide-react";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const METRICS = [
	{
		value: "99.8",
		suffix: "%",
		label: "応答率",
		caption: "24時間365日、ほぼすべてのインバウンドコールに応答。",
	},
	{
		value: "40",
		suffix: "%",
		label: "コスト削減",
		caption: "AIがコールキューを担うことで、コールセンター運営費を最適化。",
	},
	{
		value: "85",
		suffix: "%",
		label: "自動化率",
		caption: "有人オペレーターを介さず、AIだけでコールを完結。",
	},
];

const SPONSORS: { name: string; Icon: LucideIcon }[] = [
	{ name: "Northwave", Icon: Waves },
	{ name: "Sakura Mobility", Icon: Flower2 },
	{ name: "Meridian Care", Icon: Plus },
	{ name: "Pacific Telco", Icon: Radio },
	{ name: "Hokuto Clinic", Icon: Hexagon },
	{ name: "Daichi Retail", Icon: Triangle },
];

export default function ProofMetrics() {
	return (
		<section
			className="relative isolate w-full overflow-hidden bg-[var(--canvas)] px-4 py-24 text-[var(--ink)] sm:px-6 sm:py-28 lg:px-8"
			id="proof"
		>
			<div className="relative z-10 mx-auto w-full max-w-[1280px]">
				{/* Header */}
				<motion.div
					className="flex max-w-[820px] flex-col items-start gap-5"
					initial={{ opacity: 0, y: 12 }}
					transition={{ duration: 0.6, ease }}
					viewport={{ once: true, margin: "-15%" }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<p className="font-mono text-[10px] text-[var(--ink)]/55 uppercase tracking-[0.22em] sm:text-[11px]">
						Proof · 02 — 導入企業が到達している実数値
					</p>
					<h2 className="max-w-[28ch] text-balance font-display font-semibold text-3xl text-[var(--ink)] leading-[1.08] tracking-[-0.025em] sm:text-4xl md:text-[max(2.4rem,3vmax)]">
						大胆なAIの約束を、現場が数字で承認できる成果へ。
					</h2>
					<p className="max-w-[58ch] font-light text-[var(--ink)]/65 text-base leading-[1.55] sm:text-[max(0.95rem,1vmax)]">
						BOTCHAN AICALLが、いまこの瞬間も読み上げている数字。
					</p>
				</motion.div>

				{/* Editorial stat row — pure typography, no cards. Each metric is
				    just text with a thin divider that animates in. */}
				<div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 sm:mt-20 md:grid-cols-3 md:gap-x-10 lg:gap-x-16">
					{METRICS.map((m, i) => (
						<motion.div
							className="flex flex-col gap-5"
							initial={{ opacity: 0, y: 16 }}
							key={m.label}
							transition={{
								delay: 0.1 + i * 0.1,
								duration: 0.7,
								ease,
							}}
							viewport={{ once: true, margin: "-10%" }}
							whileInView={{ opacity: 1, y: 0 }}
						>
							{/* Index ticker */}
							<span className="font-mono text-[10px] text-[var(--ink)]/45 uppercase tabular-nums tracking-[0.22em]">
								{String(i + 1).padStart(2, "0")} / 03
							</span>

							{/* Big number — typographic, no chrome */}
							<div className="flex items-baseline gap-2">
								<span className="font-display font-light text-[clamp(4.5rem,9vw,8rem)] text-[var(--ink)] tabular-nums leading-[0.85] tracking-[-0.045em]">
									{m.value}
								</span>
								<span className="font-display font-light text-[var(--brand-orange)] text-[clamp(1.6rem,3vw,2.6rem)] leading-none tracking-[-0.02em]">
									{m.suffix}
								</span>
							</div>

							{/* Animated hairline */}
							<motion.div
								className="h-px w-full origin-left bg-[var(--ink)]/25"
								initial={{ scaleX: 0 }}
								transition={{
									delay: 0.3 + i * 0.12,
									duration: 0.9,
									ease,
								}}
								viewport={{ once: true }}
								whileInView={{ scaleX: 1 }}
							/>

							{/* Label + caption */}
							<div className="flex flex-col gap-1.5">
								<span className="font-display font-medium text-[var(--ink)] text-base tracking-[-0.01em]">
									{m.label}
								</span>
								<p className="max-w-[28ch] font-light text-[13px] text-[var(--ink)]/60 leading-[1.55]">
									{m.caption}
								</p>
							</div>
						</motion.div>
					))}
				</div>

				{/* Sponsor strip — same section, no separate background or chrome.
				    Just an editorial caption + a quiet row of named operators. */}
				<motion.div
					className="mt-20 flex flex-col gap-6 border-[var(--rule)] border-t pt-10 sm:mt-24 lg:mt-28"
					initial={{ opacity: 0, y: 12 }}
					transition={{ duration: 0.6, ease, delay: 0.1 }}
					viewport={{ once: true, margin: "-10%" }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<p className="font-mono text-[10px] text-[var(--ink)]/55 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]">
						月間数百万件のインバウンドコールを扱う現場で稼働中
					</p>
					<ul className="flex flex-wrap items-center gap-x-8 gap-y-4 sm:gap-x-10 lg:gap-x-12">
						{SPONSORS.map(({ name, Icon }, i) => (
							<motion.li
								className="flex items-center gap-2 text-[var(--ink)]/55 transition-colors duration-200 hover:text-[var(--ink)]"
								initial={{ opacity: 0 }}
								key={name}
								transition={{
									duration: 0.4,
									delay: 0.15 + i * 0.05,
									ease,
								}}
								viewport={{ once: true }}
								whileInView={{ opacity: 1 }}
							>
								<Icon className="h-4 w-4 shrink-0" strokeWidth={1.6} />
								<span className="font-display font-medium text-[13px] tracking-[-0.005em] sm:text-sm">
									{name}
								</span>
							</motion.li>
						))}
					</ul>
				</motion.div>
			</div>
		</section>
	);
}
