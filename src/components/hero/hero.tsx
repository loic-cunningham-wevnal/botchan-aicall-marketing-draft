"use client";

import { Download } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "next-themes";
import {
	type CSSProperties,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import Contact8 from "~/components/blocks/contact-8";
import Faq4 from "~/components/blocks/faq-4";
import Footer8 from "~/components/blocks/footer-8";
import HowItWorks4 from "~/components/blocks/how-it-works-4";
import Pricing8 from "~/components/blocks/pricing-8";
import ProofMetrics from "~/components/blocks/proof-metrics";
import SocialProof12 from "~/components/blocks/social-proof-12";
import GradualBlur from "~/components/gradual-blur/gradual-blur";
import { LocaleToggle } from "~/components/locale-toggle";
import AgenticBall from "~/components/react-bits/agentic-ball";
import BlurHighlight from "~/components/react-bits/blur-highlight";
import Device from "~/components/react-bits/device";
import GrainWave from "~/components/react-bits/grain-wave";
import AnimatedList, {
	type AnimatedListItem,
} from "~/components/react-bits/animated-list";
import LiquidLines from "~/components/react-bits/liquid-lines";
import PixelBlast from "~/components/react-bits/pixel-blast";
import { Portal } from "~/components/react-bits/portal";
import TextType from "~/components/react-bits/text-type";
import Orb from "~/components/orb/orb";
import { ThemeToggle } from "~/components/theme-toggle";
import { WevnalLogo } from "~/components/wevnal-logo";
import {
	estimateSpeakingMs,
	REST_BETWEEN_SCENARIOS_MS,
	type Scenario,
	SCENARIOS,
	type Speaker,
	type Turn,
} from "~/constants/scenarios";

const ease = [0.16, 1, 0.3, 1] as const;


const BUBBLE_CLASS: Record<Speaker, string> = {
	customer:
		"mr-auto max-w-[82%] rounded-2xl rounded-tl-sm border border-white/15 bg-black/55 px-5 py-3.5 backdrop-blur-xl",
	agent:
		"ml-auto max-w-[82%] rounded-2xl rounded-tr-sm border border-[#0cf]/35 bg-[#0cf]/10 px-5 py-3.5 backdrop-blur-md",
	// Tool calls render as a centred status row — no card chrome, just a
	// subtle inline event so the conversation stays the visual centre.
	tool: "mx-auto max-w-[92%] px-2 py-1",
};

const SPEAKER_LABEL: Record<Speaker, string> = {
	customer: "お客様",
	agent: "BOTCHAN",
	tool: "TOOL",
};

const SPEAKER_LABEL_CLASS: Record<Speaker, string> = {
	customer: "text-white/55",
	agent: "text-[#0cf]",
	tool: "text-white/55",
};

const SPEAKER_DOT_CLASS: Record<Speaker, string> = {
	customer: "bg-white/65",
	agent: "bg-[#0cf]",
	tool: "bg-white/55",
};

const THINKING_LABEL: Record<Speaker, string> = {
	customer: "発話中",
	agent: "思考中",
	tool: "実行中",
};

function ThinkingDots({ turn }: { turn: Turn }) {
	const speaker = turn.speaker;

	if (speaker === "tool") {
		return (
			<div className="flex items-center justify-center gap-3">
				<motion.span
					animate={{ rotate: 360 }}
					className="block h-3 w-3 rounded-full border border-[#0cf]/30 border-t-[#0cf]"
					transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
				/>
				<span className="text-[18px] text-white/75 leading-none">
					{turn.text}
				</span>
				<span className="font-mono text-[13px] text-[#0cf] uppercase tracking-[0.22em]">
					実行中
				</span>
			</div>
		);
	}

	const dotClass = SPEAKER_DOT_CLASS[speaker];
	return (
		<>
			<div
				className={`font-mono text-[16px] uppercase tracking-[0.22em] ${SPEAKER_LABEL_CLASS[speaker]}`}
			>
				{SPEAKER_LABEL[speaker]} · {THINKING_LABEL[speaker]}
			</div>
			<div className="mt-2 flex items-end gap-1.5">
				{[0, 1, 2].map((i) => (
					<motion.span
						animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
						className={`block h-2 w-2 rounded-full ${dotClass}`}
						// biome-ignore lint/suspicious/noArrayIndexKey: stable list
						key={i}
						transition={{
							duration: 0.9,
							repeat: Infinity,
							ease: "easeInOut",
							delay: i * 0.12,
						}}
					/>
				))}
			</div>
		</>
	);
}

function SpokenContent({ turn, done = false }: { turn: Turn; done?: boolean }) {
	if (turn.speaker === "tool") {
		return (
			<div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
				<span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1ed760]/15 text-[11px] text-[#1ed760] leading-none">
					✓
				</span>
				<span className="text-[18px] text-white/85 leading-none">
					{turn.text}
				</span>
				<span className="font-mono text-[13px] text-[#1ed760] uppercase tracking-[0.22em]">
					完了
				</span>
				{turn.toolResult ? (
					<span className="text-[16px] text-white/55 leading-none">
						— {turn.toolResult}
					</span>
				) : null}
			</div>
		);
	}

	const isAgent = turn.speaker === "agent";
	const textClass = `mt-1.5 block text-[24px] leading-[1.32] ${
		isAgent ? "text-[#0cf]" : "text-white"
	}`;

	return (
		<>
			<div
				className={`font-mono text-[16px] uppercase tracking-[0.22em] ${SPEAKER_LABEL_CLASS[turn.speaker]}`}
			>
				{SPEAKER_LABEL[turn.speaker]}
			</div>
			{done ? (
				<div className={textClass}>{turn.text}</div>
			) : (
				<TextType
					as="div"
					className={textClass}
					cursorCharacter="▍"
					cursorClassName={isAgent ? "text-[#0cf]" : "text-white"}
					initialDelay={isAgent ? 60 : 80}
					loop={false}
					showCursor
					text={turn.text}
					typingSpeed={isAgent ? 22 : 28}
					variableSpeed={
						isAgent ? { min: 14, max: 36 } : { min: 18, max: 48 }
					}
				/>
			)}
		</>
	);
}


const fmtClock = (totalSeconds: number) => {
	const m = Math.floor(totalSeconds / 60);
	const s = totalSeconds % 60;
	return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

type PhoneCallSimulationProps = {
	scenario: Scenario;
	onProgressChange: (progress: number) => void;
	onScenarioComplete: () => void;
};

function PhoneCallSimulation({
	scenario,
	onProgressChange,
	onScenarioComplete,
}: PhoneCallSimulationProps) {
	const [items, setItems] = useState<AnimatedListItem[]>([]);
	const [seconds, setSeconds] = useState(0);
	// Speaker currently producing output; "idle" between calls. Drives the
	// orb's hover state.
	const [activeSpeaker, setActiveSpeaker] = useState<Speaker | "idle">(
		"idle",
	);
	const [callRunning, setCallRunning] = useState(true);

	// Tick the call timer once per second while the call is in progress.
	// Pauses (freezes) once the scenario completes — the parent's 5s gap and
	// the next-scenario reset bring us back to 00:00.
	useEffect(() => {
		if (!callRunning) return;
		const id = setInterval(() => setSeconds((s) => s + 1), 1000);
		return () => clearInterval(id);
	}, [callRunning]);

	// Conversation orchestrator. Walks the active scenario one turn at a
	// time: thinking placeholder → typing → static (cursor only on the active
	// bubble). Same id across phases keeps the wrapper stable so framer's
	// layout animation handles size changes smoothly.
	useEffect(() => {
		let cancelled = false;
		const acc: AnimatedListItem[] = [];
		const turns = scenario.turns;

		setItems([]);
		setSeconds(0);
		setCallRunning(true);
		setActiveSpeaker("idle");
		onProgressChange(0);

		const sleep = (ms: number) =>
			new Promise<void>((resolve) => setTimeout(resolve, ms));
		const slice = (arr: AnimatedListItem[]) => arr.slice(-4);

		(async () => {
			for (let i = 0; i < turns.length; i++) {
				const turn = turns[i];
				if (!turn) continue;

				// Phase A — thinking/listening placeholder.
				setActiveSpeaker(turn.speaker);
				acc.push({
					id: turn.id,
					className: BUBBLE_CLASS[turn.speaker],
					content: <ThinkingDots turn={turn} />,
				});
				setItems(slice(acc));
				onProgressChange((i + 0.25) / turns.length);
				await sleep(turn.thinkingMs);
				if (cancelled) return;

				// Phase B — typing/spoken (TextType blinks while typing).
				acc[acc.length - 1] = {
					id: turn.id,
					className: BUBBLE_CLASS[turn.speaker],
					content: <SpokenContent turn={turn} />,
				};
				setItems(slice(acc));

				const speakingMs = estimateSpeakingMs(turn);
				await sleep(speakingMs);
				if (cancelled) return;

				// Phase C — done. Static text so only the next (active) bubble
				// shows a blinking cursor.
				acc[acc.length - 1] = {
					id: turn.id,
					className: BUBBLE_CLASS[turn.speaker],
					content: <SpokenContent turn={turn} done />,
				};
				setItems(slice(acc));
				onProgressChange((i + 1) / turns.length);

				await sleep(turn.postMs ?? 400);
				if (cancelled) return;
			}

			// Scenario complete — freeze the orb and timer, hand off to parent.
			setActiveSpeaker("idle");
			setCallRunning(false);
			onProgressChange(1);
			if (cancelled) return;
			onScenarioComplete();
		})();

		return () => {
			cancelled = true;
		};
	}, [scenario, onProgressChange, onScenarioComplete]);

	return (
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

			{/* Caller block — phone number on top, live timer pill underneath. */}
			<div className="absolute top-[10%] right-0 left-0 z-20 flex flex-col items-center gap-3 px-6 text-center">
				<span className="font-display font-semibold text-[48px] leading-none tracking-[-0.02em]">
					{scenario.callerNumber}
				</span>
				<span className="rounded-full border border-[#0cf]/40 bg-[#0cf]/10 px-5 py-1.5 font-mono text-[22px] text-[#0cf] uppercase tabular-nums tracking-[0.22em]">
					着信 · {fmtClock(seconds)}
				</span>
			</div>

			{/* Central orb — pulses when idle; flips into hover state while
			    the agent is speaking so the shader visibly "comes alive". */}
			<div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
				<motion.div
					animate={{ scale: [1, 1.05, 1, 1.03, 1] }}
					className="relative aspect-square w-[88%]"
					transition={{
						duration: 3.6,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<Orb
						backgroundColor="#000000"
						forceHoverState={activeSpeaker === "agent"}
						hoverIntensity={0.55}
						hue={0}
						rotateOnHover
					/>
				</motion.div>
			</div>

			{/* Conversation transcript — controlled list, chat-style append. */}
			<div className="absolute top-[26%] right-6 bottom-[14%] left-6 z-20">
				<AnimatedList
					animationType="slide"
					appendNewItems
					autoAddDelay={0}
					enterFrom="bottom"
					fadeBottom={false}
					fadeColor="#000000"
					fadeEdgeSize={48}
					height="100%"
					itemGap={16}
					items={items}
					maxItems={4}
					startFrom="top"
				/>
			</div>

			{/* Brand footer — Powered by AICALL | Wevnal. */}
			<div className="absolute right-0 bottom-[5%] left-0 z-20 flex items-center justify-center gap-4">
				<span className="font-mono text-[15px] text-white/45 uppercase tracking-[0.22em]">
					Powered by
				</span>
				<span className="font-mono text-[15px] text-white/85 uppercase tracking-[0.22em]">
					AICALL
				</span>
				<span className="h-3 w-px bg-white/25" />
				<WevnalLogo className="h-[22px] text-white/85" />
			</div>
		</div>
	);
}

type ScenarioPickerProps = {
	scenarios: Scenario[];
	activeIndex: number;
	progress: number;
	onSelect: (index: number) => void;
};

function ScenarioPicker({
	scenarios,
	activeIndex,
	progress,
	onSelect,
}: ScenarioPickerProps) {
	return (
		<div className="flex w-full max-w-[420px] flex-col self-center lg:self-start lg:pt-16">
			{/* Header — small mono label, active/total counter on the right.
			    Brutal: no decoration, just a hairline rule below. */}
			<div className="flex items-baseline justify-between border-[var(--ink)]/15 border-b pb-4">
				<span className="font-mono text-[14px] text-[var(--ink)]/50 uppercase tracking-[0.28em]">
					Use Cases
				</span>
				<span className="font-mono text-[14px] text-[var(--ink)]/30 uppercase tabular-nums tracking-[0.22em]">
					{String(activeIndex + 1).padStart(2, "0")} / {String(scenarios.length).padStart(2, "0")}
				</span>
			</div>

			{scenarios.map((s, i) => {
				const isActive = i === activeIndex;
				const fill = isActive ? Math.max(0, Math.min(1, progress)) : 0;
				const numberClass = isActive
					? "text-[var(--ink)]"
					: "text-[var(--ink)]/30 group-hover:text-[var(--ink)]/55";
				const titleClass = isActive
					? "text-[var(--ink)]"
					: "text-[var(--ink)]/45 group-hover:text-[var(--ink)]/75";
				const subtitleClass = isActive
					? "text-[var(--ink)]/55"
					: "text-[var(--ink)]/30 group-hover:text-[var(--ink)]/45";
				return (
					<button
						className="group relative grid w-full grid-cols-[52px_1fr] gap-x-5 py-6 text-left transition-colors"
						key={s.id}
						onClick={() => onSelect(i)}
						type="button"
					>
						<span
							className={`pt-[6px] font-mono text-[14px] tabular-nums uppercase tracking-[0.22em] transition-colors ${numberClass}`}
						>
							{String(i + 1).padStart(2, "0")}
						</span>
						<div className="flex flex-col gap-2.5">
							<span
								className={`font-display font-semibold text-[26px] leading-none tracking-[-0.01em] transition-colors ${titleClass}`}
							>
								{s.title}
							</span>
							<span
								className={`font-mono text-[12px] uppercase tracking-[0.22em] transition-colors ${subtitleClass}`}
							>
								{s.subtitle}
							</span>
						</div>

						{/* Bottom hairline doubles as the progress bar — grey trough
						    spanning the row, white fill that grows on the active row. */}
						<div className="absolute right-0 bottom-0 left-0 h-px bg-[var(--ink)]/15">
							<motion.div
								animate={{ width: `${fill * 100}%` }}
								className="h-full bg-[var(--ink)]"
								initial={false}
								transition={{ duration: 0.3, ease: "linear" }}
							/>
						</div>
					</button>
				);
			})}
		</div>
	);
}


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
				<Pricing8 />
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
			{/* Orb — primary visual */}
			<motion.div
				animate={{ opacity: 1 }}
				className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-[1] aspect-square w-[min(85vh,90vw)]"
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
			style={{ height: "180vh" }}
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
						</div>
					</motion.div>

					{/* Right — phone; translates left and scales up. The inner
					    div pre-scales the Device down to fit the layout slot. */}
					<motion.div
						className="relative flex w-full items-center justify-center"
						style={{
							x: phoneX,
							scale: phoneScale,
							transformOrigin: "center",
						}}
					>
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

