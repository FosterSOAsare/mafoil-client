/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/**.tsx", "./src/**/**/**.tsx"],
	theme: {
		extend: {
			colors: {
				blue: "#14009F",
				sec: "#000000",
				brown: "#7f4227",
				border: "#e5e7eb",
			},
			fontFamily: {
				playfair: ["'Playfair Display', serif"],
				jost: ["'Jost', serif"],
			},
			screens: {
				xl: "1280px", // Add a new breakpoint named 'xl'
				"2xl": "1536px", // Add another breakpoint named '2xl'
			},
			maxWidth: {
				"6xl": "1024px",
				"7xl": "1224px",
			},
		},
	},

	plugins: [],
};
