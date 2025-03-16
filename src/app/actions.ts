'use server'

import {cookies} from 'next/headers'
import {getOrder, listMarkets, updateCart} from '@/lib/data'
import {Market} from '@/types/global'
import {revalidateTag} from 'next/cache'
import {DEFAULT_REGION} from '@/lib/constants'

/**
 * Retrieve the market based on the cart or default market
 */
export async function getMarket(countryCode: string) {
	try {
		const markets = await listMarkets()

		if (!markets) {
			return null
		}

		const marketMap = new Map<string, Market>()

		markets.forEach(market => {
			market.countries.forEach(c => {
				marketMap.set(c.iso, market)
			})
		})

		const region = countryCode
			? marketMap.get(countryCode.toUpperCase())
			: marketMap.get(DEFAULT_REGION)

		return region
	} catch (e: any) {
		console.error(e.toString())
		return null
	}
}

/**
 * Updates the market and revalidate the markets cache
 * @param countryCode
 */
export async function updateMarket(countryCode: string) {
	const cartId = cookies().get('cart_id')?.value

	try {
		if (cartId) {
			await updateCart(cartId, {
				shipping_address: { country_code: countryCode },
			})
			revalidateTag('cart')
		}

		revalidateTag('markets')
		revalidateTag('products')
	} catch (e) {
		return 'Error updating market'
	}
}

export async function listCountries() {
	try {
		const markets = await listMarkets()

		// Create a map of country codes to regions.
		const marketMap = new Map<string, Market>()

		markets.forEach((market: Market) => {
			market.countries.forEach(c => {
				marketMap.set(c.iso.toLowerCase(), market)
			})
		})

		return marketMap
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('middleware.ts: Error fetching regions.')
		}
	}
}

export async function retrieveOrder(token: string) {
	try {
		const order = await getOrder(token)

		if (!order) {
			return null
		}

		return order
	} catch (e) {
		return null
	}
}
