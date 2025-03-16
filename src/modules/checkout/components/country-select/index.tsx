'use client'

import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'

import Select, { SelectProps } from '../../../common/select'
import { Market } from '@/types/global'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { updateMarket } from '@/app/actions'
import { useFormContext } from 'react-hook-form'
import { FormFields } from '../checkout-form'

type CountryOption = {
	country: string
	market: string
	label: string
	errors?: Record<string, unknown>
}

const CountrySelect = forwardRef<
	HTMLSelectElement,
	SelectProps & {
		markets: Market[]
	}
>(
	(
		{ placeholder = 'Country', name, value, markets, errors, ...props },
		ref
	) => {
		const { locale } = useParams()
		const router = useRouter()

		const currentPath = usePathname().split(`/${locale}`)[1]

		const innerRef = useRef<HTMLSelectElement>(null)

		useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
			ref,
			() => innerRef.current
		)

		const options: CountryOption[] | undefined = useMemo(() => {
			return markets
				?.map(m => {
					return m.countries.map(c => ({
						country: c.iso,
						market: m.id,
						label: c.name,
					}))
				})
				.flat()
				.sort((a, b) => a.label.localeCompare(b.label))
		}, [markets])

		const { setValue, clearErrors } = useFormContext<FormFields>()

		const handleChange = async (
			event: React.ChangeEvent<HTMLSelectElement>
		) => {
			const countryCode = event.target.value
			clearErrors('shipping_address.country_code')
			await updateMarket(countryCode).then(r =>
				router.push(`/en-${countryCode.toLowerCase()}${currentPath}`)
			)
		}

		return (
			<Select
				ref={innerRef}
				name={name}
				placeholder={placeholder}
				value={value}
				label='Country'
				errors={errors}
				onChange={handleChange}
			>
				{options?.map((o, index) => (
					<option key={index} value={o.country}>
						{o.label}
					</option>
				))}
			</Select>
		)
	}
)

CountrySelect.displayName = 'CountrySelect'

export default CountrySelect
