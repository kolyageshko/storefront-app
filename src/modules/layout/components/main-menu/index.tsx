'use client'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Collection } from '@/types/global'
import clsx from 'clsx'
import LocalizedLink from '../../../common/localized-link'

type MainMenuProps = {
	collections: Collection[]
}

const MainMenu: React.FC<MainMenuProps> = ({ collections }) => {
	return (
		<div className='h-full flex justify-center space-x-8'>
			<Popover className='flex'>
				{({ open, close }) => (
					<>
						<Popover.Button
							className={clsx(
								'uppercase h-full transition-colors ease-out duration-200 focus:outline-none',
								{ 'text-gray-400': open }
							)}
						>
							Shop
						</Popover.Button>
						<Transition.Root show={open} as='div'>
							<div className='flex items-center h-full'>
								<Transition.Child
									as={Fragment}
									enter='ease-in-out duration-500'
									enterFrom='opacity-0'
									enterTo='opacity-100'
									leave='ease-in-out duration-500'
									leaveFrom='opacity-100'
									leaveTo='opacity-0'
								>
									<Popover.Overlay className='fixed inset-0 bg-black bg-opacity-30 -z-10' />
								</Transition.Child>
							</div>
							<Transition.Child
								as={Fragment}
								enter='transform transition ease-in-out duration-500'
								enterFrom='-translate-y-full'
								enterTo='translate-y-0'
								leave='transform transition ease-in-out duration-500'
								leaveFrom='translate-y-0'
								leaveTo='-translate-y-full'
							>
								<Popover.Panel className='absolute top-full inset-x-0 -z-10'>
									<div className='absolute inset-0 top-1/2 bg-white' />
									<div className='relative bg-white'>
										<Transition.Child
											as='div'
											enter='transition ease-in duration-1000'
											enterFrom='opacity-0'
											enterTo='opacity-100'
											leave='transition ease-in duration-1000'
											leaveFrom='opacity-100'
											leaveTo='opacity-0'
										>
											<div className='mx-auto px-4'>
												<div className='grid grid-cols-2 items-start gap-y-10 gap-x-8 pt-12 pb-20'>
													<div className='grid grid-cols-2 gap-y-1 gap-x-8'>
														<div className='uppercase'>
															<p className='text-gray-400'>Collections</p>
															<ul
																role='list'
																className='mt-6 space-y-1 sm:mt-4'
															>
																{collections &&
																	Array.isArray(collections) &&
																	collections.map(collection => (
																		<li key={collection.id} className='flex'>
																			<LocalizedLink
																				onClick={() => {
																					close()
																				}}
																				href={`/collections/${collection.handle}`}
																			>
																				{collection.name}
																			</LocalizedLink>
																		</li>
																	))}
															</ul>
														</div>
													</div>
												</div>
											</div>
										</Transition.Child>
									</div>
								</Popover.Panel>
							</Transition.Child>
						</Transition.Root>
					</>
				)}
			</Popover>
		</div>
	)
}

export default MainMenu
