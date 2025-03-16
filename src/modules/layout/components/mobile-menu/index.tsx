'use client'

import { Fragment, useState } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { Collection } from '@/types/global'
import LocalizedLink from '../../../common/localized-link'
import Link from "next/link";

type MobileMenuProps = {
	collections: Collection[]
}

const MobileMenu: React.FC<MobileMenuProps> = ({ collections }) => {
	const [isOpen, setIsOpen] = useState(false)

	const openMenu = () => {
		setIsOpen(true)
	}

	const closeMenu = () => {
		setIsOpen(false)
	}

	return (
		<div className='h-full'>
			<div className='flex items-center h-full'>
				<button className='uppercase h-full' onClick={openMenu}>
					Menu
				</button>

				<Transition.Root show={isOpen} as={Fragment}>
					<Dialog
						as='div'
						className='fixed inset-0 overflow-hidden z-50'
						onClose={closeMenu}
					>
						<div className='flex items-center justify-center min-h-screen'>
							<Transition.Child
								as={Fragment}
								enter='ease-in-out duration-500'
								enterFrom='opacity-0'
								enterTo='opacity-100'
								leave='ease-in-out duration-500'
								leaveFrom='opacity-100'
								leaveTo='opacity-0'
							>
								<Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-30' />
							</Transition.Child>

							<Transition.Child
								as={Fragment}
								enter='transform transition ease-in-out duration-500 sm:duration-700'
								enterFrom='-translate-x-full'
								enterTo='translate-x-0'
								leave='transform transition ease-in-out duration-500 sm:duration-700'
								leaveFrom='translate-x-0'
								leaveTo='-translate-x-full'
							>
								<div className='fixed inset-y-0 left-0 flex w-full bg-black'>
									<div className='flex flex-col h-full text-white w-full uppercase'>
										<div className='flex items-end justify-end mb-4 p-4'>
											<button onClick={closeMenu} className='uppercase h-full'>
												Close
											</button>
										</div>
										<Transition.Child
											as={Fragment}
											enter='transition ease-in-out duration-1000'
											enterFrom='opacity-0'
											enterTo='opacity-100'
											leave='transition ease-in-out duration-1000'
											leaveFrom='opacity-100'
											leaveTo='opacity-0'
										>
											<div className='flex flex-col justify-center h-full text-xs px-4'>
												<div>
													<LocalizedLink
														className='block py-1.5'
														href='/'
														onClick={() => closeMenu()}
													>
														<p>New Arrivals</p>
													</LocalizedLink>
													{collections &&
														Array.isArray(collections) &&
														collections.map((collection) => (
															<LocalizedLink
																key={collection.id}
																className='block py-1.5'
																href={`/collections/${collection.handle}`}
																onClick={() => closeMenu()}
															>
																<p>{collection.name}</p>
															</LocalizedLink>
														))}
												</div>
												<div className='mt-8'>
													<LocalizedLink
														className='block py-1.5'
														href='/pages/faqs'
														onClick={() => closeMenu()}
													>
														<p>FAQ</p>
													</LocalizedLink>
													<LocalizedLink
														className='block py-1.5'
														href='/pages/contact-us'
														onClick={() => closeMenu()}
													>
														<p>Contact us</p>
													</LocalizedLink>
												</div>
												<div className='mt-8'>
													<Link
														className='block py-1.5'
														href='https://www.instagram.com/citadelcult'
														onClick={() => closeMenu()}
														target="_blank"
													>
														<p>Instagram</p>
													</Link>
												</div>
											</div>
										</Transition.Child>
									</div>
								</div>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition.Root>
			</div>
		</div>
	)
}

export default MobileMenu
