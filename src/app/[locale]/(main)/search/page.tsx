import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {getMarket} from '@/app/actions'
import {searchProducts} from '@/lib/data'
import ProductList from '../../../../modules/products/product-list'
import {Product} from '@/types/global'
import {splitLocale} from "@/lib/util/i18n";

type Props = {
	params: { locale: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
	params,
	searchParams,
}: Props): Promise<Metadata> {
	const searchQuery = searchParams.q ? searchParams.q.toString() : null

	return {
		title: `Search results of: ${searchQuery || ''} - CITADEL CULT`,
		description: `Explore the search results for ${
			searchQuery || ''
		} on CITADEL CULT. Find a wide range of products including clothing, accessories, and more.`,
	}
}

export default async function SearchPage({ params, searchParams }: Props) {
	const [language, region] = splitLocale(params.locale);

	const market = await getMarket(region)

	if (!market) {
		notFound()
	}

	const searchQuery = searchParams.q ? searchParams.q.toString() : null

	let products: Product[] = []
	if (searchQuery) {
		products = await searchProducts(searchQuery)
	}

	return (
		<>
			{products.length === 0 ? (
				<div className="mt-12 px-4">
					<p>No products found for &quot;{searchQuery}&quot;</p>
				</div>
			) : (
				<ProductList
					title={`Search for "${searchQuery}"`}
					products={products}
					market={market}
				/>
			)}
		</>
	)
}
