"use client";

import { Download } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { type CSSProperties, useEffect, useState } from "react";
import Contact8 from "~/components/blocks/contact-8";
import Faq4 from "~/components/blocks/faq-4";
import Footer8 from "~/components/blocks/footer-8";
import HowItWorks4 from "~/components/blocks/how-it-works-4";
import ProofMetrics from "~/components/blocks/proof-metrics";
import SocialProof12 from "~/components/blocks/social-proof-12";
import GradualBlur from "~/components/gradual-blur/gradual-blur";
import { LocaleToggle } from "~/components/locale-toggle";
import AgenticBall from "~/components/react-bits/agentic-ball";
import BlurHighlight from "~/components/react-bits/blur-highlight";
import Device from "~/components/react-bits/device";
import GrainWave from "~/components/react-bits/grain-wave";
import LiquidLines from "~/components/react-bits/liquid-lines";
import PixelBlast from "~/components/react-bits/pixel-blast";
import { Portal } from "~/components/react-bits/portal";
import { ThemeToggle } from "~/components/theme-toggle";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
	return (
		<>
			<HeroOrbSection />
			<div className="relative">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-y-0 left-[max(0.5rem,calc((100vw-1400px)/2-1rem))] z-30 w-px sm:left-[max(0.75rem,calc((100vw-1400px)/2-1.25rem))] lg:left-[max(1rem,calc((100vw-1400px)/2-1.5rem))]"
					style={{
						backgroundImage:
							"linear-gradient(to bottom, rgb(127 127 127 / 0.36) 0, rgb(127 127 127 / 0.36) 6px, transparent 6px, transparent 12px)",
						backgroundSize: "1px 12px",
						backgroundRepeat: "repeat-y",
						WebkitMaskImage:
							"linear-gradient(to bottom, transparent 0, black 8rem, black calc(100% - 8rem), transparent 100%)",
						maskImage:
							"linear-gradient(to bottom, transparent 0, black 8rem, black calc(100% - 8rem), transparent 100%)",
					}}
				/>
				<ProblemSection />
				<ProofMetrics />
				<SolutionBridgeSection />
				<StrengthsSection />
				<SocialProof12 />
				<HowItWorks4 />
				<Faq4 />
				<Contact8 />
			</div>
			<Footer8 />
		</>
	);
}

/* -------------------------------------------------------------------------- */
/*  01 — Hero: brand, primary promise, dual CTAs, patent badge.               */
/* -------------------------------------------------------------------------- */

