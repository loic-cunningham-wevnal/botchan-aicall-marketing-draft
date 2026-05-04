"use client";

import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";
import Stats9 from "~/components/blocks/stats-9";

const ease = [0.16, 1, 0.3, 1] as const;

type Tier = {
	name: string;
	tagline: string;
	pitch: string;
	features: string[];
	cta: string;
	popular?: boolean;
};

const TIERS: Tier[] = [
	{
		name: "PoC",
		tagline: "効果検証",
		pitch: "本格導入前に、貴社のトラフィックで効果を実証します。",
		features: [
			"月100コールまで",
			"基本シナリオ × 1",
			"基本データ連携",
			"2週間の効果検証",
		],
		cta: "お見積り",
	},
	{
		name: "スタンダード",
		tagline: "人気プラン",
		pitch: "月間数千コール規模の運用に最適なプラン。",
		features: [
			"月5,000コールまで",
			"シナリオ × 3まで",
			"標準API連携",
			"月次パフォーマンスレポート",
		],
		cta: "お見積り",
		popular: true,
	},
	{
		name: "エンタープライズ",
		tagline: "カスタム規模",
		pitch: "カスタム連携・ガバナンス・ルーティングに対応。",
		features: [
			"コール数 無制限",
			"カスタムシナリオ",
			"フルカスタム連携",
			"専任サポート",
		],
		cta: "セールスに相談",
	},
];

export default function Pricing8() {
	return (
		<section
			className="relative isolate w-full bg-[var(--canvas)] px-4 py-20 text-[var(--ink)] sm:px-6 sm:py-28 lg:px-8"
			id="pricing"
		>
			<div className="mx-auto w-full max-w-[1400px]">
				{/* Header — left-aligned to match the rest of the page */}
				<motion.div
					className="flex flex-col items-start gap-4"
					initial={{ opacity: 0, y: 12 }}
					transition={{ duration: 0.6, ease }}
					viewport={{ once: true, margin: "-15%" }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<p className="font-mono text-[10px] text-[var(--ink)]/60 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]">
						Pricing · 11 — 料金プラン
					</p>
					<h2 className="font-display font-semibold text-4xl text-[var(--ink)] leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-[max(3.4rem,4.2vmax)]">
						コールセンターに払うか。{" "}
						<span className="text-[var(--ink)]/40">AICALLに払うか。</span>
					</h2>
				</motion.div>

				{/* Interactive cost-of-ownership viz */}
				<div className="mt-10 sm:mt-14">
					<Stats9 />
				</div>

				{/* Section divider — leading into the 3 tiers */}
				<motion.div
					className="mt-12 flex flex-col items-start gap-3 sm:mt-16"
					initial={{ opacity: 0, y: 10 }}
					transition={{ duration: 0.5, ease, delay: 0.1 }}
					viewport={{ once: true, margin: "-15%" }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<p className="font-mono text-[10px] text-[var(--ink)]/55 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]">
						プラン · コール量に合わせてお選びください
					</p>
				</motion.div>

				{/* 3 plan cards */}
				<div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
					{TIERS.map((t, i) => (
						<motion.article
							className={
								t.popular
									? "relative flex flex-col gap-6 rounded-2xl border border-[#0cf] bg-black p-7 text-white shadow-[0_0_0_1px_rgba(0,204,255,0.4),0_24px_60px_-24px_rgba(0,204,255,0.45)] sm:p-8"
									: "relative flex flex-col gap-6 rounded-2xl border border-[var(--rule)] bg-[var(--canvas)] p-7 sm:p-8"
							}
							initial={{ opacity: 0, y: 18 }}
							key={t.name}
							transition={{ duration: 0.6, ease, delay: 0.08 * i }}
							viewport={{ once: true, margin: "-15%" }}
							whileInView={{ opacity: 1, y: 0 }}
						>
							{t.popular && (
								<span className="-top-3 absolute right-7 rounded-full bg-[#0cf] px-2.5 py-1 font-mono text-[10px] text-black uppercase tracking-[0.22em]">
									人気プラン
								</span>
							)}

							<div className="flex flex-col gap-2">
								<span
									className={
										t.popular
											? "font-mono text-[10px] text-[#0cf] uppercase tracking-[0.22em]"
											: "font-mono text-[10px] text-[var(--ink)]/55 uppercase tracking-[0.22em]"
									}
								>
									P / {String(i + 1).padStart(2, "0")} · {t.tagline}
								</span>
								<h3
									className={
										t.popular
											? "font-display font-semibold text-3xl text-white tracking-[-0.025em] sm:text-4xl"
											: "font-display font-semibold text-3xl text-[var(--ink)] tracking-[-0.025em] sm:text-4xl"
									}
								>
									{t.name}
								</h3>
							</div>

							<p
								className={
									t.popular
										? "max-w-[36ch] font-light text-sm text-white/80 leading-[1.55]"
										: "max-w-[36ch] font-light text-[var(--ink)]/72 text-sm leading-[1.55]"
								}
							>
								{t.pitch}
							</p>

							<ul
								className={
									t.popular
										? "flex flex-col gap-2 border-white/15 border-t pt-5"
										: "flex flex-col gap-2 border-[var(--rule)] border-t pt-5"
								}
							>
								{t.features.map((f) => (
									<li
										className={
											t.popular
												? "flex items-start gap-2.5 text-sm text-white/90"
												: "flex items-start gap-2.5 text-[var(--ink)]/85 text-sm"
										}
										key={f}
									>
										<Check
											className="mt-0.5 h-4 w-4 shrink-0 text-[#0cf]"
											strokeWidth={2.5}
										/>
										{f}
									</li>
								))}
							</ul>

							<a
								className={
									t.popular
										? "mt-auto inline-flex items-center justify-between gap-2 rounded-full bg-white px-4 py-3 font-mono text-[10px] text-neutral-900 uppercase tracking-[0.18em] transition-colors hover:bg-neutral-100"
										: "mt-auto inline-flex items-center justify-between gap-2 rounded-full bg-[var(--ink)] px-4 py-3 font-mono text-[var(--canvas)] text-[10px] uppercase tracking-[0.18em] transition-opacity hover:opacity-85"
								}
								href="#contact"
							>
								<span>{t.cta}</span>
								<ArrowRight className="h-3.5 w-3.5" />
							</a>
						</motion.article>
					))}
				</div>

				{/* Footer microcopy */}
				<motion.p
					className="mt-10 text-center font-mono text-[10px] text-[var(--ink)]/55 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]"
					initial={{ opacity: 0 }}
					transition={{ duration: 0.5, ease, delay: 0.3 }}
					viewport={{ once: true }}
					whileInView={{ opacity: 1 }}
				>
					価格はすべて担当CSリードがお見積り · 公開価格はございません
				</motion.p>
			</div>
		</section>
	);
}
