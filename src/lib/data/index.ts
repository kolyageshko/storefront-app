'use server'

import {Cart, Collection, CreateCartDto, Market, Product, UpdateCartDto, UpdateCartItemDto,} from '@/types/global'
import {NextRequest} from 'next/server'
import {BACKEND_URL} from '../constants'

export async function getProductByHandle(
	handle: string
): Promise<Product | null> {
	try {
		const response = await fetch(
			`${BACKEND_URL}/api/products/handle/${handle}`,
			{
				next: { tags: ['products'], revalidate: 300 },
			}
		)

		if (!response.ok) {
			return null
		}

		const product = await response.json()
		return product
	} catch (error) {
		console.error('Error fetching product:', error)
		return null
	}
}

export async function getProducts(): Promise<Product[]> {
	const products = await fetch(`${BACKEND_URL}/api/products`, {
		next: { tags: ['products'], revalidate: 300 },
	})
		.then(res => res.json())
		.catch(err => {
			throw err
		})

	return products
}

export async function listMarkets(): Promise<Market[]> {
	try {
		const response = await fetch(`${BACKEND_URL}/api/markets`, {
			next: { tags: ['markets'], revalidate: 300 },
		})

		if (!response.ok) {
			console.error('Failed to fetch markets')
			return []
		}

		const markets = await response.json()
		return markets
	} catch (error) {
		console.error('Error fetching markets:', error)
		return []
	}
}

export async function getCart(cartId: string): Promise<Cart | null> {
	let url = `${BACKEND_URL}/api/carts/${cartId}`

	const response = await fetch(url, {
		cache: 'no-store',
		next: { tags: ['cart'] },
	})

	if (response.status !== 200) {
		return null
	}

	const cart = await response.json().catch(err => {
		throw err
	})

	return cart
}

export async function createCart(createCartDTO: CreateCartDto): Promise<Cart> {
	const response = await fetch(`${BACKEND_URL}/api/carts`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(createCartDTO),
		cache: 'no-store'
	})

	if (!response.ok) {
		throw new Error(`Failed to create cart: ${response.status}`)
	}

	return await response.json().catch(err => {
		throw err
	})
}

export async function addItem(
	cartId: string,
	variantId: number,
	quantity: number
): Promise<Cart> {
	const response = await fetch(
		`${BACKEND_URL}/api/carts/${cartId}/line-items`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ variant_id: variantId, quantity: quantity }),
			cache: 'no-store'
		}
	)

	if (!response.ok) {
		const error = await response.json()
		throw new Error(`Failed to add item to cart: ${error.message}`)
	}
	return await response.json()
}

export async function getCollections(): Promise<Collection[]> {
	let url = `${BACKEND_URL}/api/collections`

	const collections = await fetch(url, {
		next: { tags: ['collections'], revalidate: 300 },
	})
		.then(res => res.json())
		.catch(err => {
			throw err
		})

	return collections
}

