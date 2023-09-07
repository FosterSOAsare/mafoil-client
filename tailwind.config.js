/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/**.tsx", "./src/**/**/**.tsx"],
	theme: {
		extend: {
			fontFamily: {
				playfair: ["'Playfair Display', serif"],
			},
			maxWidth: {
				"6xl": "1024px",
			},
		},
	},
	plugins: [],
};
