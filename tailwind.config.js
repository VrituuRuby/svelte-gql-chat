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
			}
		}
	},
	plugins: []
};
