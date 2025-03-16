import { formatAmount } from '@/lib/util/prices'
import { Currency, LineItem } from '@/types/global'

export default function LineItemPrice({
	lineItem,
	currency,
}: {
	lineItem: LineItem
	currency: Currency
}) {
	const { price, quantity, sale_price } = lineItem
	const totalAmount =
		sale_price !== null ? sale_price * quantity : price * quantity
	const originalAmount = price * quantity

	const getAmount = (amount: number) => formatAmount(amount, currency)

	return (
		<div className='flex gap-0.5'>
			<span>{getAmount(totalAmount)}</span>
			{sale_price && sale_price !== price && (
				<div className='flex items-center gap-0.5 ml-1 line-through'>
					<span>{getAmount(originalAmount)}</span>
				</div>
			)}
		</div>
	)
}
