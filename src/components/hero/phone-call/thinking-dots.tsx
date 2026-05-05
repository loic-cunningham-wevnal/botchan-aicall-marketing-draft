"use client";

import { motion } from "motion/react";
import { memo } from "react";
import type { Turn } from "~/constants/scenarios";
import {
	SPEAKER_DOT_CLASS,
	SPEAKER_LABEL,
	SPEAKER_LABEL_CLASS,
	THINKING_LABEL,
} from "./constants";

function ThinkingDotsImpl({ turn }: { turn: Turn }) {
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
				<span className="font-mono text-[#0cf] text-[13px] uppercase tracking-[0.22em]">
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

export const ThinkingDots = memo(ThinkingDotsImpl);
