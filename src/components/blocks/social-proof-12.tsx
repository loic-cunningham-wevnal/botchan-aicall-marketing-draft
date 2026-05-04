"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { type ReactNode, useState } from "react";
import DitherWave from "~/components/react-bits/dither-wave";
import LiquidBars from "~/components/react-bits/liquid-bars";
import LiquidLines from "~/components/react-bits/liquid-lines";
import SilkWaves from "~/components/react-bits/silk-waves";

type UseCase = {
	industry: string;
	subtitle: string;
	calls: string[];
	effect: string;
	render: (active: boolean) => ReactNode;
};

const useCases: UseCase[] = [
	{
		industry: "EC・通販業界",
		subtitle: "高頻度・反復的・業務クリティカル",
		calls: [
			"注文ステータス確認",
			"配送先変更",
			"キャンセル受付",
		],
		effect:
			"夜間の応答率は100%に近づき、顧客満足度は向上、コスト削減は当初想定を上回ります。",
		render: (active) => (
			<LiquidLines
				brightness={1.4}
				darkBackground="#000000"
				lightBackground="#000000"
				lineColor="#0cf"
				opacity={1}
				speed={active ? 0.7 : 0}
			/>
		),
	},
	{
		industry: "通販・サブスク業界",
		subtitle: "解約阻止と継続フロー",
		calls: [
			"解約阻止トークスクリプト",
			"継続・アップセルご提案",
			"リピート顧客への推奨",
		],
		effect:
			"オペレーター不在の時間帯でも解約阻止フローが稼働。設計したリテンション施策が、実際にコール上で実行されます。",
		render: (active) => (
			<LiquidBars
				barCount={5}
				color="#0366f3"
				edgeHighlight={0.05}
				edgeSoftness={0.18}
				edgeWidth={0.55}
				fresnelIntensity={0.3}
				gapDarkness={0.6}
				highlightWarmth={0.2}
				metallicContrast={0.55}
				opacity={1}
				refractionStrength={3}
				refractionWaveFrequency={6}
				refractionWaveSpeed={1}
				reflectionFrequency={5}
				scale={0.7}
				speed={active ? 0.45 : 0}
				streakIntensity={0.04}
				waveAmplitude={1.05}
				waveComplexity={1.4}
			/>
		),
	},
	{
		industry: "美容・医療業界",
		subtitle: "人の時間を守る予約ワークフロー",
		calls: [
			"予約受付・予約変更",
			"予約キャンセル",
			"顧客情報連動レコメンド",
		],
		effect:
			"スタッフの負担は減り、複雑な問い合わせには人が集中。離職率は下がり、繊細な対応はそのまま人の手に残ります。",
		render: (active) => (
			<SilkWaves
				colors={[
					"#0500e7",
					"#0a1aff",
					"#0366f3",
					"#1e6df3",
					"#1ea0f3",
					"#00ccff",
					"#7be1ff",
					"#bff2ff",
				]}
				opacity={1}
				speed={active ? 0.6 : 0}
			/>
		),
	},
	{
		industry: "インフラ・物流業界",
		subtitle: "基幹データに紐づく事務的な電話業務",
		calls: [
			"契約内容確認",
			"住所変更",
			"解約対応・ステータス更新",
		],
		effect:
			"基幹システム連携は容易になり、二重入力はゼロに。業務効率は大幅に向上します。",
		render: (active) => (
			<DitherWave
				opacity={1}
				primaryColor="#0500e7"
				secondaryColor="#0366f3"
				speed={active ? 1 : 0}
				tertiaryColor="#00ccff"
			/>
		),
	},
];

function UseCaseCard({ data, index }: { data: UseCase; index: number }) {
	const [active, setActive] = useState(false);

	return (
		<motion.button
			className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl bg-black text-left sm:aspect-[16/10]"
			initial={{ opacity: 0, y: 20 }}
			onBlur={() => setActive(false)}
			onFocus={() => setActive(true)}
			onMouseEnter={() => setActive(true)}
			onMouseLeave={() => setActive(false)}
			transition={{ duration: 0.5, delay: 0.08 * index }}
			type="button"
			viewport={{ once: true }}
			whileHover={{ y: -4 }}
			whileInView={{ opacity: 1, y: 0 }}
		>
			<div aria-hidden="true" className="absolute inset-0">
				{data.render(active)}
			</div>

			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/75"
			/>

			<div className="relative flex h-full flex-col justify-between p-5 sm:p-7">
				<div className="flex flex-col gap-1 [text-shadow:0_1px_12px_rgb(0_0_0/0.6)]">
					<span className="font-mono text-[10px] text-white/85 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]">
						活用シーン · {String(index + 1).padStart(2, "0")}
					</span>
					<span className="mt-1 font-display font-semibold text-white text-xl tracking-[-0.02em] sm:text-2xl md:text-3xl">
						{data.industry}
					</span>
					<span className="font-mono text-[10px] text-white/65 uppercase tracking-[0.22em]">
						{data.subtitle}
					</span>
				</div>

				<div className="flex flex-col gap-3">
					<ul className="flex flex-wrap gap-1.5">
						{data.calls.map((c) => (
							<li
								className="rounded-full border border-white/25 bg-black/40 px-2.5 py-1 font-mono text-[10px] text-white/85 uppercase tracking-[0.18em] backdrop-blur-md"
								key={c}
							>
								{c}
							</li>
						))}
					</ul>
					<div className="flex items-end justify-between gap-4">
						<p className="max-w-md font-light text-sm text-white leading-snug [text-shadow:0_1px_12px_rgb(0_0_0/0.7)] sm:text-[max(0.9rem,1vmax)]">
							{data.effect}
						</p>
						<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/15 shadow-lg backdrop-blur-md transition-colors group-hover:border-white group-hover:bg-white sm:h-12 sm:w-12">
							<ArrowUpRight
								className="h-4 w-4 text-white transition-colors group-hover:text-neutral-900 sm:h-5 sm:w-5"
								strokeWidth={1.8}
							/>
						</span>
					</div>
				</div>
			</div>
		</motion.button>
	);
}

export default function SocialProof12() {
	return (
		<section
			className="flex w-full items-start bg-[var(--canvas)] px-4 py-16 text-[var(--ink)] sm:px-6 sm:py-24 lg:px-8"
			id="cases"
		>
			<div className="mx-auto w-full max-w-[1400px]">
				<motion.div
					className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
					initial={{ opacity: 0, y: 12 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<div className="flex flex-col gap-3">
						<p className="font-mono text-[10px] text-[var(--ink)]/60 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]">
							Cases · 06 — 主な活用シーン
						</p>
						<h2 className="max-w-[24ch] font-display font-semibold text-3xl text-[var(--ink)] tracking-[-0.025em] sm:text-5xl md:text-6xl">
							貴社の業務を、そのままAIエージェントに当てはめる。
						</h2>
					</div>
					<motion.a
						className="inline-flex cursor-pointer items-center justify-center self-start rounded-full bg-[var(--ink)] px-5 py-2.5 font-mono text-[var(--canvas)] text-[10px] uppercase tracking-[0.22em] transition-opacity hover:opacity-85 sm:self-auto sm:text-[max(0.7rem,0.8vmax)]"
						href="#contact"
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.97 }}
					>
						貴社向けデモを依頼
					</motion.a>
				</motion.div>

				<div className="mt-10 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
					{useCases.map((u, i) => (
						<UseCaseCard data={u} index={i} key={u.industry} />
					))}
				</div>
			</div>
		</section>
	);
}
