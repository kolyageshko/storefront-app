import React, { ReactNode } from 'react'

interface BadgeProps {
	children: ReactNode
}

const Badge: React.FC<BadgeProps> = ({ children }) => {
	return (
		<div className='bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full'>
			{children}
		</div>
	)
}

export default Badge
