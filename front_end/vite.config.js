// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react', // If using Emotion JSX
      jsxRuntime: 'automatic' // Or 'classic' if needed
    })
  ],
  esbuild: {
    jsxFactory: 'jsx', // For Emotion
    jsxFragment: 'Fragment' // For Emotion
  }
});