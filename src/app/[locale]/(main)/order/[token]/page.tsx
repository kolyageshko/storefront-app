import { Metadata } from 'next'
import OrderTemplate from '@/modules/order/templates'
import { retrieveOrder } from '@/app/actions'
import { notFound } from 'next/navigation'

type Props = {
	params: { token: string }
}

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: `Order - CITADEL CULT`,
		description: `Order - CITADEL CULT`,
	}
}

export default async function CollectionPage({ params }: Props) {
	const order = await retrieveOrder(params.token)
	if (!order) {
		notFound()
	}

	return <OrderTemplate order={order} />
}
