"use client";

import { motion } from "motion/react";
import { memo, useEffect, useState } from "react";
import Orb from "~/components/orb/orb";
import AnimatedList, {
	type AnimatedListItem,
} from "~/components/react-bits/animated-list";
import { WevnalLogo } from "~/components/wevnal-logo";
import {
	estimateSpeakingMs,
	type Scenario,
	type Speaker,
} from "~/constants/scenarios";
import { BUBBLE_CLASS } from "./constants";
import { SpokenContent } from "./spoken-content";
import { ThinkingDots } from "./thinking-dots";
import { fmtClock } from "./utils";

type PhoneCallSimulationProps = {
	scenario: Scenario;
	onProgressChange: (progress: number) => void;
	onScenarioComplete: () => void;
};

// Pulse keyframes for the central orb. Hoisted out of the component so the
// motion API doesn't need to re-allocate the array on every render.
const ORB_PULSE_ANIMATE = { scale: [1, 1.05, 1, 1.03, 1] };
const ORB_PULSE_TRANSITION = {
	duration: 3.6,
	repeat: Infinity,
	ease: "easeInOut" as const,
};

function PhoneCallSimulationImpl({
	scenario,
	onProgressChange,
	onScenarioComplete,
}: PhoneCallSimulationProps) {
	const [items, setItems] = useState<AnimatedListItem[]>([]);
	const [seconds, setSeconds] = useState(0);
	// Speaker currently producing output; "idle" between calls. Drives the
	// orb's hover state.
	const [activeSpeaker, setActiveSpeaker] = useState<Speaker | "idle">("idle");
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
					content: <SpokenContent done turn={turn} />,
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
				<span className="rounded-full border border-[#0cf]/40 bg-[#0cf]/10 px-5 py-1.5 font-mono text-[#0cf] text-[22px] uppercase tabular-nums tracking-[0.22em]">
					着信 · {fmtClock(seconds)}
				</span>
			</div>

			{/* Central orb — pulses when idle; flips into hover state while
			    the agent is speaking so the shader visibly "comes alive". */}
			<div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
				<motion.div
					animate={ORB_PULSE_ANIMATE}
					className="relative aspect-square w-[88%]"
					transition={ORB_PULSE_TRANSITION}
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

export const PhoneCallSimulation = memo(PhoneCallSimulationImpl);
