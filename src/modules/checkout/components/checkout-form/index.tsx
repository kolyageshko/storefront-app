'use client'

import Addresses from '../shipping-information-form'
import Shipping from '../shipping-form'
import Payment from '../payment-form'
import {FormProvider, useForm} from 'react-hook-form'
import {Cart, LineItem, Market} from '@/types/global'
import PaymentButton from '../payment-button'
import {useModalContext} from '@/lib/context/modal-context'
import Button from '../../../common/button'
import React from "react";
import Thumbnail from "@/modules/products/components/thumbnail";

export type FormFields = {
	email: string
	shipping_address: {
		first_name: string
		last_name: string
		address_1: string
		address_2: string
		postal_code: string
		city: string
		country_code: string
		phone: string
	}
	shipping_method_id: string
	payment_provider_id: string
}

interface CheckoutFormProps {
	cart: Cart
	markets: Market[]
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cart, markets }) => {
	const { openModal } = useModalContext()

	const methods = useForm<FormFields>({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			email: cart.email || '',
			shipping_address: {
				first_name: cart.shipping_address?.first_name || '',
				last_name: cart.shipping_address?.last_name || '',
				address_1: cart.shipping_address?.address_1 || '',
				address_2: cart.shipping_address?.address_2 || '',
				city: cart.shipping_address?.city || '',
				postal_code: cart.shipping_address?.postal_code || '',
				country_code: cart.shipping_address?.country?.iso || '',
				phone: cart.shipping_address?.phone || '',
			},
			shipping_method_id: cart.shipping_method?.id || '',
			payment_provider_id: cart.payment_provider?.id || '',
		},
	})

	const unavailableItems: LineItem[] = cart.line_items.filter(item => !item.variant.available)

	if (unavailableItems.length > 0) {
		return (
			<div className="flex flex-col px-4">
				<div>
					<h1 className="mt-4 text-sm font-bold tracking-tight text-foreground">
						Oops, some items are no longer available
					</h1>
					<p className="border-b py-2 text-muted-foreground">
						We&apos;re sorry, but the following items are currently out of stock:
					</p>
					<ul className="mt-4 space-y-2 text-left">
						{unavailableItems.map(item => (
							<li key={item.id} className="flex items-center gap-4">
								<Thumbnail thumbnail={item.product.thumbnail} />
								<div className="flex justify-between w-full items-center">
									<div className="flex flex-col">
										<span className='uppercase'>{item.product.name}</span>
										<div className="flex gap-1 text-gray-400">
											<span>Size: </span>
											<span>{item.variant.name}</span>
										</div>
									</div>
									<span className="underline underline-offset-2 uppercase">Sold out</span>
								</div>
							</li>
						))}
					</ul>
					<div className="mt-6">
						<Button
							className='uppercase flex items-center gap-2 justify-center transition-colors duration-200 disabled:opacity-50 w-full h-9 px-5 border border-black hover:bg-black hover:text-white'
							onClick={() => openModal('cart')}
						>
							Return to cart
						</Button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='w-full md:w-5/6 px-4'>
			<FormProvider {...methods}>
				<form>
					<Addresses markets={markets} cart={cart}/>
					<Shipping cart={cart}/>
					<Payment cart={cart} market={cart.market}/>
					<div className='mt-10'>
						<PaymentButton cart={cart}/>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}

export default CheckoutForm
