import {Currency, Market, Product} from '@/types/global'

/**
 * Takes an amount and a market, and converts the amount to a localized decimal format
 */
export function formatAmount(amount: number, currency: Currency) {
	let locale = 'en-US';
	let currencySymbol
		= '';
	let position: 'left' | 'right' = 'left';

	switch (currency.code) {
		case 'UAH':
			currencySymbol = 'грн.';
			position = 'right';
			break;
		case 'USD':
			currencySymbol = '$';
			position = 'left';
			break;
		case 'EUR':
			currencySymbol = '€';
			position = 'left';
			break;
		default:
			currencySymbol = currency.code;
	}

	const formattedAmount = amount.toLocaleString(locale, {
		style: 'decimal',
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	});

	return position === 'left'
		? currencySymbol + ' ' + formattedAmount
		: formattedAmount + ' ' + currencySymbol;
}

export function getLowestAmount(product: Product, market: Market): number {
	let lowestPrice: number = Infinity; // Инициализируем с Infinity для корректного сравнения

	product.variants.forEach(variant => {
		const prices = variant.prices.filter(
			price => price.currency.code === market.currency.code
		);

		if (prices.length > 0) {
			// Получаем минимальную цену из всех `salePrice` и `price`
			const variantLowestPrice = Math.min(
				...prices.flatMap(price => [price.price, price.sale_price ?? price.price])
			);

			if (variantLowestPrice < lowestPrice) {
				lowestPrice = variantLowestPrice;
			}
		}
	});

	// Если lowestPrice не изменился, это значит, что не было подходящих цен. Возвращаем 0.
	return lowestPrice === Infinity ? 0 : lowestPrice;
}

