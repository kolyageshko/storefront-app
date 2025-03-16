import { formatAmount, getLowestAmount } from '@/lib/util/prices'
import {
	Market,
	Product,
	ProductVariant,
	MoneyAmount,
} from '@/types/global'

export default function ProductPrice({
	product,
	variant,
	market,
}: {
	product: Product
	variant?: ProductVariant | null
	market: Market
}) {
	const getAmount = (amount: number) => formatAmount(amount, market.currency)

	if (!variant) {
		return getAmount(getLowestAmount(product, market))
	}

	const getPriceForMarketCurrency = (prices: MoneyAmount[]) => {
		const marketCurrencyPrice = prices.find(
			price => price.currency.code === market.currency.code
		)
		return marketCurrencyPrice ? marketCurrencyPrice : null
	}

	const priceData = getPriceForMarketCurrency(variant.prices)
	const price = priceData ? priceData.price : null
	const salePrice =
		priceData && priceData.sale_price !== undefined
			? priceData.sale_price
			: null

	if (!priceData || !price) {
		return <div>NaN</div>
	}

	return (
		<div className='flex gap-0.5'>
			{salePrice ? (
				<div className='flex items-center gap-0.5'>
					<span>{getAmount(salePrice)}</span>
				</div>
			) : (
				<div className='flex items-center gap-0.5'>
					<span>{getAmount(price)}</span>
				</div>
			)}
			{price && salePrice && (
				<div className='flex items-center gap-0.5 ml-1'>
					<span className='line-through'>{getAmount(price)}</span>
				</div>
			)}
		</div>
	)
}
