"use client";

import { Check, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { WevnalLogo } from "~/components/wevnal-logo";

const valueBullets = [
	"24時間365日、応答率はほぼ100%",
	"Goodオペレーター品質の自然な応対",
	"CRM・ERP・OMS・WMSと双方向のリアルタイム連携",
	"人件費・採用コスト・育成コストの削減",
	"カスハラ対応をAIが代替し、オペレーターの負荷を軽減",
	"人員を増やさずに、オペレーター不足を解消",
];

const proofStats = [
	{ value: "99.8%", label: "応答率" },
	{ value: "85%", label: "自動化率" },
	{ value: "40%", label: "コスト削減" },
];

export default function Contact8() {
	return (
		<section
			className="relative isolate flex w-full items-start bg-[var(--canvas)] px-4 py-20 text-[var(--ink)] sm:px-6 sm:py-28 lg:px-8"
			id="contact"
		>
			<div className="mx-auto w-full max-w-[1400px]">
				<div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
					<motion.div
						className="flex flex-col gap-10"
						initial={{ opacity: 0, y: 16 }}
						transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
						viewport={{ once: true }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						<div className="flex flex-col gap-4">
							<div className="flex items-center gap-4">
								<WevnalLogo className="h-7 text-[var(--ink)]" />
								<span className="border-[var(--rule)] border-l pl-4 font-mono text-[10px] text-[var(--ink)]/55 uppercase tracking-[0.22em]">
									BOTCHAN AICALL
								</span>
							</div>
							<p className="font-mono text-[10px] text-[var(--ink)]/65 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]">
								Contact · 09 — まずはお気軽にご相談ください
							</p>
							<h2 className="max-w-[16ch] font-display font-semibold text-4xl text-[var(--ink)] leading-[1.05] tracking-[-0.025em] sm:text-5xl md:text-6xl">
								貴社の課題をお聞かせください。最適なご提案をお返しします。
							</h2>
							<p className="max-w-[52ch] font-light text-[var(--ink)]/75 text-base leading-[1.6] sm:text-[max(1rem,1.05vmax)]">
								いただいたフォームはすべてシニアCSリードが拝読します。コール量・連携要件・SLAに合わせた導入プランを、5営業日以内にご回答します。
							</p>
						</div>

						<div className="flex flex-col gap-4">
							<h3 className="font-mono text-[10px] text-[var(--ink)]/65 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]">
								BOTCHAN AICALLが選ばれる理由
							</h3>
							<ul className="flex flex-col gap-3">
								{valueBullets.map((e, i) => (
									<motion.li
										className="flex items-start gap-3 text-[var(--ink)]/90 text-sm sm:text-base"
										initial={{ opacity: 0, x: -10 }}
										key={e}
										transition={{ duration: 0.3, delay: 0.06 * i }}
										viewport={{ once: true }}
										whileInView={{ opacity: 1, x: 0 }}
									>
										<Check
											className="mt-0.5 h-4 w-4 shrink-0 text-[#0cf]"
											strokeWidth={2.5}
										/>
										{e}
									</motion.li>
								))}
							</ul>
						</div>

						<div className="grid grid-cols-3 gap-[max(0.6rem,0.8vmax)] border-[var(--rule)] border-t pt-[max(1rem,1.3vmax)]">
							{proofStats.map((s) => (
								<div className="flex flex-col items-start gap-1" key={s.label}>
									<div className="font-display font-light text-[max(1.2rem,1.8vmax)] text-[var(--ink)] tabular-nums leading-none tracking-[-0.025em]">
										{s.value}
									</div>
									<div className="font-mono text-[10px] text-[var(--ink)]/65 uppercase leading-[1.4] tracking-[0.16em] sm:text-[max(0.65rem,0.75vmax)]">
										{s.label}
									</div>
								</div>
							))}
						</div>
					</motion.div>

					<motion.form
						className="flex h-full flex-col justify-center gap-3 rounded-2xl border border-[var(--rule)] bg-[var(--haze)] p-6 sm:p-8"
						initial={{ opacity: 0, y: 20 }}
						onSubmit={(e) => e.preventDefault()}
						transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
						viewport={{ once: true }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						<h3 className="mb-2 font-display font-semibold text-[var(--ink)] text-lg sm:text-xl">
							BOTCHAN AICALLチームへお問合わせ
						</h3>

						<div className="relative">
							<select
								className="w-full cursor-pointer appearance-none rounded-full border border-[var(--rule)] bg-[var(--canvas)] px-4 py-3 pr-10 text-[var(--ink)]/80 text-sm focus:border-[var(--ink)]/45 focus:outline-none"
								defaultValue=""
								required
							>
								<option value="">お問合わせ種別*</option>
								<option>一般的なお問合わせ</option>
								<option>無料のデモを予約</option>
								<option>資料をダウンロード</option>
								<option>お見積り</option>
							</select>
							<ChevronDown className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-4 h-4 w-4 text-[var(--ink)]/45" />
						</div>

						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<input
								className="rounded-full border border-[var(--rule)] bg-[var(--canvas)] px-4 py-3 text-[var(--ink)] text-sm placeholder:text-[var(--ink)]/55 focus:border-[var(--ink)]/45 focus:outline-none"
								placeholder="会社名*"
								required
								type="text"
							/>
							<input
								className="rounded-full border border-[var(--rule)] bg-[var(--canvas)] px-4 py-3 text-[var(--ink)] text-sm placeholder:text-[var(--ink)]/55 focus:border-[var(--ink)]/45 focus:outline-none"
								placeholder="役職*"
								required
								type="text"
							/>
						</div>

						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<input
								className="rounded-full border border-[var(--rule)] bg-[var(--canvas)] px-4 py-3 text-[var(--ink)] text-sm placeholder:text-[var(--ink)]/55 focus:border-[var(--ink)]/45 focus:outline-none"
								placeholder="お名前*"
								required
								type="text"
							/>
							<input
								className="rounded-full border border-[var(--rule)] bg-[var(--canvas)] px-4 py-3 text-[var(--ink)] text-sm placeholder:text-[var(--ink)]/55 focus:border-[var(--ink)]/45 focus:outline-none"
								placeholder="携帯電話番号*"
								required
								type="tel"
							/>
						</div>

						<input
							className="rounded-full border border-[var(--rule)] bg-[var(--canvas)] px-4 py-3 text-[var(--ink)] text-sm placeholder:text-[var(--ink)]/55 focus:border-[var(--ink)]/45 focus:outline-none"
							placeholder="会社のメールアドレス*"
							required
							type="email"
						/>

						<div className="relative">
							<select
								className="w-full cursor-pointer appearance-none rounded-full border border-[var(--rule)] bg-[var(--canvas)] px-4 py-3 pr-10 text-[var(--ink)]/80 text-sm focus:border-[var(--ink)]/45 focus:outline-none"
								defaultValue=""
								required
							>
								<option value="">月間インバウンドコール数*</option>
								<option>1,000件未満</option>
								<option>1,000〜5,000件</option>
								<option>5,000〜50,000件</option>
								<option>50,000件以上</option>
							</select>
							<ChevronDown className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-4 h-4 w-4 text-[var(--ink)]/45" />
						</div>

						<textarea
							className="resize-none rounded-3xl border border-[var(--rule)] bg-[var(--canvas)] px-4 py-3 text-[var(--ink)] text-sm placeholder:text-[var(--ink)]/55 focus:border-[var(--ink)]/45 focus:outline-none"
							placeholder="お問合わせ内容 — 現在のコール業務の状況をお聞かせください（任意）"
							rows={3}
						/>

						<label className="mt-1 flex items-start gap-2 text-[12px] text-[var(--ink)]/75 leading-relaxed">
							<input
								className="mt-1 h-3.5 w-3.5 shrink-0 rounded border-[var(--rule)] bg-transparent text-[#0cf] accent-[#0cf]"
								required
								type="checkbox"
							/>
							<span>
								プライバシーポリシーに同意し、本お問合わせに関してBOTCHAN AICALLからのご連絡を希望します。いただいた情報は、お問合わせ対応の範囲でのみ使用します。
							</span>
						</label>

						<motion.button
							className="mt-2 w-full cursor-pointer rounded-full bg-[var(--ink)] px-6 py-3.5 font-medium text-[var(--canvas)] text-sm uppercase tracking-[0.18em] transition-opacity hover:opacity-85"
							type="submit"
							whileHover={{ scale: 1.01 }}
							whileTap={{ scale: 0.99 }}
						>
							お問合わせを送信
						</motion.button>
					</motion.form>
				</div>
			</div>
		</section>
	);
}
