import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  // optional: if you want to set alias
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
