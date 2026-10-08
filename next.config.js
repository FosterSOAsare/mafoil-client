// Backend that /api/* requests are proxied to. Read at build time, so set API_URL before `next build`.
const API_URL = (process.env.API_URL || "http://localhost:8000").replace(/\/+$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: `${API_URL}/api/:path*`,
			},
		];
	},
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "res.cloudinary.com" },
			{ protocol: "https", hostname: "procvcreator.s3.eu-north-1.amazonaws.com" },
		],
	},
};

module.exports = nextConfig;
