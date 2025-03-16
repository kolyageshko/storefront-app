'use client'

import { Cart, Market, Product } from '@/types/global'
import EmptyCartMessage from '../components/empty-cart-message'
import Button from '../../common/button'
import Thumbnail from '../../products/components/thumbnail'
import LocalizedLink from '../../common/localized-link'
import ProductPrice from '../../products/components/product-price'
import Title from '../../common/title'
import QuantityControl from '../components/quantity-control'
import DeleteButton from '../components/delete-button'

type CartTemplateProps = {
	cart?: Cart | null
	market: Market
	relatedProducts: Product[]
}

const CartTemplate = ({ cart, market, relatedProducts }: CartTemplateProps) => {
	return (
		<div className='mt-12 mb-24'>
			{cart && cart.line_items.length > 0 ? (
				<div className='grid grid-cols-1 md:grid-cols-2 pt-8 pb-16 gap-10 md:gap-0'>
					<div className='flex'>
						<div className='basis-full md:basis-4/5 px-4'>
							<div className='border-b border-black'>
								<Title>Shopping cart</Title>
							</div>
							{cart.line_items.map(item => (
								<div className='flex pt-3' key={item.id}>
									<Thumbnail thumbnail={item.product.thumbnail} size="large" />
									<div className='basis-full pl-4'>
										<div className='flex flex-col justify-between h-full'>
											<div>
												<div className='flex justify-between uppercase'>
													<div>
														<LocalizedLink
															href={`/products/${item.product.handle}`}
															className='transition-colors ease-out duration-200 hover:text-gray-400'
														>
															{item.product.name}
														</LocalizedLink>
													</div>
													<div>
														<ProductPrice
															market={market}
															product={item.product}
															variant={item.variant}
														/>
													</div>
												</div>
												<div className='uppercase'>
													<span>Size:</span><span>{item.variant.name}</span>
												</div>
											</div>
											<div className='flex items-center gap-3'>
												<QuantityControl item={item} />
												<DeleteButton id={item.id} />
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className='flex'>
						<div className='px-4 md:px-0 basis-full md:basis-2/4	'>
							<div className='grid gap-y-2 uppercase'>
								<div className='flex items-center justify-between border-b border-black'>
									<Title>ORDER SUMMARY</Title>
								</div>
								<div className='flex items-center justify-between mt-3'>
									<div>Subtotal</div>
									<div>$179.98</div>
								</div>
								<div className='flex items-center justify-between'>
									<div>Taxes</div>
									<div>$17.99</div>
								</div>
								<div className='flex items-center justify-between'>
									<div>Total</div>
									<div>$175.99</div>
								</div>
							</div>
							<div className='py-8'>
								<LocalizedLink href='/checkout'>
									<Button type='button'>Checkout</Button>
								</LocalizedLink>
							</div>
						</div>
					</div>
				</div>
			) : (
				<EmptyCartMessage />
			)}
			{/* <RelatedProducts market={market} products={relatedProducts} /> */}
		</div>
	)
}

export default CartTemplate
