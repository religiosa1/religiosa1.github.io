import { defineConfig } from 'astro/config'

export default defineConfig({
	site: 'http://notes.religiosa.ru',
	// outDir: './dist',       // When running `astro build`, path to final static output
	// publicDir: './public',   // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.
	server: {
		// host: 'localhost',  // The hostname to run the dev server on.
		// port: 3000,             // The port to run the dev server on.
	},
	markdown: {
		shikiConfig: {
			// Choose from Shiki's built-in themes (or add your own)
			// https://github.com/shikijs/shiki/blob/main/docs/themes.md
			theme: 'dracula',
			// Enable word wrap to prevent horizontal scrolling
			wrap: true,
		},
		remarkPlugins: [
			'remark-gfm',
			['remark-toc', { heading: "оглавление|содержание" }]
		],
	}
});
