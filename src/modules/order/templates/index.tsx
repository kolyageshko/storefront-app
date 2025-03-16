'use client'

import Image from 'next/image'
import { Order, OrderStatus } from '@/types/global'
import clsx from 'clsx'
import LineItemPrice from '../components/line-item-price'
import Button from '../../common/button'
import LocalizedLink from '../../common/localized-link'
import getPaymentProviderData from '../../../lib/util/use-payment-provider-data'
import { formatAmount } from '@/lib/util/prices'
import React from "react";

const OrderTemplate: React.FC<{ order: Order }> = ({ order }) => {
	const { shipping_address, billing_address, line_items, status } = order

	const getAmount = (amount: number) =>
		formatAmount(amount, order.market.currency)

	let titleText
	switch (status) {
		case OrderStatus.ARCHIVED:
			titleText = 'Completed.'
			break
		case OrderStatus.CANCELLED:
			titleText = 'Cancelled.'
			break
		case OrderStatus.OPEN:
			titleText = 'In processing.'
			break
		case OrderStatus.DRAFT:
			titleText = 'Draft.'
			break
		default:
			titleText = 'Unknown order status.'
			break
	}

	let subTitleText
	switch (status) {
		case OrderStatus.ARCHIVED:
			subTitleText = 'Your order has been completed.'
			break
		case OrderStatus.CANCELLED:
			subTitleText = 'Your order has been cancelled.'
			break
		case OrderStatus.OPEN:
			subTitleText = 'Your order is being processed.'
			break
		case OrderStatus.DRAFT:
			subTitleText = 'Your order is in draft.'
			break
		default:
			subTitleText = 'Unknown order status.'
			break
	}

	const { label } = order.payment_provider
		? getPaymentProviderData(order.payment_provider)
		: { label: 'Unknown Payment Method' }

	return (
		<div className='mx-auto max-w-2xl px-4 py-12'>
			<div>
				<div>
					<div className='max-w-xl'>
						<h1 className='uppercase'>Thank you!</h1>
						<p className='mt-2 text-3xl font-extrabold'>{titleText}</p>
						<p className='mt-2 text-gray-500'>{subTitleText}</p>

						<dl className='mt-10'>
							<dt className='uppercase'>Order number</dt>
							<dd className='text-gray-700 mt-2'>{order.external_id}</dd>
						</dl>
					</div>

					<div className='mt-10 border-t border-gray-200'>
						<h2 className='flex items-center gap-1 uppercase'>
							<span className='pt-4'>Your items</span>
						</h2>
						{line_items.map(item => (
							<div
								key={item.id}
								className={clsx(
									'pt-4 pb-8',
									'border-b border-gray-200',
									'flex gap-3'
								)}
							>
								{item.thumbnail && item.thumbnail.url && (
									<Image
										src={item.thumbnail.url}
										alt={item.thumbnail.alt}
										width={115}
										height={115}
										className='w-auto h-auto'
									/>
								)}
								<div className='flex-auto flex flex-col'>
									<div>
										<h4 className='uppercase'>{item.name}</h4>
										<p>{item.variant_name}</p>
									</div>
									<div className='mt-6 flex-1 flex items-end'>
										<dl className='flex divide-x divide-gray-200 space-x-3'>
											<div className='flex'>
												<dt className='uppercase'>Quantity:</dt>
												<dd className='ml-1'>{item.quantity}</dd>
											</div>
											<div className='pl-4 flex'>
												<dd>
													<LineItemPrice
														lineItem={item}
														currency={order.currency}
													/>
												</dd>
											</div>
										</dl>
									</div>
								</div>
							</div>
						))}
						<div className='sm:ml-40 sm:pl-6'>
							<h3 className='sr-only'>Your information</h3>

							<h4 className='sr-only'>Addresses</h4>
							<dl className='grid grid-cols-2 gap-x-3 py-10'>
								<div>
									<dt className='uppercase'>Shipping address</dt>
									<dd className='mt-2 text-gray-700'>
										<address className='not-italic'>
											<span className='block'>
												{shipping_address.first_name}{' '}
												{shipping_address.last_name}
											</span>
											<span className='block'>
												{shipping_address.phone}
											</span>
											<span className='block'>
												{shipping_address.address_1}
											</span>
											<span className='block'>
												{shipping_address.address_2}
											</span>
											<span className='block'>
												{shipping_address.city}
												{shipping_address.postal_code}
											</span>
											<span className='block'>
												{shipping_address.country?.name}
											</span>
										</address>
									</dd>
								</div>
								<div>
									<dt className='uppercase'>Billing address</dt>
									<dd className='mt-2 text-gray-700'>
										{billing_address ? (
											<address className='not-italic'>
												<span className='block'>
													{billing_address.first_name}{' '}
													{billing_address.last_name}
												</span>
												<span className='block'>
													{billing_address.address_1}
												</span>
												<span className='block'>
													{billing_address.address_2}
												</span>
												<span className='block'>
													{billing_address.city}
													{', '}
													{billing_address.postal_code}
												</span>
												<span className='block'>
													{billing_address.country?.name}
												</span>
											</address>
										) : (
											<p className='not-italic'>Same as the shipping address</p>
										)}
									</dd>
								</div>
							</dl>

							<h4 className='sr-only'>Payment</h4>
							<dl className='grid grid-cols-2 gap-x-3 border-t border-gray-200 py-10'>
								<div>
									<dt className='uppercase'>Payment method</dt>
									<dd className='mt-2 text-gray-700'>
										<p>{label}</p>
									</dd>
								</div>
								<div>
									<dt className='uppercase'>Shipping method</dt>
									<dd className='mt-2 text-gray-700'>
										<p>{order.shipping_method.name}</p>
									</dd>
								</div>
							</dl>

							<h3 className='sr-only'>Summary</h3>

							<dl className='space-y-3 border-t border-gray-200 pt-10'>
								<div className='flex justify-between'>
									<dt className='uppercase'>Subtotal</dt>
									<dd className='text-gray-700'>
										<span>{getAmount(order.subtotal)}</span>
									</dd>
								</div>
								{/* <div className='flex justify-between'>
									<dt className='flex items-center'>
										<span className='uppercase'>Discount</span>
										<span className='rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 ml-2'>
											SUMMER20
										</span>
									</dt>
									<dd className='text-gray-700'>-$18.00 (50%)</dd>
								</div> */}
								<div className='flex justify-between'>
									<dt className='uppercase'>Shipping</dt>
									<dd className='text-gray-700'>
										<span>
											{order?.shipping_method
												? order.shipping_price === 0
													? 'FREE'
													: getAmount(order.shipping_price)
												: 'Shipping method not selected'}
										</span>
									</dd>
								</div>
								<div className='flex justify-between'>
									<dt className='uppercase'>Total</dt>
									<dd className='text-gray-900'>
										<span>{getAmount(order.total)}</span>
									</dd>
								</div>
							</dl>
						</div>
						<div className='flex justify-end w-full py-10'>
							<LocalizedLink className='w-full md:basis-1/3' href='/'>
								<Button type='button'>Back to Shop</Button>
							</LocalizedLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default OrderTemplate
