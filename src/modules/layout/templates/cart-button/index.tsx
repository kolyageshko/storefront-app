import { retrieveCart } from '../../../cart/actions'
import CartDrawer from '../../components/cart-drawer'

export default async function CartButton() {
	const cart = await retrieveCart()
	return <CartDrawer cart={cart} />
}
