/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "res.cloudinary.com" },
			{ protocol: "https", hostname: "procvcreator.s3.eu-north-1.amazonaws.com" },
		],
	},
};

module.exports = nextConfig;
