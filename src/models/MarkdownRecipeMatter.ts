import { MarkdownArticleMatter } from "./MarkdownArticleMatter";

export interface MarkdownRecipeMatter extends MarkdownArticleMatter {
	originalTitle?: string;
	time?: string;
	waiting?: string;
	ingredients: Array<{
		name: string;
		desc?: string
		quant?: string;
		alt?: string;
	}>;
	recommended?: string[];
	sources: string[];
}