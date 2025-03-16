import type { Metadata, Viewport } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import Providers from '@/modules/providers'
import { BASE_URL, GOOGLE_TAG_MANAGER_ID } from '@/lib/constants'
import { GoogleTagManager } from '@next/third-parties/google'
import React from "react";

const helveticaNow = localFont({
	src: [
		{
			path: '../fonts/HelveticaNowText-Regular.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../fonts/HelveticaNowText-Medium.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../fonts/HelveticaNowText-Bold.woff2',
			weight: '700',
			style: 'bold',
		},
	],
})

export const metadata: Metadata = {
	metadataBase: new URL(`${BASE_URL}`),
	title: 'CITADEL CULT',
	description:
		"The official site for CITADEL CULT. Shop the CITADEL CULT men's and women's collections.",
	openGraph: {
		title: 'CITADEL CULT',
		description:
			"The official site for CITADEL CULT. Shop the CITADEL CULT men's and women's collections.",
		url: `${BASE_URL}`,
		siteName: 'CITADEL CULT',
		type: 'website',
		locale: 'en_US',
	},
	robots: {
		index: true,
		follow: true,
		'max-image-preview': 'large',
		'max-snippet': -1,
		'max-video-preview': -1,
		googleBot: 'index, follow',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'CITADEL CULT',
		description:
			"The official site for CITADEL CULT. Shop the CITADEL CULT men's and women's collections.",
	},
	alternates: {
		canonical: `${BASE_URL}`,
	},
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	minimumScale: 1,
	maximumScale: 1,
	userScalable: true,
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${helveticaNow.className}`}>
				<Providers>{children}</Providers>
				{GOOGLE_TAG_MANAGER_ID && (
					<GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_ID} />
				)}
			</body>
		</html>
	)
}
