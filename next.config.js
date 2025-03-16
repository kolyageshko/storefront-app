/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
			},
			{
				protocol: 'https',
				hostname: 'citadelcult.s3.eu-central-1.amazonaws.com',
			},
		],
	},
	experimental: {
		serverActions: {
			allowedOrigins: [
				'localhost',
				'citadelcult.com',
				'api.citadelcult.com',
				'pay.fondy.eu',
			],
		},
	},
}
