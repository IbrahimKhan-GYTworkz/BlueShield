import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Scan all source files
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#3b82f6', // blue-500
          dark: '#1e40af', // blue-900
          light: '#93c5fd', // blue-300
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  darkMode: 'class', // Use "class" strategy (toggle with .dark on <html> or <body>)
  plugins: [],
}

export default config
