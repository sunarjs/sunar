import { createPreset, presets } from 'fumadocs-ui/tailwind-plugin';
import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./components/**/*.{ts,tsx}',
		'./icons/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./content/**/*.{md,mdx}',
		'./mdx-components.{ts,tsx}',
		'./node_modules/fumadocs-ui/dist/**/*.js',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-geist-sans)', ...fontFamily.sans],
				mono: ['var(--font-geist-mono)', ...fontFamily.mono],
			},
			animation: {
				'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
				slide: 'slide var(--speed) ease-in-out infinite alternate',
				meteor: 'meteor 5s linear infinite',
			},
			keyframes: {
				'spin-around': {
					'0%': {
						transform: 'translateZ(0) rotate(0)',
					},
					'15%, 35%': {
						transform: 'translateZ(0) rotate(90deg)',
					},
					'65%, 85%': {
						transform: 'translateZ(0) rotate(270deg)',
					},
					'100%': {
						transform: 'translateZ(0) rotate(360deg)',
					},
				},
				slide: {
					to: {
						transform: 'translate(calc(100cqw - 100%), 0)',
					},
				},
				meteor: {
					'0%': { transform: 'rotate(215deg) translateX(0)', opacity: 1 },
					'70%': { opacity: 1 },
					'100%': {
						transform: 'rotate(215deg) translateX(-500px)',
						opacity: 0,
					},
				},
			},
		},
	},
	presets: [
		createPreset({
			addGlobalColors: true,
			preset: {
				...presets.default,
				dark: {
					...presets.default.dark,
					background: '0 0% 2%',
					foreground: '0 0% 98%',
					popover: '0 0% 4%',
					card: '0 0% 4%',
					muted: '0 0% 8%',
					border: '0 0% 14%',
					accent: '0 0% 15%',
					'accent-foreground': '0 0% 100%',
					'muted-foreground': '0 0% 60%',
				},
			},
		}),
	],
};
