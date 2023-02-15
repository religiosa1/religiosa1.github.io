import { z, defineCollection } from 'astro:content';
import { ingredientsSchema } from "~/models/Ingredient";
import { articleSchema } from '~/models/Article';

const recipeCollection = defineCollection({
	schema: z.object({
		title: z.string().min(1),
		originalTitle: z.string().optional(),
		recommended: z.array(z.string()).optional(),
		time: z.string(), // TODO regex
		waiting: z.string().optional(), //TODO regex
		ingredients: z.union([
			z.record(z.array(ingredientsSchema)),
			z.array(ingredientsSchema),
		]),
		sources: z.array(z.string()).optional(),
	}),
});

const articlesCollection = defineCollection({
	schema: articleSchema
});

export const collections = {
	'recepies': recipeCollection,
	'electronics': articlesCollection,
	'polski': articlesCollection,
	'programming': articlesCollection,
	'woodworking': articlesCollection,
};