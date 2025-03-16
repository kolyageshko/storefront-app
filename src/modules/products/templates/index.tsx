'use client'

import RelatedProducts from '@/modules/products/components/related-products'
import ImageGallery from '@/modules/products/components/image-gallery'
import ProductActions from "@/modules/products/components/product-actions";
import { Market, Product } from '@/types/global'
import React from "react";

type ProductTemplateProps = {
	product: Product
	market: Market
	relatedProducts: Product[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
	product,
	market,
	relatedProducts,
}) => {
	return (
		<>
			<div className='flex flex-col md:flex-row small:items-start relative'>
				<div className='flex flex-col gap-y-8 w-full'>
					<ImageGallery media={product.media} />
				</div>
				<div className='w-full pt-8 small:py-0 flex flex-col gap-y-12'>
					<ProductActions product={product} market={market} />
				</div>
			</div>
			<div className='mt-24 mb-20'>
				<RelatedProducts market={market} products={relatedProducts} />
			</div>
		</>
	)
}

export default ProductTemplate
