'use client'

import { Market, Product } from '@/types/global'
import ProductPreview from '../components/product-preview'

type ProductListProps = {
	products: Product[]
	market: Market
	title?: string
}

const ProductList: React.FC<ProductListProps> = ({
	products,
	market,
	title,
}) => {
	return (
		<div className='py-12 md:pt-8'>
			{title && <h1 className='uppercase px-4 mb-2'>{title}</h1>}
			<ul className='grid grid-cols-2 md:grid-cols-4 gap-y-6'>
				{products &&
					products.map(product => (
						<li key={product.id}>
							<ProductPreview product={product} market={market} />
						</li>
					))}
			</ul>
		</div>
	)
}

export default ProductList
