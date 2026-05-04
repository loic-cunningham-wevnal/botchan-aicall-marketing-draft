"use client";

import {
	type CSSProperties,
	memo,
	type ReactNode,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import "./gradual-blur.css";

type Position = "top" | "bottom" | "left" | "right";
type Curve = "linear" | "bezier" | "ease-in" | "ease-out" | "ease-in-out";
type Animated = boolean | "scroll";
type Target = "parent" | "page";

export interface GradualBlurProps {
	position?: Position;
	strength?: number;
	height?: string;
	width?: string;
	divCount?: number;
	exponential?: boolean;
	curve?: Curve;
	opacity?: number;
	animated?: Animated;
	duration?: string;
	easing?: string;
	hoverIntensity?: number;
	target?: Target;
	preset?: keyof typeof PRESETS;
	responsive?: boolean;
	zIndex?: number;
	onAnimationComplete?: () => void;
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
}

const DEFAULT_CONFIG = {
	position: "bottom" as Position,
	strength: 2,
	height: "6rem",
	divCount: 5,
	exponential: false,
	zIndex: 1000,
	animated: false as Animated,
	duration: "0.3s",
	easing: "ease-out",
	opacity: 1,
	curve: "linear" as Curve,
	responsive: false,
	target: "parent" as Target,
	className: "",
	style: {} as CSSProperties,
};

const PRESETS = {
	top: { position: "top" as Position, height: "6rem" },
	bottom: { position: "bottom" as Position, height: "6rem" },
	left: { position: "left" as Position, height: "6rem" },
	right: { position: "right" as Position, height: "6rem" },
	subtle: { height: "4rem", strength: 1, opacity: 0.8, divCount: 3 },
	intense: { height: "10rem", strength: 4, divCount: 8, exponential: true },
	smooth: { height: "8rem", curve: "bezier" as Curve, divCount: 10 },
	sharp: { height: "5rem", curve: "linear" as Curve, divCount: 4 },
	header: {
		position: "top" as Position,
		height: "8rem",
		curve: "ease-out" as Curve,
	},
	footer: {
		position: "bottom" as Position,
		height: "8rem",
		curve: "ease-out" as Curve,
	},
	sidebar: { position: "left" as Position, height: "6rem", strength: 2.5 },
	"page-header": {
		position: "top" as Position,
		height: "10rem",
		target: "page" as Target,
		strength: 3,
	},
	"page-footer": {
		position: "bottom" as Position,
		height: "10rem",
		target: "page" as Target,
		strength: 3,
	},
};

const CURVE_FUNCTIONS: Record<Curve, (p: number) => number> = {
	linear: (p) => p,
	bezier: (p) => p * p * (3 - 2 * p),
	"ease-in": (p) => p * p,
	"ease-out": (p) => 1 - (1 - p) ** 2,
	"ease-in-out": (p) => (p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2),
};

const getGradientDirection = (position: Position) =>
	({
		top: "to top",
		bottom: "to bottom",
		left: "to left",
		right: "to right",
	})[position] || "to bottom";

const useIntersectionObserver = (
	ref: React.RefObject<HTMLDivElement | null>,
	shouldObserve = false,
) => {
	const [isVisible, setIsVisible] = useState(!shouldObserve);

	useEffect(() => {
		if (!shouldObserve || !ref.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry) setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.1 },
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [ref, shouldObserve]);

	return isVisible;
};

function GradualBlur(props: GradualBlurProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	const config = useMemo(() => {
		const presetConfig =
			props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
		return { ...DEFAULT_CONFIG, ...presetConfig, ...props };
	}, [props]);

	const isVisible = useIntersectionObserver(
		containerRef,
		config.animated === "scroll",
	);

	const blurDivs = useMemo(() => {
		const divs: ReactNode[] = [];
		const increment = 100 / config.divCount;
		const currentStrength =
			isHovered && config.hoverIntensity
				? config.strength * config.hoverIntensity
				: config.strength;

		const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;

		for (let i = 1; i <= config.divCount; i++) {
			let progress = i / config.divCount;
			progress = curveFunc(progress);

			let blurValue: number;
			if (config.exponential) {
				blurValue = 2 ** (progress * 4) * 0.0625 * currentStrength;
			} else {
				blurValue = 0.0625 * (progress * config.divCount + 1) * currentStrength;
			}

			const p1 = Math.round((increment * i - increment) * 10) / 10;
			const p2 = Math.round(increment * i * 10) / 10;
			const p3 = Math.round((increment * i + increment) * 10) / 10;
			const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

			let gradient = `transparent ${p1}%, black ${p2}%`;
			if (p3 <= 100) gradient += `, black ${p3}%`;
			if (p4 <= 100) gradient += `, transparent ${p4}%`;

			const direction = getGradientDirection(config.position);

			const divStyle: CSSProperties = {
				position: "absolute",
				inset: "0",
				maskImage: `linear-gradient(${direction}, ${gradient})`,
				WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
				backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
				WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
				opacity: config.opacity,
				transition:
					config.animated && config.animated !== "scroll"
						? `backdrop-filter ${config.duration} ${config.easing}`
						: undefined,
			};

			divs.push(<div key={i} style={divStyle} />);
		}

		return divs;
	}, [config, isHovered]);

	const containerStyle = useMemo<CSSProperties>(() => {
		const isVertical = ["top", "bottom"].includes(config.position);
		const isHorizontal = ["left", "right"].includes(config.position);
		const isPageTarget = config.target === "page";

		const baseStyle: CSSProperties = {
			position: isPageTarget ? "fixed" : "absolute",
			pointerEvents: config.hoverIntensity ? "auto" : "none",
			opacity: isVisible ? 1 : 0,
			transition: config.animated
				? `opacity ${config.duration} ${config.easing}`
				: undefined,
			zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,
			...config.style,
		};

		if (isVertical) {
			baseStyle.height = config.height;
			baseStyle.width = config.width || "100%";
			baseStyle[config.position as "top" | "bottom"] = 0;
			baseStyle.left = 0;
			baseStyle.right = 0;
		} else if (isHorizontal) {
			baseStyle.width = config.width || config.height;
			baseStyle.height = "100%";
			baseStyle[config.position as "left" | "right"] = 0;
			baseStyle.top = 0;
			baseStyle.bottom = 0;
		}

		return baseStyle;
	}, [config, isVisible]);

	const { hoverIntensity, animated, onAnimationComplete, duration } = config;

	useEffect(() => {
		if (isVisible && animated === "scroll" && onAnimationComplete) {
			const ms = Number.parseFloat(duration) * 1000;
			const t = setTimeout(() => onAnimationComplete(), ms);
			return () => clearTimeout(t);
		}
	}, [isVisible, animated, onAnimationComplete, duration]);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: decorative blur overlay; pointerEvents off unless hoverIntensity is set
		<div
			className={`gradual-blur ${
				config.target === "page" ? "gradual-blur-page" : "gradual-blur-parent"
			} ${config.className}`}
			onMouseEnter={hoverIntensity ? () => setIsHovered(true) : undefined}
			onMouseLeave={hoverIntensity ? () => setIsHovered(false) : undefined}
			ref={containerRef}
			style={containerStyle}
		>
			<div
				className="gradual-blur-inner"
				style={{
					position: "relative",
					width: "100%",
					height: "100%",
				}}
			>
				{blurDivs}
			</div>
		</div>
	);
}

const GradualBlurMemo = memo(GradualBlur);
GradualBlurMemo.displayName = "GradualBlur";
export default GradualBlurMemo;
