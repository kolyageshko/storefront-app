import { Metadata } from 'next'
import Link from 'next/link'
import Nav from '../modules/layout/nav'
import Footer from '../modules/layout/footer'

export const metadata: Metadata = {
	title: '404',
	description: 'Something went wrong',
}

export default function NotFound() {
	return (
		<>
			<Nav />
			<div className='flex flex-col min-h-screen'>
				<div className='flex flex-1 flex-col gap-4 items-center justify-center h-full'>
					<h1>Page not found</h1>
					<p>The page you tried to access does not exist.</p>
					<Link href='/'>Go to frontpage</Link>
				</div>
			</div>
			<Footer />
		</>
	)
}
