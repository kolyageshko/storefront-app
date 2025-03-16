import ProductList from '@/modules/products/product-list'
import { Metadata } from 'next'
import { getProducts } from '@/lib/data'
import { notFound } from 'next/navigation'
import { getMarket } from '../../actions'
import { BASE_URL } from '@/lib/constants'
import {splitLocale} from "@/lib/util/i18n";
import {useTranslation} from "@/app/i18n";

export const metadata: Metadata = {
	title: 'CITADEL CULT',
	description:
		"The official site for CITADEL CULT. Shop the CITADEL CULT men's and women's collections.",
}

export default async function Home({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const [language, region] = splitLocale(locale);

	const products = await getProducts().catch(() => {
		notFound()
	})
	const market = await getMarket(region)

	if (!market) {
		notFound()
	}

	// Sort products by created_at in descending order
	products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

	const homepageJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'CITADEL CULT',
		url: `${BASE_URL}/${locale}`,
		potentialAction: {
			'@type': 'SearchAction',
			target: `${BASE_URL}/${locale}/search?q={search_term_string}`,
			'query-input': 'required name=search_term_string',
		},
	}

	const organizationJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'CITADEL CULT',
		logo: `${BASE_URL}/citadelcult_logo.svg`,
		url: `${BASE_URL}/${locale}`,
		sameAs: [
			'http://instagram.com/citadelcult',
			'http://www.pinterest.com/citadelcult/',
		],
	}

	return (
		<>
			<ProductList products={products} market={market} />
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
			/>
		</>
	)
}
