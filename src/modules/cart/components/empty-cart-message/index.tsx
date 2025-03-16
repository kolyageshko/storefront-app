import Link from 'next/link'

interface EmptyCartMessageProps {
	onClick?: () => void
}

const EmptyCartMessage: React.FC<EmptyCartMessageProps> = ({ onClick }) => {
	return (
		<div className='px-8 py-24 flex flex-col gap-y-1 justify-center items-center text-center'>
			<h1 className='uppercase'>Your shopping bag is empty</h1>
			<div>
				<Link className='underline uppercase' href='/' onClick={onClick}>
					Explore products
				</Link>
			</div>
		</div>
	)
}

export default EmptyCartMessage
