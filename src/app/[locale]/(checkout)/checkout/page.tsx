import CheckoutTemplate from '@/modules/checkout/templates'
import { Metadata } from 'next'
import { retrieveCart } from '@/modules/cart/actions'

export const metadata: Metadata = {
	title: 'Checkout - CITADEL CULT',
}

export default async function Checkout() {
	const cart = await retrieveCart()
	return <CheckoutTemplate cart={cart} />
}
