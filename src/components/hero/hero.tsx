import Contact8 from "~/components/blocks/contact-8";
import Faq4 from "~/components/blocks/faq-4";
import Footer8 from "~/components/blocks/footer-8";
import HowItWorks4 from "~/components/blocks/how-it-works-4";
import Pricing8 from "~/components/blocks/pricing-8";
import ProofMetrics from "~/components/blocks/proof-metrics";
import SocialProof12 from "~/components/blocks/social-proof-12";
import { HeroDivider } from "./hero-divider";
import { HeroOrbSection } from "./sections/hero-orb-section";
import { ProblemSection } from "./sections/problem-section";
import { SolutionBridgeSection } from "./sections/solution-bridge-section";
import { StrengthsSection } from "./sections/strengths-section";

export function Hero() {
	return (
		<>
			<HeroOrbSection />
			<div className="relative">
				<HeroDivider />
				<ProblemSection />
				<ProofMetrics />
				<SolutionBridgeSection />
				<StrengthsSection />
				<Pricing8 />
				<SocialProof12 />
				<HowItWorks4 />
				<Faq4 />
				<Contact8 />
			</div>
			<Footer8 />
		</>
	);
}
