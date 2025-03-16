import { getCollectionByHandle } from '@/lib/data'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMarket } from '../../../../actions'
import ProductList from '../../../../../modules/products/product-list'
import {splitLocale} from "@/lib/util/i18n";

type Props = {
	params: { handle: string; locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const collection = await getCollectionByHandle(params.handle)

	if (!collection) {
		notFound()
	}

	return {
		title: `${collection.name} - CITADEL CULT`,
		description: `${collection.name} collection`,
	}
}

export default async function CollectionPage({ params }: Props) {
	const collection = await getCollectionByHandle(params.handle)
	const [language, region] = splitLocale(params.locale);
	const market = await getMarket(region)

	if (!collection) {
		notFound()
	}

	if (!market) {
		notFound()
	}

	return (
		<ProductList
			title={`${collection.name} (${collection.products.length})`}
			products={collection.products}
			market={market}
		/>
	)
}
