import React, { forwardRef, InputHTMLAttributes } from 'react'

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string
}

const Radio: React.ForwardRefRenderFunction<HTMLInputElement, RadioProps> = (
	{ label, ...rest },
	ref
) => {
	return (
		<div className='flex items-center space-x-2'>
			<input
				ref={ref}
				className='h-4 w-4 border-accent-black accent-black rounded-full cursor-pointer'
				type='radio'
				{...rest}
			/>
			<label className='font-medium cursor-pointer'>{label}</label>
		</div>
	)
}

export default forwardRef(Radio)
