export default {
  // projectRoot: '.',     // Where to resolve all URLs relative to. Useful if you have a monorepo project.
  // pages: './src/pages', // Path to Astro components, pages, and data
  // dist: './dist',       // When running `astro build`, path to final static output
  // public: './public',   // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.
  buildOptions: {
    site: 'http://notes.religiosa.ru',
    sitemap: true,         // Generate sitemap (set to "false" to disable)
  },
  devOptions: {
    // hostname: 'localhost',  // The hostname to run the dev server on.
    // port: 3000,             // The port to run the dev server on.
    // tailwindConfig: '',     // Path to tailwind.config.js if used, e.g. './tailwind.config.js'
  },
  renderers: [
    "@astrojs/renderer-svelte"
  ],
  markdownOptions: {
    remarkPlugins: [
      [ 'remark-gfm' ],
      [ 'remark-toc', { heading: "оглавление|содержание" } ]
    //   // Add a Remark plugin that you want to enable for your project.
    //   // If you need to provide options for the plugin, you can use an array and put the options as the second item.
    //   // ['remark-autolink-headings', { behavior: 'prepend'}],
    ],
  }
};
