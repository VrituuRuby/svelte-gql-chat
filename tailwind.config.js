/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundColor: {
				default: '#E2E9F3'
			},
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],
				rubik: ['Rubik', 'sans-serif']
			},
			colors: {
				'neu-shadow': '#9AB0CB',
				'light-gray': '#E2E9F3',
				'light-purple': '#BBA6F8'
			},
			boxShadow: {
				'neu-inner': 'inset 4px 4px 4px #D2D1EB, inset -4px -4px 4px #FFFFFF',
				'neu-outter': '4px 4px 4px #D2D1EB,-4px -4px 4px #FFFFFF'
			},
			dropShadow: {
				'neu-inner': 'inset 4px 4px 4px #D2D1EB, inset -4px -4px 4px #FFFFFF',
				'neu-outter': ['4px 4px 4px #D2D1EB', ' -4px -4px 4px #FFFFFF']
			}
		}
	},
	plugins: []
};
