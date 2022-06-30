import { Ingredient } from "./Ingredient";
import { MarkdownArticleMatter } from "./MarkdownArticleMatter";

export interface MarkdownRecipeMatter extends MarkdownArticleMatter {
	originalTitle?: string;
	time?: string;
	waiting?: string;
	ingredients: Ingredient[] | Record<string, Ingredient[]>;
	recommended?: string[];
	sources: string[];
}