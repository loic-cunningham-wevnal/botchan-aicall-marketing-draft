"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
	return (
		<ReactLenis
			options={{
				lerp: 0.1,
				duration: 1.2,
				smoothWheel: true,
				wheelMultiplier: 1,
				touchMultiplier: 1.5,
				anchors: {
					offset: -16,
					easing: (t) => 1 - (1 - t) ** 3,
				},
			}}
			root
		>
			{children}
		</ReactLenis>
	);
}
