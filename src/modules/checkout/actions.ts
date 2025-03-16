'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { retrieveCart } from '../cart/actions'
import { placeOrder as newOrder } from '../../lib/data'
import { Order } from '@/types/global'

export async function placeOrder(): Promise<Order> {
	const cart = await retrieveCart()

	if (!cart) throw new Error('No cart found')

	let order
	try {
		order = await newOrder(cart.token)
		if (order) {
			cookies().delete('cart_id')
			revalidateTag('cart')
		}
	} catch (error: any) {
		throw error
	}

	return order
}
