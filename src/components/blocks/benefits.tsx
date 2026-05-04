"use client";

import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const BENEFITS = [
	{
		index: "B / 01",
		title: "Goodオペレーター品質の音声応対を、すべてのコールで。",
		body: "コール全体で一貫した標準化された応対品質を実現。誰が出るかで品質が左右されることはなくなり、トップオペレーターの匠の技がすべてのコールに行き渡ります。",
		bullets: ["一貫した品質", "属人化の解消", "応対の標準化"],
	},
	{
		index: "B / 02",
		title: "24時間365日、いつでもお客様の声に応える。",
		body: "即時応対で、営業時間外の空白も、月曜朝の積み残しコールもなくなります。アフターアワーズは、もうアフターサービスではありません。",
		bullets: ["即時応対", "営業時間外の取りこぼしゼロ", "顧客体験の向上"],
	},
	{
		index: "B / 03",
		title: "コールセンターのコストを、構造的に最適化。",
		body: "人件費・採用負荷・育成コストを削減。AIがコールの大半を処理することで、運用効率も計測可能なかたちで向上します。",
		bullets: ["人件費の削減", "採用・育成コストの削減", "運用効率の向上"],
	},
	{
		index: "B / 04",
		title: "難しいコールをAIに任せて、離職率を下げる。",
		body: "クレーム対応やカスハラ対応はAIが代替。人は本当に人を必要とするケースに集中でき、感情的負荷は下がり、定着率は上がります。",
		bullets: ["精神的負荷の軽減", "スタッフの定着率向上", "高付加価値業務に人を集中"],
	},
];

export default function Benefits() {
	return (
		<section
			className="relative isolate w-full bg-[var(--canvas)] px-4 py-20 text-[var(--ink)] sm:px-6 sm:py-28 lg:px-8"
			id="benefits"
		>
			<div className="mx-auto w-full max-w-[1400px]">
				<motion.div
					className="flex flex-col gap-4"
					initial={{ opacity: 0, y: 12 }}
					transition={{ duration: 0.6, ease }}
					viewport={{ once: true, margin: "-15%" }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<p className="font-mono text-[10px] text-[var(--ink)]/60 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]">
						Benefits · 07 — 4つの導入メリット
					</p>
					<h2 className="max-w-[22ch] font-display font-semibold text-3xl text-[var(--ink)] leading-[1.05] tracking-[-0.025em] sm:text-5xl md:text-6xl">
						「AIに何ができるか」から「なぜ貴社に必要か」へ。
					</h2>
				</motion.div>

				<div className="mt-12 grid grid-cols-1 border border-[var(--rule)] sm:mt-16 md:grid-cols-2">
					{BENEFITS.map((b, i) => (
						<motion.article
							className="group relative flex flex-col gap-5 border-[var(--rule)] border-b p-8 sm:p-10 md:border-r md:[&:nth-child(2n)]:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0 lg:p-12"
							initial={{ opacity: 0, y: 16 }}
							key={b.title}
							transition={{ duration: 0.6, ease, delay: 0.05 * i }}
							viewport={{ once: true, margin: "-15%" }}
							whileInView={{ opacity: 1, y: 0 }}
						>
							<span className="font-mono text-[10px] text-[#0cf] uppercase tabular-nums tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]">
								{b.index}
							</span>
							<h3 className="max-w-[22ch] font-display font-semibold text-[var(--ink)] text-2xl leading-[1.1] tracking-[-0.02em] sm:text-3xl md:text-4xl">
								{b.title}
							</h3>
							<p className="max-w-[52ch] font-light text-[var(--ink)]/70 text-base leading-[1.55] sm:text-[max(1rem,1.05vmax)]">
								{b.body}
							</p>
							<ul className="mt-1 flex flex-wrap gap-2 border-[var(--rule)] border-t pt-5">
								{b.bullets.map((bullet) => (
									<li
										className="rounded-full border border-[var(--rule)] bg-[var(--canvas)] px-3 py-1 font-mono text-[10px] text-[var(--ink)]/75 uppercase tracking-[0.18em]"
										key={bullet}
									>
										{bullet}
									</li>
								))}
							</ul>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}
