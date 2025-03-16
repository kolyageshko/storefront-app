import React, { useState } from 'react'
import Input from '../../../common/input'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { Cart } from '../../../../types/global'

interface AddressAccordionProps {
	errors?: Record<string, unknown>
	name: string
	cart: Cart
}

const AddressAccordion: React.FC<AddressAccordionProps> = ({
	cart,
	errors,
	name,
	...rest
}) => {
	const [isOpen, setIsOpen] = useState(!!cart.shipping_address?.address_2)

	const handleToggle = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<div>
							<Input
								name={name}
								label='Company, apartment, floor, etc.'
								{...rest}
								errors={errors}
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			<button
				className={clsx(
					'flex items-center text-gray-500 cursor-pointer focus:outline-none',
					{
						'mt-2': isOpen,
					}
				)}
				type='button'
				onClick={handleToggle}
			>
				{isOpen ? (
					<>
						<MinusIcon className='text-gray-900 h-3 w-3 inline-block mr-1' />
						Show less
					</>
				) : (
					<>
						<PlusIcon className='text-gray-900 h-3 w-3 inline-block mr-1' />
						Company, apartment, floor, etc. (optional)
					</>
				)}
			</button>
		</div>
	)
}

export default AddressAccordion
