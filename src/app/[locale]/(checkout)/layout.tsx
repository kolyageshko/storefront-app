import Footer from '../../../modules/layout/footer'
import Nav from '../../../modules/layout/nav'

export default function PageLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex flex-col min-h-screen'>
			<Nav />
			<div className='flex-grow'>{children}</div>
			<Footer />
		</div>
	)
}
