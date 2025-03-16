'use client'

import React from 'react'
import Input from '@/modules/common/input'
import Title from '@/modules/common/title'
import CountrySelect from '@/modules/checkout/components/country-select'
import { Controller, useFormContext } from 'react-hook-form'
import { Cart, Market } from '../../../../types/global'
import { FormFields } from '../checkout-form'
import DynamicFields from '../dynamic-fields'
import validator from 'validator'

const Addresses = ({ cart, markets }: { cart: Cart; markets: Market[] }) => {
	const methods = useFormContext<FormFields>()
	const {
		formState: { errors },
	} = methods

	const {
		shipping_address: { country_code },
	} = methods.watch()

	return (
		<>
			<Title>Personal Information</Title>
			<div className='flex-1 mb-3'>
				<Controller
					name='email'
					control={methods.control}
					rules={{
						required: 'Email is required',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: 'Invalid email format',
						},
					}}
					render={({ field }) => (
						<Input
							type='email'
							label='Email'
							{...field}
							errors={errors}
							required
						/>
					)}
				/>
			</div>

			<div className='flex flex-col md:flex-row gap-4 mb-3'>
				<div className='flex-1'>
					<Controller
						name='shipping_address.first_name'
						control={methods.control}
						rules={{
							required: 'First name is required',
							minLength: {
								value: 1,
								message: 'First Name must have at least 1 character',
							},
						}}
						render={({ field }) => (
							<Input label='First Name' {...field} errors={errors} required />
						)}
					/>
				</div>
				<div className='flex-1'>
					<Controller
						name='shipping_address.last_name'
						control={methods.control}
						rules={{
							required: 'Last name is required',
							minLength: {
								value: 1,
								message: 'Last Name must have at least 1 character',
							},
						}}
						render={({ field }) => (
							<Input label='Last Name' {...field} errors={errors} required />
						)}
					/>
				</div>
			</div>

			<div className='flex-1 mb-3'>
				<Controller
					name='shipping_address.country_code'
					control={methods.control}
					rules={{
						required: 'Country is required',
						minLength: {
							value: 1,
							message: 'Country must have at least 1 character',
						},
					}}
					render={({ field }) => (
						<CountrySelect
							markets={markets}
							{...field}
							errors={errors}
							required
						/>
					)}
				/>
			</div>

			<DynamicFields countryCode={country_code} cart={cart} />

			<div className='flex-1 mt-3'>
				<Controller
					name='shipping_address.phone'
					control={methods.control}
					rules={{
						validate: value => {
							if (!validator.isMobilePhone(value)) {
								return 'Invalid phone number'
							}
							return true
						},
						required: 'Phone number is required',
					}}
					render={({ field }) => (
						<Input label='Phone number' {...field} errors={errors} required />
					)}
				/>
			</div>
		</>
	)
}

export default Addresses
