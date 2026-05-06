"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { WevnalLogo } from "~/components/wevnal-logo";

const NAV_ITEMS = [
	{ title: "お悩み", subtitle: "現場の課題", href: "#problem" },
	{ title: "実績", subtitle: "導入企業の数値", href: "#proof" },
	{ title: "ソリューション", subtitle: "AICALLとは", href: "#solution" },
	{ title: "特長", subtitle: "3つの強み", href: "#features" },
	{ title: "比較", subtitle: "コールセンターとの違い", href: "#comparison" },
	{ title: "活用シーン", subtitle: "業界別ユースケース", href: "#cases" },
	{ title: "導入の流れ", subtitle: "ご相談から運用まで", href: "#implementation" },
	{ title: "FAQ", subtitle: "よくある質問", href: "#faq" },
	{ title: "お問合わせ", subtitle: "ご相談・お見積り", href: "#contact" },
];

const SOCIAL_LINKS = [
	{ name: "X", href: "https://x.com" },
	{ name: "LinkedIn", href: "https://linkedin.com" },
	{ name: "YouTube", href: "https://youtube.com" },
];

export function Navigation() {
	const [isExpanded, setIsExpanded] = useState(false);
	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		const footer = document.getElementById("site-footer");
		if (!footer) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry) setHidden(entry.isIntersecting);
			},
			{ threshold: 0.05 },
		);
		observer.observe(footer);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (hidden && isExpanded) setIsExpanded(false);
	}, [hidden, isExpanded]);

	return (
		<>
			<AnimatePresence>
				{isExpanded && (
					<motion.button
						animate={{ opacity: 1 }}
						aria-label="メニューを閉じる"
						className="fixed inset-0 z-40 cursor-pointer bg-black/30 backdrop-blur-md"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						onClick={() => setIsExpanded(false)}
						transition={{ duration: 0.2 }}
						type="button"
					/>
				)}
			</AnimatePresence>

			<motion.nav
				animate={{
					opacity: hidden ? 0 : 1,
					y: hidden ? 32 : 0,
					pointerEvents: hidden ? "none" : "auto",
				}}
				className="pointer-events-none fixed right-0 bottom-6 left-0 z-50 px-6"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: hidden ? 0 : 0.4 }}
			>
				<div className="pointer-events-auto mx-auto max-w-2xl">
					<div className="overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--canvas)] shadow-2xl shadow-black/30 backdrop-blur-xl">
						<AnimatePresence>
							{isExpanded && (
								<motion.div
									animate={{ height: "auto", opacity: 1 }}
									className="overflow-hidden"
									exit={{ height: 0, opacity: 0 }}
									initial={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
								>
									<div className="space-y-5 p-5">
										<motion.div
											animate={{ opacity: 1, y: 0 }}
											className="flex items-center justify-between gap-4"
											initial={{ opacity: 0, y: 10 }}
											transition={{ duration: 0.3, delay: 0.1 }}
										>
											<div className="flex items-center gap-4">
												<WevnalLogo className="h-7 text-[var(--ink)]" />
												<span className="whitespace-nowrap border-[var(--rule)] border-l pl-4 font-mono text-[10px] text-[var(--ink)]/60 uppercase tracking-[0.22em]">
													BOTCHAN AICALL
												</span>
												<span className="h-3 w-px bg-[var(--rule)]" />
												<div className="flex items-center gap-4">
													{SOCIAL_LINKS.map((link) => (
														<a
															className="font-mono text-[10px] text-[var(--ink)]/50 uppercase tracking-[0.22em] transition-colors hover:text-[var(--ink)]"
															href={link.href}
															key={link.name}
															rel="noopener noreferrer"
															target="_blank"
														>
															{link.name}
														</a>
													))}
												</div>
											</div>
											<a
												className="btn-brand rounded-md px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em]"
												href="#contact"
												onClick={() => setIsExpanded(false)}
											>
												デモを予約
											</a>
										</motion.div>

										<motion.div
											animate={{ opacity: 1, y: 0 }}
											className="font-light text-[1.6rem] text-[var(--ink)] leading-[1.1] tracking-[-0.02em]"
											initial={{ opacity: 0, y: 10 }}
											transition={{ duration: 0.3, delay: 0.15 }}
										>
											インバウンドコールを自動化。
											<br />
											<span className="text-[var(--ink)]/55">
												24時間365日、Goodオペレーターの品質で。
											</span>
										</motion.div>

										<motion.div
											animate={{ opacity: 1 }}
											className="-mx-5 border-[var(--rule)] border-t"
											initial={{ opacity: 0 }}
											transition={{ duration: 0.3, delay: 0.2 }}
										>
											{NAV_ITEMS.map((item, index) => (
												<motion.a
													animate={{ opacity: 1, x: 0 }}
													className="group flex items-center justify-between border-[var(--rule)] border-b px-5 py-3 transition-colors hover:bg-[var(--haze)]"
													href={item.href}
													initial={{ opacity: 0, x: -16 }}
													key={item.title}
													onClick={() => setIsExpanded(false)}
													transition={{
														duration: 0.3,
														delay: 0.25 + index * 0.04,
													}}
												>
													<div className="flex items-baseline gap-3">
														<span className="w-6 font-mono text-[10px] text-[var(--ink)]/40 uppercase tabular-nums tracking-[0.22em]">
															{String(index + 1).padStart(2, "0")}
														</span>
														<span className="font-light text-[var(--ink)] text-base transition-all duration-200 group-hover:tracking-[0.01em]">
															{item.title}
														</span>
													</div>
													<span className="font-mono text-[10px] text-[var(--ink)]/40 uppercase tracking-[0.18em]">
														{item.subtitle}
													</span>
												</motion.a>
											))}
										</motion.div>

									</div>
								</motion.div>
							)}
						</AnimatePresence>

						<button
							className="flex w-full cursor-pointer items-center justify-between px-6 py-4 transition-colors hover:bg-[var(--haze)]"
							onClick={() => setIsExpanded((v) => !v)}
							type="button"
						>
							<div className="flex items-center gap-2 text-[var(--ink)]">
								{isExpanded ? (
									<ChevronDown className="h-4 w-4" />
								) : (
									<ChevronUp className="h-4 w-4" />
								)}
								<span className="font-mono text-[11px] uppercase tracking-[0.22em]">
									{isExpanded ? "閉じる" : "メニュー"}
								</span>
							</div>
							{!isExpanded && (
								<div className="flex items-center gap-3">
									<span className="font-mono text-[11px] text-[var(--ink)]/55 uppercase tracking-[0.22em]">
										BOTCHAN AICALL
									</span>
									<span className="h-3 w-px bg-[var(--rule)]" />
									<WevnalLogo className="h-4 text-[var(--ink)]/65" />
								</div>
							)}
						</button>
					</div>
				</div>
			</motion.nav>
		</>
	);
}
