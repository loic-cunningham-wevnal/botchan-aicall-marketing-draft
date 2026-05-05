"use client";

import { memo } from "react";
import TextType from "~/components/react-bits/text-type";
import type { Turn } from "~/constants/scenarios";
import { SPEAKER_LABEL, SPEAKER_LABEL_CLASS } from "./constants";

function SpokenContentImpl({
	turn,
	done = false,
}: {
	turn: Turn;
	done?: boolean;
}) {
	if (turn.speaker === "tool") {
		return (
			<div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
				<span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1ed760]/15 text-[#1ed760] text-[11px] leading-none">
					✓
				</span>
				<span className="text-[18px] text-white/85 leading-none">
					{turn.text}
				</span>
				<span className="font-mono text-[#1ed760] text-[13px] uppercase tracking-[0.22em]">
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

	// Keep TextType mounted across the typing → done transition. Toggling
	// `showCursor` (rather than swapping in a plain <div>) avoids React
	// unmount/remount of the inner content, which was causing a one-frame
	// white-box flash whenever a message finished typing.
	return (
		<>
			<div
				className={`font-mono text-[16px] uppercase tracking-[0.22em] ${SPEAKER_LABEL_CLASS[turn.speaker]}`}
			>
				{SPEAKER_LABEL[turn.speaker]}
			</div>
			<TextType
				as="div"
				className={textClass}
				cursorCharacter="▍"
				cursorClassName={isAgent ? "text-[#0cf]" : "text-white"}
				initialDelay={isAgent ? 60 : 80}
				loop={false}
				showCursor={!done}
				text={turn.text}
				typingSpeed={isAgent ? 22 : 28}
				variableSpeed={isAgent ? { min: 14, max: 36 } : { min: 18, max: 48 }}
			/>
		</>
	);
}

export const SpokenContent = memo(SpokenContentImpl);
