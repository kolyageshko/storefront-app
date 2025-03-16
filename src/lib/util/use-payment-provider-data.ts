import { PaymentProvider } from '../../types/global'

interface PaymentProviderData {
	label: string
	description?: string
}

const getPaymentProviderData = (
	paymentProvider: PaymentProvider
): PaymentProviderData => {
	const { id } = paymentProvider

	let label = ''
	let description = ''

	switch (id) {
		case 'manual':
			label = 'Оплата при отриманні'
			break
		case 'fondy':
			label = 'Credit Card, Online-Banking and Wallets via Fondy'
			description =
				'After clicking “Checkout”, you will be redirected to Pay by card, online-banking and wallets via Fondy to complete your purchase securely.'
			break
		default:
			label = 'Unknown Payment Method'
	}

	return { label, description }
}

export default getPaymentProviderData
