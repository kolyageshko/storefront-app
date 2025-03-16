'use client'

import React, {Fragment} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {useModalContext} from '@/lib/context/modal-context'
import Button from '@/modules/common/button'
import {Cart} from '@/types/global'
import LocalizedLink from '../../../common/localized-link'
import {formatAmount} from '@/lib/util/prices'
import ProductPrice from '../../../products/components/product-price'
import Image from 'next/image'
import DeleteButton from '../../../cart/components/delete-button'
import QuantityControl from '../../../cart/components/quantity-control'
import {orderBy} from "lodash";

interface CartDrawerProps {
	cart?: Cart | null
}

const CartDrawer: React.FC<CartDrawerProps> = ({ cart }) => {
	const { isOpen, closeModal, openModal } = useModalContext()

	const totalItems = cart?.item_count || 0

	const sortedLineItems = orderBy(cart?.line_items, ['created_at'], ['asc'])

	return (
		<div className='h-full'>
			<div className='flex items-center h-full'>
				<button className='uppercase h-full' onClick={() => openModal('cart')}>
					CART ({totalItems})
				</button>

				<Transition.Root show={isOpen} as={Fragment}>
					<Dialog
						as='div'
						className='fixed inset-0 overflow-hidden z-50'
						onClose={() => closeModal()}
					>
						<div className='flex items-center justify-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-in-out duration-500'
								enterFrom='opacity-0'
								enterTo='opacity-100'
								leave='ease-in-out duration-500'
								leaveFrom='opacity-100'
								leaveTo='opacity-0'
							>
								<Dialog.Overlay className='fixed inset-0 bg-white/70 backdrop-blur bg-opacity-30' />
							</Transition.Child>

							<Transition.Child
								as={Fragment}
								enter='transform transition ease-in-out duration-500 sm:duration-700'
								enterFrom='translate-x-full'
								enterTo='translate-x-0'
								leave='transform transition ease-in-out duration-500 sm:duration-700'
								leaveFrom='translate-x-0'
								leaveTo='translate-x-full'
							>
								<div className='w-full md:w-2/5 fixed inset-y-0 right-0 flex bg-white'>
									<Transition.Child
										as={Fragment}
										enter='transition ease-in-out duration-1000'
										enterFrom='opacity-0'
										enterTo='opacity-100'
										leave='transition ease-in-out duration-1000'
										leaveFrom='opacity-100'
										leaveTo='opacity-0'
									>
										<div className='flex flex-col top-0 right-0 bottom-0 bg-white border-l-0 md:border-l border-gray-100 overflow-y-auto w-full'>
											<div className='flex justify-between items-center p-2.5'>
												<h2 className='flex items-center gap-1 uppercase'>
													<span>Bag</span>
													<span className='px-1.5 py-0.5 bg-gray-200 rounded'>
                                                        {totalItems}
                                                    </span>
												</h2>
												<button
													className='uppercase'
													type='button'
													onClick={() => closeModal()}
												>
													Close
												</button>
											</div>
											{cart && totalItems > 0 ? (
												<>
													<ul className='px-2.5 flex-1 overflow-y-auto'>
														{sortedLineItems.map(item => (
															<li className='flex mb-2.5' key={item.id}>
																<LocalizedLink
																	href={`/products/${item.product.handle}`}
																	onClick={() => closeModal()}
																>
																	<Image
																		src={item.product.thumbnail.url}
																		alt={item.product.thumbnail.alt}
																		width={200}
																		height={200}
																		className='rounded-tl rounded-bl'
																		draggable={false}
																		sizes='(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px'
																	/>
																</LocalizedLink>
																<div className='flex flex-col justify-between bg-gray-100 rounded-tr rounded-br p-2.5 w-full'>
																	<div className='flex justify-between'>
																		<LocalizedLink
																			href={`/products/${item.product.handle}`}
																			onClick={() => closeModal()}
																		>
																			<h3 className='uppercase'>
																				{item.product.name}
																			</h3>
																		</LocalizedLink>
																		{item.variant.available ? (
																			<ProductPrice
																				product={item.product}
																				market={cart.market}
																				variant={item.variant}
																			/>
																		) : (
																			<span className='underline underline-offset-2 uppercase'>Sold out</span>
																		)}
																	</div>
																	<div
																		className='flex gap-1 text-gray-400'
																	>
																		<span>Size: </span>
																		<span>{item.variant.name}</span>
																	</div>
																	<div className='flex items-center justify-between'>
																		<QuantityControl item={item} />
																		<DeleteButton id={item.id} />
																	</div>
																</div>
															</li>
														))}
													</ul>
													<div className='sticky border-t border-gray-100 px-2.5 pb-4'>
														<div className='pb-2'>
															<div className='flex justify-between items-center uppercase py-2'>
																<span>Shipping</span>
																<span>
                                                                    {cart?.shipping_method
																		? cart.shipping_price === 0
																			? 'FREE'
																			: formatAmount(
																				cart.shipping_price,
																				cart.market.currency
																			)
																		: 'Calculated at checkout'}
                                                                </span>
															</div>
															<div className='flex justify-between items-center border-t border-gray-100 py-2'>
																<span className='uppercase'>Subtotal</span>
																<span>
                                                                    {formatAmount(
																		cart.subtotal,
																		cart.market.currency
																	)}
                                                                </span>
															</div>
														</div>
														<LocalizedLink
															href='/checkout'
															onClick={() => closeModal()}
														>
															<Button variant='black'>Checkout</Button>
														</LocalizedLink>
													</div>
												</>
											) : (
												<div className='uppercase px-2.5 my-4'>
													<span>Your bag is currently empty</span>
												</div>
											)}
										</div>
									</Transition.Child>
								</div>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition.Root>
			</div>
		</div>
	)
}

export default CartDrawer
