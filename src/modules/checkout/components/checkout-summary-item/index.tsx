import React from 'react'
import {LineItem, Market} from '@/types/global'
import Image from 'next/image'
import ProductPrice from '../../../products/components/product-price'

interface CheckoutSummaryItemProps {
	item: LineItem
	market: Market
}

const CheckoutSummaryItem: React.FC<CheckoutSummaryItemProps> = ({
	item,
	market,
}) => {
	const { quantity, variant, product } = item

	return (
		<div className='border-t py-4 flex items-start'>
			<div className='mr-4'>
				<Image
					src={product.thumbnail.url}
					alt={product.name}
					width={115}
					height={115}
					draggable={false}
					sizes='(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px'
				/>
			</div>
			<div className='flex-grow'>
				<div className='flex justify-between mb-3'>
					<div className='uppercase'>{product.name}</div>
					<ProductPrice
						market={market}
						product={product}
						variant={variant}
					/>
				</div>
					<div
						className='flex justify-between py-2 border-y text-gray-400 uppercase'
					>
						<span>Size:</span>
						<span>{item.variant.name}</span>
					</div>
				<div className='flex justify-between py-2 border-b text-gray-400 uppercase'>
					<span>Quantity:</span>
					<span>{quantity}</span>
				</div>
			</div>
		</div>
	)
}

export default CheckoutSummaryItem
