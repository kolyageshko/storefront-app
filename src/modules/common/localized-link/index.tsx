'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

/**
 * Persists the current country code in the url,
 * without having to explicitly pass it as a prop.
 */
const LocalizedLink = ({
	children,
	href,
	...props
}: {
	children?: React.ReactNode
	href: string
	className?: string
	onClick?: () => void
	passHref?: true
	[x: string]: any
}) => {
	const { locale } = useParams()

	const localizedHref = locale ? `/${locale}${href}` : href

	return (
		<Link href={localizedHref} {...props}>
			{children}
		</Link>
	)
}

export default LocalizedLink
