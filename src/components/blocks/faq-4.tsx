"use client";

import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const FAQS = [
	{
		q: "導入までの期間はどのくらい？",
		a: "シナリオ数と基幹システム連携の複雑さによります。PoCはおよそ2週間の効果検証ウィンドウで実施。スタンダードな展開はご相談から本番稼働まで概ね4〜8週間です。初回の打ち合わせから5営業日以内に、担当CSリードが導入プランをご提示します。",
	},
	{
		q: "対応可能な業界は？",
		a: "EC・通販、美容・医療、インフラ・物流をはじめ、高頻度なインバウンドコールを扱うあらゆる業務に対応します。予約変更、注文ステータス確認、契約内容確認、住所変更、解約阻止トーク付きのキャンセル受付、そして基幹システムに紐づくロングテールの事務的な電話業務まで——貴社のシナリオに合わせて柔軟に適応します。",
	},
	{
		q: "セキュリティは万全？",
		a: "マルチテナント分離とオプトアウト設定（他社環境への学習データ漏洩を防止）、業務文脈ルールと事実性チェックによる独自フィルタリングのハルシネーション対策、ASR信頼度や対話意図が低下した際のリアルタイムな有人オペレーターへのエスカレーション、対話品質アセスメントによる継続的な可視化と改善——インフラはISO 27001準拠、マルチリージョンのキャリア構成、専用SIPトランクで運用しています。",
	},
	{
		q: "急なピークコールにも耐えられる？",
		a: "はい。要員追加なしでピーク時の大量コールを処理できることは、有人運用に対するAIエージェントの構造的な優位点です。コール量に対しコールキューがスケールするため、トラフィックが倍増しても採用・育成・シフト調整のサイクルは発生しません。",
	},
];

export default function Faq4() {
	const [open, setOpen] = useState(0);

	return (
		<section
			className="relative w-full overflow-hidden bg-[var(--canvas)] px-4 py-20 text-[var(--ink)] sm:px-6 sm:py-28 lg:px-8"
			id="faq"
		>
			<div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-10">
				<motion.p
					className="font-mono text-[10px] text-[var(--ink)]/60 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]"
					initial={{ opacity: 0 }}
					transition={{ duration: 0.4, ease }}
					viewport={{ once: true }}
					whileInView={{ opacity: 1 }}
				>
					FAQ · 08 — よくある質問
				</motion.p>
				<div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:gap-20">
					<div className="relative flex flex-col gap-6 pl-6">
						<motion.h2
							className="max-w-[18ch] font-display font-semibold text-4xl text-[var(--ink)] leading-[1.02] tracking-[-0.03em] sm:text-5xl md:text-6xl"
							initial={{ opacity: 0, y: 14 }}
							transition={{ duration: 0.6, ease, delay: 0.05 }}
							viewport={{ once: true }}
							whileInView={{ opacity: 1, y: 0 }}
						>
							購入前の最終確認、すべてお答えします。
						</motion.h2>
						<motion.p
							className="max-w-sm font-light text-[var(--ink)]/70 text-base leading-[1.6] sm:text-[max(1rem,1.05vmax)]"
							initial={{ opacity: 0 }}
							transition={{ duration: 0.5, ease, delay: 0.15 }}
							viewport={{ once: true }}
							whileInView={{ opacity: 1 }}
						>
							契約前に、運用部門・セキュリティ部門のステークホルダーが必ず確認する4つの質問。それ以上のご質問があれば、担当CSリードがメッセージひとつでお答えします。
						</motion.p>
					</div>

					<div className="relative">
						<div className="flex flex-col">
							{FAQS.map((faq, i) => {
								const isOpen = open === i;
								return (
									<motion.div
										className={`relative py-7 pr-4 pl-6 sm:py-9 ${
											i !== FAQS.length - 1
												? "border-[var(--rule)] border-b border-dashed"
												: ""
										}`}
										initial={{ opacity: 0, y: 10 }}
										// biome-ignore lint/suspicious/noArrayIndexKey: stable list
										key={i}
										transition={{ duration: 0.4, ease, delay: 0.05 * i }}
										viewport={{ once: true }}
										whileInView={{ opacity: 1, y: 0 }}
									>
										<button
											className="flex w-full cursor-pointer items-start gap-4 text-left sm:gap-6"
											onClick={() => setOpen(isOpen ? -1 : i)}
											type="button"
										>
											<span className="relative mt-1.5 font-mono text-[10px] text-[var(--ink)]/55 tabular-nums tracking-[0.22em]">
												<span
													aria-hidden
													className="-translate-y-1/2 -left-[27px] absolute top-1/2 h-1.5 w-1.5 rounded-full bg-[#0cf]"
												/>
												Q / 0{i + 1}
											</span>
											<span className="flex-1 font-display font-medium text-[var(--ink)] text-lg leading-[1.3] tracking-[-0.015em] sm:text-xl md:text-2xl">
												{faq.q}
											</span>
											<span
												className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors ${
													isOpen
														? "bg-[var(--brand-orange)] text-white"
														: "bg-[var(--haze)] text-[var(--ink)]"
												}`}
											>
												{isOpen ? (
													<Minus className="h-4 w-4" />
												) : (
													<Plus className="h-4 w-4" />
												)}
											</span>
										</button>
										<AnimatePresence initial={false}>
											{isOpen && (
												<motion.div
													animate={{ height: "auto", opacity: 1 }}
													className="overflow-hidden"
													exit={{ height: 0, opacity: 0 }}
													initial={{ height: 0, opacity: 0 }}
													transition={{
														duration: 0.35,
														ease: [0.22, 1, 0.36, 1],
													}}
												>
													<div className="flex items-start gap-4 pt-4 sm:gap-6">
														<span
															aria-hidden
															className="invisible mt-1.5 font-mono text-[10px] tabular-nums tracking-[0.22em]"
														>
															Q / 0{i + 1}
														</span>
														<p className="max-w-3xl flex-1 pr-12 font-light text-[var(--ink)]/72 text-sm leading-[1.65] sm:text-[max(0.95rem,1.02vmax)]">
															{faq.a}
														</p>
													</div>
												</motion.div>
											)}
										</AnimatePresence>
									</motion.div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
