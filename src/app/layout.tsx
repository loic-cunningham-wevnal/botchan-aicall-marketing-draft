import "~/styles/globals.css";

import { LingoProvider } from "@lingo.dev/compiler/react";
import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";

import { Navigation } from "~/components/navigation/navigation";
import { ScrollScrim } from "~/components/scroll-scrim";
import { SmoothScroll } from "~/components/smooth-scroll";
import { ThemeProvider } from "~/components/theme-provider";
import { cn } from "~/lib/utils";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
	title: "BOTCHAN AICALL — 電話AIエージェント",
	description:
		"BOTCHAN AICALLはインバウンドコールを24時間365日、Goodオペレーターの品質で自動化する電話AIエージェント。匠の技を生成AIへ、基幹システムとリアルタイム連携。VoiceRAG®搭載。",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<LingoProvider devWidget={{ enabled: false }} initialLocale="ja">
			<html
				className={cn(inter.variable, geistMono.variable, "font-sans")}
				lang="ja"
				suppressHydrationWarning
			>
				<body>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						disableTransitionOnChange
						enableSystem={false}
					>
						<SmoothScroll>
							<TRPCReactProvider>{children}</TRPCReactProvider>
						</SmoothScroll>
						<ScrollScrim
							sectionIds={["problem", "solution", "comparison"]}
						/>
						<Navigation />
					</ThemeProvider>
				</body>
			</html>
		</LingoProvider>
	);
}
