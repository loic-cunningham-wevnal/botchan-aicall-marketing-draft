/**
 * Conversation scripts powering the in-phone call simulation in
 * src/components/hero/hero.tsx. Each scenario is a discrete end-to-end
 * call (greeting → identify → tool calls → resolution → close). The
 * orchestrator iterates them in order, advancing every  ms after the
 * last turn finishes.
 */

export type Speaker = "customer" | "agent" | "tool";

export type Turn = {
	id: string;
	speaker: Speaker;
	/** For chat speakers: spoken text. For tool: a short action label
	 *  (e.g. "本人確認"). */
	text: string;
	/** For tool turns: human-readable result line shown after completion. */
	toolResult?: string;
	/** Delay before this turn appears as a thinking/listening bubble. */
	thinkingMs: number;
	/** Extra dwell after typing finishes, before the next turn begins. */
	postMs?: number;
};

export type Scenario = {
	id: string;
	/** Short label for the scenario picker. */
	title: string;
	/** Subtitle describing the use-case. */
	subtitle: string;
	/** Phone number rendered in the device caller block. */
	callerNumber: string;
	turns: Turn[];
};

// Pacing principles for every scenario:
// • Customer waits feel human (1.5–2.6s) — they're processing/talking.
// • Agent thinking is short (180–340ms) — model feels fast.
// • Tool calls are near-instant (140–260ms) — system events.

const TURNS_DELIVERY_CHANGE: Turn[] = [
	{
		id: "g1",
		speaker: "agent",
		text: "お電話ありがとうございます。BOTCHANサポートです。",
		thinkingMs: 280,
		postMs: 600,
	},
	{
		id: "c1",
		speaker: "customer",
		text: "金曜日に配送日を変更したいんですが。",
		thinkingMs: 1900,
		postMs: 350,
	},
	{
		id: "a1",
		speaker: "agent",
		text: "かしこまりました。本人確認のため、お電話番号を照合します。",
		thinkingMs: 280,
		postMs: 200,
	},
	{
		id: "tl1",
		speaker: "tool",
		text: "本人確認",
		toolResult: "山田 様 · 電話番号 ••71",
		thinkingMs: 240,
		postMs: 350,
	},
	{
		id: "a2",
		speaker: "agent",
		text: "確認できました、山田様ですね。ご注文番号を教えていただけますか？",
		thinkingMs: 220,
		postMs: 500,
	},
	{
		id: "c2",
		speaker: "customer",
		text: "ヨンヨンナナイチです。",
		thinkingMs: 1700,
		postMs: 280,
	},
	{
		id: "tl2",
		speaker: "tool",
		text: "注文照会",
		toolResult: "注文 #4471 · 在庫OK · 配送可",
		thinkingMs: 200,
		postMs: 320,
	},
	{
		id: "a3",
		speaker: "agent",
		text: "注文 #4471、5月8日(金)へ変更可能です。よろしいですか？",
		thinkingMs: 240,
		postMs: 500,
	},
	{
		id: "c3",
		speaker: "customer",
		text: "はい、お願いします。",
		thinkingMs: 1500,
		postMs: 240,
	},
	{
		id: "tl3",
		speaker: "tool",
		text: "配送日変更",
		toolResult: "5月8日(金)へ更新 · 確認メール送信",
		thinkingMs: 260,
		postMs: 380,
	},
	{
		id: "a4",
		speaker: "agent",
		text: "変更を承りました。確認メールをお送りしています。",
		thinkingMs: 220,
		postMs: 320,
	},
	{
		id: "a4b",
		speaker: "agent",
		text: "念のため、配送先はご登録の東京都渋谷区でお間違いないでしょうか？",
		thinkingMs: 200,
		postMs: 420,
	},
	{
		id: "c4",
		speaker: "customer",
		text: "はい、合っています。",
		thinkingMs: 1500,
		postMs: 240,
	},
	{
		id: "tl4",
		speaker: "tool",
		text: "配送先確認",
		toolResult: "東京都渋谷区 · 登録住所と一致",
		thinkingMs: 200,
		postMs: 320,
	},
	{
		id: "a5",
		speaker: "agent",
		text: "ありがとうございます。他にご用件はございますか？",
		thinkingMs: 220,
		postMs: 400,
	},
	{
		id: "c5",
		speaker: "customer",
		text: "大丈夫です。ありがとうございました。",
		thinkingMs: 1700,
		postMs: 280,
	},
	{
		id: "a6",
		speaker: "agent",
		text: "こちらこそありがとうございました。失礼します。",
		thinkingMs: 220,
		postMs: 800,
	},
];

