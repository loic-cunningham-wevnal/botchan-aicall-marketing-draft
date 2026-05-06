"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import GradualBlur from "~/components/gradual-blur/gradual-blur";
import Device from "~/components/react-bits/device";
import PixelBlast from "~/components/react-bits/pixel-blast";
import { REST_BETWEEN_SCENARIOS_MS, SCENARIOS } from "~/constants/scenarios";
import { PhoneCallSimulation } from "../phone-call/phone-call-simulation";
import { ScenarioPicker } from "../phone-call/scenario-picker";

const SECTION_STYLE = { height: "180vh" } as const;
const PHONE_TRANSFORM_ORIGIN = { transformOrigin: "center" } as const;
const PHONE_INNER_STYLE = { transform: "scale(0.45)" } as const;

const STATS = [
	{ value: "再現", label: "匠の技をAIへ" },
	{ value: "自動", label: "構造化データ抽出" },
	{ value: "即時", label: "基幹システム連携" },
	{ value: "24/7/365", label: "稼働カバレッジ" },
];

export function SolutionBridgeSection() {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	const isDark = !mounted || resolvedTheme === "dark";

	// Demo state (lifted out of the old CallDemo wrapper so the phone and
	// picker can be positioned independently for the scroll animation).
	const [activeIndex, setActiveIndex] = useState(0);
	const [progress, setProgress] = useState(0);
	const scenario = SCENARIOS[activeIndex] ?? SCENARIOS[0];

	const handleScenarioComplete = useCallback(() => {
		const id = setTimeout(() => {
			setActiveIndex((i) => {
				// Advance to the next scenario, but stop at the last one — the
				// auto-loop was felt as "things keep re-animating". Manual
				// clicks on the picker still let users replay any scenario.
				const next = i + 1;
				return next >= SCENARIOS.length ? i : next;
			});
		}, REST_BETWEEN_SCENARIOS_MS);
		return () => clearTimeout(id);
	}, []);

	const handleSelect = useCallback((i: number) => {
		setActiveIndex(i);
		setProgress(0);
	}, []);

	// Scroll-pinned animation. The section is taller than one viewport so
	// the user can scroll through the transformation — the inner sticky box
	// stays pinned to the top while scroll progresses.
	const sectionRef = useRef<HTMLElement | null>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});
	// The transformation happens between 8% and 55% of the section's scroll.
	// Before 8% the user sees the initial 2-column layout; after 55% the
	// final layout is fully settled and the remaining ~45% of scroll lets
	// them dwell on the use-case picker before continuing.
	const animProgress = useTransform(scrollYProgress, [0.08, 0.55], [0, 1]);

	// Narrative — fades and slides out as the phone takes over.
	const narrativeOpacity = useTransform(animProgress, [0, 0.45], [1, 0]);
	const narrativeX = useTransform(animProgress, [0, 1], [0, -80]);

	// Phone — translates from the right column toward the left edge while
	// scaling up. -32vw lands the phone roughly at 1/4 of the viewport on
	// typical desktop widths.
	const phoneX = useTransform(animProgress, [0, 1], ["0vw", "-32vw"]);
	const phoneScale = useTransform(animProgress, [0, 1], [1, 1.55]);

	// Picker — appears once the phone has nearly finished moving.
	const pickerOpacity = useTransform(animProgress, [0.6, 1], [0, 1]);
	const pickerY = useTransform(animProgress, [0.6, 1], [40, 0]);

	// Background — fade the pixelated shader out as the phone settles into
	// its enlarged position. Past 60% of the animation it's fully gone.
	const bgOpacity = useTransform(animProgress, [0, 0.6], [1, 0]);

	if (!scenario) return null;

	return (
		<section
			className="relative isolate w-full bg-[var(--canvas)] text-[var(--ink)]"
			id="solution"
			ref={sectionRef}
			style={SECTION_STYLE}
		>
			<div className="sticky top-0 h-screen w-full overflow-hidden">
				{/* PixelBlast — color swaps per theme so the pixel pattern reads
				    on both white and black. Fades out as the phone settles in. */}
				<motion.div
					className="absolute inset-0 z-0"
					style={{ opacity: bgOpacity }}
				>
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
				</motion.div>

				{/* Wash for legibility — soft canvas gradient over the shader.
				    Tied to the same fade as the pixel pattern. */}
				<motion.div
					className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[var(--canvas)]/30 via-[var(--canvas)]/15 to-[var(--canvas)]/45"
					style={{ opacity: bgOpacity }}
				/>

				{/* Content grid — narrative left, phone right. Both children
				    consume scroll-driven motion values for the transformation. */}
				<div className="relative z-10 mx-auto grid h-full w-full max-w-[1400px] grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
					{/* Left — narrative; fades and slides out as the phone takes over. */}
					<motion.div
						className="flex flex-col items-start gap-[max(1rem,1.4vmax)]"
						style={{ opacity: narrativeOpacity, x: narrativeX }}
					>
						<p className="font-mono text-[10px] text-[var(--ink)]/60 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]">
							Solution · 03 — 24時間対応で匠の技をAIへ
						</p>
						<h2 className="max-w-[20ch] font-display font-semibold text-3xl text-[var(--ink)] leading-[1.05] tracking-[-0.03em] sm:text-4xl md:text-[max(2.6rem,3.2vmax)]">
							そのお悩み、BOTCHAN AICALLが解決します。
						</h2>
						<p className="max-w-[52ch] font-light text-[var(--ink)]/75 text-base leading-[1.6] sm:text-[max(0.95rem,1.02vmax)]">
							Goodオペレーターのナレッジを生成AIへ学習させ、会話接客データから構造化データを自動抽出。コール終了直後に、クライアント基幹システムへリアルタイム連携します。電話AIエージェントなら、24時間365日、匠の技の品質でインバウンドコールを自動化。
						</p>

						<div className="mt-[max(0.6rem,1vmax)] grid w-full grid-cols-2 gap-[max(0.6rem,0.8vmax)] border-[var(--rule)] border-t pt-[max(1rem,1.3vmax)] sm:grid-cols-4">
							{STATS.map((s) => (
								<div className="flex flex-col items-start gap-1" key={s.label}>
									<div className="font-display font-light text-[max(1rem,1.4vmax)] text-[var(--ink)] tabular-nums leading-none tracking-[-0.02em]">
										{s.value}
									</div>
									<div className="font-mono text-[10px] text-[var(--ink)]/60 uppercase leading-[1.4] tracking-[0.16em] sm:text-[max(0.65rem,0.72vmax)]">
										{s.label}
									</div>
								</div>
							))}
						</div>
					</motion.div>

					{/* Right — phone; translates left and scales up. The inner
					    div pre-scales the Device down to fit the layout slot. */}
					<motion.div
						className="relative flex w-full items-center justify-center"
						style={{
							x: phoneX,
							scale: phoneScale,
							...PHONE_TRANSFORM_ORIGIN,
						}}
					>
						<div className="relative h-[520px] w-[256px] lg:h-[578px] lg:w-[284px]">
							<div
								className="absolute top-0 left-0 origin-top-left lg:[transform:scale(0.5)]"
								style={PHONE_INNER_STYLE}
							>
								<Device
									autoAnimate={false}
									enableParallax={false}
									enableRotate={false}
									scale={1}
									variant={isDark ? "black" : "white"}
								>
									<PhoneCallSimulation
										onProgressChange={setProgress}
										onScenarioComplete={handleScenarioComplete}
										scenario={scenario}
									/>
								</Device>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Scenario picker — fades in once the phone has settled into
				    its enlarged left position. Anchored roughly to the
				    horizontal centre so it doesn't drift to the far right. */}
				<motion.div
					className="pointer-events-none absolute inset-0 z-20 mx-auto flex max-w-[1400px] items-center justify-end px-6 sm:px-8 lg:pr-[18vw]"
					style={{ opacity: pickerOpacity, y: pickerY }}
				>
					<div className="pointer-events-auto">
						<ScenarioPicker
							activeIndex={activeIndex}
							onSelect={handleSelect}
							progress={progress}
							scenarios={SCENARIOS}
						/>
					</div>
				</motion.div>

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
			</div>
		</section>
	);
}
