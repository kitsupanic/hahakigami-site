import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit({
      preprocess: vitePreprocess(),
      // build/404.html comes from src/routes/404, prerendered like every other page.
      adapter: adapter(),
      // Absolute /_app/ URLs, so 404.html still finds its CSS and JS when served at a nested path.
      paths: { relative: false }
    })
  ]
});
