import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the built site works from any subpath (GitHub Pages
// project sites, file://, etc.) without hardcoding a repo name.
export default defineConfig({
  base: './',
  plugins: [react()],
})
