"use client";

import {
	motion,
	useAnimationFrame,
	useMotionValue,
	useScroll,
	useSpring,
	useTransform,
	useVelocity,
} from "framer-motion";
import {
	type CSSProperties,
	type ReactNode,
	type RefObject,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import "./scroll-velocity.css";

interface VelocityMapping {
	input: number[];
	output: number[];
}

export interface ScrollVelocityProps {
	scrollContainerRef?: RefObject<HTMLElement>;
	texts?: ReactNode[];
	velocity?: number;
	className?: string;
	damping?: number;
	stiffness?: number;
	numCopies?: number;
	velocityMapping?: VelocityMapping;
	parallaxClassName?: string;
	scrollerClassName?: string;
	parallaxStyle?: CSSProperties;
	scrollerStyle?: CSSProperties;
}

interface VelocityTextProps {
	children: ReactNode;
	baseVelocity: number;
	scrollContainerRef?: RefObject<HTMLElement>;
	className?: string;
	damping: number;
	stiffness: number;
	numCopies: number;
	velocityMapping: VelocityMapping;
	parallaxClassName: string;
	scrollerClassName: string;
	parallaxStyle?: CSSProperties;
	scrollerStyle?: CSSProperties;
}

function useElementWidth(ref: RefObject<HTMLElement | null>) {
	const [width, setWidth] = useState(0);

	useLayoutEffect(() => {
		function updateWidth() {
			if (ref.current) setWidth(ref.current.offsetWidth);
		}
		updateWidth();
		window.addEventListener("resize", updateWidth);
		return () => window.removeEventListener("resize", updateWidth);
	}, [ref]);

	return width;
}

function VelocityText({
	children,
	baseVelocity,
	scrollContainerRef,
	className,
	damping,
	stiffness,
	numCopies,
	velocityMapping,
	parallaxClassName,
	scrollerClassName,
	parallaxStyle,
	scrollerStyle,
}: VelocityTextProps) {
	const baseX = useMotionValue(0);
	const scrollOptions = scrollContainerRef
		? { container: scrollContainerRef }
		: {};
	const { scrollY } = useScroll(scrollOptions);
	const scrollVelocity = useVelocity(scrollY);
	const smoothVelocity = useSpring(scrollVelocity, { damping, stiffness });
	const velocityFactor = useTransform(
		smoothVelocity,
		velocityMapping.input,
		velocityMapping.output,
		{ clamp: false },
	);

	const copyRef = useRef<HTMLSpanElement>(null);
	const copyWidth = useElementWidth(copyRef);

	function wrap(min: number, max: number, v: number) {
		const range = max - min;
		const mod = (((v - min) % range) + range) % range;
		return mod + min;
	}

	const x = useTransform(baseX, (v) => {
		if (copyWidth === 0) return "0px";
		return `${wrap(-copyWidth, 0, v)}px`;
	});

	const directionFactor = useRef(1);
	useAnimationFrame((_t, delta) => {
		let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

		if (velocityFactor.get() < 0) {
			directionFactor.current = -1;
		} else if (velocityFactor.get() > 0) {
			directionFactor.current = 1;
		}

		moveBy += directionFactor.current * moveBy * velocityFactor.get();
		baseX.set(baseX.get() + moveBy);
	});

	const spans = [];
	for (let i = 0; i < numCopies; i++) {
		spans.push(
			<span className={className} key={i} ref={i === 0 ? copyRef : null}>
				{children}&nbsp;
			</span>,
		);
	}

	return (
		<div className={parallaxClassName} style={parallaxStyle}>
			<motion.div className={scrollerClassName} style={{ x, ...scrollerStyle }}>
				{spans}
			</motion.div>
		</div>
	);
}

export function ScrollVelocity({
	scrollContainerRef,
	texts = [],
	velocity = 100,
	className = "",
	damping = 50,
	stiffness = 400,
	numCopies = 6,
	velocityMapping = { input: [0, 1000], output: [0, 5] },
	parallaxClassName = "parallax",
	scrollerClassName = "scroller",
	parallaxStyle,
	scrollerStyle,
}: ScrollVelocityProps) {
	return (
		<section>
			{texts.map((text, index) => (
				<VelocityText
					baseVelocity={index % 2 !== 0 ? -velocity : velocity}
					className={className}
					damping={damping}
					// biome-ignore lint/suspicious/noArrayIndexKey: static text list
					key={index}
					numCopies={numCopies}
					parallaxClassName={parallaxClassName}
					parallaxStyle={parallaxStyle}
					scrollContainerRef={scrollContainerRef}
					scrollerClassName={scrollerClassName}
					scrollerStyle={scrollerStyle}
					stiffness={stiffness}
					velocityMapping={velocityMapping}
				>
					{text}
				</VelocityText>
			))}
		</section>
	);
}

export default ScrollVelocity;
