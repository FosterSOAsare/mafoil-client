/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/**.tsx", "./src/**/**/**.tsx"],
	theme: {
		extend: {
			colors: {
				blue: "#14009F",
				sec: "#000000",
			},
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
