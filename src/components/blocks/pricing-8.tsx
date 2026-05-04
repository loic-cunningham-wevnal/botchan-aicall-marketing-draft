"use client";

import { Check, ChevronDown, ChevronUp, Minus, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import AsciiWaves from "~/components/react-bits/ascii-waves";
import StaggeredText from "~/components/react-bits/staggered-text";

const ease = [0.16, 1, 0.3, 1] as const;

type Status = "pos" | "mid" | "neg";
type Cell = { status: Status; text: string };
type Row = { label: string; values: [Cell, Cell, Cell] };

type Column = {
	key: string;
	title: string;
	subtitle: string;
	cta: string;
	highlight?: boolean;
};

const COLUMNS: Column[] = [
	{
		key: "in-house",
		title: "自社コールセンター",
		subtitle: "人を雇い、人を育てる",
		cta: "従来モデル",
	},
	{
		key: "bpo",
		title: "BPOアウトソース",
		subtitle: "委託先のキャパに依存",
		cta: "委託モデル",
	},
	{
		key: "aicall",
		title: "BOTCHAN AICALL",
		subtitle: "秒単位で無限スケール",
		cta: "30分のご相談 →",
		highlight: true,
	},
];

const SCALE_ROWS: Row[] = [
	{
		label: "同時応対数のスケール",
		values: [
			{ status: "neg", text: "採用・育成で線形に増加" },
			{ status: "mid", text: "委託先のキャパに依存" },
			{ status: "pos", text: "即時に無制限スケール" },
		],
	},
	{
		label: "ピーク時・キャンペーン対応",
		values: [
			{ status: "neg", text: "数週間の増員準備" },
			{ status: "mid", text: "数日〜数週間の調整" },
			{ status: "pos", text: "シナリオ切替で即時" },
		],
	},
	{
		label: "受電率 100% への到達",
		values: [
			{ status: "neg", text: "実質不可能" },
			{ status: "mid", text: "高コストで一部達成" },
			{ status: "pos", text: "標準で達成" },
		],
	},
];

const COVERAGE_ROWS: Row[] = [
	{
		label: "24時間365日カバー",
		values: [
			{ status: "neg", text: "夜勤シフトの追加要員が必要" },
			{ status: "mid", text: "24時間プランで追加コスト" },
			{ status: "pos", text: "標準で常時稼働" },
		],
	},
	{
		label: "ピークの取りこぼし",
		values: [
			{ status: "neg", text: "発生（あふれ呼）" },
			{ status: "mid", text: "発生（SLAに依存）" },
			{ status: "pos", text: "発生なし" },
		],
	},
	{
		label: "営業時間外の取りこぼし",
		values: [
			{ status: "neg", text: "ほぼ全件" },
			{ status: "mid", text: "一部のみ受電" },
			{ status: "pos", text: "全件受電" },
		],
	},
];

const QUALITY_ROWS: Row[] = [
	{
		label: "応対品質のバラつき",
		values: [
			{ status: "neg", text: "オペレーター個人に依存" },
			{ status: "mid", text: "委託先SLAに依存" },
			{ status: "pos", text: "Goodオペレーター基準で一貫" },
		],
	},
	{
		label: "ナレッジの蓄積",
		values: [
			{ status: "neg", text: "退職と共に流出" },
			{ status: "mid", text: "委託先に閉じ込め" },
			{ status: "pos", text: "全コール自動学習" },
		],
	},
	{
		label: "スクリプト更新の反映",
		values: [
			{ status: "neg", text: "研修で数日〜数週間" },
			{ status: "mid", text: "委託先工程を経由" },
			{ status: "pos", text: "即時反映" },
		],
	},
];

const FLEX_ROWS: Row[] = [
	{
		label: "高度な感情応対・最終クレーム対応",
		values: [
			{ status: "pos", text: "熟練オペレーターの強み" },
			{ status: "mid", text: "担当者のスキルに依存" },
			{ status: "mid", text: "判定後 即 人へエスカレーション" },
		],
	},
	{
		label: "想定外の問い合わせへの即応",
		values: [
			{ status: "pos", text: "現場判断で柔軟に対応" },
			{ status: "mid", text: "範囲外は持ち帰り" },
			{ status: "mid", text: "シナリオ外は段階的に学習" },
		],
	},
	{
		label: "多言語・地域方言対応",
		values: [
			{ status: "neg", text: "言語ごとに採用が必要" },
			{ status: "mid", text: "対応言語が限定的" },
			{ status: "pos", text: "主要言語を標準サポート" },
		],
	},
];

const SETUP_ROWS: Row[] = [
	{
		label: "立ち上げ期間",
		values: [
			{ status: "neg", text: "3〜6ヶ月（採用・育成込）" },
			{ status: "mid", text: "1〜3ヶ月（契約・研修）" },
			{ status: "mid", text: "4〜8週間（シナリオ・連携設計）" },
		],
	},
	{
		label: "初期シナリオ設計の工数",
		values: [
			{ status: "mid", text: "マニュアル作成・改訂が必要" },
			{ status: "pos", text: "委託先側で内包" },
			{ status: "neg", text: "PoC期間に共同設計が必要" },
		],
	},
	{
		label: "運用後のチューニング柔軟性",
		values: [
			{ status: "mid", text: "再研修で反映" },
			{ status: "neg", text: "委託先の改修工程を経由" },
			{ status: "pos", text: "管理画面から即時更新" },
		],
	},
];

const DATA_ROWS: Row[] = [
	{
		label: "基幹システム連携（CRM/OMS/WMS）",
		values: [
			{ status: "neg", text: "手動入力中心" },
			{ status: "mid", text: "API連携にカスタム工数" },
			{ status: "pos", text: "リアルタイム双方向同期" },
		],
	},
	{
		label: "構造化データ抽出",
		values: [
			{ status: "neg", text: "後追いで手作業" },
			{ status: "mid", text: "報告書ベース" },
			{ status: "pos", text: "コール直後に自動抽出" },
		],
	},
];

const COST_ROWS: Row[] = [
	{
		label: "人件費・基本料金",
		values: [
			{ status: "neg", text: "固定費 + 夜勤・残業手当" },
			{ status: "mid", text: "単価 × コール数 + 最低保証" },
			{ status: "pos", text: "従量課金（基本利用料あり）" },
		],
	},
	{
		label: "採用・育成コスト",
		values: [
			{ status: "neg", text: "継続的に発生" },
			{ status: "mid", text: "委託先で発生（価格に内包）" },
			{ status: "pos", text: "発生しない" },
		],
	},
	{
		label: "初期構築・連携費用",
		values: [
			{ status: "mid", text: "拠点・設備の構築費用" },
			{ status: "pos", text: "立ち上げは比較的軽い" },
			{ status: "mid", text: "PoC・連携設計に初期費用" },
		],
	},
	{
		label: "拡張時のコスト",
		values: [
			{ status: "neg", text: "線形に増加" },
			{ status: "mid", text: "半線形に増加" },
			{ status: "pos", text: "ほぼ横ばい" },
		],
	},
];

const SECTIONS = [
	{ title: "スケーラビリティ", code: "S / 01", rows: SCALE_ROWS },
	{ title: "稼働カバレッジ", code: "C / 02", rows: COVERAGE_ROWS },
	{ title: "応対品質と一貫性", code: "Q / 03", rows: QUALITY_ROWS },
	{ title: "応対の柔軟性", code: "F / 04", rows: FLEX_ROWS },
	{ title: "立ち上げ・運用", code: "I / 05", rows: SETUP_ROWS },
	{ title: "データ・連携", code: "D / 06", rows: DATA_ROWS },
	{ title: "コスト構造", code: "$ / 07", rows: COST_ROWS },
];

function StatusBadge({ status }: { status: Status }) {
	if (status === "pos") {
		return (
			<span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#0cf] text-black">
				<Check className="h-3 w-3" strokeWidth={3} />
			</span>
		);
	}
	if (status === "mid") {
		return (
			<span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[var(--rule)] text-[var(--ink)]/55">
				<Minus className="h-3 w-3" strokeWidth={2.5} />
			</span>
		);
	}
	return (
		<span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[var(--ink)]/25 text-[var(--ink)]/45">
			<X className="h-3 w-3" strokeWidth={2.5} />
		</span>
	);
}

function CellView({ value, columnIdx }: { value: Cell; columnIdx: number }) {
	const isHighlight = columnIdx === 2;
	return (
		<div className="flex items-start gap-3">
			<StatusBadge status={value.status} />
			<p
				className={
					isHighlight
						? "font-light text-[var(--ink)] text-sm leading-[1.5]"
						: "font-light text-[var(--ink)]/70 text-sm leading-[1.5]"
				}
			>
				{value.text}
			</p>
		</div>
	);
}

function ComparisonSection({
	title,
	code,
	rows,
	defaultOpen,
}: {
	title: string;
	code: string;
	rows: Row[];
	defaultOpen?: boolean;
}) {
	const [open, setOpen] = useState(defaultOpen ?? true);
	return (
		<div className="border-[var(--rule)] border-t">
			<button
				className="grid w-full cursor-pointer grid-cols-1 items-center gap-2 py-5 text-left md:grid-cols-4"
				onClick={() => setOpen((o) => !o)}
				type="button"
			>
				<span className="col-span-1 flex items-baseline gap-3">
					<span className="font-mono text-[10px] text-[var(--ink)]/50 uppercase tracking-[0.22em]">
						{code}
					</span>
					<span className="font-display font-medium text-[var(--ink)] text-xl tracking-[-0.01em] sm:text-2xl">
						{title}
					</span>
				</span>
				<span className="col-span-3 flex justify-end pr-1 text-[var(--ink)]/50">
					{open ? (
						<ChevronUp className="h-4 w-4" />
					) : (
						<ChevronDown className="h-4 w-4" />
					)}
				</span>
			</button>
			{open &&
				rows.map((r) => (
					<div
						className="grid grid-cols-1 items-start gap-5 border-[var(--rule)] border-t py-5 md:grid-cols-4 md:gap-6"
						key={r.label}
					>
						<p className="font-light text-[var(--ink)]/85 text-sm leading-[1.5] md:pr-4">
							{r.label}
						</p>
						{r.values.map((v, i) => (
							<div className="flex flex-col gap-2" key={`${r.label}-${i}`}>
								<span className="font-mono text-[10px] text-[var(--ink)]/45 uppercase tracking-[0.22em] md:hidden">
									{COLUMNS[i]?.title}
								</span>
								<CellView columnIdx={i} value={v} />
							</div>
						))}
					</div>
				))}
		</div>
	);
}

export default function Pricing8() {
	return (
		<section
			className="relative isolate w-full overflow-hidden bg-[var(--canvas)] px-4 py-20 text-[var(--ink)] sm:px-6 sm:py-28 lg:px-8"
			id="comparison"
		>
			{/* Ascii waves — masked to the top-right so the comparison table on the left stays readable. */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 z-0 opacity-[0.55]"
				style={{
					maskImage:
						"radial-gradient(ellipse 70% 70% at 88% 12%, black 0%, transparent 70%)",
					WebkitMaskImage:
						"radial-gradient(ellipse 70% 70% at 88% 12%, black 0%, transparent 70%)",
				}}
			>
				<AsciiWaves
					characters=" .:-+*=%@#"
					color="#00ccff"
					elementSize={14}
					hasCursorInteraction={false}
					intensity={1.0}
					noiseScale={2.4}
					speed={0.6}
					waveTension={0.45}
					waveTwist={0.08}
				/>
			</div>

			<div className="relative z-10 mx-auto w-full max-w-[1400px]">
				{/* Header */}
				<motion.div
					className="flex flex-col items-start gap-4"
					initial={{ opacity: 0, y: 12 }}
					transition={{ duration: 0.6, ease }}
					viewport={{ once: true, margin: "-15%" }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<p className="font-mono text-[10px] text-[var(--ink)]/60 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]">
						Comparison · 05 — スケーリング比較
					</p>
					<StaggeredText
						as="h2"
						className="max-w-[20ch] font-display font-semibold text-4xl text-[var(--ink)] leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-[max(3.4rem,4.2vmax)]"
						delay={30}
						direction="top"
						duration={0.7}
						segmentBy="chars"
						text="コールセンターを構えるか。AICALLに任せるか。"
						threshold={0.3}
					/>
					<p className="mt-2 max-w-[58ch] font-light text-[var(--ink)]/70 text-base leading-[1.6] sm:text-[max(0.95rem,1.02vmax)]">
						ピーク時の増員も、夜間カバーも、品質統制も。これまで採用と教育で乗り切ってきた重荷を、AIエージェントが秒単位でスケールします。
					</p>
				</motion.div>

				{/* Column headers */}
				<motion.div
					className="mt-12 grid grid-cols-1 items-end gap-6 md:grid-cols-4 sm:mt-16"
					initial={{ opacity: 0, y: 10 }}
					transition={{ duration: 0.5, ease, delay: 0.1 }}
					viewport={{ once: true, margin: "-15%" }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<div className="hidden md:block" />
					{COLUMNS.map((c, i) => (
						<div
							className={
								c.highlight
									? "flex flex-col gap-3 rounded-xl border border-[#0cf] bg-black/95 p-5 text-white shadow-[0_0_0_1px_rgba(0,204,255,0.35),0_18px_45px_-22px_rgba(0,204,255,0.5)]"
									: "flex flex-col gap-3 rounded-xl border border-[var(--rule)] bg-[var(--canvas)]/60 p-5 backdrop-blur-md"
							}
							key={c.key}
						>
							<span
								className={
									c.highlight
										? "font-mono text-[10px] text-[#0cf] uppercase tracking-[0.22em]"
										: "font-mono text-[10px] text-[var(--ink)]/55 uppercase tracking-[0.22em]"
								}
							>
								Option · {String(i + 1).padStart(2, "0")}
							</span>
							<span
								className={
									c.highlight
										? "font-display font-semibold text-2xl text-white tracking-[-0.02em]"
										: "font-display font-semibold text-2xl text-[var(--ink)] tracking-[-0.02em]"
								}
							>
								{c.title}
							</span>
							<span
								className={
									c.highlight
										? "font-light text-sm text-white/70 leading-[1.45]"
										: "font-light text-[var(--ink)]/65 text-sm leading-[1.45]"
								}
							>
								{c.subtitle}
							</span>
							<a
								className={
									c.highlight
										? "mt-2 inline-flex items-center justify-center rounded-full bg-[#0cf] px-4 py-2.5 font-mono text-[10px] text-black uppercase tracking-[0.18em] transition-opacity hover:opacity-90"
										: "mt-2 inline-flex items-center justify-center rounded-full border border-[var(--rule)] px-4 py-2.5 font-mono text-[10px] text-[var(--ink)]/65 uppercase tracking-[0.18em]"
								}
								href={c.highlight ? "#contact" : undefined}
							>
								{c.cta}
							</a>
						</div>
					))}
				</motion.div>

				{/* Comparison rows */}
				<motion.div
					className="mt-10"
					initial={{ opacity: 0, y: 12 }}
					transition={{ duration: 0.6, ease, delay: 0.15 }}
					viewport={{ once: true, margin: "-15%" }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					{SECTIONS.map((s, i) => (
						<ComparisonSection
							code={s.code}
							defaultOpen={i === 0}
							key={s.title}
							rows={s.rows}
							title={s.title}
						/>
					))}
				</motion.div>

				{/* Footer microcopy */}
				<motion.p
					className="mt-10 text-center font-mono text-[10px] text-[var(--ink)]/55 uppercase tracking-[0.22em] sm:text-[max(0.7rem,0.8vmax)]"
					initial={{ opacity: 0 }}
					transition={{ duration: 0.5, ease, delay: 0.3 }}
					viewport={{ once: true }}
					whileInView={{ opacity: 1 }}
				>
					想定TCO削減率 <span className="text-[#0cf]">40%+</span>（最小ケース）· 担当CSリードがお見積り
				</motion.p>
			</div>
		</section>
	);
}
