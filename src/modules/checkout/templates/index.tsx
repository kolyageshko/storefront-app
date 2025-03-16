import EmptyCartMessage from '@/modules/cart/components/empty-cart-message'
import CheckoutSummary from '../components/checkout-summary'
import CheckoutForm from '../components/checkout-form'
import { Cart } from '../../../types/global'
import { listMarkets } from '../../../lib/data'

type CheckoutTemplateProps = {
	cart?: Cart | null
}

const CheckoutTemplate: React.FC<CheckoutTemplateProps> = async ({ cart }) => {
	const markets = await listMarkets()

	return (
		<div className='pt-8 pb-12 md:pb-8'>
			{cart && cart.line_items.length > 0 ? (
				<div className='grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-0 md:h-screen'>
					<div className='order-last md:order-first'>
						<CheckoutForm markets={markets} cart={cart} />
					</div>
					<div className='order-first md:order-last'>
						<CheckoutSummary cart={cart} />
					</div>
				</div>
			) : (
				<EmptyCartMessage />
			)}
		</div>
	)
}

export default CheckoutTemplate