function HeroOrbSection() {
	return (
		<section className="relative isolate h-dvh w-full overflow-hidden bg-[var(--canvas)] text-[var(--ink)]">
			{/* Portal — primary visual */}
			<motion.div
				animate={{ opacity: 1 }}
				className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-[1] aspect-square w-[min(85vh,90vw)]"
				initial={{ opacity: 0 }}
				transition={{ duration: 1.4, ease }}
			>
				<Portal
					brightness={0.5}
					centerColor="#0cf"
					density={1.0}
					depthIntensity={0.65}
					layerCount={10}
					primaryColor="#0366f3"
					scale={2.0}
					secondaryColor="#0500e7"
					speed={0.1}
					verticalDistortion={1.5}
					waveAmplitude={1.3}
					waveFrequency={0.75}
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
						className="rounded-sm bg-[var(--ink)] px-[max(1.6rem,2.2vmax)] py-[max(0.7rem,0.85vmax)] font-medium text-[max(0.7rem,0.78vmax)] text-[var(--canvas)] uppercase tracking-[0.18em] transition-opacity duration-200 hover:opacity-85"
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
				<div className="font-mono text-[max(0.7rem,0.85vmax)] text-[var(--ink)]/85 uppercase leading-[1.6] tracking-[0.22em]">
					電話AIエージェント
					<br />
					BOTCHAN AICALL · 株式会社wevnal
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

function WordmarkInner({ glow }: { glow?: boolean }) {
	const baseStyle: CSSProperties = {
		color: "var(--ink)",
		...(glow && {
			textShadow:
				"0 0 18px rgba(0, 200, 255, 0.55), 0 0 60px rgba(3, 102, 243, 0.45), 0 0 120px rgba(5, 0, 231, 0.35)",
		}),
	};
	return (
		<>
			<motion.h1
				animate={{ opacity: 1, y: 0, letterSpacing: "-0.06em" }}
				className="font-display font-black text-[clamp(3rem,12vw,12rem)] lowercase leading-[0.85]"
				initial={{ opacity: 0, y: 18, letterSpacing: "-0.02em" }}
				style={baseStyle}
				transition={{ duration: 1.1, ease, delay: 0.35 }}
			>
				botchan
			</motion.h1>
			<motion.h2
				animate={{ opacity: 1, y: 0, letterSpacing: "-0.04em" }}
				className="mt-[-0.04em] font-display font-black uppercase leading-[0.85]"
				initial={{ opacity: 0, y: -18, letterSpacing: "0.04em" }}
				style={{ ...baseStyle, fontSize: "clamp(3rem, 12vw, 12rem)" }}
				transition={{ duration: 1.1, ease, delay: 0.5 }}
			>
				AICALL
			</motion.h2>
		</>
	);
}

/* -------------------------------------------------------------------------- */
/*  04 — Problem recognition: BlurHighlight on the buyer's pain.              */
/* -------------------------------------------------------------------------- */

const PROBLEMS = [
	{
		text: "オペレーター不足で受電率は下がり続け、人件費・採用育成コストは利益を削り続ける。",
		highlights: ["受電率は下がり", "人件費・採用育成コスト"],
	},
	{
		text: "営業時間外のコールには出られない。オペレーターが退勤した瞬間に顧客体験は崩れる。いまや24時間365日が当たり前のサービス水準。",
		highlights: ["営業時間外", "24時間365日"],
	},
	{
		text: "応対品質は熟練オペレーターに依存し、退職とともに外へ出ていく。ナレッジは蓄積されず、属人化のまま蒸発していく。",
		highlights: ["属人化", "蒸発"],
	},
];

function ProblemSection() {
	return (
		<section
			className="relative isolate w-full overflow-hidden bg-[var(--canvas)] px-4 py-24 text-[var(--ink)] sm:px-6 sm:py-32 lg:px-8 lg:py-40"
			id="problem"
		>
			{/* GrainWave — brand-blue grain ribbons, masked to the bottom-right
			    so the BlurHighlight typography on the left stays unimpeded. */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 z-0"
				style={{
					maskImage:
						"radial-gradient(ellipse 85% 90% at 90% 85%, black 5%, transparent 80%)",
					WebkitMaskImage:
						"radial-gradient(ellipse 85% 90% at 90% 85%, black 5%, transparent 80%)",
				}}
			>
				<GrainWave
					brightness={1.4}
					darkBackground="#000000"
					endColor="#0500e7"
					grainIntensity={48}
					lightBackground="#f3ede1"
					lineThickness={0.22}
					scale={0.6}
					speed={0.45}
					speedVariation={0.006}
					startColor="#00ccff"
					waveAmplitude={0.9}
					waveCount={26}
					waveFrequency={3.8}
					waveWidth={3.5}
				/>
			</div>

			<div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-[max(2rem,3.5vmax)]">
				<motion.div
					className="flex flex-col gap-3"
					initial={{ opacity: 0, y: 12 }}
					transition={{ duration: 0.6, ease }}
					viewport={{ once: true, margin: "-15%" }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<p className="font-mono text-[10px] text-[var(--ink)]/60 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]">
						Problems · 01 — こんなお悩み、ありませんか？
					</p>
				</motion.div>

				<div className="flex flex-col gap-[max(1.4rem,2.2vmax)]">
					{PROBLEMS.map((point, i) => (
						<BlurHighlight
							blurAmount={6}
							blurDelay={0.05}
							blurDuration={0.7}
							className="font-display font-semibold text-[var(--ink)] text-[max(1.6rem,2.4vmax)] leading-[1.15] tracking-[-0.02em]"
							highlightClassName="px-1 text-black"
							highlightColor="#00ccff"
							highlightDelay={0.25 + i * 0.05}
							highlightDirection="left"
							highlightDuration={0.9}
							highlightedBits={point.highlights}
							inactiveOpacity={0.18}
							key={point.text}
							viewportOptions={{ once: true, amount: 0.4 }}
						>
							{point.text}
						</BlurHighlight>
					))}
				</div>
			</div>
		</section>
	);
}

/* -------------------------------------------------------------------------- */
/*  05 — Solution bridge: PixelBlast reveal — "BOTCHAN AICALL solves this".   */
/* -------------------------------------------------------------------------- */

function SolutionBridgeSection() {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	const isDark = !mounted || resolvedTheme === "dark";

	return (
		<section
			className="relative isolate w-full overflow-hidden bg-[var(--canvas)] text-[var(--ink)]"
			id="solution"
		>
			{/* PixelBlast — color swaps per theme so the pixel pattern reads on both white and black. */}
			<div className="absolute inset-0 z-0">
				<PixelBlast
					color={isDark ? "#00ccff" : "#0a66c2"}
					edgeFade={0.4}
					enableRipples
					liquid
					liquidRadius={1.2}
					liquidStrength={0.12}
					liquidWobbleSpeed={5}
					patternDensity={isDark ? 1.7 : 1.1}
					patternScale={2.5}
					pixelSize={6}
					pixelSizeJitter={0.5}
					rippleIntensityScale={1.6}
					rippleSpeed={0.4}
					rippleThickness={0.12}
					speed={0.6}
					transparent
					variant="circle"
				/>
			</div>

			{/* Wash for legibility — soft canvas gradient over the shader. */}
			<div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[var(--canvas)]/30 via-[var(--canvas)]/15 to-[var(--canvas)]/45" />

			<div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-10">
				{/* Left — narrative */}
				<div className="flex flex-col items-start gap-[max(1rem,1.4vmax)]">
					<motion.p
						className="font-mono text-[10px] text-[var(--ink)]/60 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]"
						initial={{ opacity: 0, y: 12 }}
						transition={{ duration: 0.6, ease }}
						viewport={{ once: true, margin: "-15%" }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						Solution · 03 — 24時間対応で匠の技をAIへ
					</motion.p>
					<motion.h2
						className="max-w-[20ch] font-display font-semibold text-3xl text-[var(--ink)] leading-[1.05] tracking-[-0.03em] sm:text-4xl md:text-[max(2.6rem,3.2vmax)]"
						initial={{ opacity: 0, y: 16 }}
						transition={{ duration: 0.8, ease, delay: 0.05 }}
						viewport={{ once: true, margin: "-15%" }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						そのお悩み、BOTCHAN AICALLが解決します。
					</motion.h2>
					<motion.p
						className="max-w-[52ch] font-light text-[var(--ink)]/75 text-base leading-[1.6] sm:text-[max(0.95rem,1.02vmax)]"
						initial={{ opacity: 0, y: 16 }}
						transition={{ duration: 0.8, ease, delay: 0.12 }}
						viewport={{ once: true, margin: "-15%" }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						Goodオペレーターのナレッジを生成AIへ学習させ、会話接客データから構造化データを自動抽出。コール終了直後に、クライアント基幹システムへリアルタイム連携します。電話AIエージェントなら、24時間365日、匠の技の品質でインバウンドコールを自動化。
					</motion.p>

					<motion.div
						className="mt-[max(0.6rem,1vmax)] grid w-full grid-cols-2 gap-[max(0.6rem,0.8vmax)] border-[var(--rule)] border-t pt-[max(1rem,1.3vmax)] sm:grid-cols-4"
						initial={{ opacity: 0, y: 12 }}
						transition={{ duration: 0.7, ease, delay: 0.2 }}
						viewport={{ once: true, margin: "-15%" }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						{[
							{ value: "再現", label: "匠の技をAIへ" },
							{ value: "自動", label: "構造化データ抽出" },
							{ value: "即時", label: "基幹システム連携" },
							{ value: "24/7/365", label: "稼働カバレッジ" },
						].map((s) => (
							<div className="flex flex-col items-start gap-1" key={s.label}>
								<div className="font-display font-light text-[max(1rem,1.4vmax)] text-[var(--ink)] tabular-nums leading-none tracking-[-0.02em]">
									{s.value}
								</div>
								<div className="font-mono text-[10px] text-[var(--ink)]/60 uppercase leading-[1.4] tracking-[0.16em] sm:text-[max(0.65rem,0.72vmax)]">
									{s.label}
								</div>
							</div>
						))}
					</motion.div>
				</div>

				{/* Right — phone visual. Outer wrapper has explicit scaled dimensions; inner box transforms from top-left so the column actually collapses to the visible phone size (Device's `scale` prop is a CSS transform that doesn't shrink the layout box). */}
				<motion.div
					className="relative flex w-full items-center justify-center"
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.9, ease, delay: 0.15 }}
					viewport={{ once: true, margin: "-15%" }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					{/* Width = 568 * 0.45 = 256, height = 1155 * 0.45 = 520. */}
					<div className="relative h-[520px] w-[256px] lg:h-[578px] lg:w-[284px]">
						<div
							className="absolute top-0 left-0 origin-top-left lg:[transform:scale(0.5)]"
							style={{ transform: "scale(0.45)" }}
						>
							<Device
								autoAnimate={false}
								enableParallax={false}
								enableRotate={false}
								scale={1}
							>
							<div className="relative h-full w-full bg-black text-white">
								{/* Status bar — clears the device's curved bezel + dynamic island */}
								<div className="absolute top-0 right-0 left-0 z-20 flex items-center justify-between px-10 pt-14 font-mono text-[20px] text-white/85 uppercase tracking-[0.18em]">
									<span className="tabular-nums">9:41</span>
									<span className="flex items-center gap-2.5">
										<span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#1ed760]" />
										<span>稼働中</span>
									</span>
									<span>5G</span>
								</div>

								{/* Caller block — top section */}
								<div className="absolute top-[10%] right-0 left-0 z-20 flex flex-col items-center gap-4 px-6 text-center">
									<span className="rounded-full border border-[#0cf]/40 bg-[#0cf]/10 px-5 py-1.5 font-mono text-[22px] text-[#0cf] uppercase tracking-[0.22em]">
										着信 · 00:14
									</span>
									<span className="font-display font-semibold text-[64px] leading-none tracking-[-0.02em]">
										+81 3 ••• ••71
									</span>
									<span className="font-mono text-[22px] text-white/70 uppercase tracking-[0.18em]">
										再コール · CRM照合済
									</span>
								</div>

								{/* Portal — flex-centered. The `[&_canvas]` rule forces the inner Three.js canvas to fill the box (without it, Portal sizes the canvas to the *post-CSS-scale* getBoundingClientRect width and pins it to top-left). */}
								<div className="absolute inset-0 z-10 flex items-center justify-center">
									<motion.div
										animate={{ scale: [1, 1.05, 1, 1.03, 1] }}
										className="relative aspect-square w-[88%] [&_canvas]:!h-full [&_canvas]:!w-full"
										transition={{
											duration: 3.6,
											repeat: Infinity,
											ease: "easeInOut",
										}}
									>
										<Portal
											brightness={0.7}
											centerColor="#0cf"
											density={1.1}
											depthIntensity={0.7}
											layerCount={10}
											primaryColor="#0366f3"
											scale={2}
											secondaryColor="#0500e7"
											speed={0.2}
											verticalDistortion={1.4}
											waveAmplitude={1.3}
											waveFrequency={0.75}
										/>
									</motion.div>
								</div>

								{/* Listening label — sits just below the portal */}
								<div className="absolute top-[78%] right-0 left-0 z-20 flex flex-col items-center gap-2">
									<div
										aria-hidden="true"
										className="flex items-end gap-[5px]"
									>
										{[0.4, 0.7, 1.0, 0.85, 0.55, 0.95, 0.7, 1.0, 0.6, 0.8, 0.45].map(
											(h, i) => (
												<motion.span
													animate={{
														scaleY: [h * 0.4, h, h * 0.5, h * 0.9, h * 0.4],
													}}
													className="block w-[5px] origin-bottom rounded-full bg-[#0cf]"
													// biome-ignore lint/suspicious/noArrayIndexKey: stable list
													key={i}
													style={{ height: `${32 * h + 10}px` }}
													transition={{
														duration: 1.4 + (i % 3) * 0.2,
														repeat: Infinity,
														ease: "easeInOut",
														delay: i * 0.05,
													}}
												/>
											),
										)}
									</div>
									<span className="font-mono text-[17px] text-white/65 uppercase tracking-[0.22em]">
										エージェント · 応対中
									</span>
								</div>

								{/* Live transcript — lower band */}
								<div className="absolute right-6 bottom-[18%] left-6 z-20 rounded-2xl border border-white/15 bg-black/70 p-4 backdrop-blur-md">
									<div className="font-mono text-[15px] text-white/55 uppercase tracking-[0.22em]">
										会話の意図
									</div>
									<div className="mt-1.5 text-[24px] text-white leading-[1.3]">
										「金曜日に配送日を変更したい。」
									</div>
								</div>

								{/* CRM sync chip — bottom */}
								<div className="absolute right-6 bottom-[5%] left-6 z-20 flex items-center gap-3 rounded-2xl border border-[#0cf]/35 bg-[#0cf]/10 px-4 py-3 backdrop-blur-md">
									<span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-[#0cf]" />
									<div className="flex-1">
										<div className="font-mono text-[15px] text-[#0cf] uppercase tracking-[0.22em]">
											CRM · OMS · WMS 同期済
										</div>
										<div className="mt-0.5 text-[22px] text-white leading-tight">
											注文 #4471 — 配送日を更新。
										</div>
									</div>
								</div>
							</div>
						</Device>
						</div>
					</div>
				</motion.div>
			</div>

			<GradualBlur
				animated="scroll"
				curve="bezier"
				divCount={5}
				height="6rem"
				opacity={0.9}
				position="bottom"
				strength={1.4}
				target="parent"
				zIndex={5}
			/>
		</section>
	);
}

/* -------------------------------------------------------------------------- */
/*  06 — Three strengths: feature differentiation cards.                      */
/* -------------------------------------------------------------------------- */

function StrengthsSection() {
	return (
		<section
			className="relative isolate w-full overflow-hidden bg-[var(--canvas)] px-4 py-20 text-[var(--ink)] sm:px-6 sm:py-28 lg:px-8"
			id="features"
		>
			<div className="mx-auto w-full max-w-[1400px]">
				<motion.div
					className="flex flex-col gap-3"
					initial={{ opacity: 0, y: 12 }}
					transition={{ duration: 0.6, ease }}
					viewport={{ once: true, margin: "-15%" }}
					whileInView={{ opacity: 1, y: 0 }}
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
							style={{ mixBlendMode: "screen" }}
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

function StrengthCard({
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
			initial={{ opacity: 0, y: 18 }}
			transition={{ duration: 0.6, ease }}
			viewport={{ once: true, margin: "-15%" }}
			whileHover={{ y: -4 }}
			whileInView={{ opacity: 1, y: 0 }}
		>
			<div className="relative aspect-[5/3] overflow-hidden">
				<div className="absolute inset-0">{children}</div>
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/55" />
				<span className="absolute top-4 left-4 font-mono text-[10px] text-white/95 uppercase tracking-[0.22em] [text-shadow:0_1px_8px_rgb(0_0_0/0.5)]">
					強み · {count}
				</span>
				{highlight && (
					<span className="absolute top-4 right-4 rounded-full bg-[#0cf]/15 px-2.5 py-1 font-mono text-[10px] text-[#0cf] uppercase tracking-[0.22em] backdrop-blur-md">
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

