/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts1}'],
	theme: {
		extend: {
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],
				rubik: ['Rubik', 'sans-serif']
			},
			colors: {
				'neu-shadow': '#9AB0CB'
			},
			boxShadow: {
				'neu-inner': 'inset 4px 4px 4px #D2D1EB, inset -4px -4px 4px #FFFFFF',
				'neu-outter': '4px 4px 4px #D2D1EB,-4px -4px 4px #FFFFFF'
			}
		}
	},
	plugins: []
};
