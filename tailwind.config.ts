import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}', // Scan all source files
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--color-background)',
                text: 'var(--color-text)',
                subtext: 'var(--color-subtext)',
                navbar: {
                    border: 'var(--color-navbar-border)',
                },
                button: {
                    link: 'var(--color-link-button)',
                    border: 'var(--color-other-border)',
                },
                icon: 'var(--color-icon)',
            },
            fontFamily: {
                sans: ['var(--font-poppins)', 'sans-serif'],
                poppins: ['var(--font-poppins)', 'sans-serif'],
                fieldwork: ['var(--font-fieldwork)', 'sans-serif'],
                hum: ['var(--font-hum)', 'sans-serif'],
                mono: ['var(--font-mono)', 'monospace'],
            },
        },
    },
    darkMode: 'class', // Use "class" strategy (toggle with .dark on <html> or <body>)
    plugins: [],
}

export default config;
