import CountrySelect from '../components/country-select'
import { listMarkets } from '@/lib/data'
import LocalizedLink from '../../common/localized-link'
import Link from 'next/link'

const Footer = async () => {
	const markets = await listMarkets().then(markets => markets)

	return (
		<div className='mt-auto'>
			<div className='flex flex-col gap-y-6 py-5 px-4'>
				<ul className='grid grid-cols-1 gap-y-1 uppercase'>
					<li>
						<LocalizedLink href='/pages/contact-us'>Contact us</LocalizedLink>
					</li>
					<li>
						<LocalizedLink href='/pages/faqs'>Faqs</LocalizedLink>
					</li>
					<li>
						<LocalizedLink href='/pages/stockist'>Stockist</LocalizedLink>
					</li>
					<li>
						<LocalizedLink href='/pages/shipping'>Shipping</LocalizedLink>
					</li>
					<li>
						<LocalizedLink href='/pages/returns'>Returns</LocalizedLink>
					</li>
					<li>
						<LocalizedLink href='/pages/terms'>
							Terms and conditions
						</LocalizedLink>
					</li>
				</ul>
				<ul className='grid grid-cols-1 gap-y-1 uppercase'>
					<li>
						<Link href='https://www.instagram.com/citadelcult/'>Instagram</Link>
					</li>
				</ul>
				<ul className='grid grid-cols-1 gap-y-1 uppercase'>
					<li>
						<CountrySelect markets={markets} />
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Footer