const TURNS_PHONE_ORDER: Turn[] = [
	{
		id: "g1",
		speaker: "agent",
		text: "お電話ありがとうございます。BOTCHANオーダーセンターです。",
		thinkingMs: 280,
		postMs: 500,
	},
	{
		id: "c1",
		speaker: "customer",
		text: "注文をお願いしたいんですが。",
		thinkingMs: 1700,
		postMs: 320,
	},
	{
		id: "a1",
		speaker: "agent",
		text: "ありがとうございます。会員番号またはお電話番号で本人確認をいたします。",
		thinkingMs: 240,
		postMs: 250,
	},
	{
		id: "c2",
		speaker: "customer",
		text: "080-1234-XX42です。",
		thinkingMs: 1800,
		postMs: 220,
	},
	{
		id: "tl1",
		speaker: "tool",
		text: "本人確認",
		toolResult: "鈴木 様 · 会員 #M-2841",
		thinkingMs: 240,
		postMs: 320,
	},
	{
		id: "a2",
		speaker: "agent",
		text: "鈴木様、いつもありがとうございます。本日は何をご注文でしょうか？",
		thinkingMs: 220,
		postMs: 500,
	},
	{
		id: "c3",
		speaker: "customer",
		text: "Aセットを2点お願いします。",
		thinkingMs: 1600,
		postMs: 240,
	},
	{
		id: "tl2",
		speaker: "tool",
		text: "商品照会",
		toolResult: "A セット · ¥4,800 · 在庫OK",
		thinkingMs: 220,
		postMs: 320,
	},
	{
		id: "a3",
		speaker: "agent",
		text: "Aセット税込¥4,800を2点、合計¥9,600ですね。",
		thinkingMs: 220,
		postMs: 380,
	},
	{
		id: "a3b",
		speaker: "agent",
		text: "配送先はご登録の住所、お支払いはクレジットカード(••42)でよろしいですか？",
		thinkingMs: 200,
		postMs: 500,
	},
	{
		id: "c4",
		speaker: "customer",
		text: "はい、それでお願いします。",
		thinkingMs: 1700,
		postMs: 240,
	},
	{
		id: "tl3",
		speaker: "tool",
		text: "与信照会",
		toolResult: "クレジット ••42 · 承認済",
		thinkingMs: 240,
		postMs: 320,
	},
	{
		id: "tl4",
		speaker: "tool",
		text: "注文確定",
		toolResult: "#ORD-9831 · 最短便 · メール送信",
		thinkingMs: 220,
		postMs: 380,
	},
	{
		id: "a4",
		speaker: "agent",
		text: "ご注文を承りました。注文番号は#ORD-9831です。最短で明日お届けいたします。",
		thinkingMs: 220,
		postMs: 480,
	},
	{
		id: "c5",
		speaker: "customer",
		text: "助かります、ありがとうございます。",
		thinkingMs: 1500,
		postMs: 240,
	},
	{
		id: "a5",
		speaker: "agent",
		text: "ご利用ありがとうございました。失礼いたします。",
		thinkingMs: 220,
		postMs: 800,
	},
];

