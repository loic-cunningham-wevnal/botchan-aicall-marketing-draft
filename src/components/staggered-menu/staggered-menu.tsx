"use client";

import { gsap } from "gsap";
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import "./staggered-menu.css";

export type StaggeredMenuItem = {
	label: string;
	link: string;
	ariaLabel?: string;
};

export type StaggeredMenuSocialItem = {
	label: string;
	link: string;
};

export type StaggeredMenuProps = {
	position?: "left" | "right";
	colors?: string[];
	items?: StaggeredMenuItem[];
	socialItems?: StaggeredMenuSocialItem[];
	displaySocials?: boolean;
	displayItemNumbering?: boolean;
	className?: string;
	logoUrl?: string;
	menuButtonColor?: string;
	openMenuButtonColor?: string;
	accentColor?: string;
	changeMenuColorOnOpen?: boolean;
	isFixed?: boolean;
	closeOnClickAway?: boolean;
	onMenuOpen?: () => void;
	onMenuClose?: () => void;
};

export function StaggeredMenu({
	position = "right",
	colors = ["#B497CF", "#5227FF"],
	items = [],
	socialItems = [],
	displaySocials = true,
	displayItemNumbering = true,
	className,
	logoUrl,
	menuButtonColor,
	openMenuButtonColor,
	accentColor = "#5227FF",
	changeMenuColorOnOpen = true,
	isFixed = false,
	closeOnClickAway = true,
	onMenuOpen,
	onMenuClose,
}: StaggeredMenuProps) {
	const [open, setOpen] = useState(false);
	const openRef = useRef(false);
	const panelRef = useRef<HTMLElement | null>(null);
	const preLayersRef = useRef<HTMLDivElement | null>(null);
	const preLayerElsRef = useRef<HTMLElement[]>([]);
	const plusHRef = useRef<HTMLSpanElement | null>(null);
	const plusVRef = useRef<HTMLSpanElement | null>(null);
	const iconRef = useRef<HTMLSpanElement | null>(null);
	const textInnerRef = useRef<HTMLSpanElement | null>(null);
	const textWrapRef = useRef<HTMLSpanElement | null>(null);
	const [textLines, setTextLines] = useState<string[]>(["Menu", "Close"]);

	const openTlRef = useRef<gsap.core.Timeline | null>(null);
	const closeTweenRef = useRef<gsap.core.Tween | null>(null);
	const spinTweenRef = useRef<gsap.core.Tween | null>(null);
	const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
	const colorTweenRef = useRef<gsap.core.Tween | null>(null);
	const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
	const busyRef = useRef(false);
	const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const panel = panelRef.current;
			const preContainer = preLayersRef.current;
			const plusH = plusHRef.current;
			const plusV = plusVRef.current;
			const icon = iconRef.current;
			const textInner = textInnerRef.current;
			if (!panel || !plusH || !plusV || !icon || !textInner) return;

			let preLayers: HTMLElement[] = [];
			if (preContainer) {
				preLayers = Array.from(
					preContainer.querySelectorAll<HTMLElement>(".sm-prelayer"),
				);
			}
			preLayerElsRef.current = preLayers;

			const offscreen = position === "left" ? -100 : 100;
			gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
			if (preContainer) {
				gsap.set(preContainer, { xPercent: 0, opacity: 1 });
			}
			gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
			gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
			gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
			gsap.set(textInner, { yPercent: 0 });
			if (toggleBtnRef.current && menuButtonColor)
				gsap.set(toggleBtnRef.current, { color: menuButtonColor });
		});
		return () => ctx.revert();
	}, [menuButtonColor, position]);

	const buildOpenTimeline = useCallback(() => {
		const panel = panelRef.current;
		const layers = preLayerElsRef.current;
		if (!panel) return null;

		openTlRef.current?.kill();
		if (closeTweenRef.current) {
			closeTweenRef.current.kill();
			closeTweenRef.current = null;
		}
		itemEntranceTweenRef.current?.kill();

		const itemEls = Array.from(
			panel.querySelectorAll<HTMLElement>(".sm-panel-itemLabel"),
		);
		const numberEls = Array.from(
			panel.querySelectorAll<HTMLElement>(
				".sm-panel-list[data-numbering] .sm-panel-item",
			),
		);
		const socialTitle = panel.querySelector<HTMLElement>(".sm-socials-title");
		const socialLinks = Array.from(
			panel.querySelectorAll<HTMLElement>(".sm-socials-link"),
		);

		const offscreen = position === "left" ? -100 : 100;
		const layerStates = layers.map((el) => ({ el, start: offscreen }));
		const panelStart = offscreen;

		if (itemEls.length) {
			gsap.set(itemEls, { yPercent: 140, rotate: 10 });
		}
		if (numberEls.length) {
			gsap.set(numberEls, { "--sm-num-opacity": 0 });
		}
		if (socialTitle) {
			gsap.set(socialTitle, { opacity: 0 });
		}
		if (socialLinks.length) {
			gsap.set(socialLinks, { y: 25, opacity: 0 });
		}

		const tl = gsap.timeline({ paused: true });

		layerStates.forEach((ls, i) => {
			tl.fromTo(
				ls.el,
				{ xPercent: ls.start },
				{ xPercent: 0, duration: 0.5, ease: "power4.out" },
				i * 0.07,
			);
		});
		const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
		const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
		const panelDuration = 0.65;
		tl.fromTo(
			panel,
			{ xPercent: panelStart },
			{ xPercent: 0, duration: panelDuration, ease: "power4.out" },
			panelInsertTime,
		);

		if (itemEls.length) {
			const itemsStartRatio = 0.15;
			const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
			tl.to(
				itemEls,
				{
					yPercent: 0,
					rotate: 0,
					duration: 1,
					ease: "power4.out",
					stagger: { each: 0.1, from: "start" },
				},
				itemsStart,
			);
			if (numberEls.length) {
				tl.to(
					numberEls,
					{
						duration: 0.6,
						ease: "power2.out",
						"--sm-num-opacity": 1,
						stagger: { each: 0.08, from: "start" },
					},
					itemsStart + 0.1,
				);
			}
		}

		if (socialTitle || socialLinks.length) {
			const socialsStart = panelInsertTime + panelDuration * 0.4;
			if (socialTitle) {
				tl.to(
					socialTitle,
					{ opacity: 1, duration: 0.5, ease: "power2.out" },
					socialsStart,
				);
			}
			if (socialLinks.length) {
				tl.to(
					socialLinks,
					{
						y: 0,
						opacity: 1,
						duration: 0.55,
						ease: "power3.out",
						stagger: { each: 0.08, from: "start" },
						onComplete: () => {
							gsap.set(socialLinks, { clearProps: "opacity" });
						},
					},
					socialsStart + 0.04,
				);
			}
		}

		openTlRef.current = tl;
		return tl;
	}, [position]);

	const playOpen = useCallback(() => {
		if (busyRef.current) return;
		busyRef.current = true;
		const tl = buildOpenTimeline();
		if (tl) {
			tl.eventCallback("onComplete", () => {
				busyRef.current = false;
			});
			tl.play(0);
		} else {
			busyRef.current = false;
		}
	}, [buildOpenTimeline]);

	const playClose = useCallback(() => {
		openTlRef.current?.kill();
		openTlRef.current = null;
		itemEntranceTweenRef.current?.kill();

		const panel = panelRef.current;
		const layers = preLayerElsRef.current;
		if (!panel) return;

		const all = [...layers, panel];
		closeTweenRef.current?.kill();
		const offscreen = position === "left" ? -100 : 100;
		closeTweenRef.current = gsap.to(all, {
			xPercent: offscreen,
			duration: 0.32,
			ease: "power3.in",
			overwrite: "auto",
			onComplete: () => {
				const itemEls = Array.from(
					panel.querySelectorAll<HTMLElement>(".sm-panel-itemLabel"),
				);
				if (itemEls.length) {
					gsap.set(itemEls, { yPercent: 140, rotate: 10 });
				}
				const numberEls = Array.from(
					panel.querySelectorAll<HTMLElement>(
						".sm-panel-list[data-numbering] .sm-panel-item",
					),
				);
				if (numberEls.length) {
					gsap.set(numberEls, { "--sm-num-opacity": 0 });
				}
				const socialTitle =
					panel.querySelector<HTMLElement>(".sm-socials-title");
				const socialLinks = Array.from(
					panel.querySelectorAll<HTMLElement>(".sm-socials-link"),
				);
				if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
				if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
				busyRef.current = false;
			},
		});
	}, [position]);

	const animateIcon = useCallback((opening: boolean) => {
		const icon = iconRef.current;
		if (!icon) return;
		spinTweenRef.current?.kill();
		if (opening) {
			spinTweenRef.current = gsap.to(icon, {
				rotate: 225,
				duration: 0.8,
				ease: "power4.out",
				overwrite: "auto",
			});
		} else {
			spinTweenRef.current = gsap.to(icon, {
				rotate: 0,
				duration: 0.35,
				ease: "power3.inOut",
				overwrite: "auto",
			});
		}
	}, []);

	const animateColor = useCallback(
		(opening: boolean) => {
			const btn = toggleBtnRef.current;
			if (!btn) return;
			colorTweenRef.current?.kill();
			if (changeMenuColorOnOpen && menuButtonColor && openMenuButtonColor) {
				const targetColor = opening ? openMenuButtonColor : menuButtonColor;
				colorTweenRef.current = gsap.to(btn, {
					color: targetColor,
					delay: 0.18,
					duration: 0.3,
					ease: "power2.out",
				});
			} else if (menuButtonColor) {
				gsap.set(btn, { color: menuButtonColor });
			}
		},
		[openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen],
	);

	useEffect(() => {
		if (!toggleBtnRef.current) return;
		if (changeMenuColorOnOpen && menuButtonColor && openMenuButtonColor) {
			const targetColor = openRef.current
				? openMenuButtonColor
				: menuButtonColor;
			gsap.set(toggleBtnRef.current, { color: targetColor });
		} else if (menuButtonColor) {
			gsap.set(toggleBtnRef.current, { color: menuButtonColor });
		}
	}, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

	const animateText = useCallback((opening: boolean) => {
		const inner = textInnerRef.current;
		if (!inner) return;
		textCycleAnimRef.current?.kill();

		const currentLabel = opening ? "Menu" : "Close";
		const targetLabel = opening ? "Close" : "Menu";
		const cycles = 3;
		const seq = [currentLabel];
		let last = currentLabel;
		for (let i = 0; i < cycles; i++) {
			last = last === "Menu" ? "Close" : "Menu";
			seq.push(last);
		}
		if (last !== targetLabel) seq.push(targetLabel);
		seq.push(targetLabel);
		setTextLines(seq);

		gsap.set(inner, { yPercent: 0 });
		const lineCount = seq.length;
		const finalShift = ((lineCount - 1) / lineCount) * 100;
		textCycleAnimRef.current = gsap.to(inner, {
			yPercent: -finalShift,
			duration: 0.5 + lineCount * 0.07,
			ease: "power4.out",
		});
	}, []);

	const toggleMenu = useCallback(() => {
		const target = !openRef.current;
		openRef.current = target;
		setOpen(target);
		if (target) {
			onMenuOpen?.();
			playOpen();
		} else {
			onMenuClose?.();
			playClose();
		}
		animateIcon(target);
		animateColor(target);
		animateText(target);
	}, [
		playOpen,
		playClose,
		animateIcon,
		animateColor,
		animateText,
		onMenuOpen,
		onMenuClose,
	]);

	const closeMenu = useCallback(() => {
		if (openRef.current) {
			openRef.current = false;
			setOpen(false);
			onMenuClose?.();
			playClose();
			animateIcon(false);
			animateColor(false);
			animateText(false);
		}
	}, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

	useEffect(() => {
		if (!closeOnClickAway || !open) return;

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node | null;
			if (
				target &&
				panelRef.current &&
				!panelRef.current.contains(target) &&
				toggleBtnRef.current &&
				!toggleBtnRef.current.contains(target)
			) {
				closeMenu();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [closeOnClickAway, open, closeMenu]);

	const wrapperStyle = accentColor
		? ({ "--sm-accent": accentColor } as React.CSSProperties)
		: undefined;

	const rawColors = colors.length ? colors.slice(0, 4) : ["#1e1e22", "#35353c"];
	const layerColors = [...rawColors];
	if (layerColors.length >= 3) {
		const mid = Math.floor(layerColors.length / 2);
		layerColors.splice(mid, 1);
	}

	return (
		<div
			className={`${className ? `${className} ` : ""}staggered-menu-wrapper${
				isFixed ? "fixed-wrapper" : ""
			}`}
			data-open={open || undefined}
			data-position={position}
			style={wrapperStyle}
		>
			<div aria-hidden="true" className="sm-prelayers" ref={preLayersRef}>
				{layerColors.map((c, i) => (
					<div
						className="sm-prelayer"
						// biome-ignore lint/suspicious/noArrayIndexKey: static color list
						key={i}
						style={{ background: c }}
					/>
				))}
			</div>
			<header
				aria-label="Main navigation header"
				className="staggered-menu-header"
			>
				<div aria-label="Logo" className="sm-logo">
					{logoUrl ? (
						<img
							alt="Logo"
							className="sm-logo-img"
							draggable={false}
							height={24}
							src={logoUrl}
							width={110}
						/>
					) : null}
				</div>
				<button
					aria-controls="staggered-menu-panel"
					aria-expanded={open}
					aria-label={open ? "Close menu" : "Open menu"}
					className="sm-toggle"
					onClick={toggleMenu}
					ref={toggleBtnRef}
					type="button"
				>
					<span
						aria-hidden="true"
						className="sm-toggle-textWrap"
						ref={textWrapRef}
					>
						<span className="sm-toggle-textInner" ref={textInnerRef}>
							{textLines.map((l, i) => (
								<span
									className="sm-toggle-line"
									// biome-ignore lint/suspicious/noArrayIndexKey: cycled label sequence
									key={i}
								>
									{l}
								</span>
							))}
						</span>
					</span>
					<span aria-hidden="true" className="sm-icon" ref={iconRef}>
						<span className="sm-icon-line" ref={plusHRef} />
						<span className="sm-icon-line sm-icon-line-v" ref={plusVRef} />
					</span>
				</button>
			</header>

			<aside
				aria-hidden={!open}
				className="staggered-menu-panel"
				id="staggered-menu-panel"
				ref={panelRef}
			>
				<div className="sm-panel-inner">
					<ul
						className="sm-panel-list"
						data-numbering={displayItemNumbering || undefined}
						role="list"
					>
						{items.length ? (
							items.map((it, idx) => (
								<li className="sm-panel-itemWrap" key={`${it.label}-${idx}`}>
									<a
										aria-label={it.ariaLabel}
										className="sm-panel-item"
										data-index={idx + 1}
										href={it.link}
									>
										<span className="sm-panel-itemLabel">{it.label}</span>
									</a>
								</li>
							))
						) : (
							<li aria-hidden="true" className="sm-panel-itemWrap">
								<span className="sm-panel-item">
									<span className="sm-panel-itemLabel">No items</span>
								</span>
							</li>
						)}
					</ul>
					{displaySocials && socialItems.length > 0 && (
						<div aria-label="Social links" className="sm-socials">
							<h3 className="sm-socials-title">Socials</h3>
							<ul className="sm-socials-list" role="list">
								{socialItems.map((s, i) => (
									<li className="sm-socials-item" key={`${s.label}-${i}`}>
										<a
											className="sm-socials-link"
											href={s.link}
											rel="noopener noreferrer"
											target="_blank"
										>
											{s.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</aside>
		</div>
	);
}

export default StaggeredMenu;
