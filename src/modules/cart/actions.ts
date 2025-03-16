'use server'

import { revalidateTag } from 'next/cache'
import {
	addItem,
	createCart,
	getCart,
	removeItemFromCart,
	updateCartItem as updateCartItemReq,
	updateCart as updateCartReq,
} from '../../lib/data'
import { cookies } from 'next/headers'
import { Cart, UpdateCartDto } from '@/types/global'

// This function is used to get the cart from the server, if it exists, or create a new one if it doesn't.
export async function getOrCreateCart(countryCode: string): Promise<Cart> {
	const cart = await retrieveCart()

	if (cart) {
		if (cart.completed_at) {
			cookies().delete('cart_id')
		} else {
			revalidateTag('cart')
			return cart
		}
	}

	const newCart = await createCart({ country_code: countryCode })
	if (newCart) {
		cookies().set({
			name: 'cart_id',
			value: newCart.token,
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 365,
			sameSite: 'lax',
			secure: true,
		})
		revalidateTag('cart')
		return newCart
	} else {
		throw new Error('Failed to create cart')
	}
}

// This function is used to retrieve the cart from the server.
export async function retrieveCart(): Promise<Cart | null> {
	const cartId = cookies().get('cart_id')?.value

	if (!cartId) {
		return null
	}
	try {
		const cart = await getCart(cartId)
		if (cart?.completed_at) {
			return null
		}
		return cart
	} catch (e) {
		console.error(e)
		return null
	}
}

// This function is used to update the cart on the server.
export async function updateCart(updateCartDto: UpdateCartDto) {
	const cart = await retrieveCart()

	if (!cart) {
		return 'Missing cart'
	}

	try {
		await updateCartReq(cart.token, updateCartDto)
		revalidateTag('cart')
	} catch (error) {
		console.error('Error updating cart:', error)
		return 'Error updating cart'
	}
}

// This function is used to add an item to the cart on the server.
export async function addToCart({
	variantId,
	quantity,
	countryCode,
}: {
	variantId: number
	quantity: number
	countryCode: string
}) {
	const cart = await getOrCreateCart(countryCode)

	if (!cart) {
		throw new Error('Missing cart ID')
	}

	if (!variantId) {
		throw new Error('Missing product variant ID')
	}

	try {
		await addItem(cart.token, variantId, quantity)
		revalidateTag('cart')
	} catch (e) {
		revalidateTag('products')
		throw new Error('Error adding item to cart')
	}
}

// This function is used to delete a cart item on the server.
export async function deleteCartItem(cartItemId: string) {
	const cart = await retrieveCart()

	if (!cart) {
		return 'Missing cart'
	}

	if (!cartItemId) {
		return 'Missing cartItemId ID'
	}

	try {
		await removeItemFromCart(cart.token, cartItemId)
		revalidateTag('cart')
	} catch (e) {
		return 'Error deleting line item'
	}
}

// This function is used to update the cart item on the server.
export async function updateCartItem({
	cartItemId,
	quantity,
}: {
	cartItemId: string
	quantity: number
}) {
	const cart = await retrieveCart()

	if (!cart) {
		return 'Missing cart'
	}

	if (!cartItemId) {
		return 'Missing cartItemId ID'
	}

	try {
		await updateCartItemReq(cart.token, cartItemId, { quantity })
		revalidateTag('cart')
	} catch (e) {
		return 'Error updating cart item'
	}
}