const TURNS_CANCELLATION: Turn[] = [
	{
		id: "g1",
		speaker: "agent",
		text: "お電話ありがとうございます。BOTCHANサポートです。",
		thinkingMs: 280,
		postMs: 500,
	},
	{
		id: "c1",
		speaker: "customer",
		text: "サブスクの解約をお願いしたいんですが。",
		thinkingMs: 1900,
		postMs: 320,
	},
	{
		id: "a1",
		speaker: "agent",
		text: "承知いたしました。会員番号を教えていただけますか？",
		thinkingMs: 220,
		postMs: 280,
	},
	{
		id: "c2",
		speaker: "customer",
		text: "M-3091です。",
		thinkingMs: 1500,
		postMs: 220,
	},
	{
		id: "tl1",
		speaker: "tool",
		text: "本人確認",
		toolResult: "田中 様 · 会員 #M-3091 · 契約14ヶ月",
		thinkingMs: 240,
		postMs: 380,
	},
	{
		id: "a2",
		speaker: "agent",
		text: "田中様、ご利用ありがとうございます。差し支えなければ、ご解約のご理由を伺ってもよろしいでしょうか？",
		thinkingMs: 240,
		postMs: 600,
	},
	{
		id: "c3",
		speaker: "customer",
		text: "最近あまり使わなくなってしまって。",
		thinkingMs: 2100,
		postMs: 280,
	},
	{
		id: "a3",
		speaker: "agent",
		text: "承知しました。ご利用頻度に合わせて月額¥1,800のライトプランへの変更も可能ですが、いかがでしょうか？",
		thinkingMs: 280,
		postMs: 600,
	},
	{
		id: "c4",
		speaker: "customer",
		text: "今回は解約でお願いします。",
		thinkingMs: 1900,
		postMs: 240,
	},
	{
		id: "a4",
		speaker: "agent",
		text: "かしこまりました。それでは解約手続きを進めます。",
		thinkingMs: 220,
		postMs: 320,
	},
	{
		id: "tl2",
		speaker: "tool",
		text: "契約照会",
		toolResult: "次回更新 2026-05-20 · 解約締切 2026-05-15",
		thinkingMs: 240,
		postMs: 380,
	},
	{
		id: "a5",
		speaker: "agent",
		text: "5月15日までに手続きを完了すれば、次回請求は発生しません。本日付けで処理してもよろしいですか？",
		thinkingMs: 240,
		postMs: 540,
	},
	{
		id: "c5",
		speaker: "customer",
		text: "はい、お願いします。",
		thinkingMs: 1500,
		postMs: 240,
	},
	{
		id: "tl3",
		speaker: "tool",
		text: "解約処理",
		toolResult: "5月20日 終了 · 確認メール送信",
		thinkingMs: 260,
		postMs: 380,
	},
	{
		id: "a6",
		speaker: "agent",
		text: "解約手続きを承りました。5月20日をもってサービスを終了いたします。",
		thinkingMs: 220,
		postMs: 480,
	},
	{
		id: "c6",
		speaker: "customer",
		text: "ありがとうございました。",
		thinkingMs: 1500,
		postMs: 220,
	},
	{
		id: "a7",
		speaker: "agent",
		text: "長らくご利用いただきありがとうございました。失礼いたします。",
		thinkingMs: 220,
		postMs: 800,
	},
];

