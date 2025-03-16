import { getProductByHandle, getRelatedProducts } from '@/lib/data'
import ProductTemplate from '@/modules/products/templates'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMarket } from '@/app/actions'
import { BASE_URL } from '@/lib/constants'
import { ProductVariant } from '@/types/global'
import {splitLocale} from "@/lib/util/i18n";

type Props = {
	params: { handle: string; locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const product = await getProductByHandle(params.handle)

	if (!product) {
		notFound()
	}

	return {
		title: `${product.name ? product.name.toUpperCase() : ''} - CITADEL CULT`,
		description: `${product.description}`,
		openGraph: {
			title: `${product.name ? product.name.toUpperCase() : ''} - CITADEL CULT`,
			description: `${product.name}`,
			images: product.thumbnail ? [product.thumbnail.url] : [],
		},
	}
}

export default async function ProductPage({ params }: Props) {
	const [language, region] = splitLocale(params.locale);

	const market = await getMarket(region)

	if (!market) {
		notFound()
	}

	const product = await getProductByHandle(params.handle)

	if (!product) {
		notFound()
	}

	const relatedProducts = await getRelatedProducts(product.id, undefined, 6)

	const lowestPrice = product.variants.reduce(
		(minPrice: number, variant: ProductVariant) => {
			const marketCurrency = market.currency.code
			const priceInMarketCurrency = variant.prices.find(
				price => price.currency.code === marketCurrency
			)?.price

			if (priceInMarketCurrency && priceInMarketCurrency < minPrice) {
				return priceInMarketCurrency
			} else {
				return minPrice
			}
		},
		Infinity
	)

	// Set the availability value depending on the availability of the product in stock or the possibility of pre-order
	const availability = product.available
		? 'https://schema.org/InStock'
		: 'https://schema.org/OutOfStock'

	const jsonLd = {
		'@context': 'https://schema.org/',
		'@type': 'Product',
		name: product.name,
		description: product.description,
		image: product.thumbnail ? product.thumbnail.url : '',
		sku: product.handle,
		brand: {
			'@type': 'Brand',
			name: 'CITADEL CULT',
		},
		offers: {
			'@type': 'Offer',
			price: lowestPrice,
			priceCurrency: market.currency.code,
			priceSpecification: {
				price: lowestPrice,
				priceCurrency: market.currency.code,
				valueAddedTaxIncluded: "false"
			},
			availability: availability,
			url: `${BASE_URL}/products/${product.handle}`,
			seller: {
				'@type': 'Organization',
				name: 'CITADEL CULT',
				url: BASE_URL
			},
		},
	}

	return (
		<>
			<ProductTemplate
				product={product}
				market={market}
				relatedProducts={relatedProducts}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
		</>
	)
}
