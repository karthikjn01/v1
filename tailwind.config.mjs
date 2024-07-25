/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Trap', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				'stone': '#252323',
				'bone': '#F5F1ED',
				'pink': '#E86A92',
				'blue': '#9BA2FF',
			}
		},
	},
	plugins: [],
}
