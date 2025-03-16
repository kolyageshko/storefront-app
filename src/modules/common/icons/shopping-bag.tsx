import React from 'react'
import { IconProps } from '@/types/icon'

const ShoppingBag: React.FC<IconProps> = ({
	size = '24',
	color = 'currentColor',
	...attributes
}) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...attributes}
		>
			<path stroke={color} d='M6.5 8.5h12v12h-12z'></path>
			<path
				stroke={color}
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeMiterlimit='10'
				d='M16 8c0-2.21-1.313-4-3.5-4C10.312 4 9 5.79 9 8'
			></path>
		</svg>
	)
}

export default ShoppingBag
