import type { Speaker } from "~/constants/scenarios";

export const BUBBLE_CLASS: Record<Speaker, string> = {
	customer:
		"mr-auto max-w-[82%] rounded-2xl rounded-tl-sm border border-white/15 bg-black/55 px-5 py-3.5 backdrop-blur-xl",
	agent:
		"ml-auto max-w-[82%] rounded-2xl rounded-tr-sm border border-[#0cf]/35 bg-[#0cf]/10 px-5 py-3.5 backdrop-blur-md",
	// Tool calls render as a centred status row — no card chrome, just a
	// subtle inline event so the conversation stays the visual centre.
	tool: "mx-auto max-w-[92%] px-2 py-1",
};

export const SPEAKER_LABEL: Record<Speaker, string> = {
	customer: "お客様",
	agent: "BOTCHAN",
	tool: "TOOL",
};

export const SPEAKER_LABEL_CLASS: Record<Speaker, string> = {
	customer: "text-white/55",
	agent: "text-[#0cf]",
	tool: "text-white/55",
};

export const SPEAKER_DOT_CLASS: Record<Speaker, string> = {
	customer: "bg-white/65",
	agent: "bg-[#0cf]",
	tool: "bg-white/55",
};

export const THINKING_LABEL: Record<Speaker, string> = {
	customer: "発話中",
	agent: "思考中",
	tool: "実行中",
};
