'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import NativeSelect from '../../../common/native-select'
import { Market } from '@/types/global'
import { ChangeEvent, useMemo } from 'react'
import { updateMarket } from '@/app/actions'
import {splitLocale} from "@/lib/util/i18n";

type CountryOption = {
	country: string
	currency: string
	region: string
	label: string
}

type CountrySelectProps = {
	markets: Market[]
}

const CountrySelect = ({ markets }: CountrySelectProps) => {
	const { locale } = useParams()
	const [language, region] = splitLocale(locale as string);
	const router = useRouter()

	const currentPath = usePathname().split(`/${locale}`)[1]

	const options: CountryOption[] | undefined = useMemo(() => {
		return markets
			?.map(m => {
				return m.countries.map(c => ({
					country: c.iso,
					currency: m.currency.code,
					region: m.id,
					label: c.name,
				}))
			})
			.flat()
			.sort((a, b) => a.label.localeCompare(b.label))
	}, [markets])

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const selectedCountry = event.target.value
		if (selectedCountry) {
			updateMarket(selectedCountry).then(r =>
				router.push(`/en-${selectedCountry.toLowerCase()}${currentPath}`)
			)
		}
	}

	return (
		<NativeSelect
			value={region?.toString().toUpperCase()}
			className='uppercase'
			onChange={handleChange}
		>
			{options?.map((o, index) => (
				<option key={index} value={o.country}>
					{o.label} ({o.currency})
				</option>
			))}
		</NativeSelect>
	)
}

export default CountrySelect
