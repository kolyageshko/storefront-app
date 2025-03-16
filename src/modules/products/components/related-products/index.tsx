import { Market, Product } from '@/types/global'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import ProductPreview from '../product-preview'

type RelatedProductsProps = {
	products: Product[]
	market: Market
}

const RelatedProducts = ({ products, market }: RelatedProductsProps) => {
	if (products.length === 0) {
		return null
	}

	return (
		<>
			<div className='flex flex-col'>
				<span className='mb-2 px-4 uppercase'>Related items</span>
			</div>

			<div className='block md:hidden'>
				<Swiper className='mySwiper' slidesPerView={1.4} resistanceRatio={0}>
					{products.map(product => (
						<SwiperSlide key={product.id}>
							<ProductPreview market={market} product={product} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<div className='hidden md:block'>
				<ul className='grid grid-cols-2 md:grid-cols-6'>
					{products.map(product => (
						<li key={product.id}>
							<ProductPreview market={market} product={product} />
						</li>
					))}
				</ul>
			</div>
		</>
	)
}

export default RelatedProducts
