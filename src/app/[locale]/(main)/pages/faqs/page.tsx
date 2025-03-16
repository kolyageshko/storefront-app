import { Metadata } from 'next'
import Accordion from '@/modules/common/accordion'

const faqsData = [
	{
		title: 'Do you ship to my country?',
		text: 'Yes, we do ship internationally. The cost and time frame depends on your location. Please check the information on the checkout page.',
	},
	{
		title: 'How can I track my order?',
		text: 'You can track the status of your order in the "My Account" section of our website or use the tracking number provided to you via email.',
	},
	{
		title: 'What are the payment options?',
		text: 'We accept a variety of payment methods including credit cards, cryptocurrencies, e-payments and more. A full list of available options is available on the checkout page.',
	},
	{
		title: 'How can I return an order?',
		text: 'If you are not satisfied with your order, please contact our customer service team within 14 days of receiving the item via email or the form on our website',
	},
	{
		title: 'How do I find out my clothing sizes?',
		text: 'All size information is available on each product page. We also provide a size chart for easy selection of the right size.',
	},
	{
		title: 'How do I contact your support team?',
		text: 'You can contact our customer service team by email support@citadelcult.com',
	},
]

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: `FAQS - CITADEL CULT`,
		description: `FAQS - CITADEL CULT`,
	}
}

export default async function FaqsPage() {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 px-4 py-12'>
			<div className='hidden md:block'></div>
			<div>
				<h1 className='uppercase mb-14 font-bold'>Faqs</h1>
				{faqsData.map((faq, index) => (
					<Accordion key={index} title={faq.title}>
						{faq.text}
					</Accordion>
				))}
			</div>
		</div>
	)
}
