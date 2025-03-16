import React, { useState } from 'react'
import Radio from '@/modules/common/radio'
import clsx from 'clsx'
import Title from '@/modules/common/title'
import { Controller, useFormContext } from 'react-hook-form'
import { Cart } from '@/types/global'
import { FormFields } from '../checkout-form'
import { updateCart } from '../../../cart/actions'
import { ErrorMessage } from '@hookform/error-message'
import { formatAmount } from '@/lib/util/prices'

interface ShippingProps {
	cart: Cart
}

const Shipping: React.FC<ShippingProps> = ({ cart }) => {
	const {
		setValue,
		control,
		formState: { errors },
	} = useFormContext<FormFields>()

	const shippingOptions = cart.market.shipping_methods

	const [selectedOption, setSelectedOption] = useState(
		cart.shipping_method?.id || ''
	)

	const handleOptionClick = async (optionId: string) => {
		try {
			setValue('shipping_method_id', optionId)
			setSelectedOption(optionId)
			await updateCart({ shipping_method_id: optionId })
		} catch (error) {
			console.error('Error updating cart:', error)
		}
	}

	return (
		<div className='mt-12'>
			<Title>Delivery</Title>

			{shippingOptions && shippingOptions.length > 0 ? (
				shippingOptions.map((option, index) => (
					<div
						key={option.id}
						className={clsx('py-4 border-b cursor-pointer', {
							'border-t': index === 0,
						})}
						onClick={() => handleOptionClick(option.id)}
					>
						<div className='flex items-center justify-between'>
							<Controller
								control={control}
								name='shipping_method_id'
								rules={{ required: 'Please select a shipping option' }}
								render={({ field }) => (
									<Radio
										{...field}
										value={option.id}
										id={option.id}
										label={option.name}
										checked={selectedOption === option.id}
										onClick={e => {
											e.stopPropagation()
											handleOptionClick(option.id)
										}}
									/>
								)}
							/>
							<div className='flex gap-1 uppercase font-medium'>
								<span>
									{option.price === 0
										? 'FREE'
										: formatAmount(option.price, cart.market.currency)}
								</span>
							</div>
						</div>
						<p className='text-gray-500 pl-6 mt-1'>{option.description}</p>
					</div>
				))
			) : (
				<p className='text-gray-500'>No shipping options available.</p>
			)}
			{selectedOption === '' && (
				<ErrorMessage
					errors={errors}
					name='shipping_method_id'
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

export default Shipping