export async function updateCartItem(
	cartId: string,
	cartItemId: string,
	updateCartItemDto: UpdateCartItemDto
): Promise<Cart | null> {
	try {
		const response = await fetch(
			`${BACKEND_URL}/api/carts/${cartId}/line-items/${cartItemId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updateCartItemDto),
				cache: 'no-store'
			}
		)

		if (!response.ok) {
			console.error(`Failed to update cart item. Status: ${response.status}`)
			return null
		}

		const updatedCart = await response.json()
		return updatedCart
	} catch (error) {
		console.error('Error updating cart item:', error)
		return null
	}
}

export async function removeItemFromCart(
	cartId: string,
	cartItemId: string
): Promise<Cart | null> {
	try {
		const response = await fetch(
			`${BACKEND_URL}/api/carts/${cartId}/line-items/${cartItemId}`,
			{
				method: 'DELETE',
				cache: 'no-store'
			}
		)

		if (!response.ok) {
			throw new Error(
				`Failed to remove item from cart. Status: ${response.status}`
			)
		}

		const updatedCart = await response.json()
		return updatedCart
	} catch (error) {
		console.error('Error removing item from cart:', error)
		return null
	}
}

export async function getCollectionByHandle(
	handle: string
): Promise<Collection | null> {
	let url = `${BACKEND_URL}/api/collections/${handle}`

	try {
		const response = await fetch(url, {
			next: { tags: ['collections'], revalidate: 300 },
		})
		if (!response.ok) {
			throw new Error(`Failed to fetch collection with handle ${handle}`)
		}

		const collection = await response.json()
		return collection
	} catch (error) {
		console.error(error)
		return null
	}
}

export async function getRelatedProducts(
	productId?: string,
	cartId?: string,
	limit?: number
): Promise<Product[]> {
	let url = `${BACKEND_URL}/api/products/related`

	const queryParams = new URLSearchParams()

	if (productId !== undefined) {
		queryParams.append('productId', productId)
	}

	if (cartId !== undefined) {
		queryParams.append('cartId', cartId)
	}

	if (limit !== undefined) {
		queryParams.append('limit', limit.toString())
	}

	if (queryParams.toString()) {
		url += `?${queryParams.toString()}`
	}

	const recommendedProducts = await fetch(url, {
		next: { tags: ['products'], revalidate: 300 },
	})
		.then(res => {
			if (!res.ok) {
				console.error(`Failed to fetch related products`)
				return null
			}
			return res.json()
		})
		.catch(err => {
			throw err
		})

	return recommendedProducts
}

export async function updateCart(
	cartId: string,
	updateCartDto: UpdateCartDto
): Promise<Cart | null> {
	try {
		const response = await fetch(`${BACKEND_URL}/api/carts/${cartId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updateCartDto),
			cache: 'no-store'
		})

		if (!response.ok) {
			console.error(`Failed to update cart. Status: ${response.status}`)
			return null
		}

		const updatedCart = await response.json()
		return updatedCart
	} catch (error) {
		console.error('Error updating cart:', error)
		return null
	}
}

export async function placeOrder(cartId: string) {
	const response = await fetch(
		`${BACKEND_URL}/api/checkouts/${cartId}/orders`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)

	if (!response.ok) {
		throw new Error(`Failed to place order: ${response.status}`)
	}

	const order = await response.json()
	return order
}

export async function getOrder(token: string) {
	const response = await fetch(`${BACKEND_URL}/api/orders/token/${token}`)

	if (!response.ok) {
		return null
	}

	const order = await response.json()
	return order
}

/**
 * Retrieves the country code based on the provided request.
 * @param request - The NextRequest object containing the headers.
 * @returns A Promise that resolves to a string representing the country code, or null if the request fails or the country code is not found.
 */
export async function getCountryCodeByRequest(
	request: NextRequest
): Promise<string | null> {
	try {
		let ip =
			request.headers.get('X-Forwarded-For')

		if (!ip) {
			return null
		}

		// Retrieve the first IP address
		ip = ip.split(',')[0].trim();

		const response = await fetch(`${BACKEND_URL}/api/geo-ip/${ip}`)

		if (!response.ok) return null

		const lookupResult = await response.json()
		return lookupResult?.country_code || null
	} catch (error) {
		console.error('Error fetching country code:', error)
		return null
	}
}

export async function searchProducts(
	query: string,
	limit?: number
): Promise<Product[]> {
	let url = `${BACKEND_URL}/api/products/search?q=${query}`

	if (limit !== undefined) {
		url += `&limit=${limit}`
	}

	const products = await fetch(url, {
		next: { tags: ['products'], revalidate: 300 },
	})
		.then(res => res.json())
		.catch(err => {
			throw err
		})

	return products
}

export async function createPaymentSession(
	orderId: string,
	paymentProviderId: string
) {
	const response = await fetch(
		`${BACKEND_URL}/api/orders/${orderId}/payment-sessions`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: paymentProviderId }),
		}
	)

	if (!response.ok) {
		throw new Error(`Failed to create payment session: ${response.status}`)
	}

	const session = await response.json()
	return session
}
