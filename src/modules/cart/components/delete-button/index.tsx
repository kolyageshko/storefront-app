import { useState } from 'react'

import Button from '../../../common/button'
import { deleteCartItem } from '../../actions'

const DeleteButton = ({
	id,
	children,
	className,
}: {
	id: string
	children?: React.ReactNode
	className?: string
}) => {
	const [isDeleting, setIsDeleting] = useState(false)

	const handleDelete = async (id: string) => {
		setIsDeleting(true)
		try {
			await deleteCartItem(id)
		} catch (err) {
		} finally {
			setIsDeleting(false)
		}
	}

	return (
		<Button
			type='button'
			variant='badge'
			disabled={isDeleting}
			onClick={() => handleDelete(id)}
		>
			Remove
		</Button>
	)
}

export default DeleteButton
