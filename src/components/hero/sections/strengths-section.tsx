"use client";

import { motion } from "motion/react";
import { memo } from "react";
import AgenticBall from "~/components/react-bits/agentic-ball";
import LiquidLines from "~/components/react-bits/liquid-lines";
import { Portal } from "~/components/react-bits/portal";

const ease = [0.16, 1, 0.3, 1] as const;

const HEADER_INITIAL = { opacity: 0, y: 12 };
const HEADER_WHILEINVIEW = { opacity: 1, y: 0 };
const HEADER_TRANSITION = { duration: 0.6, ease };
const HEADER_VIEWPORT = { once: true, margin: "-15%" };

const CARD_INITIAL = { opacity: 0, y: 18 };
const CARD_WHILEINVIEW = { opacity: 1, y: 0 };
const CARD_HOVER = { y: -4 };
const CARD_TRANSITION = { duration: 0.6, ease };
const CARD_VIEWPORT = { once: true, margin: "-15%" };

const SCREEN_BLEND_STYLE = { mixBlendMode: "screen" as const };

export function StrengthsSection() {
	return (
		<section
			className="relative isolate w-full overflow-hidden bg-[var(--canvas)] px-4 py-20 text-[var(--ink)] sm:px-6 sm:py-28 lg:px-8"
			id="features"
		>
			<div className="mx-auto w-full max-w-[1400px]">
				<motion.div
					className="flex flex-col gap-3"
					initial={HEADER_INITIAL}
					transition={HEADER_TRANSITION}
					viewport={HEADER_VIEWPORT}
					whileInView={HEADER_WHILEINVIEW}
				>
					<p className="font-mono text-[10px] text-[var(--ink)]/60 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]">
						Features · 04 — 3つの強み
					</p>
					<h2 className="max-w-[22ch] font-display font-semibold text-3xl text-[var(--ink)] leading-[1.05] tracking-[-0.025em] sm:text-5xl md:text-6xl">
						一般的なボイスボット・IVR・汎用AIアシスタントとは、決定的に違います。
					</h2>
				</motion.div>

				<div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 lg:grid-cols-3">
					<StrengthCard
						body="Goodオペレーターが実際に応対したコール、トークスクリプト、エスカレーション基準、リカバリー対応をAIが学習。汎用ボットの声ではなく、貴社の匠の技をそのままお客様にお届けします。"
						count="01"
						title="Goodオペレーターのナレッジを忠実に再現。"
					>
						<Portal
							brightness={0.55}
							centerColor="#0cf"
							density={0.9}
							depthIntensity={0.6}
							layerCount={8}
							primaryColor="#0366f3"
							scale={1.6}
							secondaryColor="#0500e7"
							speed={0.16}
							verticalDistortion={1.3}
							waveAmplitude={1.2}
							waveFrequency={0.7}
						/>
					</StrengthCard>

					<StrengthCard
						body="CRM・ERP・OMS・WMSなど既存の基幹システムと、双方向のデータ同期をリアルタイムで実行。バッチ処理も夜間リコンサイルも、二重入力もすべて不要になります。"
						count="02"
						title="既存の基幹システムと柔軟にデータ連携。"
					>
						<LiquidLines
							brightness={1.4}
							darkBackground="#000000"
							lightBackground="#000000"
							lineColor="#0cf"
							opacity={1}
							speed={0.6}
						/>
					</StrengthCard>

					<StrengthCard
						body="独自技術VoiceRAG®がコール中に貴社のナレッジを参照し、会話の意図を瞬時に正確に理解。Goodオペレーターと同じ最適な対応を、AIが自動で選び続けます。"
						count="03"
						highlight="VoiceRAG®"
						title="VoiceRAG® — 会話の意図を瞬時に理解。"
					>
						<div className="absolute inset-0">
							<AgenticBall
								backgroundColor="#000000"
								brightness={2.0}
								color="#0500e7"
								complexity={4}
								hueRotation={3.0}
								saturation={1.4}
								speed={0.5}
								swirl={2.0}
								zoom={1.6}
							/>
						</div>
						<div
							className="pointer-events-none absolute inset-0"
							style={SCREEN_BLEND_STYLE}
						>
							<AgenticBall
								backgroundColor="#000000"
								brightness={1.8}
								color="#00ccff"
								complexity={5}
								hueRotation={3.25}
								opacity={0.7}
								saturation={1.5}
								speed={0.6}
								swirl={1.7}
								zoom={1.45}
							/>
						</div>
					</StrengthCard>
				</div>
			</div>
		</section>
	);
}

function StrengthCardImpl({
	count,
	title,
	body,
	highlight,
	children,
}: {
	count: string;
	title: string;
	body: string;
	highlight?: string;
	children: React.ReactNode;
}) {
	return (
		<motion.article
			className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--canvas)]"
			initial={CARD_INITIAL}
			transition={CARD_TRANSITION}
			viewport={CARD_VIEWPORT}
			whileHover={CARD_HOVER}
			whileInView={CARD_WHILEINVIEW}
		>
			<div className="relative aspect-[5/3] overflow-hidden">
				<div className="absolute inset-0">{children}</div>
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/55" />
				<span className="absolute top-4 left-4 font-mono text-[10px] text-white/95 uppercase tracking-[0.22em] [text-shadow:0_1px_8px_rgb(0_0_0/0.5)]">
					強み · {count}
				</span>
				{highlight && (
					<span className="absolute top-4 right-4 rounded-full bg-[#0cf]/15 px-2.5 py-1 font-mono text-[#0cf] text-[10px] uppercase tracking-[0.22em] backdrop-blur-md">
						{highlight}
					</span>
				)}
			</div>
			<div className="flex flex-col gap-3 bg-[var(--canvas)] p-6 sm:p-7">
				<h3 className="font-display font-semibold text-[var(--ink)] text-xl leading-[1.15] tracking-[-0.02em] sm:text-2xl">
					{title}
				</h3>
				<p className="font-light text-[var(--ink)]/70 text-sm leading-[1.55] sm:text-[max(0.95rem,1.02vmax)]">
					{body}
				</p>
			</div>
		</motion.article>
	);
}

const StrengthCard = memo(StrengthCardImpl);
