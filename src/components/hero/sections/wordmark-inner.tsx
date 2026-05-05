"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const GLOW_TEXT_SHADOW =
	"0 0 18px rgba(0, 200, 255, 0.55), 0 0 60px rgba(3, 102, 243, 0.45), 0 0 120px rgba(5, 0, 231, 0.35)";

const BOTCHAN_INITIAL = { opacity: 0, y: 18, letterSpacing: "-0.02em" };
const BOTCHAN_ANIMATE = { opacity: 1, y: 0, letterSpacing: "-0.06em" };
const BOTCHAN_TRANSITION = { duration: 1.1, ease, delay: 0.35 };

const AICALL_INITIAL = { opacity: 0, y: -18, letterSpacing: "0.04em" };
const AICALL_ANIMATE = { opacity: 1, y: 0, letterSpacing: "-0.04em" };
const AICALL_TRANSITION = { duration: 1.1, ease, delay: 0.5 };

export function WordmarkInner({ glow }: { glow?: boolean }) {
	const baseStyle: CSSProperties = {
		color: "var(--ink)",
		...(glow && { textShadow: GLOW_TEXT_SHADOW }),
	};
	return (
		<>
			<motion.h1
				animate={BOTCHAN_ANIMATE}
				className="font-black font-display text-[clamp(3rem,12vw,12rem)] lowercase leading-[0.85]"
				initial={BOTCHAN_INITIAL}
				style={baseStyle}
				transition={BOTCHAN_TRANSITION}
			>
				botchan
			</motion.h1>
			<motion.h2
				animate={AICALL_ANIMATE}
				className="mt-[-0.04em] font-black font-display uppercase leading-[0.85]"
				initial={AICALL_INITIAL}
				style={{ ...baseStyle, fontSize: "clamp(3rem, 12vw, 12rem)" }}
				transition={AICALL_TRANSITION}
			>
				AICALL
			</motion.h2>
		</>
	);
}
