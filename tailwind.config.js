/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/**.tsx", "./src/**/**/**.tsx"],
	theme: {
		extend: {
			colors: {
				blue: "#14009F",
				sec: "#000000",
				brown: "#7f4227",
			},
			fontFamily: {
				playfair: ["'Playfair Display', serif"],
				jost: ["'Jost', serif"],
			},
			maxWidth: {
				"6xl": "1024px",
			},
		},
	},
	plugins: [],
};
