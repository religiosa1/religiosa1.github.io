import { z } from "astro:content";

export const articleSchema = z.object({
	title: z.string().min(1),
	deprecated: z.boolean().optional(),
});
export type Article = z.infer<typeof articleSchema>;