const TURNS_RESERVATION: Turn[] = [
	{
		id: "g1",
		speaker: "agent",
		text: "お電話ありがとうございます。BOTCHANリザベーションセンターです。",
		thinkingMs: 280,
		postMs: 500,
	},
	{
		id: "c1",
		speaker: "customer",
		text: "予約を取りたいんですが。",
		thinkingMs: 1600,
		postMs: 280,
	},
	{
		id: "a1",
		speaker: "agent",
		text: "ありがとうございます。お名前とお電話番号をお伺いできますか？",
		thinkingMs: 220,
		postMs: 320,
	},
	{
		id: "c2",
		speaker: "customer",
		text: "佐藤と申します。電話は090-9876-XX03です。",
		thinkingMs: 2000,
		postMs: 240,
	},
	{
		id: "tl1",
		speaker: "tool",
		text: "顧客照会",
		toolResult: "佐藤 様 · 過去2回ご利用",
		thinkingMs: 240,
		postMs: 320,
	},
	{
		id: "a2",
		speaker: "agent",
		text: "佐藤様、いつもありがとうございます。ご希望の日時を教えてください。",
		thinkingMs: 220,
		postMs: 500,
	},
	{
		id: "c3",
		speaker: "customer",
		text: "来週の金曜日、夕方に2名でお願いします。",
		thinkingMs: 2000,
		postMs: 280,
	},
	{
		id: "tl2",
		speaker: "tool",
		text: "空き枠照会",
		toolResult: "5月15日(金) · 18:00 / 19:30 / 20:00 空き有",
		thinkingMs: 240,
		postMs: 380,
	},
	{
		id: "a3",
		speaker: "agent",
		text: "18時、19時半、20時のお席がございます。ご希望はいかがでしょうか？",
		thinkingMs: 240,
		postMs: 540,
	},
	{
		id: "c4",
		speaker: "customer",
		text: "では19時半でお願いします。",
		thinkingMs: 1700,
		postMs: 240,
	},
	{
		id: "a4",
		speaker: "agent",
		text: "5月15日(金) 19時半、2名様で承ります。アレルギーやご要望はございますか？",
		thinkingMs: 240,
		postMs: 540,
	},
	{
		id: "c5",
		speaker: "customer",
		text: "ピーナッツが食べられないんです。",
		thinkingMs: 1900,
		postMs: 280,
	},
	{
		id: "tl3",
		speaker: "tool",
		text: "アレルギー対応",
		toolResult: "ピーナッツ除外 · キッチン通知済",
		thinkingMs: 240,
		postMs: 320,
	},
	{
		id: "a5",
		speaker: "agent",
		text: "ピーナッツ除外で承りました。お席は窓側とテーブル席、どちらをご希望ですか？",
		thinkingMs: 240,
		postMs: 540,
	},
	{
		id: "c6",
		speaker: "customer",
		text: "窓側でお願いします。",
		thinkingMs: 1500,
		postMs: 240,
	},
	{
		id: "tl4",
		speaker: "tool",
		text: "予約確定",
		toolResult: "#RSV-2810 · 5月15日 19:30 · 窓側 · 確認メール送信",
		thinkingMs: 260,
		postMs: 400,
	},
	{
		id: "a6",
		speaker: "agent",
		text: "予約番号は#RSV-2810です。確認メールをお送りしています。当日のご来店、お待ちしております。",
		thinkingMs: 240,
		postMs: 540,
	},
	{
		id: "c7",
		speaker: "customer",
		text: "ありがとうございます。",
		thinkingMs: 1400,
		postMs: 220,
	},
	{
		id: "a7",
		speaker: "agent",
		text: "ご予約ありがとうございました。失礼いたします。",
		thinkingMs: 220,
		postMs: 800,
	},
];

export const SCENARIOS: Scenario[] = [
	{
		id: "delivery",
		title: "配送変更",
		subtitle: "注文の配送日変更",
		callerNumber: "+81 3 5551 ••71",
		turns: TURNS_DELIVERY_CHANGE,
	},
	{
		id: "order",
		title: "電話注文",
		subtitle: "新規受注 · 与信 · 配送",
		callerNumber: "+81 80 1234 ••42",
		turns: TURNS_PHONE_ORDER,
	},
	{
		id: "cancel",
		title: "解約手続き",
		subtitle: "サブスク解約 · リテンション",
		callerNumber: "+81 3 5677 ••88",
		turns: TURNS_CANCELLATION,
	},
	{
		id: "reservation",
		title: "予約受付",
		subtitle: "日時 · 要望 · 席指定",
		callerNumber: "+81 90 9876 ••03",
		turns: TURNS_RESERVATION,
	},
];

export const REST_BETWEEN_SCENARIOS_MS = 5_000;
/** Estimate when the bubble's typing finishes, so the orchestrator can pace
 *  the next turn naturally. Tool turns are near-instant. Customer/agent
 *  estimates use the midpoint of `variableSpeed`. */
export function estimateSpeakingMs(turn: Turn): number {
	if (turn.speaker === "tool") return 260;
	const len = turn.text.length;
	const avgPerChar = turn.speaker === "agent" ? 25 : 33;
	const initialDelay = turn.speaker === "agent" ? 60 : 80;
	return initialDelay + len * avgPerChar;
}
