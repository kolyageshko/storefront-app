import Image from 'next/image'
import MobileMenu from '../components/mobile-menu'
import { getCollections } from '@/lib/data'
import MainMenu from '../components/main-menu'
import CartButton from '../templates/cart-button'
import LocalizedLink from '../../common/localized-link'

const Nav = async () => {
	const collections = await getCollections()

	return (
		<div className='sticky top-0 inset-x-0 z-40 group'>
			<div className='bg-black text-white flex justify-center items-center h-6 uppercase'>
				Spectral Hoodie. Online Now.
			</div>
			<header className='relative h-11 px-4 mx-auto transition-colors bg-white'>
				<nav className='flex items-center justify-between w-full h-full transition-colors duration-200'>
					<div className='flex-1 basis-0 h-full flex items-center'>
						<div className='block md:hidden'>
							<MobileMenu collections={collections} />
						</div>
						<div className='hidden md:block'>
							<MainMenu collections={collections} />
						</div>
					</div>

					<div className='flex items-center h-full'>
						<LocalizedLink href='/' className='flex h-full uppercase'>
							<div className='flex items-center h-full'>
								<Image
									src='/citadelcult_logo.svg'
									alt='Citadel Cult logo'
									className='inset-0'
									width={115}
									height={14}
									priority={true}
									loading='eager'
								/>
							</div>
						</LocalizedLink>
					</div>

					<div className='flex items-center gap-x-3 h-full flex-1 basis-0 justify-end'>
						<CartButton />
					</div>
				</nav>
			</header>
		</div>
	)
}

export default Nav
