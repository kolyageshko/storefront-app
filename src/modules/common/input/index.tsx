import { ErrorMessage } from '@hookform/error-message'
import Eye from '../icons/eye'
import EyeOff from '../icons/eye-off'
import clsx from 'clsx'
import React, { useEffect, useImperativeHandle, useState } from 'react'
import { get } from 'react-hook-form'

type InputProps = Omit<
	Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
	'placeholder'
> & {
	label: string
	errors?: Record<string, unknown>
	touched?: Record<string, unknown>
	name: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ type, name, label, errors, touched, required, ...props }, ref) => {
		const inputRef = React.useRef<HTMLInputElement>(null)
		const [showPassword, setShowPassword] = useState(false)
		const [inputType, setInputType] = useState(type)

		useEffect(() => {
			if (type === 'password' && showPassword) {
				setInputType('text')
			}

			if (type === 'password' && !showPassword) {
				setInputType('password')
			}
		}, [type, showPassword])

		useImperativeHandle(ref, () => inputRef.current!)

		const hasError = errors && get(errors, name)

		return (
			<div className='flex flex-col w-full'>
				<div className='relative'>
					<input
						type={inputType}
						name={name}
						aria-invalid={hasError}
						placeholder=' '
						className={clsx(
							'block rounded-none px-2.5 pb-2.5 pt-5 w-full border appearance-none focus:outline-none focus:ring-0 peer',
							{
								'border-red-500 focus:border-red-500': hasError,
							}
						)}
						{...props}
						ref={inputRef}
					/>
					<label
						htmlFor={name}
						onClick={() => inputRef.current?.focus()}
						className={clsx(
							'absolute text-gray-500 duration-200 transform uppercase cursor-text -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
						)}
					>
						{label}
						{required && <span>*</span>}
					</label>
					{type === 'password' && (
						<button
							type='button'
							onClick={() => setShowPassword(!showPassword)}
							className='text-ui-fg-subtle px-4 focus:outline-none transition-all duration-150 outline-none focus:text-gray-700 absolute right-0 top-3'
						>
							{showPassword ? <Eye /> : <EyeOff />}
						</button>
					)}
				</div>
				{hasError && (
					<ErrorMessage
						errors={errors}
						name={name}
						render={({ message }) => {
							return (
								<div className='pt-1 text-red-500'>
									<span>{message}</span>
								</div>
							)
						}}
					/>
				)}
			</div>
		)
	}
)

Input.displayName = 'Input'

export default Input
