import { Hero } from "~/components/hero/hero";
import { HydrateClient } from "~/trpc/server";

export default function Home() {
	return (
		<HydrateClient>
			<Hero />
		</HydrateClient>
	);
}
