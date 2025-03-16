'use client'

import React, {useState} from 'react'
import Button from '../../../common/button'
import {Cart} from '@/types/global'
import {placeOrder} from '../../actions'
import {useFormContext} from 'react-hook-form'
import {updateCart} from '../../../cart/actions'
import {useParams, useRouter} from 'next/navigation'

type PaymentButtonProps = {
	cart: Cart
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ cart }) => {
	const notReady = !cart.payment_provider

	const paymentProvider = cart.payment_provider

	switch (paymentProvider?.id) {
		case 'manual':
			return <CashOnDeliveryButton notReady={notReady} />
		case 'fondy':
			return <FondyPaymentButton notReady={notReady} />
		default:
			return (
				<Button variant='black' disabled>
					Select a payment method
				</Button>
			)
	}
}

const CashOnDeliveryButton = ({ notReady }: { notReady: boolean }) => {
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { handleSubmit } = useFormContext()
	const router = useRouter()

	const { locale } = useParams()
	const countryCode = locale.toString()

	const handlePayment = handleSubmit(async e => {
		setSubmitting(true)
		try {
			await updateCart(e)
			const order = await placeOrder()

			router.push(`/${countryCode}/order/${order.token}`)
		} catch (err) {
			setError('Error placing order. Please try again.')
		} finally {
			setSubmitting(false)
		}
	})

	return (
		<>
			<Button
				disabled={notReady}
				isLoading={submitting}
				onClick={handlePayment}
				variant='black'
			>
				Checkout
			</Button>
			{error && <div className='mt-2 text-gray-500'>{error}</div>}{' '}
		</>
	)
}

const FondyPaymentButton = ({ notReady }: { notReady: boolean }) => {
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { handleSubmit } = useFormContext()
	const router = useRouter()

	const onPaymentCompleted = async () => {
		setSubmitting(true)
		try {
			const order = await placeOrder()
			router.push(order.payment_url)
		} catch (error) {
			setError('Error placing order. Please try again.')
			console.error('Error completing payment:', error)
		} finally {
			setSubmitting(false)
		}
	}

	const handlePayment = handleSubmit(async e => {
		await updateCart(e)
		onPaymentCompleted()
	})

	return (
		<>
			<Button
				disabled={notReady}
				isLoading={submitting}
				onClick={handlePayment}
				variant='black'
			>
				Checkout
			</Button>
			{error && <div className='mt-2 text-gray-500'>{error}</div>}{' '}
		</>
	)
}

export default PaymentButton
