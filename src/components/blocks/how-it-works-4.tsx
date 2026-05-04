"use client";

import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Beams from "~/components/Beams";

const stages = [
	{
		label: "STEP 01",
		title: "ご相談・お問い合わせ。",
		items: [
			"シニアCSエンジニアとの30分ヒアリング。スライドデッキは不要です",
			"貴社の課題・制約・現場が抱える運用負荷を率直にお聞きします",
			"5営業日以内に、貴社向けの導入プランをご提案",
		],
	},
	{
		label: "STEP 02",
		title: "デモ & お見積り。",
		items: [
			"貴社の実コールデータで、効果検証を実施",
			"コール量と連携要件に応じた最適プランをご提示",
			"見積・スコープ・SLAを書面でご回答",
		],
	},
	{
		label: "STEP 03",
		title: "本契約・環境構築。",
		items: [
			"貴社のナレッジベースに基づき、AIシナリオを設計",
			"CRM・ERP・OMS・WMS・ECカートとの基幹システム連携を構築",
			"本番稼働前にシャドウラン・エスカレーション基準を合意",
		],
	},
	{
		label: "STEP 04",
		title: "運用開始・サポート。",
		items: [
			"24/7モニタリング、エスカレーションパスを常時稼働",
			"CSリードによる定期チューニングレビューをSLAに明記",
			"四半期ごとの事業レビューで、KPIと成果を継続トラッキング",
		],
	},
];

export default function HowItWorks4() {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	const isDark = !mounted || resolvedTheme === "dark";

	return (
		<section
			className="relative isolate flex w-full items-start overflow-hidden bg-[var(--canvas)] px-4 py-16 text-[var(--ink)] sm:px-6 sm:py-24 lg:px-8"
			id="implementation"
		>
			{/* Beams texture — directional light streaks. Colors swap per theme. */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 z-0"
			>
				<Beams
					backgroundColor={isDark ? "#000000" : "#ffffff"}
					beamColor={isDark ? "#000000" : "#e6f4ff"}
					beamHeight={20}
					beamNumber={14}
					beamWidth={2.4}
					lightColor={isDark ? "#0cf" : "#0a66c2"}
					noiseIntensity={isDark ? 1.5 : 0.6}
					rotation={28}
					scale={0.22}
					speed={1.6}
				/>
			</div>

			{/* Wash so copy and cards stay readable on the beams. */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[var(--canvas)]/45 via-[var(--canvas)]/25 to-[var(--canvas)]/55"
			/>

			<div className="relative z-10 mx-auto w-full max-w-[1400px]">
				<motion.div
					className="flex flex-col items-start gap-4"
					initial={{ opacity: 0, y: 14 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<p className="font-mono text-[10px] text-[var(--ink)]/60 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]">
						Implementation · 06 — 導入までの流れ
					</p>
					<h2 className="max-w-[26ch] font-display font-semibold text-3xl text-[var(--ink)] leading-[1.05] tracking-[-0.025em] sm:text-5xl md:text-6xl">
						導入はおひとりで進めなくて結構です。診断から運用最適化まで、専任CSが伴走します。
					</h2>
					<p className="max-w-[58ch] text-[var(--ink)]/70 text-sm leading-[1.55] sm:text-[max(0.9rem,1vmax)]">
						BOTCHAN AICALLの全契約には、担当CSリードが付きます。ご相談、デモ、構築、本番稼働、定期チューニング——成果はSLAに明記します。
					</p>
					<a
						className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--ink)]/75 uppercase tracking-[0.22em] transition-colors hover:text-[var(--ink)] sm:text-[max(0.7rem,0.8vmax)]"
						href="#contact"
					>
						担当CSリードに会う <ArrowRight className="h-3.5 w-3.5" />
					</a>
				</motion.div>

				<div className="relative mt-12 sm:mt-16">
					<div className="grid grid-cols-2 items-center gap-3 sm:grid-cols-4">
						{stages.map((s, i) => (
							<motion.div
								className="flex justify-center"
								initial={{ opacity: 0, y: 12 }}
								key={s.label}
								transition={{ duration: 0.4, delay: 0.1 * i }}
								viewport={{ once: true }}
								whileInView={{ opacity: 1, y: 0 }}
							>
								<span className="rounded-md border border-[var(--rule)] bg-[var(--canvas)]/65 px-4 py-1.5 font-mono text-[10px] text-[var(--ink)] uppercase tracking-[0.22em] backdrop-blur-md sm:text-[max(0.7rem,0.8vmax)]">
									{s.label}
								</span>
							</motion.div>
						))}
					</div>

					<div className="relative mt-5 hidden h-3 items-center sm:flex">
						<div className="absolute right-[12.5%] left-[12.5%] h-px bg-[var(--rule)]" />
						{stages.map((s, i) => (
							<motion.span
								className="absolute h-2.5 w-2.5 rounded-full border-2 border-[var(--ink)]/55 bg-[var(--canvas)]"
								initial={{ scale: 0 }}
								key={s.label}
								style={{ left: `calc(${12.5 + 25 * i}% - 5px)` }}
								transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
								viewport={{ once: true }}
								whileInView={{ scale: 1 }}
							/>
						))}
					</div>
				</div>

				<div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
					{stages.map((s, i) => (
						<motion.div
							className="flex flex-col gap-4 rounded-xl border border-[var(--rule)] bg-[var(--canvas)]/70 p-6 backdrop-blur-xl"
							initial={{ opacity: 0, y: 20 }}
							key={s.label}
							transition={{ duration: 0.5, delay: 0.1 * i }}
							viewport={{ once: true }}
							whileInView={{ opacity: 1, y: 0 }}
						>
							<h3 className="font-display font-semibold text-[var(--ink)] text-lg tracking-[-0.015em]">
								{s.title}
							</h3>
							<ul className="flex flex-col gap-2.5">
								{s.items.map((item) => (
									<li
										className="flex items-start gap-2 text-[var(--ink)]/75 text-sm leading-[1.5]"
										key={item}
									>
										<Check
											className="mt-0.5 h-4 w-4 shrink-0 text-[#0cf]"
											strokeWidth={2.5}
										/>
										{item}
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
