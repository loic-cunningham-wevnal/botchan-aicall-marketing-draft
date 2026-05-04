import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const helloRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }).optional())
		.query(({ input }) => ({
			greeting: `Hello ${input?.text ?? "world"}`,
		})),
});
