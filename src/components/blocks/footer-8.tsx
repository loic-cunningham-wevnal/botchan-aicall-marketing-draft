"use client";

import { motion } from "motion/react";
import { SpotlightWordmark } from "~/components/spotlight-wordmark";
import { WevnalLogo } from "~/components/wevnal-logo";

const socials = [
	{
		key: "x",
		label: "X",
		icon: (
			<svg
				aria-hidden="true"
				fill="currentColor"
				height="18"
				role="img"
				viewBox="0 0 24 24"
				width="18"
			>
				<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
			</svg>
		),
	},
	{
		key: "li",
		label: "LinkedIn",
		icon: (
			<svg
				aria-hidden="true"
				fill="currentColor"
				height="18"
				role="img"
				viewBox="0 0 24 24"
				width="18"
			>
				<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zm7 0h3.8v1.7h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.78 2.66 4.78 6.12V21h-4v-5.5c0-1.3-.02-3-1.83-3s-2.11 1.43-2.11 2.9V21h-4z" />
			</svg>
		),
	},
	{
		key: "yt",
		label: "YouTube",
		icon: (
			<svg
				aria-hidden="true"
				fill="currentColor"
				height="18"
				role="img"
				viewBox="0 0 24 24"
				width="18"
			>
				<path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 0 0 .5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 0 0 2.1 2.1C4.5 20 12 20 12 20s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.5.5-5.5s0-3.6-.5-5.5zM9.6 15.6V8.4l6.4 3.6z" />
			</svg>
		),
	},
];

type FooterLink = { label: string; href?: string; badge?: string };

const cols: ReadonlyArray<{ title: string; links: ReadonlyArray<FooterLink> }> =
	[
		{
			title: "プロダクト",
			links: [
				{ label: "ソリューション", href: "#solution" },
				{ label: "3つの強み", href: "#features" },
				{ label: "VoiceRAG®", href: "#features" },
				{ label: "システム概要", href: "#solution" },
				{ label: "料金プラン" },
			],
		},
		{
			title: "リソース",
			links: [
				{ label: "業界別の活用シーン", href: "#cases" },
				{ label: "導入プレイブック", href: "#implementation" },
				{ label: "セキュリティ & コンプライアンス" },
				{ label: "FAQ", href: "#faq" },
				{ label: "ブログ" },
			],
		},
		{
			title: "会社情報",
			links: [
				{ label: "wevnalについて" },
				{ label: "採用情報", badge: "採用中" },
				{ label: "プレスリリース" },
				{ label: "ログイン" },
				{ label: "お問合わせ", href: "#contact" },
			],
		},
	] as const;

export default function Footer8() {
	return (
		<footer className="relative w-full overflow-hidden bg-[var(--canvas)] px-4 py-12 text-[var(--ink)] sm:px-6 sm:py-16 lg:px-8">
			<div className="relative mx-auto w-full max-w-[1400px]">
				<div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-12">
					<motion.div
						className="flex flex-col items-start gap-6"
						initial={{ opacity: 0, y: 12 }}
						transition={{ duration: 0.3 }}
						viewport={{ once: true }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						<div className="flex items-center gap-4">
							<WevnalLogo className="h-9 w-auto shrink-0 text-[var(--ink)]" />
							<span className="border-[var(--rule)] border-l pl-4 font-mono text-[11px] text-[var(--ink)]/65 uppercase leading-[1.4] tracking-[0.22em]">
								BOTCHAN
								<br />
								AICALL
							</span>
						</div>
						<p className="max-w-xs font-light text-[var(--ink)] text-sm leading-[1.55] sm:text-base">
							BOTCHAN AICALL — インバウンドコール向け電話AIエージェント。24時間365日の稼働、Goodオペレーター品質、基幹システムとのリアルタイム連携。
						</p>
						<div className="flex items-center gap-2">
							{socials.map((s) => (
								<a
									aria-label={s.label}
									className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--rule)] text-[var(--ink)]/75 transition-colors hover:bg-[var(--haze)] hover:text-[var(--ink)]"
									href="#"
									key={s.key}
								>
									{s.icon}
								</a>
							))}
						</div>
					</motion.div>

					{cols.map((col, ci) => (
						<motion.div
							className="flex flex-col gap-2 lg:border-[var(--rule)] lg:border-t lg:pt-5"
							initial={{ opacity: 0, y: 12 }}
							key={col.title}
							transition={{ duration: 0.3, delay: 0.05 + ci * 0.05 }}
							viewport={{ once: true }}
							whileInView={{ opacity: 1, y: 0 }}
						>
							<h4 className="font-display font-semibold text-[var(--ink)] text-base sm:text-lg">
								{col.title}
							</h4>
							<ul className="flex flex-col gap-1">
								{col.links.map((link) => (
									<li className="flex items-center gap-2" key={link.label}>
										<a
											className="text-[var(--ink)]/75 text-sm transition-colors hover:text-[var(--ink)] sm:text-base"
											href={link.href ?? "#"}
										>
											{link.label}
										</a>
										{link.badge && (
											<span className="rounded-md bg-[var(--haze)] px-2 py-0.5 font-mono text-[10px] text-[var(--ink)]/80 uppercase tracking-[0.18em]">
												{link.badge}
											</span>
										)}
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>

				<div
					className="relative mt-20 w-full overflow-hidden"
					style={{
						height: "min(8.4vw, 135px)",
						maskImage: "linear-gradient(to bottom, #000 55%, transparent 95%)",
						WebkitMaskImage:
							"linear-gradient(to bottom, #000 55%, transparent 95%)",
					}}
				>
					<SpotlightWordmark
						className="bottom-0"
						fill="var(--ink)"
						fontSize="min(9.6vw, 158px)"
						stroke="rgba(241,237,228,0.22)"
						text="Botchan AICALL"
					/>
				</div>

				<div className="flex flex-col items-start justify-between gap-4 border-[var(--rule)] border-t pt-6 font-mono text-[10px] text-[var(--ink)]/55 uppercase tracking-[0.18em] sm:flex-row sm:items-center sm:text-xs">
					<div className="flex items-center gap-3">
						<WevnalLogo className="h-5 text-[var(--ink)]/75" />
						<span>
							© {new Date().getFullYear()} 株式会社wevnal — All rights reserved
						</span>
					</div>
					<div className="flex items-center gap-5">
						<a
							className="transition-colors hover:text-[var(--ink)]"
							href="#"
						>
							セキュリティ
						</a>
						<a
							className="transition-colors hover:text-[var(--ink)]"
							href="#"
						>
							利用規約
						</a>
						<a
							className="transition-colors hover:text-[var(--ink)]"
							href="#"
						>
							プライバシーポリシー
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
