import { z } from "astro:content";

export const ingredientsSchema = z.object({
	/** Название */
	name: z.string(),
	/** Количество с ед. измерения */
	desc: z.string().optional(),
	/** Альтернативная единица измерения */
	quant: z.string().optional(),
	/** Описание или пояснение */
	alt: z.string().optional(),
});

export type Ingredient = z.infer<typeof ingredientsSchema>;
