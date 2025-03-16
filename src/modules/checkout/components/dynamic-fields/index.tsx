import React from 'react'
import Input from '@/modules/common/input'
import { Controller, useFormContext } from 'react-hook-form'
import { FormFields } from '../checkout-form'
import AddressAccordion from '../address-accordion'
import { Cart } from '../../../../types/global'

/**
 * Renders dynamic fields based on the country code.
 *
 * @param countryCode - The country code.
 * @param cart - The cart object.
 * @returns The JSX element representing the dynamic fields.
 */
const DynamicFields = ({
	countryCode,
	cart,
}: {
	countryCode: string
	cart: Cart
}) => {
	const methods = useFormContext<FormFields>()
	const {
		formState: { errors },
	} = methods

	switch (countryCode) {
		case 'UA':
			return (
				<>
					<div className='flex-1 mb-3'>
						<Controller
							name='shipping_address.city'
							control={methods.control}
							rules={{
								required: 'City is required',
								minLength: {
									value: 1,
									message: 'City must have at least 1 character',
								},
							}}
							render={({ field }) => (
								<Input label='Місто' {...field} errors={errors} required />
							)}
						/>
					</div>
					<div className='flex-1 mb-3'>
						<Controller
							name='shipping_address.address_1'
							control={methods.control}
							rules={{
								required: 'Address is required',
								minLength: {
									value: 1,
									message: 'Address must have at least 1 character',
								},
							}}
							render={({ field }) => (
								<Input
									label='Відділення або поштомат Нової пошти'
									{...field}
									errors={errors}
									required
								/>
							)}
						/>
					</div>
				</>
			)
		default:
			return (
				<>
					<div className='flex-1 mb-3'>
						<Controller
							name='shipping_address.address_1'
							control={methods.control}
							rules={{
								required: 'Address is required',
								minLength: {
									value: 1,
									message: 'Address must have at least 1 character',
								},
							}}
							render={({ field }) => (
								<Input label='Address' {...field} errors={errors} required />
							)}
						/>
					</div>

					<div className='flex-1 mb-3'>
						<Controller
							name='shipping_address.address_2'
							control={methods.control}
							render={({ field: { ref, ...field } }) => (
								<AddressAccordion cart={cart} {...field} errors={errors} />
							)}
						/>
					</div>

					<div className='flex flex-row gap-4'>
						<div className='flex-1'>
							<Controller
								name='shipping_address.city'
								control={methods.control}
								rules={{
									required: 'City is required',
									minLength: {
										value: 1,
										message: 'City must have at least 1 character',
									},
								}}
								render={({ field }) => (
									<Input label='City' {...field} errors={errors} required />
								)}
							/>
						</div>
						<div className='flex-1'>
							<Controller
								name='shipping_address.postal_code'
								control={methods.control}
								rules={{
									required: 'Postal / Zip code is required',
									minLength: {
										value: 1,
										message: 'Postal / Zip must have at least 1 character',
									},
								}}
								render={({ field }) => (
									<Input
										label='Postal code'
										{...field}
										errors={errors}
										required
									/>
								)}
							/>
						</div>
					</div>
				</>
			)
	}
}

export default DynamicFields
