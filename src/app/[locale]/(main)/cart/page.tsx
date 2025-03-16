import CartTemplate from '@/modules/cart/templates'
import { Metadata } from 'next'
import { retrieveCart } from '@/modules/cart/actions'
import { getRelatedProducts } from '@/lib/data'
import { getMarket } from '@/app/actions'
import { notFound } from 'next/navigation'
import {splitLocale} from "@/lib/util/i18n";

export const metadata: Metadata = {
	title: 'CART - CITADEL CULT',
	description: 'View your shopping bag',
}

type Props = {
	params: { locale: string }
}

export default async function Cart({ params }: Props) {
	const cart = await retrieveCart()
	const [language, region] = splitLocale(params.locale);
	const market = await getMarket(region)
	const relatedProducts = await getRelatedProducts()

	if (!market) {
		notFound()
	}

	return (
		<CartTemplate
			cart={cart}
			market={market}
			relatedProducts={relatedProducts}
		/>
	)
}
