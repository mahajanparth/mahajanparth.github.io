import { defineConfig } from 'vite';

// BASE_PATH is set by the GitHub Pages workflow ('/' for a custom domain or
// <user>.github.io repo, '/<repo>/' for a project repo).
export default defineConfig({
  base: process.env.BASE_PATH || '/',
});
