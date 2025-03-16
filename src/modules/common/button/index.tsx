import clsx from 'clsx'
import React from 'react'

type ButtonProps = {
	isLoading?: boolean
	variant?: 'white' | 'black' | 'badge' // Added 'badge' variant
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
	children,
	className,
	isLoading = false,
	variant = 'white',
	...props
}: ButtonProps) => {
	const buttonClasses = clsx(
		'uppercase flex items-center gap-2 justify-center transition-colors duration-200 disabled:opacity-50',
		{
			'w-full h-10 px-5 bg-black text-white hover:bg-neutral-900':
				variant === 'black',
			'w-full h-9 px-5 border border-black hover:bg-black hover:text-white':
				variant === 'white',
			'flex items-center p-2 h-6 bg-gray-200 rounded': variant === 'badge',
		},
		className
	)

	return (
		<button {...props} className={buttonClasses}>
			{children}
		</button>
	)
}

export default Button
