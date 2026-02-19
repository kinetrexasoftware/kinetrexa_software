/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#0EA5E9',
                    glow: 'rgba(14,165,233,0.35)',
                },
                dark: {
                    bg: '#0B1220',
                    secondary: '#0E1A2B',
                    surface: 'rgba(255, 255, 255, 0.04)',
                    'surface-hover': 'rgba(255, 255, 255, 0.06)',
                    border: 'rgba(255, 255, 255, 0.08)',
                },
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49',
                }
            },
            fontFamily: {
                sans: ['var(--font-inter)'],
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
                marquee2: 'marquee2 25s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                marquee2: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
            },
            boxShadow: {
                'premium-hover': '0 20px 40px -15px rgba(14,165,233,0.3)',
                'badge-live': '0 0 15px rgba(34,197,94,0.2)',
                'badge-beta': '0 0 15px rgba(168,85,247,0.2)',
                'badge-coming': '0 0 15px rgba(245,158,11,0.2)',
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
};
