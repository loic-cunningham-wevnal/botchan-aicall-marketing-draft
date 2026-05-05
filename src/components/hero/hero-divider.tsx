// Dashed left rule that runs vertically through all sections after the hero.
// Pulled out so the value is described once and the gradient/mask string isn't
// re-allocated each render.

const DASH_BG_IMAGE =
	"linear-gradient(to bottom, rgb(127 127 127 / 0.36) 0, rgb(127 127 127 / 0.36) 6px, transparent 6px, transparent 12px)";
const DASH_MASK_IMAGE =
	"linear-gradient(to bottom, transparent 0, black 8rem, black calc(100% - 8rem), transparent 100%)";

const DIVIDER_STYLE = {
	backgroundImage: DASH_BG_IMAGE,
	backgroundSize: "1px 12px",
	backgroundRepeat: "repeat-y" as const,
	WebkitMaskImage: DASH_MASK_IMAGE,
	maskImage: DASH_MASK_IMAGE,
};

export function HeroDivider() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-y-0 left-[max(0.5rem,calc((100vw-1400px)/2-1rem))] z-30 w-px sm:left-[max(0.75rem,calc((100vw-1400px)/2-1.25rem))] lg:left-[max(1rem,calc((100vw-1400px)/2-1.5rem))]"
			style={DIVIDER_STYLE}
		/>
	);
}
