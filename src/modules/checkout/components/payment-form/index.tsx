import React, { useState } from 'react'
import Radio from '@/modules/common/radio'
import clsx from 'clsx'
import Title from '@/modules/common/title'
import { Controller, useFormContext } from 'react-hook-form'
import { Cart, Market } from '../../../../types/global'
import { updateCart } from '../../../cart/actions'
import { ErrorMessage } from '@hookform/error-message'
import { FormFields } from '../checkout-form'
import getPaymentProviderData from '../../../../lib/util/use-payment-provider-data'

interface PaymentProps {
	cart: Cart
	market: Market
}

const Payment: React.FC<PaymentProps> = ({ cart, market }) => {
	const {
		control,
		setValue,
		formState: { errors },
	} = useFormContext<FormFields>()

	const [selectedOption, setSelectedOption] = useState(
		cart.payment_provider?.id || ''
	)

	const paymentProviders = market.payment_providers

	const handleOptionClick = async (optionId: string) => {
		try {
			setValue('payment_provider_id', optionId)
			setSelectedOption(optionId)
			await updateCart({ payment_provider_id: optionId })
		} catch (error) {
			console.error('Error updating cart:', error)
		}
	}

	return (
		<div className='mt-12'>
			<Title>Payment</Title>

			{paymentProviders && paymentProviders.length > 0 ? (
				paymentProviders.map((p, index) => {
					const { label, description } = getPaymentProviderData(p)

					return (
						<div
							key={p.id}
							className={clsx('py-4 border-b cursor-pointer', {
								'border-t': index === 0,
							})}
							onClick={() => handleOptionClick(p.id)}
						>
							<div className='flex items-center justify-between'>
								<Controller
									control={control}
									name='payment_provider_id'
									rules={{ required: 'Please select a shipping option' }}
									render={({ field }) => (
										<Radio
											{...field}
											id={p.id}
											label={label}
											value={p.id}
											checked={selectedOption === p.id}
											onChange={() => handleOptionClick(p.id)}
											onClick={e => e.stopPropagation()}
										/>
									)}
								/>
							</div>
							{selectedOption === p.id && description && (
								<div className='mt-1'>
									<div className='bg-gray-50 p-3 mt-2'>
										<div className='text-gray-500'>{description}</div>
									</div>
								</div>
							)}
						</div>
					)
				})
			) : (
				<p className='text-gray-500'>No payment options available.</p>
			)}
			{selectedOption === '' && (
				<ErrorMessage
					errors={errors}
					name='payment_provider'
					render={({ message }) => (
						<div className='pt-1 text-red-500'>
							<span>{message}</span>
						</div>
					)}
				/>
			)}
		</div>
	)
}

export default Payment
