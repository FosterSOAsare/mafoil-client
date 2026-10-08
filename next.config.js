/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "http://localhost:8000/api/:path*", // Replace with your backend API URL
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
