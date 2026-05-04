"use client";

import { animate, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const COST_PER_CALL = 500; // industry avg yen / call (operator labor + ops overhead)
const MONTHS = 12;
const MIN_CALLS = 500;
const MAX_CALLS = 100_000;
const DEFAULT_CALLS = 5_000;

function formatCalls(v: number): string {
	if (v >= 1_000) return `${(v / 1_000).toFixed(v >= 10_000 ? 0 : 1)}K`;
	return String(Math.round(v));
}

function formatYen(v: number): string {
	return `¥${Math.round(v).toLocaleString()}`;
}

export default function Stats9() {
	const [calls, setCalls] = useState<number>(DEFAULT_CALLS);

	const annualCost = calls * MONTHS * COST_PER_CALL;
	const fteEquivalent = Math.max(1, Math.round(calls / 800)); // ~24/7 coverage estimate
	const percent = ((calls - MIN_CALLS) / (MAX_CALLS - MIN_CALLS)) * 100;

	const bigRef = useRef<HTMLSpanElement | null>(null);
	const fteRef = useRef<HTMLSpanElement | null>(null);
	const callsRef = useRef<HTMLSpanElement | null>(null);
	const badgeRef = useRef<HTMLSpanElement | null>(null);
	const prevCost = useRef(annualCost);
	const prevFte = useRef(fteEquivalent);
	const prevCalls = useRef(calls);

	useEffect(() => {
		if (!bigRef.current) return;
		const el = bigRef.current;
		const c = animate(prevCost.current, annualCost, {
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1],
			onUpdate: (v) => {
				el.textContent = formatYen(v);
			},
		});
		prevCost.current = annualCost;
		return () => c.stop();
	}, [annualCost]);

	useEffect(() => {
		if (!fteRef.current) return;
		const el = fteRef.current;
		const c = animate(prevFte.current, fteEquivalent, {
			duration: 0.4,
			ease: [0.22, 1, 0.36, 1],
			onUpdate: (v) => {
				el.textContent = String(Math.round(v));
			},
		});
		prevFte.current = fteEquivalent;
		return () => c.stop();
	}, [fteEquivalent]);

	useEffect(() => {
		if (!callsRef.current) return;
		const el = callsRef.current;
		const c = animate(prevCalls.current, calls, {
			duration: 0.3,
			ease: [0.22, 1, 0.36, 1],
			onUpdate: (v) => {
				el.textContent = formatCalls(v);
			},
		});
		if (badgeRef.current) {
			const b = badgeRef.current;
			const cb = animate(prevCalls.current, calls, {
				duration: 0.3,
				ease: [0.22, 1, 0.36, 1],
				onUpdate: (v) => {
					b.textContent = formatCalls(v);
				},
			});
			prevCalls.current = calls;
			return () => {
				c.stop();
				cb.stop();
			};
		}
		prevCalls.current = calls;
		return () => c.stop();
	}, [calls]);

	return (
		<div className="mx-auto w-full max-w-[760px] overflow-hidden rounded-2xl border border-white/15 bg-black/40 backdrop-blur-md">
			{/* Header — slider with inline volume readout */}
			<div className="flex flex-col gap-5 border-white/10 border-b px-7 py-6 sm:px-9 sm:py-7">
				<div className="flex items-baseline justify-between gap-4">
					<span className="font-mono text-[10px] text-white/55 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]">
						貴社のインバウンドコール量
					</span>
					<span className="font-mono text-[10px] text-white/55 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]">
						業界平均 ¥{COST_PER_CALL} / コール
					</span>
				</div>

				<div className="flex items-baseline gap-2">
					<span
						className="font-display font-semibold text-3xl text-white tabular-nums tracking-[-0.025em] sm:text-4xl"
						ref={callsRef}
					>
						{formatCalls(calls)}
					</span>
					<span className="font-mono text-[10px] text-white/55 uppercase tracking-[0.22em]">
						コール / 月
					</span>
				</div>

				<div className="relative pt-3">
					<div className="h-[2px] rounded-full bg-white/15" />
					<div
						className="-mt-px absolute top-3 left-0 h-[2px] rounded-full bg-[#0cf]"
						style={{ width: `${percent}%` }}
					/>
					<div
						className="-mt-2 -ml-2.5 absolute top-3"
						style={{ left: `${percent}%` }}
					>
						<div className="relative">
							<span
								className="-top-9 -translate-x-1/2 absolute left-1/2 whitespace-nowrap rounded-full bg-[#0cf] px-2.5 py-0.5 font-mono text-[10px] text-black tabular-nums tracking-[0.18em]"
								ref={badgeRef}
							>
								{formatCalls(calls)}
							</span>
							<div className="h-5 w-5 rounded-full border-2 border-black bg-white shadow-md" />
						</div>
					</div>
					<input
						aria-label="月間インバウンドコール数"
						className="absolute inset-0 w-full cursor-pointer opacity-0"
						max={MAX_CALLS}
						min={MIN_CALLS}
						onChange={(e) => setCalls(Number(e.target.value))}
						step={500}
						type="range"
						value={calls}
					/>
				</div>

				<div className="flex items-center justify-between font-mono text-[10px] text-white/45 uppercase tabular-nums tracking-[0.22em]">
					<span>{formatCalls(MIN_CALLS)}</span>
					<span>{formatCalls(MAX_CALLS)}+</span>
				</div>
			</div>

			{/* Result — big animated yen */}
			<motion.div
				className="flex flex-col items-center gap-2 px-7 py-10 text-center sm:px-9 sm:py-11"
				initial={{ opacity: 0 }}
				transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
				viewport={{ once: true }}
				whileInView={{ opacity: 1 }}
			>
				<span className="font-mono text-[10px] text-white/55 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]">
					コールセンター運用に必要な年間コスト
				</span>
				<div className="flex items-baseline gap-1.5">
					<span
						className="font-display font-semibold text-[clamp(3rem,6.5vw,5rem)] text-white tabular-nums leading-[0.95] tracking-[-0.035em]"
						ref={bigRef}
					>
						{formatYen(annualCost)}
					</span>
					<span className="font-mono text-[10px] text-white/55 uppercase tracking-[0.22em]">
						/ 年
					</span>
				</div>
				<span className="mt-1 font-mono text-[10px] text-white/55 uppercase tracking-[0.22em]">
					≈{" "}
					<span className="text-[#0cf] tabular-nums" ref={fteRef}>
						{fteEquivalent}
					</span>{" "}
					人 オペレーターFTE（24時間365日体制）· 業界平均 ¥{COST_PER_CALL}/コール
				</span>
			</motion.div>
		</div>
	);
}
