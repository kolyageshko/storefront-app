'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Market, Product } from '@/types/global'
import clsx from 'clsx'
import ProductPrice from '../product-price'
import LocalizedLink from '../../../common/localized-link'

const ProductPreview = ({
	product,
	market,
}: {
	product: Product
	market: Market
}) => {
	const { name, handle, thumbnail, variants } = product

	return (
		<LocalizedLink href={`/products/${handle}`}>
			<div>
				<div className='relative aspect-[26/34]'>
					<Image
						src={thumbnail?.url || '/placeholder.jpg'}
						alt={thumbnail?.alt}
						className='absolute inset-0'
						draggable={false}
						fill
						sizes='(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px'
						style={{
							objectFit: 'cover',
							objectPosition: 'center',
						}}
					/>
				</div>

				<div
					className={clsx('pt-2 px-4 opacity-100')}
				>
					<h2 className='uppercase'>{name}</h2>
					<div className='flex items-center gap-x-1 mt-0.5'>
						<ProductPrice product={product} market={market} />
					</div>
				</div>
			</div>
		</LocalizedLink>
	)
}

export default ProductPreview
