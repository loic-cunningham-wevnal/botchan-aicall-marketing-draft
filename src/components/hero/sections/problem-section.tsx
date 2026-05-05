"use client";

import { motion } from "motion/react";
import BlurHighlight from "~/components/react-bits/blur-highlight";
import GrainWave from "~/components/react-bits/grain-wave";

const ease = [0.16, 1, 0.3, 1] as const;

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

const GRAIN_MASK_IMAGE =
	"radial-gradient(ellipse 85% 90% at 90% 85%, black 5%, transparent 80%)";
const GRAIN_MASK_STYLE = {
	maskImage: GRAIN_MASK_IMAGE,
	WebkitMaskImage: GRAIN_MASK_IMAGE,
};

const HEADER_INITIAL = { opacity: 0, y: 12 };
const HEADER_WHILEINVIEW = { opacity: 1, y: 0 };
const HEADER_TRANSITION = { duration: 0.6, ease };
const HEADER_VIEWPORT = { once: true, margin: "-15%" };

const BLUR_VIEWPORT = { once: true, amount: 0.4 };

export function ProblemSection() {
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
				style={GRAIN_MASK_STYLE}
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
					initial={HEADER_INITIAL}
					transition={HEADER_TRANSITION}
					viewport={HEADER_VIEWPORT}
					whileInView={HEADER_WHILEINVIEW}
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
							className="font-display font-semibold text-[max(1.6rem,2.4vmax)] text-[var(--ink)] leading-[1.15] tracking-[-0.02em]"
							highlightClassName="px-1 text-black"
							highlightColor="#00ccff"
							highlightDelay={0.25 + i * 0.05}
							highlightDirection="left"
							highlightDuration={0.9}
							highlightedBits={point.highlights}
							inactiveOpacity={0.18}
							key={point.text}
							viewportOptions={BLUR_VIEWPORT}
						>
							{point.text}
						</BlurHighlight>
					))}
				</div>
			</div>
		</section>
	);
}
