'use client'

import React, { useState } from 'react'
import {Cart, LineItem} from '@/types/global'
import { motion, AnimatePresence } from 'framer-motion'
import CheckoutSummaryItem from '../checkout-summary-item'
import CartTotals from '../cart-totals'
import ShoppingBag from '@/modules/common/icons/shopping-bag'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { formatAmount } from '@/lib/util/prices'
import Title from '../../../common/title'

interface CheckoutSummaryProps {
	cart: Cart
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ cart }) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleAccordion = () => {
		setIsOpen(!isOpen)
	}

	return (
		<>
			<div className='mx-auto block md:hidden'>
				<div className='overflow-hidden'>
					<div
						className='flex justify-between items-center py-3 cursor-pointer md:hidden bg-gray-50 px-4'
						onClick={toggleAccordion}
					>
						<div className='flex items-center'>
							<ShoppingBag size={24} className='mr-2' />
							<h2 className='uppercase mr-1.5'>
								{isOpen ? 'Hide' : 'Show'} order summary
							</h2>
							{isOpen ? (
								<ChevronUpIcon color='gray' height={12} width={12} />
							) : (
								<ChevronDownIcon color='gray' height={12} width={12} />
							)}
						</div>
						{!isOpen && (
							<span>{formatAmount(cart.total, cart.market.currency)}</span>
						)}
					</div>

					<AnimatePresence>
						{isOpen && (
							<motion.div
								initial='collapsed'
								animate='open'
								exit='collapsed'
								variants={{
									open: { height: 'auto', transition: { duration: 0.4 } },
									collapsed: { height: 0, transition: { duration: 0.4 } },
								}}
							>
								<div className='pt-3 pb-8 md:pt-8 px-4 md:px-0'>
									{cart.line_items.map((item: LineItem) => (
										<CheckoutSummaryItem
											key={item.id + '_m'}
											item={item}
											market={cart.market}
										/>
									))}
									<CartTotals cart={cart} />
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>

			<div className='w-full md:w-3/6 hidden md:block'>
				<Title>Items ({cart && cart.line_items.length})</Title>
				<div>
					{cart.line_items.map((item: LineItem) => (
						<CheckoutSummaryItem
							key={item.id}
							item={item}
							market={cart.market}
						/>
					))}
					<CartTotals cart={cart} />
				</div>
			</div>
		</>
	)
}

export default CheckoutSummary
