"use client";

import { motion } from "motion/react";
import { memo } from "react";
import type { Scenario } from "~/constants/scenarios";

type ScenarioPickerProps = {
	scenarios: Scenario[];
	activeIndex: number;
	progress: number;
	onSelect: (index: number) => void;
};

const PROGRESS_TRANSITION = { duration: 0.3, ease: "linear" as const };

function ScenarioPickerImpl({
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
					{String(activeIndex + 1).padStart(2, "0")} /{" "}
					{String(scenarios.length).padStart(2, "0")}
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
							className={`pt-[6px] font-mono text-[14px] uppercase tabular-nums tracking-[0.22em] transition-colors ${numberClass}`}
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
								transition={PROGRESS_TRANSITION}
							/>
						</div>
					</button>
				);
			})}
		</div>
	);
}

export const ScenarioPicker = memo(ScenarioPickerImpl);
