import React from 'react'
import { Cart } from '@/types/global'
import { formatAmount } from '@/lib/util/prices'

interface CartTotalsProps {
	cart: Cart
}

const CartTotals: React.FC<CartTotalsProps> = ({ cart }) => {
	const { market } = cart

	const getAmount = (amount: number) => formatAmount(amount, market.currency)

	return (
		<div>
			<div className='flex justify-between pb-2 pt-3 border-t'>
				<span className="uppercase">Subtotal</span>
				<span>{getAmount(cart.subtotal)}</span>
			</div>
			<div className='flex justify-between pb-3 pt-2'>
				<span className="uppercase">Shipping</span>
				<span>
					{cart?.shipping_method
						? cart.shipping_price === 0
							? 'FREE'
							: getAmount(cart.shipping_price)
						: 'Select shipping method'}
				</span>
			</div>
			<div className='flex justify-between pb-2 pt-3 border-t'>
				<span className="uppercase">Total</span>
				<span>{getAmount(cart.total)}</span>
			</div>
		</div>
	)
}

export default CartTotals
