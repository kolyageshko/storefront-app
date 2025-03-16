'use client'

import React, {useState} from 'react'
import Button from '../../../common/button'
import {updateCartItem} from '../../actions'
import {LineItem} from "@/types/global";

interface QuantityControlProps {
	item: LineItem
}

const QuantityControl: React.FC<QuantityControlProps> = ({ item }) => {
	const [isLoading, setIsLoading] = useState(false);
	const quantity = item.quantity
	const stock = item.variant.inventory_stock

	const handleIncrement = () => {
		setIsLoading(true);
		updateCartItem({
			cartItemId: item.id,
			quantity: quantity + 1,
		}).finally(() => {
			setIsLoading(false);
		});
	};

	const handleDecrement = () => {
		setIsLoading(true);
		updateCartItem({
			cartItemId: item.id,
			quantity: quantity - 1,
		}).finally(() => {
			setIsLoading(false);
		});
	};

	return (
		<div className='flex items-center'>
			<Button
				type='button'
				variant='badge'
				onClick={() => handleDecrement()}
				disabled={quantity === 1 || isLoading}
			>
				-
			</Button>
			<span className='p-1.5'>{item.quantity}</span>
			<Button
				type='button'
				variant='badge'
				onClick={() => handleIncrement()}
				disabled={(quantity >= stock && !item.variant.allow_backorder) || isLoading}
			>
				+
			</Button>
		</div>
	)
}

export default QuantityControl
